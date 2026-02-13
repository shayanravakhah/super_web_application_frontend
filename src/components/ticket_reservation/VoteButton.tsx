"use client"

import { FormEvent, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { Backdrop, CircularProgress, Fade, Rating, TextField } from "@mui/material"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import RadioGroupRating from "./RadioGroupRating"

import { Movie, Reservation } from "./type/cinemaType"
import { fetchUserShowtimes, sendVote } from "./service/cinemaVoteService"
import { initialVoteValue, initialErrors, getMovieById, createVotePayload } from "./variable/cinemaVariable"

interface VoteButtonProps {
  movieInfo: Movie[]
}

export const VoteButton = ({ movieInfo }: VoteButtonProps) => {
  const [isOpenInfo, setIsOpenInfo] = useState(false)
  const [isOpenShowtimes, setIsOpenShowtimes] = useState(false)
  const [isOpenVote, setIsOpenVote] = useState(false)
  const [isWait, setIsWait] = useState(false)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState(initialErrors)
  const [value, setValue] = useState(initialVoteValue)

  const [selectedReserveID, setSelectedReserveID] = useState<number>(-1)
  const [selectedMovieID, setSelectedMovieID] = useState<number>(-1)
  const [reserves, setReserves] = useState<Reservation[]>([])

  const handleGetShowtimes = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name) return setErrors([true, false]), alert("Name required")
    if (!password) return setErrors([false, true]), alert("Password required")
    setIsOpenInfo(false)
    setIsWait(true)

    try {
      const res = await fetchUserShowtimes(name, password)
      setReserves(res.data)
      setIsOpenShowtimes(true)
    } catch {
      alert("Failed to fetch reservations")
    } finally {
      setIsWait(false)
    }
  }

  const handleSelectMovie = (reserveId: number, movieId: number) => {
    setSelectedReserveID(reserveId)
    setSelectedMovieID(movieId)
    setIsOpenVote(true)
    setIsOpenShowtimes(false)
  }

  const handleSendVote = async () => {
    if (!name) return setErrors([true, false]), alert("Name required")
    if (!password) return setErrors([false, true]), alert("Password required")
    setIsOpenVote(false)
    setIsWait(true)

    try {
      await sendVote(selectedReserveID, createVotePayload(value))
      window.location.reload()
    } catch {
      alert("Failed to send vote")
    } finally {
      setIsWait(false)
    }
  }

  return (
    <>
      <Box className="flex justify-center">
        <Button
          variant="text"
          className="flex justify-center gap-2 bg-red-500 text-white hover:bg-red-600"
          onClick={() => setIsOpenInfo(!isOpenInfo)}
        >
          <Typography>Vote Now</Typography>
          <HowToVoteIcon />
        </Button>
      </Box>

      {/* User Info Modal */}
      <Modal open={isOpenInfo} onClose={() => setIsOpenInfo(false)}>
        <Box className="w-11/12 md:w-3/4 lg:w-1/2 h-auto flex flex-col items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-100 border">
          {isWait ? (
            <Box className="flex justify-center items-center w-full h-full">
              <CircularProgress />
            </Box>
          ) : (
            <form className="flex flex-col items-center px-4" onSubmit={handleGetShowtimes}>
              <TextField
                error={errors[0]}
                label="Name"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full md:w-3/4 my-7"
              />
              <TextField
                error={errors[1]}
                label="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full md:w-3/4 my-7"
              />
              <Button type="submit" className="w-1/3 md:w-1/4 bg-sky-400 text-white rounded-md py-3 my-3">
                Submit
              </Button>
            </form>
          )}
        </Box>
      </Modal>

      {/* Showtimes Modal */}
      <Modal open={isOpenShowtimes} onClose={() => setIsOpenShowtimes(false)} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
        <Fade in={isOpenShowtimes}>
          <Box className="w-full md:w-5/6 lg:w-3/4 xl:w-3/5 h-4/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-100 flex flex-col items-center overflow-y-scroll px-2">
            {reserves.length > 0 ? reserves.map(reserve => (
              <Box
                key={reserve.id}
                onClick={() => handleSelectMovie(reserve.id, reserve.showtime.movie_id)}
                className="flex flex-col w-full my-1 hover:bg-neutral-500 px-2 py-3 border border-black rounded-md gap-y-3 cursor-pointer"
              >
                <Typography className="text-base font-bold text-center">
                  {getMovieById(movieInfo, reserve.showtime.movie_id)?.title}
                </Typography>
              </Box>
            )) : (
              <Box className="flex justify-center items-center w-full h-full">
                <CircularProgress />
              </Box>
            )}
          </Box>
        </Fade>
      </Modal>

      {/* Vote Modal */}
      <Modal open={isOpenVote} onClose={() => setIsOpenVote(false)} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
        <Fade in={isOpenVote}>
          <Box className="flex flex-col items-center w-full md:w-3/5 lg:w-1/2 xl:w-1/2 h-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-100 px-4 py-3">
            {movieInfo.length > 0 && selectedMovieID !== -1 ? (
              <Box className="w-full flex justify-center my-1 border border-black rounded-md">
                <Box className="w-1/2 bg-cyan-300 rounded-md mx-1 my-1 flex flex-col items-center justify-center">
                  <Typography className="text-center font-bold mb-3">
                    {getMovieById(movieInfo, selectedMovieID)?.title}
                  </Typography>
                  <Typography className="px-5 py-2 text-justify sm:text-sm">
                    {getMovieById(movieInfo, selectedMovieID)?.description}
                  </Typography>
                  <Box className="flex justify-center border rounded-md px-2 py-1">
                    <Rating value={getMovieById(movieInfo, selectedMovieID)?.rating} precision={0.1} readOnly />
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box className="flex justify-center items-center w-full h-full">
                <CircularProgress />
              </Box>
            )}
            <Box className="w-full bg-gray-300 flex flex-col justify-center items-center py-2 gap-y-3">
              <RadioGroupRating value={value} setValue={setValue} />
              <Button variant="contained" onClick={handleSendVote}>Register Vote</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>

      {/* Wait Modal */}
      <Modal open={isWait} onClose={() => setIsWait(false)}>
        <Box className="w-1/2 md:w-1/3 lg:w-1/4 h-1/4 flex flex-col justify-center items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-100 border">
          <CircularProgress />
          <Typography variant="body2">Please wait...</Typography>
        </Box>
      </Modal>
    </>
  )
}
