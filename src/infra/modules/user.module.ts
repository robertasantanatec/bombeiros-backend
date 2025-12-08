import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'src/infra/services/user.service';
import { User } from 'src/infra/entities/user.entity';
import { UserRepository } from 'src/infra/repositories/user.repository';
import { UserMapper } from 'src/infra/mappers/user.mapper';
import { UserController } from 'src/interface/controllers/user.controller';
import { AuthModule } from './auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserRepository, UserMapper, UserService],
  exports: [UserService, UserRepository],
})
export class UserModule {}
