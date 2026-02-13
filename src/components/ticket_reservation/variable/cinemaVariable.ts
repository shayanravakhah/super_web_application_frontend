"use client"

import { useEffect, useState } from "react"
import { Seat, Movie, Showtime } from "../type/cinemaType"
import { fetchMovies, fetchShowtimes } from "../service/cinemaService"
import {  VotePayload } from "../type/cinemaType"

const ROWS = 5;
const COLS = 8;

export const useCinema = () => {
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [selectedShowtime, setSelectedShowtime] = useState<number>(-1)
  const [movies, setMovies] = useState<Movie[]>([])
  const [showtimes, setShowtimes] = useState<Showtime[]>([])

  useEffect(() => {
    const initialSeats: Seat[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        initialSeats.push({ row: r, number: c, isReserved: false, isSelected: false })
      }
    }
    setSeats(initialSeats)

    fetchMovies().then(r => setMovies(r.data))
    fetchShowtimes().then(r => setShowtimes(r.data))
  }, [])

  return {
    seats,
    setSeats,
    selectedSeats,
    setSelectedSeats,
    selectedShowtime,
    setSelectedShowtime,
    movies,
    showtimes,
    COLS
  }
}



// default values
export const initialVoteValue = 3
export const initialErrors: [boolean, boolean] = [false, false]

// helpers
export const getMovieById = (movies: Movie[], id: number): Movie | undefined =>
  movies.find(m => m.id === id)

// payload creators
export const createVotePayload = (vote: number): VotePayload => ({ vote })

