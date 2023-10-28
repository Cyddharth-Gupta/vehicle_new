"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightReport = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const user_model_1 = require("./user.model");
let InsightReport = exports.InsightReport = class InsightReport extends repository_1.Entity {
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
], InsightReport.prototype, "insightReportId", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InsightReport.prototype, "reportName", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], InsightReport.prototype, "reportFrom", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date'
    }),
    tslib_1.__metadata("design:type", String)
], InsightReport.prototype, "reportTill", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InsightReport.prototype, "vehicleType", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], InsightReport.prototype, "reportUrl", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: false,
        enum: ['unprocessed', 'processed', 'failed']
    }),
    tslib_1.__metadata("design:type", String)
], InsightReport.prototype, "status", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        default: () => new Date(),
    }),
    tslib_1.__metadata("design:type", Date)
], InsightReport.prototype, "createdAt", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => user_model_1.User),
    tslib_1.__metadata("design:type", String)
], InsightReport.prototype, "userId", void 0);
exports.InsightReport = InsightReport = tslib_1.__decorate([
    (0, repository_1.model)({ settings: { strict: false } }),
    tslib_1.__metadata("design:paramtypes", [Object])
], InsightReport);
//# sourceMappingURL=insight-report.model.js.map