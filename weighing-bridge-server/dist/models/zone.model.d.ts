import { Entity } from '@loopback/repository';
export declare class Zone extends Entity {
    zoneId?: string;
    name: string;
    address: string;
    city: string;
    state: string;
    status?: string;
    cctvIPAddress: string;
    rfidPort: string;
    weighingPort: string;
    baudRate: number;
    dataBits: number;
    parity: string;
    stopBits?: number;
    flowControl: boolean;
    createdAt?: Date;
    userId: string;
    [prop: string]: any;
    constructor(data?: Partial<Zone>);
}
export interface ZoneRelations {
}
export type ZoneWithRelations = Zone & ZoneRelations;
