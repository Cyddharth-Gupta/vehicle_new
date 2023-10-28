"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeighingDataZoneController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let WeighingDataZoneController = exports.WeighingDataZoneController = class WeighingDataZoneController {
    constructor(weighingDataRepository) {
        this.weighingDataRepository = weighingDataRepository;
    }
    async getZone(id) {
        return this.weighingDataRepository.zone(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/weighing-data/{id}/zone', {
        responses: {
            '200': {
                description: 'Zone belonging to WeighingData',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Zone),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataZoneController.prototype, "getZone", null);
exports.WeighingDataZoneController = WeighingDataZoneController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.WeighingDataRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.WeighingDataRepository])
], WeighingDataZoneController);
//# sourceMappingURL=weighing-data-zone.controller.js.map