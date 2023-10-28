import {Entity, model, property, belongsTo} from '@loopback/repository';
import {User} from './user.model';

@model({settings: {strict: false}})
export class InsightReport extends Entity {
  @property({
    type: 'string',
    mongodb: {dataType: 'ObjectID'},
    generated: true,
    id: true,
  })
  insightReportId?: string;

  @property({
    type: 'string',
    required: true,
  })
  reportName: string;

  @property({
    type: 'date',
  })
  reportFrom?: string;

  @property({
    type: 'date'
  })
  reportTill?: string;

  @property({
    type: 'string',
  })
  vehicleType?: string;

  @property({
    type: 'string',
  })
  reportUrl?: string;

  @property({
    type: 'string',
    required: false,
    enum: ['unprocessed', 'processed', 'failed']
  })
  status: string;

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

  constructor(data?: Partial<InsightReport>) {
    super(data);
  }
}

export interface InsightReportRelations {
  // describe navigational properties here
}

export type InsightReportWithRelations = InsightReport & InsightReportRelations;
