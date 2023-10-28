import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { WeighingbridgedbDataSource } from '../datasources';
import { Zone, ZoneRelations, User } from '../models';
import { UserRepository } from './user.repository';
export declare class ZoneRepository extends DefaultCrudRepository<Zone, typeof Zone.prototype.zoneId, ZoneRelations> {
    protected userRepositoryGetter: Getter<UserRepository>;
    readonly user: BelongsToAccessor<User, typeof Zone.prototype.zoneId>;
    constructor(dataSource: WeighingbridgedbDataSource, userRepositoryGetter: Getter<UserRepository>);
}
