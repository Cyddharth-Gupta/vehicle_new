"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZoneRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ZoneRepository = exports.ZoneRepository = class ZoneRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, userRepositoryGetter) {
        super(models_1.Zone, dataSource);
        this.userRepositoryGetter = userRepositoryGetter;
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
    }
};
exports.ZoneRepository = ZoneRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.weighingbridgedb')),
    tslib_1.__param(1, repository_1.repository.getter('UserRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.WeighingbridgedbDataSource, Function])
], ZoneRepository);
//# sourceMappingURL=zone.repository.js.map