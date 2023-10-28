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
import {UserSession} from '../models';
import {UserSessionRepository} from '../repositories';

export class UserSessionController {
  constructor(
    @repository(UserSessionRepository)
    public userSessionRepository : UserSessionRepository,
  ) {}

  @post('/user-sessions')
  @response(200, {
    description: 'UserSession model instance',
    content: {'application/json': {schema: getModelSchemaRef(UserSession)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSession, {
            title: 'NewUserSession',
            
          }),
        },
      },
    })
    userSession: UserSession,
  ): Promise<UserSession> {
    return this.userSessionRepository.create(userSession);
  }

  @get('/user-sessions/count')
  @response(200, {
    description: 'UserSession model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(UserSession) where?: Where<UserSession>,
  ): Promise<Count> {
    return this.userSessionRepository.count(where);
  }

  @get('/user-sessions')
  @response(200, {
    description: 'Array of UserSession model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(UserSession, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(UserSession) filter?: Filter<UserSession>,
  ): Promise<UserSession[]> {
    return this.userSessionRepository.find(filter);
  }

  @patch('/user-sessions')
  @response(200, {
    description: 'UserSession PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSession, {partial: true}),
        },
      },
    })
    userSession: UserSession,
    @param.where(UserSession) where?: Where<UserSession>,
  ): Promise<Count> {
    return this.userSessionRepository.updateAll(userSession, where);
  }

  @get('/user-sessions/{id}')
  @response(200, {
    description: 'UserSession model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(UserSession, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(UserSession, {exclude: 'where'}) filter?: FilterExcludingWhere<UserSession>
  ): Promise<UserSession> {
    return this.userSessionRepository.findById(id, filter);
  }

  @patch('/user-sessions/{id}')
  @response(204, {
    description: 'UserSession PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserSession, {partial: true}),
        },
      },
    })
    userSession: UserSession,
  ): Promise<void> {
    await this.userSessionRepository.updateById(id, userSession);
  }

  @put('/user-sessions/{id}')
  @response(204, {
    description: 'UserSession PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userSession: UserSession,
  ): Promise<void> {
    await this.userSessionRepository.replaceById(id, userSession);
  }

  @del('/user-sessions/{id}')
  @response(204, {
    description: 'UserSession DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userSessionRepository.deleteById(id);
  }
}
