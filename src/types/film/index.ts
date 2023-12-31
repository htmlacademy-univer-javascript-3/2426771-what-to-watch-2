export type FilmCard = {
    id: string;
    name: string;
    previewImage: string;
    previewVideoLink: string;
    genre: string;
}

export type Film = {
    id: string;
    name: string;
    posterImage: string;
    backgroundImage: string;
    backgroundColor: string;
    videoLink: string;
    description: string;
    rating: number;
    scoresCount: number;
    director: string;
    starring: string[];
    runTime: number;
    genre: string;
    released: number;
    isFavorite: boolean;
}

export type Comment = {
    id: string;
    date: string;
    user: string;
    comment: string;
    rating: number;
}
