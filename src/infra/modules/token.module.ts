import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Token } from 'src/infra/entities/token.entity';
import { TokenRepository } from 'src/infra/repositories/token.repository';
import { TokenService } from 'src/infra/services/token.service';
import { UserModule } from './user.module';
import { TokenController } from 'src/interface/controllers/token.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Token]),
    forwardRef(() => UserModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [TokenController],
  providers: [TokenRepository, TokenService],
  exports: [TokenService, TokenRepository],
})
export class TokenModule {}
