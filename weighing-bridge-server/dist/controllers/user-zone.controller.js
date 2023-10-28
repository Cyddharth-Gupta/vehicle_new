"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZoneController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let UserZoneController = exports.UserZoneController = class UserZoneController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async get(id, filter) {
        return this.userRepository.zone(id).get(filter);
    }
    async create(id, zone) {
        return this.userRepository.zone(id).create(zone);
    }
    async patch(id, zone, where) {
        return this.userRepository.zone(id).patch(zone, where);
    }
    async delete(id, where) {
        return this.userRepository.zone(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/users/{id}/zone', {
        responses: {
            '200': {
                description: 'User has one Zone',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Zone),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserZoneController.prototype, "get", null);
tslib_1.__decorate([
    (0, rest_1.post)('/users/{id}/zone', {
        responses: {
            '200': {
                description: 'User model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Zone) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Zone, {
                    title: 'NewZoneInUser',
                    exclude: ['zoneId'],
                    optional: ['userId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserZoneController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/users/{id}/zone', {
        responses: {
            '200': {
                description: 'User.Zone PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Zone, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Zone))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserZoneController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/users/{id}/zone', {
        responses: {
            '200': {
                description: 'User.Zone DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Zone))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserZoneController.prototype, "delete", null);
exports.UserZoneController = UserZoneController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.UserRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.UserRepository])
], UserZoneController);
//# sourceMappingURL=user-zone.controller.js.map