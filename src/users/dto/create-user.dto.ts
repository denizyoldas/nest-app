import { ApiProperty } from '@nestjs/swagger';
import { Min, IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty()
  // @Min(6)
  @IsNotEmpty()
  // @Matches('^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]$')
  password: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  role: string;
}
