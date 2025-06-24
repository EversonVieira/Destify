import { Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { MovieService } from 'src/services/movie.service';
import { MyEmptyResponse, MyResponse } from 'src/types/response.entity';
import { InsertMovie, UpdateMovie, MovieSummary} from '@myorg/shared/dist/contracts/movie/movie'
@Controller('movies')
export class MovieController {
  constructor(private readonly service: MovieService) { }

  @Post()
  async Insert(model: InsertMovie): Promise<MyEmptyResponse> {

    return await this.service.insert(model);
  }

  @Put()
  async Update(model: UpdateMovie): Promise<MyEmptyResponse> {
    return await this.service.update(model);
  }

  @Delete()
  async delete(id: number): Promise<MyEmptyResponse> {
    return await this.service.delete(id);
  }

  @Get()
  async all(): Promise<MyResponse<MovieSummary[]>> {

    return await this.service.fetchAll();

  }
  @Get("byName/:name")
  async byName(@Param('name') name: string): Promise<MyResponse<MovieSummary[]>> {

    return await this.service.fetchByName(name);

  }
}
