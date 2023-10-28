"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeighingDataRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let WeighingDataRepository = exports.WeighingDataRepository = class WeighingDataRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, userRepositoryGetter, vehicleRepositoryGetter, zoneRepositoryGetter) {
        super(models_1.WeighingData, dataSource);
        this.userRepositoryGetter = userRepositoryGetter;
        this.vehicleRepositoryGetter = vehicleRepositoryGetter;
        this.zoneRepositoryGetter = zoneRepositoryGetter;
        this.zone = this.createBelongsToAccessorFor('zone', zoneRepositoryGetter);
        this.registerInclusionResolver('zone', this.zone.inclusionResolver);
        this.vehicle = this.createBelongsToAccessorFor('vehicle', vehicleRepositoryGetter);
        this.registerInclusionResolver('vehicle', this.vehicle.inclusionResolver);
        this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter);
        this.registerInclusionResolver('user', this.user.inclusionResolver);
    }
};
exports.WeighingDataRepository = WeighingDataRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.weighingbridgedb')),
    tslib_1.__param(1, repository_1.repository.getter('UserRepository')),
    tslib_1.__param(2, repository_1.repository.getter('VehicleRepository')),
    tslib_1.__param(3, repository_1.repository.getter('ZoneRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.WeighingbridgedbDataSource, Function, Function, Function])
], WeighingDataRepository);
//# sourceMappingURL=weighing-data.repository.js.map