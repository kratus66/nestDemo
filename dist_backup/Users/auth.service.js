"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_repository_1 = require("./users.repository");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async signIn(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Password entered:", password);
            console.log("Password in DB:", user.password);
            console.log("Passwords do not match");
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        console.log("Passwords match!");
        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
        return { success: 'User logged in successfully', token };
    }
    async validateUser(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            console.log("User not found");
            return null;
        }
        console.log("Password entered:", password);
        console.log("Password in DB:", user.password);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            console.log("Passwords do not match");
            return null;
        }
        console.log("Passwords match");
        return user;
    }
    async generateJwtToken(user) {
        const payload = { email: user.email, sub: user.id };
        console.log("Generating token with payload:", payload);
        return this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: '1h' });
    }
    async signup(registerUserDto) {
        const { password, ...userData } = registerUserDto;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await this.userRepository.createUser({ ...userData, password: hashedPassword });
        return newUser;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map