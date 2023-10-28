import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {WeighingbridgedbDataSource} from '../datasources';
import {Zone, ZoneRelations, User} from '../models';
import {UserRepository} from './user.repository';

export class ZoneRepository extends DefaultCrudRepository<
  Zone,
  typeof Zone.prototype.zoneId,
  ZoneRelations
> {

  public readonly user: BelongsToAccessor<User, typeof Zone.prototype.zoneId>;

  constructor(
    @inject('datasources.weighingbridgedb') dataSource: WeighingbridgedbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>,
  ) {
    super(Zone, dataSource);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
