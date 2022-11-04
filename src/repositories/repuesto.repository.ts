import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Repuesto, RepuestoRelations} from '../models';

export class RepuestoRepository extends DefaultCrudRepository<
  Repuesto,
  typeof Repuesto.prototype.idRepuesto,
  RepuestoRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Repuesto, dataSource);
  }
}
