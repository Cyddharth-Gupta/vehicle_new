import { DefaultCrudRepository } from '@loopback/repository';
import { WeighingbridgedbDataSource } from '../datasources';
import { Vehicle, VehicleRelations } from '../models';
export declare class VehicleRepository extends DefaultCrudRepository<Vehicle, typeof Vehicle.prototype.vehicleId, VehicleRelations> {
    constructor(dataSource: WeighingbridgedbDataSource);
}
