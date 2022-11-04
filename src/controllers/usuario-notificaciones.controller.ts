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
  Usuario,
  Notificaciones,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioNotificacionesController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Notificaciones',
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
    return this.usuarioRepository.notificaciones(id).find(filter);
  }

  @post('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Notificaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.idUsuario,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Notificaciones, {
            title: 'NewNotificacionesInUsuario',
            exclude: ['idNotificacion'],
            optional: ['usuarioId']
          }),
        },
      },
    }) notificaciones: Omit<Notificaciones, 'idNotificacion'>,
  ): Promise<Notificaciones> {
    return this.usuarioRepository.notificaciones(id).create(notificaciones);
  }

  @patch('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Usuario.Notificaciones PATCH success count',
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
    return this.usuarioRepository.notificaciones(id).patch(notificaciones, where);
  }

  @del('/usuarios/{id}/notificaciones', {
    responses: {
      '200': {
        description: 'Usuario.Notificaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Notificaciones)) where?: Where<Notificaciones>,
  ): Promise<Count> {
    return this.usuarioRepository.notificaciones(id).delete(where);
  }
}
