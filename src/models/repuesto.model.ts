import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Repuesto extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  idRevision: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  marcaRepuesto: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  idRepuesto: string;

  @property({
    type: 'string',
  })
  codigoBarras?: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Repuesto>) {
    super(data);
  }
}

export interface RepuestoRelations {
  // describe navigational properties here
}

export type RepuestoWithRelations = Repuesto & RepuestoRelations;
