import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Notificaciones} from './notificaciones.model';

@model({settings: {strict: false}})
export class Propietario extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idPropietario?: string;


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
    required: true,
  })
  fechaNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasenia: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoUsuario: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @belongsTo(() => Sede)
  sedeId: string;

  @hasMany(() => Notificaciones)
  notificaciones: Notificaciones[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Propietario>) {
    super(data);
  }
}

export interface PropietarioRelations {
  // describe navigational properties here
}

export type PropietarioWithRelations = Propietario & PropietarioRelations;
