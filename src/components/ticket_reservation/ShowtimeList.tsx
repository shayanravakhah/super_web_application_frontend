"use client"

import { useMemo, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Fade from "@mui/material/Fade"
import Rating from "@mui/material/Rating"
import CircularProgress from "@mui/material/CircularProgress"
import LocalActivityIcon from "@mui/icons-material/LocalActivity"
import FavoriteIcon from "@mui/icons-material/Favorite"
import Backdrop from "@mui/material/Backdrop"

import { Seat, Movie, Showtime } from "./type/cinemaType"
import axios from "axios"

interface ShowtimeListProps {
  showtimes: Showtime[]
  movies: Movie[]
  seats: Seat[]
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>
  setSelectedShowtime: React.Dispatch<React.SetStateAction<number>>
}

export const ShowtimeList = ({
  showtimes,
  movies,
  seats,
  setSeats,
  setSelectedShowtime,
}: ShowtimeListProps) => {

  const [open, setOpen] = useState(false)

  const movieMap = useMemo(() => {
    const map = new Map<number, Movie>()
    movies.forEach(m => map.set(m.id, m))
    return map
  }, [movies])

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

    const res = await axios.get(
      `https://superwebapplicationbackendshrava-production.up.railway.app/reservation/${showtimeId}`
    )

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
  }

  return (
    <>
      <Box className="flex justify-center">
        <Button
          onClick={() => setOpen(true)}
          className="flex gap-2 bg-[#607d8b] text-white hover:bg-[#455a64]"
        >
          <Typography>List of showtimes</Typography>
          <LocalActivityIcon />
        </Button>
      </Box>

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
                const movie = movieMap.get(showtime.movie_id)
                if (!movie) return null

                return (
                  <Box
                    key={showtime.id}
                    onClick={() => selectShowtime(showtime.id)}
                    className="flex w-full my-2 px-2 py-3 border border-black rounded-md gap-3 cursor-pointer hover:bg-red-300"
                  >
                    <Box className="w-1/3">
                      <img
                        src={movie.imageUrl}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </Box>

                    <Box className="flex flex-col w-2/3">
                      <Typography className="font-bold text-center">
                        {movie.title}
                      </Typography>

                      <Typography className="text-sm my-1">
                        {movie.description}
                      </Typography>

                      <Box className="flex justify-center my-1">
                        <Rating value={movie.rating} precision={0.1} readOnly />
                      </Box>

                      <Typography className="text-xs text-center text-gray-600">
                        {movie.ratingCount} votes · {movie.rating}
                        <FavoriteIcon className="text-red-500 ml-1" />
                      </Typography>

                      <Box className="text-sm text-center mt-2">
                        Date: {showtime.date} | {showtime.start_time} - {showtime.end_time}
                      </Box>

                      <Box className="text-sm text-center">
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
