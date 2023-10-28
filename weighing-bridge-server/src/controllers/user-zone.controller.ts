import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  User,
  Zone,
} from '../models';
import {UserRepository} from '../repositories';

export class UserZoneController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/zone', {
    responses: {
      '200': {
        description: 'User has one Zone',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Zone),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Zone>,
  ): Promise<Zone> {
    return this.userRepository.zone(id).get(filter);
  }

  @post('/users/{id}/zone', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Zone)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.userId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zone, {
            title: 'NewZoneInUser',
            exclude: ['zoneId'],
            optional: ['userId']
          }),
        },
      },
    }) zone: Omit<Zone, 'zoneId'>,
  ): Promise<Zone> {
    return this.userRepository.zone(id).create(zone);
  }

  @patch('/users/{id}/zone', {
    responses: {
      '200': {
        description: 'User.Zone PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Zone, {partial: true}),
        },
      },
    })
    zone: Partial<Zone>,
    @param.query.object('where', getWhereSchemaFor(Zone)) where?: Where<Zone>,
  ): Promise<Count> {
    return this.userRepository.zone(id).patch(zone, where);
  }

  @del('/users/{id}/zone', {
    responses: {
      '200': {
        description: 'User.Zone DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Zone)) where?: Where<Zone>,
  ): Promise<Count> {
    return this.userRepository.zone(id).delete(where);
  }
}
