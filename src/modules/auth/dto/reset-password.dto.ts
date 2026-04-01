import { IsString, IsEmail, Length, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: '6-digit verification code' })
    @IsString()
    @Length(6, 6)
    code: string;

    @ApiProperty({ example: 'newpassword123', minLength: 6 })
    @IsString()
    @MinLength(6)
    password: string;
}
