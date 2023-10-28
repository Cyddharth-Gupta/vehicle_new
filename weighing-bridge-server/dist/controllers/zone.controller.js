"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ZoneController = exports.ZoneController = class ZoneController {
    constructor(zoneRepository) {
        this.zoneRepository = zoneRepository;
    }
    async create(zone) {
        return this.zoneRepository.create(zone);
    }
    async count(where) {
        return this.zoneRepository.count(where);
    }
    async find(filter) {
        return this.zoneRepository.find(filter);
    }
    async updateAll(zone, where) {
        return this.zoneRepository.updateAll(zone, where);
    }
    async findById(id, filter) {
        return this.zoneRepository.findById(id, filter);
    }
    async updateById(id, zone) {
        await this.zoneRepository.updateById(id, zone);
    }
    async replaceById(id, zone) {
        await this.zoneRepository.replaceById(id, zone);
    }
    async deleteById(id) {
        await this.zoneRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/zones'),
    (0, rest_1.response)(200, {
        description: 'Zone model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Zone) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Zone, {
                    title: 'NewZone',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Zone]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/zones/count'),
    (0, rest_1.response)(200, {
        description: 'Zone model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Zone)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/zones'),
    (0, rest_1.response)(200, {
        description: 'Array of Zone model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Zone, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Zone)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/zones'),
    (0, rest_1.response)(200, {
        description: 'Zone PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Zone, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Zone)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Zone, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/zones/{id}'),
    (0, rest_1.response)(200, {
        description: 'Zone model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Zone, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Zone, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/zones/{id}'),
    (0, rest_1.response)(204, {
        description: 'Zone PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Zone, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Zone]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/zones/{id}'),
    (0, rest_1.response)(204, {
        description: 'Zone PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Zone]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/zones/{id}'),
    (0, rest_1.response)(204, {
        description: 'Zone DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ZoneController.prototype, "deleteById", null);
exports.ZoneController = ZoneController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ZoneRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ZoneRepository])
], ZoneController);
//# sourceMappingURL=zone.controller.js.map