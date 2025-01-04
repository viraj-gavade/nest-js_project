import { IsString,IsEnum,IsNotEmpty,IsEmail} from "class-validator";


export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsEnum(["admin","user"],{
        message:"Invalid Role Provided!"
    })
    role:"admin" |"user"
}