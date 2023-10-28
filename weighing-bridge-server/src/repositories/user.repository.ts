import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {WeighingbridgedbDataSource} from '../datasources';
import {User, UserRelations, Zone} from '../models';
import {ZoneRepository} from './zone.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.userId,
  UserRelations
> {

  public readonly zone: HasOneRepositoryFactory<Zone, typeof User.prototype.userId>;

  constructor(
    @inject('datasources.weighingbridgedb') dataSource: WeighingbridgedbDataSource, @repository.getter('ZoneRepository') protected zoneRepositoryGetter: Getter<ZoneRepository>,
  ) {
    super(User, dataSource);
    this.zone = this.createHasOneRepositoryFactoryFor('zone', zoneRepositoryGetter);
    this.registerInclusionResolver('zone', this.zone.inclusionResolver);
  }
}
