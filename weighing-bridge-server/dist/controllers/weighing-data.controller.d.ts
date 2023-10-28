import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { WeighingData } from '../models';
import { WeighingDataRepository } from '../repositories';
export declare class WeighingDataController {
    weighingDataRepository: WeighingDataRepository;
    constructor(weighingDataRepository: WeighingDataRepository);
    create(weighingData: WeighingData): Promise<WeighingData>;
    count(where?: Where<WeighingData>): Promise<Count>;
    find(filter?: Filter<WeighingData>): Promise<WeighingData[]>;
    updateAll(weighingData: WeighingData, where?: Where<WeighingData>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<WeighingData>): Promise<WeighingData>;
    updateById(id: string, weighingData: WeighingData): Promise<void>;
    replaceById(id: string, weighingData: WeighingData): Promise<void>;
    deleteById(id: string): Promise<void>;
}
