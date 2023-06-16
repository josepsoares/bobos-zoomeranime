export interface ICharacter {
  role: string;
  voiceActors: {
    siteUrl: string
    name: {
      full: string;
      native: string;
    };
    image: {
      large: string;
    };
  }[];
  node: {
    gender: string;
    favourites: number;
    description: string;
    image: {
      large: string;
    };
    name: {
      native: string;
      full: string;
      first: string | null;
      last: string | null;
    };
  };
}

export interface IReview {
  node: {
    summary: string;
    rating: number;
    ratingAmount: number;
    score: number;
    siteUrl: string;
  };
}

export interface IStaff {
  role: string;
  node: {
    siteUrl: string;
    name: {
      full: string;
      native: string;
    };
    image: {
      large: string;
    };
  };
}

export interface ITag {
  category: string;
  name: string;
  isGeneralSpoiler: boolean;
}

export interface IStudio {
  id: number;
  isMain: true;
  node: {
    name: string;
    siteUrl: string;
  };
}

export interface IMediaItem {
  Media: {
    id: number;
    title: {
      romaji: string;
      native: string;
    };
    source: string;
    popularity: number;
    bannerImage: string;
    episodes: number | null;
    duration: number;
    startDate: {
      day: number;
      month: number;
      year: number;
    };
    averageScore: number;
    trailer: {
      id: string;
    };
    tags: ITag[];
    genres: string[];
    characters: {
      edges: ICharacter[];
    };
    studios: {
      edges: IStudio[];
    };
    staff: {
      edges: IStaff[];
    };
    reviews: {
      edges: IReview[];
    };
    siteUrl: string;
    idMal: number;
  };
}
