import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../Users/user.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '../Auth/auth.guard';


describe('UsersController (Integration)', () => {
  let controller: UserController;

  const mockUsersService = {
    findAll: jest.fn(),
    create: jest.fn(),
  };

  const mockAuthGuard = {
    canActivate: jest.fn(() => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        { provide: UsersService, useValue: mockUsersService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue(mockAuthGuard)
      .compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Agrega más pruebas para los endpoints de UsersController
});

