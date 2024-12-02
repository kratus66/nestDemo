import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../Users/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../Users/users.repository';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;
  let userRepository: UserRepository;

  const mockUserRepository = {
    findUserByEmail: jest.fn(), // Agrega los métodos necesarios
  };

  const mockJwtService = {
    sign: jest.fn(),
    verify: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: UserRepository, useValue: mockUserRepository },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  it('should create an instance of AuthService', () => {
    expect(service).toBeDefined();
  });

  // Aquí puedes agregar más pruebas específicas para el AuthService
});


    
