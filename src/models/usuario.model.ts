import {belongsTo, Entity, model, property, hasMany} from '@loopback/repository';
import {Sede} from './sede.model';
import {Notificaciones} from './notificaciones.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  idUsuario: string;

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
    type: 'date',
  })
  fechaNacimiento?: string;

  @property({
    type: 'string',
    required: true,
  })
  identificacion: string;

  @property({
    type: 'string',
  })
  rol: string;

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

  @belongsTo(() => Sede)
  sedeId: string;

  @hasMany(() => Notificaciones)
  notificaciones: Notificaciones[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
