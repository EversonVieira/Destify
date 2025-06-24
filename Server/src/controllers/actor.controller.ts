import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { MovieService } from 'src/services/movie.service';
import { MyEmptyResponse, MyResponse } from 'src/types/response.entity';
import { InsertMovie, MovieSummary, UpdateMovie } from '@myorg/shared/dist/contracts/movie'
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
  @Get()
  async byName(@Query('name') name: string): Promise<MyResponse<MovieSummary[]>> {

    return await this.service.fetchByName(name);

  }
}
