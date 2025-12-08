import { IsString, IsNotEmpty } from 'class-validator';

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  oldToken: string;
}

// alias
export type TRefreshTokenDTO = RefreshTokenDto;
