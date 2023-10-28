import { Entity } from '@loopback/repository';
export declare class WeighingData extends Entity {
    weighingDataId?: string;
    rfidNumber?: string;
    vehicleNumber: string;
    slipNumber: string;
    charges: number;
    supplier?: string;
    measureType: string;
    weightType: string;
    grossWeight: number;
    tareWeight: number;
    netWeight: number;
    vehicleType: string;
    material?: string;
    receiptUrl: string;
    barcodeUrl: string;
    zoneName: string;
    address: string;
    city: string;
    state: string;
    employeeName: string;
    createdAt?: Date;
    userId: string;
    vehicleId: string;
    zoneId: string;
    [prop: string]: any;
    constructor(data?: Partial<WeighingData>);
}
export interface WeighingDataRelations {
}
export type WeighingDataWithRelations = WeighingData & WeighingDataRelations;
