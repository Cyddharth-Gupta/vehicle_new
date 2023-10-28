import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class UserSession extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    generated: true,
    id: true,
  })
  userSessionId?: string;

  @property({
    type: 'string',
    required: true,
  })
  token: string;

  @property({
    type: 'boolean',
    default: false,
  })
  isTokenExpired?: boolean;

  @property({
    type: 'date',
    default: () => new Date(),
  })
  createdAt?: Date;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<UserSession>) {
    super(data);
  }
}

export interface UserSessionRelations {
  // describe navigational properties here
}

export type UserSessionWithRelations = UserSession & UserSessionRelations;
