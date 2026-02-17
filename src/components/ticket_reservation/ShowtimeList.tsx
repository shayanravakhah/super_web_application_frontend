"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Rating from "@mui/material/Rating"
import CircularProgress from "@mui/material/CircularProgress"
import LocalActivityIcon from "@mui/icons-material/LocalActivity"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Backdrop from "@mui/material/Backdrop"
import { Seat, Showtime } from "./type/cinemaType"
import { getSeatReservation } from "./service/cinemaService"

interface ShowtimeListProps {
  showtimes: Showtime[]
  seats: Seat[]
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>
  setSelectedShowtime: React.Dispatch<React.SetStateAction<number>>
}

export const ShowtimeList = ({
  showtimes,
  setSeats,
  setSelectedShowtime,
}: ShowtimeListProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const selectShowtime = async (showtimeId: number) => {
    setOpen(false)
    setSelectedShowtime(showtimeId)
    setSeats(prev =>
      prev.map(seat => ({
        ...seat,
        isReserved: false,
        isSelected: false,
      }))
    )
    setLoading(true)
    const res = await getSeatReservation(showtimeId)
    const reservedSeats: number[] = res.data.map(
      (r: { seat_number: number }) => r.seat_number
    )
    setSeats(prev =>
      prev.map((seat, i) =>
        reservedSeats.includes(i + 1)
          ? { ...seat, isReserved: true }
          : seat
      )
    )
    setLoading(false)
  }

  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={() => setOpen(true)}
          className={`flex items-center justify-center gap-2 px-3 py-2  bg-[#607d8b] text-white hover:bg-[#455a64] ${loading ? "cursor-not-allowed" : ""} rounded-md text-lg`}
        >
          {
            loading ?
              <CircularProgress className="text-white size-7 opacity-100" />
              :
              <>
                <p>LIST OF SHOWTIMES</p>
                <LocalActivityIcon />
              </>
          }
        </button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <Box className="w-full md:w-5/6 lg:w-3/4 xl:w-3/5 h-4/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-cyan-100 px-2 overflow-y-scroll">

            {showtimes.length === 0 ? (
              <Box className="w-full h-full flex justify-center items-center">
                <CircularProgress />
              </Box>
            ) : (
              showtimes.map(showtime => {
                return (
                  <Box
                    key={showtime.id}
                    onClick={() => selectShowtime(showtime.id)}
                    className="flex w-full my-2 px-2 py-3 border border-black rounded-md gap-3 cursor-pointer hover:bg-red-300"
                  >
                    <Box className="w-1/2 lg:w-1/3">
                      <img
                        src={showtime.image_url}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </Box>

                    <Box className="flex flex-col w-1/2 lg:w-2/3">
                      <Typography className="font-bold text-center">
                        {showtime.title} ({showtime.release_year})
                      </Typography>

                      <Typography className="text-sm my-1">
                        {showtime.description}
                      </Typography>

                      <Typography className="text-sm my-5 text-center">
                        Genre : {showtime.genre}
                      </Typography>

                      <Box className="flex justify-center my-1">
                        <Rating value={Number(showtime.rating)} precision={0.1} readOnly />
                      </Box>

                      <Typography className="text-xs text-center text-gray-600">
                        {showtime.rating_count} votes · {showtime.rating}
                        <FavoriteIcon className="text-red-500 ml-1" />
                      </Typography>

                      <Box className="text-sm text-center mt-2 text-gray-400">
                        Date: {showtime.date.split("T")[0]} | {showtime.start_time} - {showtime.end_time}
                      </Box>
                      <Box className="text-sm text-center text-gray-400">
                        Seats: {showtime.available_seats} | Price: {showtime.price}$
                      </Box>
                    </Box>
                  </Box>
                )
              })
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
