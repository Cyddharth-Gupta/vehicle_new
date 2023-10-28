import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Zone } from '../models';
import { ZoneRepository } from '../repositories';
export declare class ZoneController {
    zoneRepository: ZoneRepository;
    constructor(zoneRepository: ZoneRepository);
    create(zone: Zone): Promise<Zone>;
    count(where?: Where<Zone>): Promise<Count>;
    find(filter?: Filter<Zone>): Promise<Zone[]>;
    updateAll(zone: Zone, where?: Where<Zone>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Zone>): Promise<Zone>;
    updateById(id: string, zone: Zone): Promise<void>;
    replaceById(id: string, zone: Zone): Promise<void>;
    deleteById(id: string): Promise<void>;
}
