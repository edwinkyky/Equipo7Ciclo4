import {Entity, model, property} from '@loopback/repository';

@model()
export class Revision extends Entity {
  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'date',
    required: true,
  })
  hora: string;

  @property({
    type: 'string',
    required: true,
  })
  idSede: string;

  @property({
    type: 'string',
    required: true,
  })
  idVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  idMecanico: string;

  @property({
    type: 'string',
    required: true,
  })
  idRepuesto: string;

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'string',
  })
  idVehiculos?: string;

  @property({
    type: 'string',
  })
  vehiculoId?: string;

  constructor(data?: Partial<Revision>) {
    super(data);
  }
}

export interface RevisionRelations {
  // describe navigational properties here
}

export type RevisionWithRelations = Revision & RevisionRelations;
