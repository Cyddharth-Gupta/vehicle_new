"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeighingDataController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const aws_sdk_1 = tslib_1.__importDefault(require("aws-sdk"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const pdfKit = require('html-pdf-node');
const { readFile } = require('fs/promises');
const canvas_1 = require("canvas");
const jsbarcode_1 = tslib_1.__importDefault(require("jsbarcode"));
const config = {
    accessKeyId: 'AKIA5R6PRO3WQXNRZFZO',
    secretAccessKey: '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',
};
const s3 = new aws_sdk_1.default.S3(config);
const slugify = function (string) {
    const a = 'àáäâãåèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
    const b = 'aaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
    const p = new RegExp(a.split('').join('|'), 'g');
    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
};
let WeighingDataController = exports.WeighingDataController = class WeighingDataController {
    constructor(weighingDataRepository) {
        this.weighingDataRepository = weighingDataRepository;
    }
    async create(weighingData) {
        let options = { format: 'A4' };
        weighingData.createdAt = new Date();
        let file = { content: await readFile('public/receipt.html', 'utf8') };
        file.content = file.content.replace('{{zoneName}}', weighingData.zoneName);
        file.content = file.content.replace('{{address}}', weighingData.address);
        file.content = file.content.replace('{{city}}', weighingData.city);
        file.content = file.content.replace('{{state}}', weighingData.state);
        file.content = file.content.replace('{{address}}', weighingData.address);
        file.content = file.content.replace('{{date}}', new Date(weighingData.createdAt || '').toDateString());
        file.content = file.content.replace('{{employeeName}}', weighingData.employeeName);
        file.content = file.content.replace('{{time}}', new Date(weighingData.createdAt || '').toLocaleTimeString());
        file.content = file.content.replace('{{zoneName}}', weighingData.zoneName);
        file.content = file.content.replace('{{slipNumber}}', weighingData.slipNumber);
        file.content = file.content.replace('{{supplier}}', weighingData.supplier);
        file.content = file.content.replace('{{material}}', weighingData.material);
        file.content = file.content.replace('{{vehicleNumber}}', weighingData.vehicleNumber);
        file.content = file.content.replace('{{weightType}}', weighingData.weightType);
        file.content = file.content.replace('{{measureType}}', weighingData.measureType);
        file.content = file.content.replace('{{grossWeight}}', weighingData.grossWeight);
        file.content = file.content.replace('{{tareWeight}}', weighingData.tareWeight);
        file.content = file.content.replace('{{netWeight}}', weighingData.netWeight);
        const canvas = new canvas_1.Canvas(100, 50, "image");
        (0, jsbarcode_1.default)(canvas, weighingData.slipNumber);
        const barcodeFile = await s3.upload({
            Bucket: 'weighing-bridge-resources',
            Key: `barcodes/${weighingData.slipNumber}.png`,
            Body: canvas.toBuffer(),
            ContentType: `image/png`
        }).promise();
        file.content = file.content.replace('{{barcodeUrl}}', barcodeFile.Location);
        weighingData.barcodeUrl = barcodeFile.Location;
        let pdfBuffer = await pdfKit.generatePdf(file, options);
        const s3File = await s3.upload({
            Bucket: 'weighing-bridge-resources',
            Key: `receipts/${slugify(weighingData.zoneName)}/${weighingData.slipNumber}.pdf`,
            Body: pdfBuffer,
            ContentType: `application/pdf`
        }).promise();
        weighingData.receiptUrl = s3File.Location;
        let data = await this.weighingDataRepository.create(weighingData);
        return data;
    }
    async count(where) {
        return this.weighingDataRepository.count(where);
    }
    async find(filter) {
        return this.weighingDataRepository.find(filter);
    }
    async updateAll(weighingData, where) {
        return this.weighingDataRepository.updateAll(weighingData, where);
    }
    async findById(id, filter) {
        return this.weighingDataRepository.findById(id, filter);
    }
    async updateById(id, weighingData) {
        await this.weighingDataRepository.updateById(id, weighingData);
    }
    async replaceById(id, weighingData) {
        await this.weighingDataRepository.replaceById(id, weighingData);
    }
    async deleteById(id) {
        await this.weighingDataRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/weighing-data'),
    (0, rest_1.response)(200, {
        description: 'WeighingData model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.WeighingData) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.WeighingData, {
                    title: 'NewWeighingData',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.WeighingData]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/weighing-data/count'),
    (0, rest_1.response)(200, {
        description: 'WeighingData model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.WeighingData)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/weighing-data'),
    (0, rest_1.response)(200, {
        description: 'Array of WeighingData model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.WeighingData, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.WeighingData)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/weighing-data'),
    (0, rest_1.response)(200, {
        description: 'WeighingData PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.WeighingData, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.WeighingData)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.WeighingData, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/weighing-data/{id}'),
    (0, rest_1.response)(200, {
        description: 'WeighingData model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.WeighingData, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.WeighingData, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/weighing-data/{id}'),
    (0, rest_1.response)(204, {
        description: 'WeighingData PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.WeighingData, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.WeighingData]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/weighing-data/{id}'),
    (0, rest_1.response)(204, {
        description: 'WeighingData PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.WeighingData]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/weighing-data/{id}'),
    (0, rest_1.response)(204, {
        description: 'WeighingData DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], WeighingDataController.prototype, "deleteById", null);
exports.WeighingDataController = WeighingDataController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.WeighingDataRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.WeighingDataRepository])
], WeighingDataController);
//# sourceMappingURL=weighing-data.controller.js.map