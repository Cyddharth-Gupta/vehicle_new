import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';
import {Vehicle} from './vehicle.model';
import {Zone} from './zone.model';

@model({settings: {strict: false}})
export class WeighingData extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    generated: true,
    id: true,
  })
  weighingDataId?: string;

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
  })
  slipNumber: string;

  @property({
    type: 'number',
    required: true,
  })
  charges: number;

  @property({
    type: 'string',
  })
  supplier?: string;

  @property({
    type: 'string',
    required: true,
    enum: ['T', 'G']
  })
  measureType: string;

  @property({
    type: 'string',
    required: true,
    enum: ['F1', 'F2']
  })
  weightType: string;

  @property({
    type: 'number',
    required: true,
  })
  grossWeight: number;

  @property({
    type: 'number',
    required: true,
  })
  tareWeight: number;

  @property({
    type: 'number',
    required: true,
  })
  netWeight: number;

  @property({
    type: 'string',
    required: true,
    enum: ['LMV', 'HMV']
  })
  vehicleType: string;

  @property({
    type: 'string',
  })
  material?: string;

  @property({
    type: 'string',
    required: false,
  })
  receiptUrl: string;

  @property({
    type: 'string',
    required: false,
  })
  barcodeUrl: string;

  @property({
    type: 'string',
    required: true,
  })
  zoneName: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  city: string;

  @property({
    type: 'string',
    required: true,
  })
  state: string;

  @property({
    type: 'string',
    required: true,
  })
  employeeName: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  @belongsTo(() => User)
  userId: string;

  @belongsTo(() => Vehicle)
  vehicleId: string;

  @belongsTo(() => Zone)
  zoneId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<WeighingData>) {
    super(data);
  }
}

export interface WeighingDataRelations {
  // describe navigational properties here
}

export type WeighingDataWithRelations = WeighingData & WeighingDataRelations;
