"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSession = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let UserSession = exports.UserSession = class UserSession extends repository_1.Entity {
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
], UserSession.prototype, "userSessionId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], UserSession.prototype, "token", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'boolean',
        default: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], UserSession.prototype, "isTokenExpired", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], UserSession.prototype, "createdAt", void 0);
exports.UserSession = UserSession = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], UserSession);
//# sourceMappingURL=user-session.model.js.map