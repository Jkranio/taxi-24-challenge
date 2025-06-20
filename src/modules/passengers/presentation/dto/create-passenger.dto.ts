
import { IsString, IsEmail, Length, IsOptional } from 'class-validator';

export class CreatePassengerDto {
  @IsString()
  @Length(3, 120)
  fullName: string;

  @IsString()
  @Length(8, 20)
  phone: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
