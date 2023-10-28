"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeighingData = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
const vehicle_model_1 = require("./vehicle.model");
const zone_model_1 = require("./zone.model");
let WeighingData = exports.WeighingData = class WeighingData extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        mongodb: { dataType: 'ObjectID' },
        generated: true,
        id: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "weighingDataId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "rfidNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "vehicleNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "slipNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], WeighingData.prototype, "charges", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "supplier", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        enum: ['T', 'G']
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "measureType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        enum: ['F1', 'F2']
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "weightType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], WeighingData.prototype, "grossWeight", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], WeighingData.prototype, "tareWeight", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], WeighingData.prototype, "netWeight", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        enum: ['LMV', 'HMV']
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "vehicleType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "material", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "receiptUrl", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "barcodeUrl", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "zoneName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "address", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "city", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "state", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "employeeName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], WeighingData.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => vehicle_model_1.Vehicle),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "vehicleId", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => zone_model_1.Zone),
    tslib_1.__metadata("design:type", String)
], WeighingData.prototype, "zoneId", void 0);
exports.WeighingData = WeighingData = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], WeighingData);
//# sourceMappingURL=weighing-data.model.js.map