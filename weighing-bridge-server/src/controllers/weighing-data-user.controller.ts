import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  WeighingData,
  User,
} from '../models';
import {WeighingDataRepository} from '../repositories';

export class WeighingDataUserController {
  constructor(
    @repository(WeighingDataRepository)
    public weighingDataRepository: WeighingDataRepository,
  ) { }

  @get('/weighing-data/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to WeighingData',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof WeighingData.prototype.weighingDataId,
  ): Promise<User> {
    return this.weighingDataRepository.user(id);
  }
}
