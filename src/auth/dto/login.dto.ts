import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator"

export class LoginDto{
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @IsString()
    @IsNotEmpty()
    @Length(2,20)
    password: string
    
}