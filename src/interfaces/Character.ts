interface Character {
  role: string
  node: {
    image: {
      large: string
    }
    name: {
      first: string | null
      last: string | null
    }
  }
}

export default Character
