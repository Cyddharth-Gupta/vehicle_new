import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {WeighingbridgedbDataSource} from '../datasources';
import {WeighingData, WeighingDataRelations, User, Vehicle, Zone} from '../models';
import {UserRepository} from './user.repository';
import {VehicleRepository} from './vehicle.repository';
import {ZoneRepository} from './zone.repository';

export class WeighingDataRepository extends DefaultCrudRepository<
  WeighingData,
  typeof WeighingData.prototype.weighingDataId,
  WeighingDataRelations
> {

  public readonly user: BelongsToAccessor<User, typeof WeighingData.prototype.weighingDataId>;

  public readonly vehicle: BelongsToAccessor<Vehicle, typeof WeighingData.prototype.weighingDataId>;

  public readonly zone: BelongsToAccessor<Zone, typeof WeighingData.prototype.weighingDataId>;

  constructor(
    @inject('datasources.weighingbridgedb') dataSource: WeighingbridgedbDataSource, @repository.getter('UserRepository') protected userRepositoryGetter: Getter<UserRepository>, @repository.getter('VehicleRepository') protected vehicleRepositoryGetter: Getter<VehicleRepository>, @repository.getter('ZoneRepository') protected zoneRepositoryGetter: Getter<ZoneRepository>,
  ) {
    super(WeighingData, dataSource);
    this.zone = this.createBelongsToAccessorFor('zone', zoneRepositoryGetter,);
    this.registerInclusionResolver('zone', this.zone.inclusionResolver);
    this.vehicle = this.createBelongsToAccessorFor('vehicle', vehicleRepositoryGetter,);
    this.registerInclusionResolver('vehicle', this.vehicle.inclusionResolver);
    this.user = this.createBelongsToAccessorFor('user', userRepositoryGetter,);
    this.registerInclusionResolver('user', this.user.inclusionResolver);
  }
}
