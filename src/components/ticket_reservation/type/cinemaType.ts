export interface Seat {
  row: number
  number: number
  isReserved: boolean
  isSelected: boolean
}

export interface Showtime {
  id: number
  movie_id: number
  date: string
  start_time: string
  end_time: string
  available_seats: number
  price: number
}

export interface Movie {
  id: number
  title: string
  description: string
  genre: string
  releaseYear: number
  rating: number
  ratingCount: number
  imageUrl: string
}

export interface Reservation {
  id: number
  user_id: number
  showtime_id: number
  seat_number: number
  booking_time: string
  showtime: Showtime
}

export interface VotePayload {
  vote: number
}