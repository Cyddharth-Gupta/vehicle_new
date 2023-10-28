import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasOneRepositoryFactory } from '@loopback/repository';
import { WeighingbridgedbDataSource } from '../datasources';
import { User, UserRelations, Zone } from '../models';
import { ZoneRepository } from './zone.repository';
export declare class UserRepository extends DefaultCrudRepository<User, typeof User.prototype.userId, UserRelations> {
    protected zoneRepositoryGetter: Getter<ZoneRepository>;
    readonly zone: HasOneRepositoryFactory<Zone, typeof User.prototype.userId>;
    constructor(dataSource: WeighingbridgedbDataSource, zoneRepositoryGetter: Getter<ZoneRepository>);
}
