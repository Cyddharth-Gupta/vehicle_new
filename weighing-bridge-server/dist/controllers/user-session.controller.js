"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserSessionController = exports.UserSessionController = class UserSessionController {
    constructor(userSessionRepository) {
        this.userSessionRepository = userSessionRepository;
    }
    async create(userSession) {
        return this.userSessionRepository.create(userSession);
    }
    async count(where) {
        return this.userSessionRepository.count(where);
    }
    async find(filter) {
        return this.userSessionRepository.find(filter);
    }
    async updateAll(userSession, where) {
        return this.userSessionRepository.updateAll(userSession, where);
    }
    async findById(id, filter) {
        return this.userSessionRepository.findById(id, filter);
    }
    async updateById(id, userSession) {
        await this.userSessionRepository.updateById(id, userSession);
    }
    async replaceById(id, userSession) {
        await this.userSessionRepository.replaceById(id, userSession);
    }
    async deleteById(id) {
        await this.userSessionRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/user-sessions'),
    (0, rest_1.response)(200, {
        description: 'UserSession model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.UserSession) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.UserSession, {
                    title: 'NewUserSession',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.UserSession]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/user-sessions/count'),
    (0, rest_1.response)(200, {
        description: 'UserSession model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.UserSession)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/user-sessions'),
    (0, rest_1.response)(200, {
        description: 'Array of UserSession model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.UserSession, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.UserSession)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/user-sessions'),
    (0, rest_1.response)(200, {
        description: 'UserSession PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.UserSession, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.UserSession)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.UserSession, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/user-sessions/{id}'),
    (0, rest_1.response)(200, {
        description: 'UserSession model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.UserSession, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.UserSession, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/user-sessions/{id}'),
    (0, rest_1.response)(204, {
        description: 'UserSession PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.UserSession, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.UserSession]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/user-sessions/{id}'),
    (0, rest_1.response)(204, {
        description: 'UserSession PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.UserSession]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/user-sessions/{id}'),
    (0, rest_1.response)(204, {
        description: 'UserSession DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserSessionController.prototype, "deleteById", null);
exports.UserSessionController = UserSessionController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserSessionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserSessionRepository])
], UserSessionController);
//# sourceMappingURL=user-session.controller.js.map