import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { WeighingbridgedbDataSource } from '../datasources';
import { WeighingData, WeighingDataRelations, User, Vehicle, Zone } from '../models';
import { UserRepository } from './user.repository';
import { VehicleRepository } from './vehicle.repository';
import { ZoneRepository } from './zone.repository';
export declare class WeighingDataRepository extends DefaultCrudRepository<WeighingData, typeof WeighingData.prototype.weighingDataId, WeighingDataRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    protected vehicleRepositoryGetter: Getter<VehicleRepository>;
    protected zoneRepositoryGetter: Getter<ZoneRepository>;
    readonly user: BelongsToAccessor<User, typeof WeighingData.prototype.weighingDataId>;
    readonly vehicle: BelongsToAccessor<Vehicle, typeof WeighingData.prototype.weighingDataId>;
    readonly zone: BelongsToAccessor<Zone, typeof WeighingData.prototype.weighingDataId>;
    constructor(dataSource: WeighingbridgedbDataSource, userRepositoryGetter: Getter<UserRepository>, vehicleRepositoryGetter: Getter<VehicleRepository>, zoneRepositoryGetter: Getter<ZoneRepository>);
}
