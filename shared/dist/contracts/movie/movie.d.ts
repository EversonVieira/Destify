export declare class InsertMovie {
    name?: string;
    description?: string;
    actorIds?: number[];
}
export declare class UpdateMovie extends InsertMovie {
    id?: number;
}
export declare class MovieSummary {
    name?: string;
    description?: string;
    actors?: string;
    rating?: string;
}
