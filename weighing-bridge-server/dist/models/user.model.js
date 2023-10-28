"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const zone_model_1 = require("./zone.model");
let User = exports.User = class User extends repository_1.Entity {
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
], User.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "employeeId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "fullName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "joiningDate", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "dateOfBirth", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
        enum: ['employee', 'admin']
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "userType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        enum: ['active', 'inactive'],
        default: 'active'
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "username", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "password", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.hasOne)(() => zone_model_1.Zone),
    tslib_1.__metadata("design:type", zone_model_1.Zone)
], User.prototype, "zone", void 0);
exports.User = User = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false, hiddenProperties: ['password'] } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], User);
//# sourceMappingURL=user.model.js.map