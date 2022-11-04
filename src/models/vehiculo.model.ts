import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Propietario} from './propietario.model';
import {Sede} from './sede.model';
import {Mecanico} from './mecanico.model';
import {Revision} from './revision.model';
import {Repuesto} from './repuesto.model';

@model({settings: {strict: false}})
export class Vehiculo extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idVehiculo?: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo: string;

  @property({
    type: 'number',
    required: true,
  })
  capacidad: number;

  @property({
    type: 'string',
    required: true,
  })
  cilindraje: string;

  @property({
    type: 'string',
    required: true,
  })
  paisOrigen: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  modelo: number;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @belongsTo(() => Propietario)
  propietarioId: string;

  @belongsTo(() => Sede)
  sedeId: string;

  @belongsTo(() => Mecanico)
  mecanicoId: string;

  @hasMany(() => Revision)
  revisions: Revision[];

  @hasMany(() => Repuesto)
  repuestos: Repuesto[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
