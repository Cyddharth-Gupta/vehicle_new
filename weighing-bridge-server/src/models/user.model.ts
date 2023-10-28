import {Entity, model, property, hasOne} from '@loopback/repository';
import {Zone} from './zone.model';

@model({settings: {strict: false, hiddenProperties: ['password']}})
export class User extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    generated: true,
    id: true,
  })
  userId?: string;

  @property({
    type: 'string',
    required: true,
  })
  employeeId: string;

  @property({
    type: 'string',
    required: true,
  })
  fullName: string;

  @property({
    type: 'date',
  })
  joiningDate?: string;

  @property({
    type: 'date',
  })
  dateOfBirth?: string;

  @property({
    type: 'string',
    required: true,
    enum: ['employee', 'admin']
  })
  userType: string;

  @property({
    type: 'string',
    required: false,
    enum: ['active', 'inactive'],
    default: 'active'
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  username: string;

  @property({
    type: 'string',
    required: true,
  })
  password: string;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  @hasOne(() => Zone)
  zone: Zone;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<User>) {
    super(data);
  }
}

export interface UserRelations {
  // describe navigational properties here
}

export type UserWithRelations = User & UserRelations;
