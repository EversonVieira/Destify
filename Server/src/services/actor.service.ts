import { Injectable } from '@nestjs/common';
import { MessageType, MyEmptyResponse, MyResponse } from 'src/types/response.entity';
import { DataSource, FindOperator, Repository } from 'typeorm';
import { InsertActor, UpdateActor, ActorSummary} from '@shared/dist/contracts/actor/actor'
import { Actor } from 'src/types/actor.entity';

@Injectable()
export class ActorService {
  private repository: Repository<Actor>

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Actor);
  }

  async insert(model: InsertActor): Promise<MyEmptyResponse> {

    const response = new MyEmptyResponse();
    try {

      if (!model.name) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Actor name is required',
          type: MessageType.validation
        });
      }

      if (response.isInFail) {
        return response;
      }

      const input: Actor = {
        name: model.name,
      }

      await this.repository.insert(input);

    }
    catch (ex) {
      response.messages.push({
        title: 'Persistance Failure',
        text: 'Error while persiting data: insert-Actor',
        type: MessageType.error
      });
    }

    return response;
  }

  async update(model: UpdateActor): Promise<MyEmptyResponse> {

    const response = new MyEmptyResponse();
    let linkedActors: Actor[] = [];

    try {

      if (!model.id) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Actor id is required',
          type: MessageType.validation
        });
      }

      if (!model.name) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Actor name is required',
          type: MessageType.validation
        });
      }


      if (response.isInFail) {
        return response;
      }

      await this.repository.update(model.id!, model);

    }
    catch (ex) {
      response.messages.push({
        title: 'Persistance Failure',
        text: 'Error while persiting data: update-Actor',
        type: MessageType.error
      });
    }

    return response;
  }

  async delete(id: number) {

    const response = new MyEmptyResponse();

    try {

      const result = await this.repository.delete(id);

      if ((result?.affected ?? 0) < 1) {
        response.messages.push({
          title: 'Validation Failure',
          text: `Nothing was removed when trying to remove Actor with id: ${id}`,
          type: MessageType.validation
        });
      }

    }
    catch (ex) {
      response.messages.push({
        title: 'Persistance Failure',
        text: 'Error while persiting data: delete-Actor',
        type: MessageType.error
      });
    }

    return response;
  }


  async fetchAll() {
    const response = new MyResponse<ActorSummary[]>


    try {
      response.data = (await this.repository.find()).map(x => {
        return {
          name: x.name,
        } as ActorSummary
      });
    }
    catch (ex) {
      response.messages.push({
        title: 'Db Failure',
        text: 'Error while fetching data: fetch-all-Actor',
        type: MessageType.error
      });

      console.error(ex);
    }

    return response;
  }

  async fetchByName(name: string) {
    const response = new MyResponse<ActorSummary[]>


    try {
      response.data = (await this.repository
        .createQueryBuilder('Actor')
        .where('Actor.name ILIKE :name', { name: `%${name}%` })
        .getMany())
        .map(x => {
          return {
            name: x.name,
          } as ActorSummary
        });
    }
    catch (ex) {
      response.messages.push({
        title: 'Db Failure',
        text: 'Error while fetching data: fetch-all-Actor',
        type: MessageType.error
      });

      console.error(ex);
    }

    return response;
  }
 
}
