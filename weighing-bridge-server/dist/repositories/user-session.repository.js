"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSessionRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let UserSessionRepository = exports.UserSessionRepository = class UserSessionRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.UserSession, dataSource);
    }
};
exports.UserSessionRepository = UserSessionRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.weighingbridgedb')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.WeighingbridgedbDataSource])
], UserSessionRepository);
//# sourceMappingURL=user-session.repository.js.map