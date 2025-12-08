import { Type } from 'class-transformer';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsIn,
  IsBoolean,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { IncidentResponseDto } from './incident.dto';

export class AddressDto {
  @IsOptional()
  @IsString()
  postOfficeBox?: string;

  @IsOptional()
  @IsString()
  street?: string;

  @IsOptional()
  @IsString()
  number?: string;

  @IsOptional()
  @IsString()
  complement?: string;

  @IsOptional()
  @IsString()
  district?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;
}

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string | Date;

  @IsOptional()
  @IsIn(['M', 'F'])
  gender?: 'M' | 'F';

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  enrollmentNumber?: string;

  @IsOptional()
  @IsString()
  post?: string;

  @IsOptional()
  @IsString()
  unity?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @IsString()
  passwordHash?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UserResponseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  profileImage?: string;

  @IsOptional()
  @IsString()
  cpf?: string;

  @IsOptional()
  @IsDateString()
  birthDate?: string | Date;

  @IsOptional()
  @IsIn(['M', 'F'])
  gender?: 'M' | 'F';

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  enrollmentNumber?: string;

  @IsOptional()
  @IsString()
  post?: string;

  @IsOptional()
  @IsString()
  unity?: string;

  @IsOptional()
  @IsString()
  specialization?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

// aliases para compatibilidade
export type TCreateUserDTO = CreateUserDto;
export type TUserResponseDTO = UserResponseDto;
