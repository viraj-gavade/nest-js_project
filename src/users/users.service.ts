import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users :
    [
        { id: 1, name: 'John A', email: 'john.A@exampl.com', role:"admin"},
        { id: 2, name: 'John B', email: 'john.B@exampl.com', role:"admin"},
        { id: 3, name: 'John C', email: 'john.C@exampl.com', role:"user"},
        { id: 4, name: 'John D', email: 'john.D@exampl.com', role:"admin"},
        { id: 5, name: 'John E', email: 'john.E@exampl.com', role:"user"},
        { id: 6, name: 'John F', email: 'john.F@exampl.com', role:"admin"}
    ] 
    GetAllUsers(role?:'admin' | 'user'){
        if(role){
            return this.users.filter(user => user.role === role);
        }
        return this.users
    }

    GetSingleUser(id:number){
        const user =  this.users.find(user=> user.id === id)
        return user
    } 

    CreateUser(user:{ name:string,email:string,role:'admin'|'user'}){
        const UserByHighestId = [...this.users].sort((a,b)=> b.id-a.id)
        const NewUser = {
            id : UserByHighestId[0].id + 1 ,
            ...user
        }
        this.users.push(NewUser)
        return NewUser

    }
    UpdateOne(id:number,updatedUser:{ name?:string,email?:string,role?:'admin'|'user'}){
        this.users = this.users.map(user=> {
            if(user.id === id){
                return { ...user,updatedUser}
            }
            return user
        })
        return this.GetSingleUser(id)


    }
    DeleteOne(id:number){
        const RemovedUser = this.users.map(user=>{
            if(user.id === id){
                this.users.pop()
            }
        })
        return RemovedUser
    }
}
