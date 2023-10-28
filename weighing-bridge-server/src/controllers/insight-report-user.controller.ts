import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InsightReport,
  User,
} from '../models';
import {InsightReportRepository} from '../repositories';

export class InsightReportUserController {
  constructor(
    @repository(InsightReportRepository)
    public insightReportRepository: InsightReportRepository,
  ) { }

  @get('/insight-reports/{id}/user', {
    responses: {
      '200': {
        description: 'User belonging to InsightReport',
        content: {
          'application/json': {
            schema: getModelSchemaRef(User),
          },
        },
      },
    },
  })
  async getUser(
    @param.path.string('id') id: typeof InsightReport.prototype.insightReportId,
  ): Promise<User> {
    return this.insightReportRepository.user(id);
  }
}
