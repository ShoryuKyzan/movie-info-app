export interface OMDbResult {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    /** comma separated list of actors */
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    /** URL */
    Poster: string;
    Ratings: {
        Source: string;
        Value: string;
    }[];
    Metascore: string;
    /** decimal number as a string */
    imdbRating: string;
    /** localized number */
    imdbVotes: string;
    imdbID: string;
    /**
     * "movie", "series", "episode"
     */
    Type: string;
    totalSeasons: string;
    /** "True?" */
    Response: string;
}