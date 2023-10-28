import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Vehicle extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    generated: true,
    id: true,
  })
  vehicleId?: string;

  @property({
    type: 'string',
  })
  rfidNumber?: string;

  @property({
    type: 'string',
    required: true,
  })
  vehicleNumber: string;

  @property({
    type: 'string',
    required: true,
    enum:['LMV', 'HMV']
  })
  vehicleType: string;

  @property({
    type: 'number',
    required: true,
  })
  tareWeight: number;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehicle>) {
    super(data);
  }
}

export interface VehicleRelations {
  // describe navigational properties here
}

export type VehicleWithRelations = Vehicle & VehicleRelations;
