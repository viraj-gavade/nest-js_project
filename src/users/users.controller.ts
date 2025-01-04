import { Body, Controller, Delete, Get, Param, Patch, Post , ParseIntPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
@Controller('users')
export class UsersController {
    constructor ( private readonly usersService: UsersService ) { }
    @Get()
    GetAllUsers(@Param('role') role?: "admin"| "user"){
        return this.usersService.GetAllUsers(role)
    }

    @Get(":id")
    GetSingleUser(@Param('id',ParseIntPipe) id:number){
        return this.usersService.GetSingleUser(id)
    }

    @Post()
    CreateUser(@Body() createUserDto:CreateUserDto){
        return this.usersService.CreateUser(createUserDto)
    }

    @Patch(":id")
    UpdateOne(@Param('id',ParseIntPipe) id:number,@Body() updateUserDto:UpdateUserDto){
        
        return this.usersService.UpdateOne(id, updateUserDto)
    }
    @Delete(':id')
    DeleteOne(@Param('id',ParseIntPipe) id:number){
       return this.usersService.DeleteOne(id)
    }
}
