"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let VehicleController = exports.VehicleController = class VehicleController {
    constructor(vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }
    async create(vehicle) {
        return this.vehicleRepository.create(vehicle);
    }
    async count(where) {
        return this.vehicleRepository.count(where);
    }
    async find(filter) {
        return this.vehicleRepository.find(filter);
    }
    async updateAll(vehicle, where) {
        return this.vehicleRepository.updateAll(vehicle, where);
    }
    async findById(id, filter) {
        return this.vehicleRepository.findById(id, filter);
    }
    async updateById(id, vehicle) {
        await this.vehicleRepository.updateById(id, vehicle);
    }
    async replaceById(id, vehicle) {
        await this.vehicleRepository.replaceById(id, vehicle);
    }
    async deleteById(id) {
        await this.vehicleRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/vehicles'),
    (0, rest_1.response)(200, {
        description: 'Vehicle model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Vehicle) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Vehicle, {
                    title: 'NewVehicle',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Vehicle]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/vehicles/count'),
    (0, rest_1.response)(200, {
        description: 'Vehicle model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Vehicle)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/vehicles'),
    (0, rest_1.response)(200, {
        description: 'Array of Vehicle model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Vehicle, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Vehicle)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/vehicles'),
    (0, rest_1.response)(200, {
        description: 'Vehicle PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Vehicle, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Vehicle)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Vehicle, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/vehicles/{id}'),
    (0, rest_1.response)(200, {
        description: 'Vehicle model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Vehicle, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Vehicle, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/vehicles/{id}'),
    (0, rest_1.response)(204, {
        description: 'Vehicle PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Vehicle, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Vehicle]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/vehicles/{id}'),
    (0, rest_1.response)(204, {
        description: 'Vehicle PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Vehicle]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/vehicles/{id}'),
    (0, rest_1.response)(204, {
        description: 'Vehicle DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], VehicleController.prototype, "deleteById", null);
exports.VehicleController = VehicleController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.VehicleRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.VehicleRepository])
], VehicleController);
//# sourceMappingURL=vehicle.controller.js.map