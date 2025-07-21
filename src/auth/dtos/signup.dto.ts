import { IsString, Matches, MinLength } from "class-validator"

export class signupDto {

    @IsString()
    name: string

    @IsString()
    email:string

    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[0-9])/, { message: 'Password must contain at least one number' })
    password:string

}