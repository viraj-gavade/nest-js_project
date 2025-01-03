import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor ( private readonly usersService: UsersService ) { }
    @Get()
    GetAllUsers(@Param('role') role?: "admin"| "user"){
        return this.usersService.GetAllUsers(role)
    }

    @Get('interns')
    GetInterns(){
        return []
    }

    @Get(":id")
    GetSingleUser(@Param('id') id:string){
        return this.usersService.GetSingleUser(+id)
    }

    @Post()
    CreateUser(@Body() user:{ name:string,email:string,role:'admin'|'user'}){
        return this.usersService.CreateUser(user)
    }

    @Patch(":id")
    UpdateOne(@Param('id') id:string,@Body() updatedUser:{ name?:string,email?:string,role?:'admin'|'user'}){
       this.usersService.UpdateOne(+id,updatedUser)
    }
    @Delete(':id')
    DeleteOne(@Param('id') id:string){
       return this.usersService.DeleteOne(+id)
    }
}
