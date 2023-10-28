import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WeighingbridgedbDataSource} from '../datasources';
import {Vehicle, VehicleRelations} from '../models';

export class VehicleRepository extends DefaultCrudRepository<
  Vehicle,
  typeof Vehicle.prototype.vehicleId,
  VehicleRelations
> {
  constructor(
    @inject('datasources.weighingbridgedb') dataSource: WeighingbridgedbDataSource,
  ) {
    super(Vehicle, dataSource);
  }
}
