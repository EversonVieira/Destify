import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Movie } from "./movie.entity";

@Entity()
export class Actor{

    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    name?:string

    @ManyToMany((type) => Movie, s => s.actors)
    movies?:Movie[]
}