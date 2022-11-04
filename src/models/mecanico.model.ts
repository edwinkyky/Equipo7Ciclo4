import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Notificaciones} from './notificaciones.model';

@model({settings: {strict: false}})
export class Mecanico extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idMecanico?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoUsuario: string;

  @belongsTo(() => Sede)
  sedeId: string;

  @hasMany(() => Notificaciones)
  notificaciones: Notificaciones[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Mecanico>) {
    super(data);
  }
}

export interface MecanicoRelations {
  // describe navigational properties here
}

export type MecanicoWithRelations = Mecanico & MecanicoRelations;
