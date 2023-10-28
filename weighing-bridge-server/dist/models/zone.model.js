"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Zone = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
let Zone = exports.Zone = class Zone extends repository_1.Entity {
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
], Zone.prototype, "zoneId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "name", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "address", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "city", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "state", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        default: 'active',
        enum: ['active', 'inactive'],
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "cctvIPAddress", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "rfidPort", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "weighingPort", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Zone.prototype, "baudRate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Zone.prototype, "dataBits", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "parity", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Zone.prototype, "stopBits", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        required: true,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Zone.prototype, "flowControl", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], Zone.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], Zone.prototype, "userId", void 0);
exports.Zone = Zone = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Zone);
//# sourceMappingURL=zone.model.js.map