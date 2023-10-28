import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model({settings: {strict: false}})
export class Zone extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    generated: true,
    id: true,
  })
  zoneId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

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
    default: 'active',
    enum: ['active', 'inactive'],
  })
  status?: string;

  @property({
    type: 'string',
    required: true,
  })
  cctvIPAddress: string;

  @property({
    type: 'string',
    required: true,
  })
  rfidPort: string;

  @property({
    type: 'string',
    required: true,
  })
  weighingPort: string;

  @property({
    type: 'number',
    required: true,
  })
  baudRate: number;

  @property({
    type: 'number',
    required: true,
  })
  dataBits: number;

  @property({
    type: 'string',
    required: true,
  })
  parity: string;

  @property({
    type: 'number',
    required: true,
  })
  stopBits?: number;

  @property({
    type: 'boolean',
    required: true,
  })
  flowControl: boolean;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  @belongsTo(() => User)
  userId: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Zone>) {
    super(data);
  }
}

export interface ZoneRelations {
  // describe navigational properties here
}

export type ZoneWithRelations = Zone & ZoneRelations;
