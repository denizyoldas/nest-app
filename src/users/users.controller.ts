import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import * as bcrypt from 'bcrypt';

@Controller('api/users')
export class UsersController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: any,
    private readonly usersService: UsersService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    await this.cacheManager.set('users', [1, 2, 3, 4, 5]);
    const value = await this.cacheManager.get('users');
    console.log(value);
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(createUserDto.password, salt);

    return this.usersService.create({
      ...createUserDto,
      password: hashPassword,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
