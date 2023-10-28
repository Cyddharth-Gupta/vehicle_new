import { WeighingData, Vehicle } from '../models';
import { WeighingDataRepository } from '../repositories';
export declare class WeighingDataVehicleController {
    weighingDataRepository: WeighingDataRepository;
    constructor(weighingDataRepository: WeighingDataRepository);
    getVehicle(id: typeof WeighingData.prototype.weighingDataId): Promise<Vehicle>;
}
