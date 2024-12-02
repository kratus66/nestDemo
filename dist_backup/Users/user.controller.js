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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const auth_guard_1 = require("../Auth/auth.guard");
const CreateUserDto_1 = require("../Dto/CreateUserDto");
const Update_userDto_1 = require("../Dto/Update-userDto");
let UserController = class UserController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUsers(res, page = 1, limit = 5) {
        try {
            const users = await this.usersService.getUsers(page, limit);
            return res.status(common_1.HttpStatus.OK).json(users);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error al obtener los usuarios', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getUserProfile(request) {
    }
    async getUserById(id, res) {
        try {
            const user = await this.usersService.getUserById(id);
            if (!user) {
                throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            const { role, ...userWithoutRole } = user;
            return res.status(common_1.HttpStatus.OK).json(userWithoutRole);
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error al obtener el usuario', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createUser(createUserDto, res) {
        try {
            const newUser = await this.usersService.createUser(createUserDto);
            return res.status(common_1.HttpStatus.CREATED).json({ id: newUser.id });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error al crear el usuario', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updateUser(id, updateUserDto, res) {
        try {
            const updatedUser = await this.usersService.updateUser(id, updateUserDto);
            if (!updatedUser) {
                throw new common_1.HttpException('Usuario no encontrado', common_1.HttpStatus.NOT_FOUND);
            }
            return res.status(common_1.HttpStatus.OK).json({ id: updatedUser.id });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error al actualizar el usuario', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async deleteUser(id, res) {
        try {
            await this.usersService.deleteUser(id);
            return res.status(common_1.HttpStatus.OK).json({ message: `Usuario con ID ${id} eliminado correctamente` });
        }
        catch (error) {
            throw new common_1.HttpException(error.message || 'Error al eliminar el usuario', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Res)()),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserProfile", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserById", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUserDto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Update_userDto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id', new common_1.ParseUUIDPipe())),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("users"),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UserController);
//# sourceMappingURL=user.controller.js.map