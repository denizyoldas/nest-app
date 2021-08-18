import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  CACHE_MANAGER,
  Inject,
  UseInterceptors,
  UploadedFile,
  Header,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('api/users')
export class UsersController {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: any,
    private readonly usersService: UsersService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    // await this.cacheManager.set('users', [1, 2, 3, 4, 5]);
    // const value = await this.cacheManager.get('users');
    // console.log(value);
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

  @Post('photo')
  @UseInterceptors(FileInterceptor('image', { dest: './src/assets' }))
  @Header('Accept', 'multipart/form-data')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  uploadUserPhoto(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    return this.usersService.uploadUserPhoto({
      name: file.originalname,
      url: file.path,
      userId: '1231231231',
    });
  }

  @Get('photo/:id')
  getProfilePicture(@Param('id') id: string, @Res() res) {
    return res.sendFile(id, {
      root: './src/assets',
    });
  }
}
