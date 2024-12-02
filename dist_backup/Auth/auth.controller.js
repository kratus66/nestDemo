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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("../Users/auth.service");
const RegisterUserDto_1 = require("../Dto/RegisterUserDto");
const rolesGuard_1 = require("../guard/rolesGuard");
const roles_decorator_1 = require("../decorators/roles.decorator");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signin(email, password, res) {
        if (!email || !password) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({
                message: "Email o password no ingresados"
            });
        }
        const isValidUser = await this.authService.validateUser(email, password);
        if (!isValidUser) {
            return res.status(common_1.HttpStatus.UNAUTHORIZED).json({
                message: "Email o password invalidos",
            });
        }
        const token = await this.authService.generateJwtToken(isValidUser);
        return res.status(common_1.HttpStatus.OK).json({ token });
    }
    async signup(registerUserDto, res) {
        const { password, confirmPassword } = registerUserDto;
        if (password !== confirmPassword) {
            throw new common_1.HttpException("Passwords do not match", common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.authService.signup(registerUserDto);
        const { password: _, ...userWithoutPassword } = user;
        return res.status(common_1.HttpStatus.CREATED).json(userWithoutPassword);
    }
    protectedEndpoint(res) {
        return res.status(common_1.HttpStatus.OK).json({
            message: "Access granted to protected endpoint",
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)('signin'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signin", null);
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterUserDto_1.RegisterUserDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('protected-endpoint'),
    (0, roles_decorator_1.Roles)('admin'),
    (0, common_1.UseGuards)(rolesGuard_1.RolesGuard),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "protectedEndpoint", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map