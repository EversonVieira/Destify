import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { ActorService } from 'src/services/actor.service';
import { MyEmptyResponse, MyResponse } from 'src/types/response.entity';
import { InsertActor, UpdateActor, ActorSummary} from '@shared/dist/contracts/actor/actor'
@Controller('Actors')
export class ActorController {
  constructor(private readonly service: ActorService) { }

  @Post()
  async Insert(model: InsertActor): Promise<MyEmptyResponse> {

    return await this.service.insert(model);
  }

  @Put()
  async Update(model: UpdateActor): Promise<MyEmptyResponse> {
    return await this.service.update(model);
  }

  @Delete()
  async delete(id: number): Promise<MyEmptyResponse> {
    return await this.service.delete(id);
  }

  @Get()
  async all(): Promise<MyResponse<ActorSummary[]>> {

    return await this.service.fetchAll();

  }
  @Get()
  async byName(@Query('name') name: string): Promise<MyResponse<ActorSummary[]>> {

    return await this.service.fetchByName(name);

  }
}
