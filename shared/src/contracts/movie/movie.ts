export class InsertMovie{
    name?:string
    description?:string
    actorIds?:number[]
}

export class UpdateMovie extends InsertMovie{
    id?:number
}

export class MovieSummary{
    name?:string
    description?:string
    actors?:string
    rating?:string
}
