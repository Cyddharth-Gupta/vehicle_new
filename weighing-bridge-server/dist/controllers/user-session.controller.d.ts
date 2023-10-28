import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { UserSession } from '../models';
import { UserSessionRepository } from '../repositories';
export declare class UserSessionController {
    userSessionRepository: UserSessionRepository;
    constructor(userSessionRepository: UserSessionRepository);
    create(userSession: UserSession): Promise<UserSession>;
    count(where?: Where<UserSession>): Promise<Count>;
    find(filter?: Filter<UserSession>): Promise<UserSession[]>;
    updateAll(userSession: UserSession, where?: Where<UserSession>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<UserSession>): Promise<UserSession>;
    updateById(id: string, userSession: UserSession): Promise<void>;
    replaceById(id: string, userSession: UserSession): Promise<void>;
    deleteById(id: string): Promise<void>;
}
