import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Jefe, JefeRelations, Sede, Notificaciones} from '../models';
import {SedeRepository} from './sede.repository';
import {NotificacionesRepository} from './notificaciones.repository';

export class JefeRepository extends DefaultCrudRepository<
  Jefe,
  typeof Jefe.prototype.idJefe,
  JefeRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Jefe.prototype.idJefe>;

  public readonly notificaciones: HasManyRepositoryFactory<Notificaciones, typeof Jefe.prototype.idJefe>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('NotificacionesRepository') protected notificacionesRepositoryGetter: Getter<NotificacionesRepository>,
  ) {
    super(Jefe, dataSource);
    this.notificaciones = this.createHasManyRepositoryFactoryFor('notificaciones', notificacionesRepositoryGetter,);
    this.registerInclusionResolver('notificaciones', this.notificaciones.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
