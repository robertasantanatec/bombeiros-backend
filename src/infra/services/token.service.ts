import { Injectable } from '@nestjs/common';
import { TokenRepository } from '../repositories/token.repository';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/application/constants/jwt.constant';
import { UserService } from '../services/user.service';
import { Token } from 'src/infra/entities/token.entity';
import { User } from 'src/infra/entities/user.entity';

@Injectable()
export class TokenService {
  constructor(
    private tokenRepository: TokenRepository,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async save(hash: string, username: string) {
    return await this.tokenRepository.save(hash, username);
  }

  // recebe oldToken, valida via repo, gera novo JWT, salva e retorna objeto { access_token }
  async refreshToken(oldToken: string) {
    // valida token e obtém usuário
    const user = await this.tokenRepository.refreshToken(oldToken);
    // user pode vir como DTO; busca entidade completa se necessário
    const userEntity = (await this.userService.findOne((user as any).email)) as any;

    const payload = { username: (user as any).email, sub: (user as any).id };
    const token = this.jwtService.sign(payload);
    await this.save(token, (user as any).email);
    return { access_token: token };
  }

  async getUserByToken(token: string): Promise<User | null> {
    return await this.tokenRepository.getUserByToken(token);
  }
}
