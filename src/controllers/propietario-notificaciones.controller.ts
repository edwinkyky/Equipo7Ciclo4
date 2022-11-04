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
  Propietario,
  Notificaciones,
} from '../models';
import {PropietarioRepository} from '../repositories';

export class PropietarioNotificacionesController {
  constructor(
    @repository(PropietarioRepository) protected propietarioRepository: PropietarioRepository,
  ) { }

  @get('/propietarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Array of Propietario has many Notificaciones',
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
    return this.propietarioRepository.notificaciones(id).find(filter);
  }

  @post('/propietarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Propietario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Propietario.prototype.idPropietario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {
            title: 'NewNotificacionesInPropietario',
            exclude: ['idNotificacion'],
            optional: ['propietarioId']
          }),
        },
      },
    }) notificaciones: Omit<Notificaciones, 'idNotificacion'>,
  ): Promise<Notificaciones> {
    return this.propietarioRepository.notificaciones(id).create(notificaciones);
  }

  @patch('/propietarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Propietario.Notificaciones PATCH success count',
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
    return this.propietarioRepository.notificaciones(id).patch(notificaciones, where);
  }

  @del('/propietarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Propietario.Notificaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificaciones)) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.propietarioRepository.notificaciones(id).delete(where);
  }
}
