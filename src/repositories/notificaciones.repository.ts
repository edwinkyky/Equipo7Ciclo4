import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Notificaciones, NotificacionesRelations} from '../models';

export class NotificacionesRepository extends DefaultCrudRepository<
  Notificaciones,
  typeof Notificaciones.prototype.idNotificacion,
  NotificacionesRelations
> {
  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource,
  ) {
    super(Notificaciones, dataSource);
  }
}
