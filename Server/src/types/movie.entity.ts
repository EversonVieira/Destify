import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MovieRating } from "./movieRating.entity";
import { Actor } from "./actor.entity";

@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id?:number

    @Column()
    name?:string

    @Column()
    description?:string

    @OneToMany((type => MovieRating), (s) => s.movie )
    ratings?: MovieRating[]

    @ManyToMany((type => Actor))
    @JoinTable()
    actors?:Actor[]
}