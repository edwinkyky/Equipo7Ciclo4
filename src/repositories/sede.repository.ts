import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Sede, SedeRelations} from '../models';

export class SedeRepository extends DefaultCrudRepository<
  Sede,
  typeof Sede.prototype.idSede,
  SedeRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Sede, dataSource);
  }
}
