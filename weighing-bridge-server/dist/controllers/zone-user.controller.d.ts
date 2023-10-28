import { Zone, User } from '../models';
import { ZoneRepository } from '../repositories';
export declare class ZoneUserController {
    zoneRepository: ZoneRepository;
    constructor(zoneRepository: ZoneRepository);
    getUser(id: typeof Zone.prototype.zoneId): Promise<User>;
}
