import { Count, Filter, Where } from '@loopback/repository';
import { User, Zone } from '../models';
import { UserRepository } from '../repositories';
export declare class UserZoneController {
    protected userRepository: UserRepository;
    constructor(userRepository: UserRepository);
    get(id: string, filter?: Filter<Zone>): Promise<Zone>;
    create(id: typeof User.prototype.userId, zone: Omit<Zone, 'zoneId'>): Promise<Zone>;
    patch(id: string, zone: Partial<Zone>, where?: Where<Zone>): Promise<Count>;
    delete(id: string, where?: Where<Zone>): Promise<Count>;
}
