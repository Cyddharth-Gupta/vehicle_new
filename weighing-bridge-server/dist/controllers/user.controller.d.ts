import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { User } from '../models';
import { UserRepository, UserSessionRepository } from '../repositories';
export declare class UserController {
    userRepository: UserRepository;
    userSessionRepository: UserSessionRepository;
    constructor(userRepository: UserRepository, userSessionRepository: UserSessionRepository);
    create(user: User): Promise<User>;
    count(where?: Where<User>): Promise<Count>;
    find(filter?: Filter<User>): Promise<User[]>;
    updateAll(user: User, where?: Where<User>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<User>): Promise<User>;
    updateById(id: string, user: User): Promise<void>;
    replaceById(id: string, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
    login(payload: {
        username: string;
        password: string;
    }): Promise<object>;
    logout(payload: {
        userId: string;
    }): Promise<object>;
    upload(payload: {
        fileName: string;
        fileData: string;
        fileType: string;
        fileExtension: string;
    }): Promise<object>;
}
