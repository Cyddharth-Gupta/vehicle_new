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
  Vehicle,
} from '../models';
import {WeighingDataRepository} from '../repositories';

export class WeighingDataVehicleController {
  constructor(
    @repository(WeighingDataRepository)
    public weighingDataRepository: WeighingDataRepository,
  ) { }

  @get('/weighing-data/{id}/vehicle', {
    responses: {
      '200': {
        description: 'Vehicle belonging to WeighingData',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Vehicle),
          },
        },
      },
    },
  })
  async getVehicle(
    @param.path.string('id') id: typeof WeighingData.prototype.weighingDataId,
  ): Promise<Vehicle> {
    return this.weighingDataRepository.vehicle(id);
  }
}
