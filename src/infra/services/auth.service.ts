import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/infra/repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from 'src/infra/services/token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
    private tokenService: TokenService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const userEntity = await this.userRepository.findEntityByEmail(email);
    if (
      userEntity &&
      bcrypt.compareSync(password, userEntity.getPasswordHash())
    ) {
      return userEntity;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    const token = this.jwtService.sign(payload);
    this.tokenService.save(token, user.email);
    return {
      access_token: token,
    };
  }
}
