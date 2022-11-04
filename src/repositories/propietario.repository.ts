import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Propietario, PropietarioRelations, Sede, Notificaciones} from '../models';
import {SedeRepository} from './sede.repository';
import {NotificacionesRepository} from './notificaciones.repository';

export class PropietarioRepository extends DefaultCrudRepository<
  Propietario,
  typeof Propietario.prototype.idPropietario,
  PropietarioRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Propietario.prototype.idPropietario>;

  public readonly notificaciones: HasManyRepositoryFactory<Notificaciones, typeof Propietario.prototype.idPropietario>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('NotificacionesRepository') protected notificacionesRepositoryGetter: Getter<NotificacionesRepository>,
  ) {
    super(Propietario, dataSource);
    this.notificaciones = this.createHasManyRepositoryFactoryFor('notificaciones', notificacionesRepositoryGetter,);
    this.registerInclusionResolver('notificaciones', this.notificaciones.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
