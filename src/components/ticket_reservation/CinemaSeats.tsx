"use client"

import Button from "@mui/material/Button"
import { Seat } from "./type/cinemaType"

interface CinemaSeatsProps {
  seats: Seat[]
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>
  selectedSeats: number[]
  setSelectedSeats: React.Dispatch<React.SetStateAction<number[]>>
  selectedShowtime: number
  COLS: number
}

export const CinemaSeats = ({
  seats,
  setSeats,
  selectedSeats,
  setSelectedSeats,
  selectedShowtime,
  COLS,
}: CinemaSeatsProps) => {

  const handleSeatClick = (index: number): void => {
    if (selectedShowtime < 0) {
      alert("please select a showtime")
      return
    }

    setSeats(prev =>
      prev.map((seat, i) =>
        i === index
          ? { ...seat, isSelected: !seat.isSelected }
          : seat
      )
    )

    setSelectedSeats(prev =>
      prev.includes(index + 1)
        ? prev.filter(v => v !== index + 1)
        : [...prev, index + 1]
    )
  }

  return (
    <div className="w-full grid grid-cols-8 gap-x-1 gap-y-4 my-10 px-2 md:w-3/4 lg:w-3/5 xl:w-1/2 sm:gap-x-4 sm:gap-y-4">
      {seats.map((seat, index) => {
        const seatNumber = index + 1
        const isDisabled = seat.isReserved

        const baseClass =
          seat.isSelected
            ? "bg-red-400 hover:bg-red-500"
            : seat.isReserved
              ? "bg-gray-500"
              : "bg-fuchsia-700 hover:bg-fuchsia-800"

        return (
          <div key={seatNumber}>
            <Button
              variant="contained"
              disabled={isDisabled}
              onClick={() => handleSeatClick(index)}
              className={`${baseClass} transition duration-500 hidden sm:flex`}
            >
              {seatNumber}
            </Button>

            <button
              disabled={isDisabled}
              onClick={() => handleSeatClick(index)}
              className={`${baseClass} transition duration-500 flex justify-center size-11 text-white rounded-lg items-center sm:hidden`}
            >
              {seatNumber}
            </button>
          </div>
        )
      })}
    </div>
  )
}
