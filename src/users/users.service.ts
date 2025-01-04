import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { NotFoundException } from '@nestjs/common';
export interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'user';
  }
  
  @Injectable()
  export class UsersService {
    private users: User[] = [
      { id: 1, name: 'John A', email: 'john.A@exampl.com', role: 'admin' },
      { id: 2, name: 'John B', email: 'john.B@exampl.com', role: 'admin' },
      { id: 3, name: 'John C', email: 'john.C@exampl.com', role: 'user' },
    ];
    GetAllUsers(role?:'admin' | 'user'){
        if(role){
            const UserArray =  this.users.filter(user => user.role === role);
            if(UserArray.length===0){
                throw new NotFoundException('No users found with the given role');
            }
        }
        return this.users
    }

    GetSingleUser(id:number){
        const user =  this.users.find(user=> user.id === id)
        if(!user){
            throw new NotFoundException('User not found')
        }
        return user
    } 

    CreateUser(createUser:CreateUserDto){
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUser = {
            id: usersByHighestId[0].id + 1,
            ...createUser
        }
        this.users.push(newUser)
        return newUser

    }
    UpdateOne(id:number,updateUserDto:UpdateUserDto){
        this.users = this.users.map(user=> {
            if(user.id === id){
                return { ...user,updateUserDto}
            }
            return user
        })
        return this.GetSingleUser(id)


    }
    DeleteOne(id:number){
        const removedUser = this.GetSingleUser(id)

        this.users = this.users.filter(user => user.id !== id)

        return removedUser
    }
}
