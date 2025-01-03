import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
    constructor ( private readonly usersService: UsersService ) { }
    @Get()
    GetAllUsers(@Param('role') role?: "admin"| "user"){
        return role
    }

    @Get('interns')
    GetInterns(){
        return []
    }

    @Get(":id")
    GetSingleUser(@Param('id') id:number){
        return { id }
    }

    @Post()
    CreateUser(@Body() user:{}){
        return user
    }

    @Patch(":id")
    UpdateOne(@Param('id') id:string,@Body() updatedUser:{}){
        return { id, ...updatedUser }
    }
    @Delete(':id')
    DeleteOne(@Param('id') id:string){
        return { id }
    }
}
