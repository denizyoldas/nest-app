import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
      imports: [TypeOrmModule.forFeature([User])],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = [
        {
          id: '123123123',
          firstName: 'deniz',
          lastName: 'aksu',
          email: 'daksu30@gmail.com',
          password: '123456',
          role: 'admin',
        },
      ];
      jest.spyOn(service, 'findAll').mockImplementation(async () => {
        return await result;
      });

      expect(await controller.findAll()).toBe(result);
    });
  });
});
