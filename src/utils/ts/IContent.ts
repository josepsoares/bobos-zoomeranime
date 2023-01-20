interface IContent {
  id: string
  title: string
  excerpt?: string
  nativeTitle?: string
  releaseDate?: string
  content?: string
  preface?: string
  evaluation?: {
    animation: number
    soundtrack: number
    narrative: number
    characters: number
  }
  rating?: {
    illus: string
    text: string
  }
  characterQuotes?: [string, string][]
  coverImage?: string
}

export default IContent
