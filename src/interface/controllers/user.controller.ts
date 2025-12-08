import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { type Request } from 'express';
import type { TCreateUserDTO, TUserResponseDTO } from 'src/infra/dtos/user.dto';
import { UserService } from 'src/infra/services/user.service';
import { AuthService } from 'src/infra/services/auth.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly _userService: UserService,
    private readonly _authService: AuthService,
  ) {}

  @Post()
  public async createUser(
    @Body() createUserData: TCreateUserDTO,
  ): Promise<TUserResponseDTO> {
    try {
      const user = await this._userService.createUser(createUserData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Get()
  public async findAll(): Promise<TUserResponseDTO[]> {
    return this._userService.findAll();
  }

  @Get(':id')
  public async findOne(
    @Param('id') id: string,
  ): Promise<TUserResponseDTO | null> {
    return this._userService.findOne(id);
  }

  @Put(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateData: Partial<TCreateUserDTO>,
  ): Promise<TUserResponseDTO> {
    return this._userService.update(id, updateData);
  }

  @Delete(':id')
  public async remove(@Param('id') id: string): Promise<void> {
    return this._userService.remove(id);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    return this._authService.login((req as any).user);
  }
}
