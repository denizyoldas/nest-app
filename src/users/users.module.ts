import { PassportModule } from '@nestjs/passport';
import { CacheModule, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Photo } from './entities/photo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Photo]),
    CacheModule.register(),
    PassportModule,
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
