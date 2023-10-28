import { WeighingData, Zone } from '../models';
import { WeighingDataRepository } from '../repositories';
export declare class WeighingDataZoneController {
    weighingDataRepository: WeighingDataRepository;
    constructor(weighingDataRepository: WeighingDataRepository);
    getZone(id: typeof WeighingData.prototype.weighingDataId): Promise<Zone>;
}
