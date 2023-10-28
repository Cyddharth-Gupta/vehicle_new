"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vehicle = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Vehicle = exports.Vehicle = class Vehicle extends repository_1.Entity {
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
], Vehicle.prototype, "vehicleId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Vehicle.prototype, "rfidNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Vehicle.prototype, "vehicleNumber", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        enum: ['LMV', 'HMV']
    }),
    tslib_1.__metadata("design:type", String)
], Vehicle.prototype, "vehicleType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Vehicle.prototype, "tareWeight", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], Vehicle.prototype, "createdAt", void 0);
exports.Vehicle = Vehicle = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Vehicle);
//# sourceMappingURL=vehicle.model.js.map