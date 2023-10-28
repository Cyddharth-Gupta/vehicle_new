"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeighingbridgedbDataSource = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const config = {
    name: 'weighingbridgedb',
    connector: 'mongodb',
    url: 'mongodb+srv://admin:admin123@globalcluster.djicjnp.mongodb.net/weighingbridgedb?retryWrites=true&w=majority',
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
let WeighingbridgedbDataSource = exports.WeighingbridgedbDataSource = class WeighingbridgedbDataSource extends repository_1.juggler.DataSource {
    constructor(dsConfig = config) {
        super(dsConfig);
    }
};
WeighingbridgedbDataSource.dataSourceName = 'weighingbridgedb';
WeighingbridgedbDataSource.defaultConfig = config;
exports.WeighingbridgedbDataSource = WeighingbridgedbDataSource = tslib_1.__decorate([
    (0, core_1.lifeCycleObserver)('datasource'),
    tslib_1.__param(0, (0, core_1.inject)('datasources.config.weighingbridgedb', { optional: true })),
    tslib_1.__metadata("design:paramtypes", [Object])
], WeighingbridgedbDataSource);
//# sourceMappingURL=weighingbridgedb.datasource.js.map