import { WeighingData, User } from '../models';
import { WeighingDataRepository } from '../repositories';
export declare class WeighingDataUserController {
    weighingDataRepository: WeighingDataRepository;
    constructor(weighingDataRepository: WeighingDataRepository);
    getUser(id: typeof WeighingData.prototype.weighingDataId): Promise<User>;
}
