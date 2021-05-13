import { IsEmail, IsNotEmpty, IsPhoneNumber, MinLength } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(5)
    readonly firstName: string;
    @IsNotEmpty()
    @MinLength(5)
    readonly lastName: string;
    @IsEmail()
    readonly email: string;
    @IsNotEmpty()
    @MinLength(6)
    readonly phoneNumber: string;
    @IsNotEmpty()
    @MinLength(4)
    readonly password: string;

    constructor(firstName: string, lastName: string, email: string, phoneNumber: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }
}