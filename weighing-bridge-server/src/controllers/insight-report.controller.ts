import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InsightReport} from '../models';
import {InsightReportRepository} from '../repositories';

export class InsightReportController {
  constructor(
    @repository(InsightReportRepository)
    public insightReportRepository : InsightReportRepository,
  ) {}

  @post('/insight-reports')
  @response(200, {
    description: 'InsightReport model instance',
    content: {'application/json': {schema: getModelSchemaRef(InsightReport)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InsightReport, {
            title: 'NewInsightReport',
            
          }),
        },
      },
    })
    insightReport: InsightReport,
  ): Promise<InsightReport> {
    return this.insightReportRepository.create(insightReport);
  }

  @get('/insight-reports/count')
  @response(200, {
    description: 'InsightReport model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InsightReport) where?: Where<InsightReport>,
  ): Promise<Count> {
    return this.insightReportRepository.count(where);
  }

  @get('/insight-reports')
  @response(200, {
    description: 'Array of InsightReport model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InsightReport, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InsightReport) filter?: Filter<InsightReport>,
  ): Promise<InsightReport[]> {
    return this.insightReportRepository.find(filter);
  }

  @patch('/insight-reports')
  @response(200, {
    description: 'InsightReport PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InsightReport, {partial: true}),
        },
      },
    })
    insightReport: InsightReport,
    @param.where(InsightReport) where?: Where<InsightReport>,
  ): Promise<Count> {
    return this.insightReportRepository.updateAll(insightReport, where);
  }

  @get('/insight-reports/{id}')
  @response(200, {
    description: 'InsightReport model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InsightReport, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InsightReport, {exclude: 'where'}) filter?: FilterExcludingWhere<InsightReport>
  ): Promise<InsightReport> {
    return this.insightReportRepository.findById(id, filter);
  }

  @patch('/insight-reports/{id}')
  @response(204, {
    description: 'InsightReport PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InsightReport, {partial: true}),
        },
      },
    })
    insightReport: InsightReport,
  ): Promise<void> {
    await this.insightReportRepository.updateById(id, insightReport);
  }

  @put('/insight-reports/{id}')
  @response(204, {
    description: 'InsightReport PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() insightReport: InsightReport,
  ): Promise<void> {
    await this.insightReportRepository.replaceById(id, insightReport);
  }

  @del('/insight-reports/{id}')
  @response(204, {
    description: 'InsightReport DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.insightReportRepository.deleteById(id);
  }
}
