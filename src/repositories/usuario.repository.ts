import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Notificaciones} from '../models';
import {NotificacionesRepository} from './notificaciones.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.idUsuario,
  UsuarioRelations
> {

  public readonly notificaciones: HasManyRepositoryFactory<Notificaciones, typeof Usuario.prototype.idUsuario>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('NotificacionesRepository') protected notificacionesRepositoryGetter: Getter<NotificacionesRepository>,
  ) {
    super(Usuario, dataSource);
    this.notificaciones = this.createHasManyRepositoryFactoryFor('notificaciones', notificacionesRepositoryGetter,);
    this.registerInclusionResolver('notificaciones', this.notificaciones.inclusionResolver);
  }
}
