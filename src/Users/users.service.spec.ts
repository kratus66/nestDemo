import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UserRepository } from './users.repository';
import { CreateUserDto } from '../Dto/CreateUserDto';
import { UpdateUserDto } from '../Dto/Update-userDto';
import { User } from './users.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UserRepository;

  const mockUserRepository = {
    getUsers: jest.fn(),
    findByIdWithOrders: jest.fn(),
    createUser: jest.fn(),
    updateUser: jest.fn(),
    deleteUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UserRepository>(UserRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers', () => {
    it('should return a list of users', async () => {
      const users: User[] = [
        { id: '1', name: 'John Doe', email: 'john@example.com' } as User,
      ];
      mockUserRepository.getUsers.mockResolvedValue(users);

      const result = await service.getUsers(1, 10);
      expect(result).toEqual(users);
      expect(repository.getUsers).toHaveBeenCalledWith(1, 10);
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const user: User = { id: '1', name: 'John Doe', email: 'john@example.com' } as User;
      mockUserRepository.findByIdWithOrders.mockResolvedValue(user);

      const result = await service.getUserById('1');
      expect(result).toEqual(user);
      expect(repository.findByIdWithOrders).toHaveBeenCalledWith('1');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        phone: 1234567890,
        country: 'USA',
        address: '123 Street',
        city: 'CityName',
      };
      const user: User = { id: '1', ...createUserDto } as User;
      mockUserRepository.createUser.mockResolvedValue(user);

      const result = await service.createUser(createUserDto);
      expect(result).toEqual(user);
      expect(repository.createUser).toHaveBeenCalledWith(expect.objectContaining(createUserDto));
    });
  });

  describe('updateUser', () => {
    it('should update a user and return the updated user', async () => {
      const updateUserDto: UpdateUserDto = { name: 'Updated Name' };
      const updatedUser: User = { id: '1', name: 'Updated Name', email: 'john@example.com' } as User;

      mockUserRepository.updateUser.mockResolvedValue(updatedUser);

      const result = await service.updateUser('1', updateUserDto);
      expect(result).toEqual(updatedUser);
      expect(repository.updateUser).toHaveBeenCalledWith('1', expect.objectContaining(updateUserDto));
    });
  });

  describe('deleteUser', () => {
    it('should call deleteUser on the repository', async () => {
      mockUserRepository.deleteUser.mockResolvedValue(undefined);

      await service.deleteUser('1');
      expect(repository.deleteUser).toHaveBeenCalledWith('1');
    });
  });
});
