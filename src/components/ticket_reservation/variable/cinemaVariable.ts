"use client"

import { useEffect, useState } from "react"
import { Seat, Showtime } from "../type/cinemaType"
import {  fetchShowtimes } from "../service/cinemaService"
import { useRouter } from "next/navigation"


const ROWS = 5;
const COLS = 8;

export const useCinema = () => {
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeat, setSelectedSeat] = useState<number>(-1)
  const [selectedShowtime, setSelectedShowtime] = useState<number>(-1)
  const [showtimes, setShowtimes] = useState<Showtime[]>([])
  const [userID, setUserID] = useState<string>("-1")
  const router = useRouter()


  useEffect(() => {
    const initialSeats: Seat[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        initialSeats.push({ row: r, number: c, isReserved: false, isSelected: false })
      }
    }
    setSeats(initialSeats)
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      router.push("/login")
      return
    }
    setUserID(user_id);
    fetchShowtimes().then(r => setShowtimes(r.data))
  }, [])

  return {
    seats,
    setSeats,
    selectedSeat,
    setSelectedSeat,
    selectedShowtime,
    setSelectedShowtime,
    showtimes,
    COLS,
    userID
  }
}



// default values
export const initialVoteValue = 3

