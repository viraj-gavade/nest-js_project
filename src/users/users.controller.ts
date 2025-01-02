import { Controller, Get, Param } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Get()
    GetAllUsers(){
        return []
    }

    @Get('interns')
    GetInterns(){
        return []
    }

    @Get(":id")
    GetSingleUser(@Param('id') id:string){
        return { id }
    }
}
