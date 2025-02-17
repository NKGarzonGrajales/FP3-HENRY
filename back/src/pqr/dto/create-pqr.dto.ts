import { IsEmail, IsIn, IsString, IsUUID } from 'class-validator';

export class CreatePqrDto {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  type: string;

  @IsString()
  description: string;

  @IsUUID('4', { message: 'El userId debe ser un UUID válido de versión 4' })
  userId: string;
}
