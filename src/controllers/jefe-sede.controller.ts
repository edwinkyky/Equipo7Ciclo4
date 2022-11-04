import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jefe,
  Sede,
} from '../models';
import {JefeRepository} from '../repositories';

export class JefeSedeController {
  constructor(
    @repository(JefeRepository)
    public jefeRepository: JefeRepository,
  ) { }

  @get('/jefes/{id}/sede', {
    responses: {
      '200': {
        description: 'Sede belonging to Jefe',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sede)},
          },
        },
      },
    },
  })
  async getSede(
    @param.path.string('id') id: typeof Jefe.prototype.idJefe,
  ): Promise<Sede> {
    return this.jefeRepository.sede(id);
  }
}
