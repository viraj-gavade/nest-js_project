import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    GetAllUsers(@Param('role') role?: "Admin"| "user"){
        return role
    }

    @Get('interns')
    GetInterns(){
        return []
    }

    @Get(":id")
    GetSingleUser(@Param('id') id:string){
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
