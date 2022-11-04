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
  Mecanico,
  Notificaciones,
} from '../models';
import {MecanicoRepository} from '../repositories';

export class MecanicoNotificacionesController {
  constructor(
    @repository(MecanicoRepository) protected mecanicoRepository: MecanicoRepository,
  ) { }

  @get('/mecanicos/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Array of Mecanico has many Notificaciones',
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
    return this.mecanicoRepository.notificaciones(id).find(filter);
  }

  @post('/mecanicos/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Mecanico model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Mecanico.prototype.idMecanico,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {
            title: 'NewNotificacionesInMecanico',
            exclude: ['idNotificacion'],
            optional: ['mecanicoId']
          }),
        },
      },
    }) notificaciones: Omit<Notificaciones, 'idNotificacion'>,
  ): Promise<Notificaciones> {
    return this.mecanicoRepository.notificaciones(id).create(notificaciones);
  }

  @patch('/mecanicos/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Mecanico.Notificaciones PATCH success count',
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
    return this.mecanicoRepository.notificaciones(id).patch(notificaciones, where);
  }

  @del('/mecanicos/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Mecanico.Notificaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificaciones)) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.mecanicoRepository.notificaciones(id).delete(where);
  }
}
