import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Vehiculo, VehiculoRelations, Propietario, Sede, Mecanico, Revision, Repuesto} from '../models';
import {PropietarioRepository} from './propietario.repository';
import {SedeRepository} from './sede.repository';
import {MecanicoRepository} from './mecanico.repository';
import {RevisionRepository} from './revision.repository';
import {RepuestoRepository} from './repuesto.repository';

export class VehiculoRepository extends DefaultCrudRepository<
  Vehiculo,
  typeof Vehiculo.prototype.idVehiculo,
  VehiculoRelations
> {

  public readonly propietario: BelongsToAccessor<Propietario, typeof Vehiculo.prototype.idVehiculo>;

  public readonly sede: BelongsToAccessor<Sede, typeof Vehiculo.prototype.idVehiculo>;

  public readonly mecanico: BelongsToAccessor<Mecanico, typeof Vehiculo.prototype.idVehiculo>;

  public readonly revisions: HasManyRepositoryFactory<Revision, typeof Vehiculo.prototype.idVehiculo>;

  public readonly repuestos: HasManyRepositoryFactory<Repuesto, typeof Vehiculo.prototype.idVehiculo>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PropietarioRepository') protected propietarioRepositoryGetter: Getter<PropietarioRepository>, @repository.getter('SedeRepository') protected sedeRepositoryGetter: Getter<SedeRepository>, @repository.getter('MecanicoRepository') protected mecanicoRepositoryGetter: Getter<MecanicoRepository>, @repository.getter('RevisionRepository') protected revisionRepositoryGetter: Getter<RevisionRepository>, @repository.getter('RepuestoRepository') protected repuestoRepositoryGetter: Getter<RepuestoRepository>,
  ) {
    super(Vehiculo, dataSource);
    this.repuestos = this.createHasManyRepositoryFactoryFor('repuestos', repuestoRepositoryGetter,);
    this.registerInclusionResolver('repuestos', this.repuestos.inclusionResolver);
    this.revisions = this.createHasManyRepositoryFactoryFor('revisions', revisionRepositoryGetter,);
    this.registerInclusionResolver('revisions', this.revisions.inclusionResolver);
    this.mecanico = this.createBelongsToAccessorFor('mecanico', mecanicoRepositoryGetter,);
    this.registerInclusionResolver('mecanico', this.mecanico.inclusionResolver);
    this.sede = this.createBelongsToAccessorFor('sede', sedeRepositoryGetter,);
    this.registerInclusionResolver('sede', this.sede.inclusionResolver);
    this.propietario = this.createBelongsToAccessorFor('propietario', propietarioRepositoryGetter,);
    this.registerInclusionResolver('propietario', this.propietario.inclusionResolver);
  }
}
