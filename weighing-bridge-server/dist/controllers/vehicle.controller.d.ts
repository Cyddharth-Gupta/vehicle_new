import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Vehicle } from '../models';
import { VehicleRepository } from '../repositories';
export declare class VehicleController {
    vehicleRepository: VehicleRepository;
    constructor(vehicleRepository: VehicleRepository);
    create(vehicle: Vehicle): Promise<Vehicle>;
    count(where?: Where<Vehicle>): Promise<Count>;
    find(filter?: Filter<Vehicle>): Promise<Vehicle[]>;
    updateAll(vehicle: Vehicle, where?: Where<Vehicle>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Vehicle>): Promise<Vehicle>;
    updateById(id: string, vehicle: Vehicle): Promise<void>;
    replaceById(id: string, vehicle: Vehicle): Promise<void>;
    deleteById(id: string): Promise<void>;
}
