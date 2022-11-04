import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Notificaciones extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  idPropietario: string;

  @property({
    type: 'string',
    required: true,
  })
  mensaje: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idNotificaciones: string;

  @property({
    type: 'string',
  })
  propietarioId?: string;

  @property({
    type: 'string',
  })
  mecanicoId?: string;

  @property({
    type: 'string',
  })
  jefeId?: string;

  @property({
    type: 'string',
  })
  usuarioId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Notificaciones>) {
    super(data);
  }
}

export interface NotificacionesRelations {
  // describe navigational properties here
}

export type NotificacionesWithRelations = Notificaciones & NotificacionesRelations;
