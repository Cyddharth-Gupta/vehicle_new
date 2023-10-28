import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {WeighingbridgedbDataSource} from '../datasources';
import {UserSession, UserSessionRelations} from '../models';

export class UserSessionRepository extends DefaultCrudRepository<
  UserSession,
  typeof UserSession.prototype.userSessionId,
  UserSessionRelations
> {
  constructor(
    @inject('datasources.weighingbridgedb') dataSource: WeighingbridgedbDataSource,
  ) {
    super(UserSession, dataSource);
  }
}
