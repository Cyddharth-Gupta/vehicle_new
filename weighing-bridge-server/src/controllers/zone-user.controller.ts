import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Zone,
  User,
} from '../models';
import {ZoneRepository} from '../repositories';

export class ZoneUserController {
  constructor(
    @repository(ZoneRepository)
    public zoneRepository: ZoneRepository,
  ) { }

  @get('/zones/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to Zone',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof Zone.prototype.zoneId,
  ): Promise<User> {
    return this.zoneRepository.user(id);
  }
}
