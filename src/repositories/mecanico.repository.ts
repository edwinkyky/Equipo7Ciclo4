import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Mecanico, MecanicoRelations, Sede, Notificaciones} from '../models';
import {SedeRepository} from './sede.repository';
import {NotificacionesRepository} from './notificaciones.repository';

export class MecanicoRepository extends DefaultCrudRepository<
  Mecanico,
  typeof Mecanico.prototype.idMecanico,
  MecanicoRelations
> {

  public readonly sede: BelongsToAccessor<Sede, typeof Mecanico.prototype.idMecanico>;

  public readonly notificaciones: HasManyRepositoryFactory<Notificaciones, typeof Mecanico.prototype.idMecanico>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('NotificacionesRepository') protected notificacionesRepositoryGetter: Getter<NotificacionesRepository>,
  ) {
    super(Mecanico, dataSource);
    this.notificaciones = this.createHasManyRepositoryFactoryFor('notificaciones', notificacionesRepositoryGetter,);
    this.registerInclusionResolver('notificaciones', this.notificaciones.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
  }
}
