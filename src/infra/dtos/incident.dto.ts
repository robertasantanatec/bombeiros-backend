import { IsString, IsOptional, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateIncidentDto {
  @IsString()
  @IsNotEmpty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  firstPhoneNumber: string;

  @IsOptional()
  @IsString()
  secondPhoneNumber?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsString()
  @IsNotEmpty()
  incidentType: string;

  @IsOptional()
  @IsString()
  associatedTeam?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  dateTime?: string | Date;
}

export class IncidentResponseDto {
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  fullname: string;

  @IsString()
  firstPhoneNumber: string;

  @IsOptional()
  @IsString()
  secondPhoneNumber?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsString()
  incidentType: string;

  @IsOptional()
  @IsString()
  associatedTeam?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsDateString()
  dateTime?: string | Date;
}

export type TCreateIncidentDTO = CreateIncidentDto;
export type TIncidentResponseDTO = IncidentResponseDto;
