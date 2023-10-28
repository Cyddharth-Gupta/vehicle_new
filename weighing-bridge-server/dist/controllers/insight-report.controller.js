"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightReportController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let InsightReportController = exports.InsightReportController = class InsightReportController {
    constructor(insightReportRepository) {
        this.insightReportRepository = insightReportRepository;
    }
    async create(insightReport) {
        return this.insightReportRepository.create(insightReport);
    }
    async count(where) {
        return this.insightReportRepository.count(where);
    }
    async find(filter) {
        return this.insightReportRepository.find(filter);
    }
    async updateAll(insightReport, where) {
        return this.insightReportRepository.updateAll(insightReport, where);
    }
    async findById(id, filter) {
        return this.insightReportRepository.findById(id, filter);
    }
    async updateById(id, insightReport) {
        await this.insightReportRepository.updateById(id, insightReport);
    }
    async replaceById(id, insightReport) {
        await this.insightReportRepository.replaceById(id, insightReport);
    }
    async deleteById(id) {
        await this.insightReportRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/insight-reports'),
    (0, rest_1.response)(200, {
        description: 'InsightReport model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.InsightReport) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.InsightReport, {
                    title: 'NewInsightReport',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.InsightReport]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/insight-reports/count'),
    (0, rest_1.response)(200, {
        description: 'InsightReport model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.InsightReport)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/insight-reports'),
    (0, rest_1.response)(200, {
        description: 'Array of InsightReport model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.InsightReport, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.InsightReport)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/insight-reports'),
    (0, rest_1.response)(200, {
        description: 'InsightReport PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.InsightReport, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.InsightReport)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.InsightReport, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/insight-reports/{id}'),
    (0, rest_1.response)(200, {
        description: 'InsightReport model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.InsightReport, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.InsightReport, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/insight-reports/{id}'),
    (0, rest_1.response)(204, {
        description: 'InsightReport PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.InsightReport, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.InsightReport]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/insight-reports/{id}'),
    (0, rest_1.response)(204, {
        description: 'InsightReport PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.InsightReport]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/insight-reports/{id}'),
    (0, rest_1.response)(204, {
        description: 'InsightReport DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], InsightReportController.prototype, "deleteById", null);
exports.InsightReportController = InsightReportController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.InsightReportRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InsightReportRepository])
], InsightReportController);
//# sourceMappingURL=insight-report.controller.js.map