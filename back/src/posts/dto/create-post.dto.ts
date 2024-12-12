import {
  IsString,
  IsDate,
  IsOptional,
  IsInt,
  isUUID,
  IsUUID,
} from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  petType: string;

  @IsDate()
  dateLost: Date;

  @IsString()
  location: string;

  @IsString()
  contactInfo: string;

  @IsString()
  @IsOptional()
  photoUrl?: string;

  @IsUUID('4', { message: 'El userId debe ser un UUID válido de versión 4' })
  @IsString()
  userId: string;
}
