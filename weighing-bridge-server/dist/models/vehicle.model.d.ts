import { Entity } from '@loopback/repository';
export declare class Vehicle extends Entity {
    vehicleId?: string;
    rfidNumber?: string;
    vehicleNumber: string;
    vehicleType: string;
    tareWeight: number;
    createdAt?: Date;
    [prop: string]: any;
    constructor(data?: Partial<Vehicle>);
}
export interface VehicleRelations {
}
export type VehicleWithRelations = Vehicle & VehicleRelations;
