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
  price: string
  created_at: string
  title: string
  description: string
  genre: string
  release_year: number
  rating: string
  rating_count: number
  image_url: string
}


export interface Reservation {
  date: string
  start_time: string
  end_time: string
  price: string
  title: string
  description: string
  genre: string
  release_year: number
  rating: string
  rating_count: number
  image_url: string
  id: number
  user_id: number
  showtime_id: number
  seat_number: number
  booking_time: string
  rate: string
}

