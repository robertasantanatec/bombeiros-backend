import { Body, Controller, Put } from '@nestjs/common';
import type { TRefreshTokenDTO } from 'src/application/dtos/refresh.token.dto';
import { TokenService } from 'src/infra/services/token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Put('refresh')
  async refreshToken(@Body() data: TRefreshTokenDTO) {
    return this.tokenService.refreshToken(data.oldToken);
  }
}
