import { Actor } from "src/types/actor.entity";
import { Movie } from "src/types/movie.entity";
import { MovieRating } from "src/types/movieRating.entity";
import { DataSource } from "typeorm";

export async function importData(ds: DataSource) {



    if (!ds.isInitialized){
        await ds.initialize();
    } 
    try {

        
        const movieRatingRepository = ds.getRepository(MovieRating);
        const movieRepository = ds.getRepository(Movie);
        const actorRepository = ds.getRepository(Actor);

        await movieRatingRepository.deleteAll();
        await movieRepository.deleteAll();
        await actorRepository.deleteAll();


        const actorList: Actor[] = [];
        const movies: Movie[] = [];
        for (let i = 0; i < 10; i++) {
            const actor: Actor = {
                name: `actor_${i}`
            }

            const result = await actorRepository.create(actor);
            await actorRepository.save(result);
            actorList.push(result);


        }


        for (let i = 0; i < 10; i++) {

            const movie: Movie = {
                name: `test_${i}`,
                description: `test description for movie with index: ${i}`,
                actors: actorList
            };


            const result = await movieRepository.create(movie);
            await movieRepository.save(result);
            movies.push(result);


        }


        for (let i = 0; i < 10; i++) {


            const randomIndex = Math.random() * 10;
            const rating: MovieRating = {
                movie: movies[i],
                rating: Math.round(randomIndex * 100)
            };

            const result = await movieRatingRepository.create(rating);
            await movieRatingRepository.save(result);
            movies.push(result);


        }

        
    }
    catch(ex){
        console.error(ex);
    }


}