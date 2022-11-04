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
  Jefe,
  Notificaciones,
} from '../models';
import {JefeRepository} from '../repositories';

export class JefeNotificacionesController {
  constructor(
    @repository(JefeRepository) protected jefeRepository: JefeRepository,
  ) { }

  @get('/jefes/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Array of Jefe has many Notificaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Notificaciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Notificaciones>,
  ): Promise<Notificaciones[]> {
    return this.jefeRepository.notificaciones(id).find(filter);
  }

  @post('/jefes/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Jefe model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Jefe.prototype.idJefe,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {
            title: 'NewNotificacionesInJefe',
            exclude: ['idNotificacion'],
            optional: ['jefeId']
          }),
        },
      },
    }) notificaciones: Omit<Notificaciones, 'idNotificacion'>,
  ): Promise<Notificaciones> {
    return this.jefeRepository.notificaciones(id).create(notificaciones);
  }

  @patch('/jefes/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Jefe.Notificaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {partial: true}),
        },
      },
    })
    notificaciones: Partial<Notificaciones>,
    @param.query.object('where', getWhereSchemaFor(Notificaciones)) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.jefeRepository.notificaciones(id).patch(notificaciones, where);
  }

  @del('/jefes/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Jefe.Notificaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificaciones)) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.jefeRepository.notificaciones(id).delete(where);
  }
}
