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
  Zone,
} from '../models';
import {WeighingDataRepository} from '../repositories';

export class WeighingDataZoneController {
  constructor(
    @repository(WeighingDataRepository)
    public weighingDataRepository: WeighingDataRepository,
  ) { }

  @get('/weighing-data/{id}/zone', {
    responses: {
      '200': {
        description: 'Zone belonging to WeighingData',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Zone),
          },
        },
      },
    },
  })
  async getZone(
    @param.path.string('id') id: typeof WeighingData.prototype.weighingDataId,
  ): Promise<Zone> {
    return this.weighingDataRepository.zone(id);
  }
}
