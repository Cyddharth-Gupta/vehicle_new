import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {WeighingbridgedbDataSource} from '../datasources';
import {InsightReport, InsightReportRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class InsightReportRepository extends DefaultCrudRepository<
  InsightReport,
  typeof InsightReport.prototype.insightReportId,
  InsightReportRelations
> {

  public readonly user: BelongsToAccessor<User, typeof InsightReport.prototype.insightReportId>;

  constructor(
    @inject('datasources.weighingbridgedb') dataSource: WeighingbridgedbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(InsightReport, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
