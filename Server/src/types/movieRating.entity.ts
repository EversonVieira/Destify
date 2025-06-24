import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";

@Entity()
export class MovieRating
{
    @PrimaryGeneratedColumn()
    id?:number

    @ManyToOne(() => Movie, (s) => s.ratings)
    movie?:Movie

    @Column()
    rating?:number

}