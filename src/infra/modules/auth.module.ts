import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from 'src/infra/services/auth.service';
import { LocalStrategy } from 'src/infra/strategies/local.strategy';
import { JwtStrategy } from 'src/infra/strategies/jwt.strategy';
import { jwtConstants } from 'src/application/constants/jwt.constant';
import { UserModule } from './user.module';
import { TokenModule } from './token.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),
    forwardRef(() => TokenModule),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
