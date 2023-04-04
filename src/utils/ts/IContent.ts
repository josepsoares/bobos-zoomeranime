interface IContent {
  id: string;
  title: string;
  nativeTitle: string;
  releaseDate?: string;
  coverImage: string;
  excerpt?: string;
  content?: string;
  preface?: string;
  characterQuotes?: [string, string][];
  evaluation: {
    animation: number;
    soundtrack: number;
    narrative: number;
    characters: number;
  };
  rating?: {
    illus: string;
    text: string;
  };
}

export default IContent;
