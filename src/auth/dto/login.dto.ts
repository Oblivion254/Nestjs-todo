import { ApiProperty } from "@nestjs/swagger"
import { IsString, Length, IsEmail, IsNotEmpty } from "class-validator"

export class LoginDto{
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(2,20)
    password: string
    
}