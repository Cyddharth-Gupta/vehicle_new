import { DefaultCrudRepository } from '@loopback/repository';
import { WeighingbridgedbDataSource } from '../datasources';
import { UserSession, UserSessionRelations } from '../models';
export declare class UserSessionRepository extends DefaultCrudRepository<UserSession, typeof UserSession.prototype.userSessionId, UserSessionRelations> {
    constructor(dataSource: WeighingbridgedbDataSource);
}
