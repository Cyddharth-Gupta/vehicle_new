import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { WeighingbridgedbDataSource } from '../datasources';
import { InsightReport, InsightReportRelations, User } from '../models';
import { UserRepository } from './user.repository';
export declare class InsightReportRepository extends DefaultCrudRepository<InsightReport, typeof InsightReport.prototype.insightReportId, InsightReportRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly user: BelongsToAccessor<User, typeof InsightReport.prototype.insightReportId>;
    constructor(dataSource: WeighingbridgedbDataSource, userRepositoryGetter: Getter<UserRepository>);
}
