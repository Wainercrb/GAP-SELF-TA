export interface GetScoreResponse {
    nps: number
}

export interface GetRatingResponse {
  ratings: Rating[]
}

export interface Rating {
  rating: number
  score: number
  text: string
}
