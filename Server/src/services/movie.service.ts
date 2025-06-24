import { Injectable } from '@nestjs/common';
import { Movie } from 'src/types/movie.entity';
import { MessageType, MyEmptyResponse, MyResponse } from 'src/types/response.entity';
import { Actor } from 'src/types/actor.entity';
import { InsertMovie, MovieSummary, UpdateMovie } from '@myorg/shared/dist/contracts/movie'
import { firstOrDefault } from '@myorg/shared/dist/utils/first-or-default'
import { MovieRating } from 'src/types/movieRating.entity';
import { DataSource, FindOperator, Repository } from 'typeorm';
@Injectable()
export class MovieService {
  private repository: Repository<Movie>
  private actorRepository: Repository<Actor>

  constructor(private dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Movie);
    this.actorRepository = this.dataSource.getRepository(Actor);
  }

  async insert(model: InsertMovie): Promise<MyEmptyResponse> {

    const response = new MyEmptyResponse();
    let linkedActors: Actor[] = [];
    try {

      if (!model.name) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Movie name is required',
          type: MessageType.validation
        });
      }

      if (!model.description) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Movie description is required',
          type: MessageType.validation
        });
      }

      if (!firstOrDefault(model.actorIds)) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'At least one actor is required',
          type: MessageType.validation
        });
      }

      if (firstOrDefault(model.actorIds)) {
        const actors = await this.actorRepository.find();
        model.actorIds?.forEach(id => {
          const actor = actors.find(x => x.id == id);
          if (actor) {
            linkedActors.push(actor);
          }

        });
      }


      if (response.isInFail) {
        return response;
      }

      const input: Movie = {
        name: model.name,
        description: model.description,
        actors: linkedActors,

      }

      await this.repository.insert(input);

    }
    catch (ex) {
      response.messages.push({
        title: 'Persistance Failure',
        text: 'Error while persiting data: insert-movie',
        type: MessageType.error
      });
    }

    return response;
  }

  async update(model: UpdateMovie): Promise<MyEmptyResponse> {

    const response = new MyEmptyResponse();
    let linkedActors: Actor[] = [];

    try {

      if (!model.id) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Movie id is required',
          type: MessageType.validation
        });
      }

      if (!model.name) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Movie name is required',
          type: MessageType.validation
        });
      }

      if (!model.description) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'Movie description is required',
          type: MessageType.validation
        });
      }

      if (!firstOrDefault(model.actorIds)) {
        response.messages.push({
          title: 'Validation Failure',
          text: 'At least one actor is required',
          type: MessageType.validation
        });
      }

      if (firstOrDefault(model.actorIds)) {
        const actors = await this.actorRepository.find();
        model.actorIds?.forEach(id => {
          const actor = actors.find(x => x.id == id);
          if (actor) {
            linkedActors.push(actor);
          }

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
        text: 'Error while persiting data: update-movie',
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
          text: `Nothing was removed when trying to remove movie with id: ${id}`,
          type: MessageType.validation
        });
      }

    }
    catch (ex) {
      response.messages.push({
        title: 'Persistance Failure',
        text: 'Error while persiting data: delete-movie',
        type: MessageType.error
      });
    }

    return response;
  }


  async fetchAll() {
    const response = new MyResponse<MovieSummary[]>


    try {
      response.data = (await this.repository.find()).map(x => {
        return {
          name: x.name,
          description: x.description,
          actors: x.actors?.map(x => x.name).join(', '),
          rating: this.calculateRating(x.ratings)
        } as MovieSummary
      });
    }
    catch (ex) {
      response.messages.push({
        title: 'Db Failure',
        text: 'Error while fetching data: fetch-all-movie',
        type: MessageType.error
      });

      console.error(ex);
    }

    return response;
  }

  async fetchByName(name: string) {
    const response = new MyResponse<MovieSummary[]>


    try {
      response.data = (await this.repository
        .createQueryBuilder('movie')
        .where('movie.name ILIKE :name', { name: `%${name}%` })
        .getMany())
        .map(x => {
          return {
            name: x.name,
            description: x.description,
            actors: x.actors?.map(x => x.name).join(', '),
            rating: this.calculateRating(x.ratings)
          } as MovieSummary
        });
    }
    catch (ex) {
      response.messages.push({
        title: 'Db Failure',
        text: 'Error while fetching data: fetch-all-movie',
        type: MessageType.error
      });

      console.error(ex);
    }

    return response;
  }
  private calculateRating(ratings?: MovieRating[]) {
    if (!ratings) return 0;

    let avgValue = 0;

    ratings.forEach(r => {
      avgValue += r.rating ?? 0;
    })

    avgValue = avgValue / ratings.length;
  }
}
