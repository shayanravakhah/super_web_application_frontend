"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import { Backdrop, CircularProgress, Fade, Rating } from "@mui/material"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import RadioGroupRating from "./RadioGroupRating"
import { Reservation } from "./type/cinemaType"
import { fetchUserShowtimes, sendVote } from "./service/cinemaService"
import { initialVoteValue } from "./variable/cinemaVariable"
import FavoriteIcon from "@mui/icons-material/Favorite"
import SendIcon from '@mui/icons-material/Send';

interface VoteButtonProps {
  userID: string
}

export const VoteButton = ({ userID }: VoteButtonProps) => {
  const [isOpenShowtimes, setIsOpenShowtimes] = useState<boolean>(false)
  const [isOpenVote, setIsOpenVote] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSending, setIsSending] = useState<boolean>(false)
  const [vote, setVote] = useState<number>(initialVoteValue)
  const [selectedReserveID, setSelectedReserveID] = useState<number>(-1)
  const [userReserves, setUserReserves] = useState<Reservation[]>([])

  const handleGetShowtimes = async () => {
    try {
      setIsLoading(true);
      const res = await fetchUserShowtimes(userID)
      setUserReserves(res.data)
      setIsLoading(false)
      setIsOpenShowtimes(true)
    } catch {
      alert("Failed to fetch reservations")
    } finally {
    }
  }

  const handleSelectShowtime = (reserveId: number) => {
    setSelectedReserveID(reserveId)
    setIsOpenVote(true)
    setIsOpenShowtimes(false)
    const previousVote = GetReservationByID(reserveId)?.rate
    if (previousVote) {
      console.log(previousVote);
      setVote(Number(previousVote))
    }
  }

  const GetReservationByID = (id: number): Reservation | undefined => {
    return userReserves.find((reserve) => reserve.id === id)
  }

  const handleSendVote = async () => {

    try {
      setIsSending(true)
      const res = await sendVote(selectedReserveID, vote)
      if (res.status === 200) {
        window.location.reload()
      }
      else {
        alert(res.msg)
      }
    } catch {
      alert("Failed to send vote")
    }
    setIsSending(false)
    setIsOpenVote(false)

  }

  return (
    <>
      <div className="flex justify-center">
        <button
          className={`flex items-center justify-center gap-2 px-5 py-2 bg-red-500  text-white hover:bg-red-600 ${isLoading ? "cursor-not-allowed" : ""} rounded-md text-lg`}
          onClick={() => handleGetShowtimes()}
        >
          {
            isLoading ?
              <CircularProgress className="text-white size-7 opacity-100" />
              :
              <>
                <p>VOTE NOW</p>
                <HowToVoteIcon />
              </>
          }
        </button>
      </div>

      <Modal
        open={isOpenShowtimes}
        onClose={() => setIsOpenShowtimes(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={isOpenShowtimes}>
          <div className="w-full md:w-5/6 lg:w-3/4 xl:w-3/5 h-4/5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-100 flex flex-col items-center overflow-y-scroll px-2">
            {userReserves.map(reserve => (
              <Box
                key={reserve.id}
                onClick={() => handleSelectShowtime(reserve.id)}
                className="flex w-full my-2 px-2 py-3 border border-black rounded-md gap-3 cursor-pointer hover:bg-red-300"
              >
                <Box className="w-1/2 lg:w-1/3">
                  <img
                    src={reserve.image_url}
                    className="w-full h-full object-cover rounded-md"
                  />
                </Box>

                <Box className="flex flex-col w-1/2 lg:w-2/3">
                  <Typography className="font-bold text-center">
                    {reserve.title} ({reserve.release_year})
                  </Typography>

                  <Typography className="text-sm my-1">
                    {reserve.description}
                  </Typography>

                  <Typography className="text-sm my-5 text-center">
                    Genre : {reserve.genre}
                  </Typography>

                  <Box className="flex justify-center my-1">
                    <Rating value={Number(reserve.rating)} precision={0.1} readOnly />
                  </Box>

                  <Typography className="text-xs text-center text-gray-600">
                    {reserve.rating_count} votes - {reserve.rating}
                    <FavoriteIcon className="text-red-500 ml-1" />
                  </Typography>

                  <Box className="text-sm text-center mt-2 text-gray-400">
                    Date: {reserve.date.split("T")[0]} | {reserve.start_time} To {reserve.end_time}
                  </Box>
                  <Box className="text-sm text-center text-gray-400">
                    Price: {reserve.price}$
                  </Box>

                  <Typography className="text-xl my-10 text-center font-black ">
                    Your seat : {reserve.seat_number}
                  </Typography>
                </Box>
              </Box>
            ))
            }
          </div>
        </Fade>
      </Modal>

      <Modal open={isOpenVote} onClose={() => setIsOpenVote(false)} closeAfterTransition slots={{ backdrop: Backdrop }} slotProps={{ backdrop: { timeout: 500 } }}>
        <Fade in={isOpenVote}>
          <Box className="flex flex-col items-center w-full md:w-3/5 lg:w-1/2 xl:w-1/2 h-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-100 px-4 py-3 overflow-y-scroll">
            <Box className="w-full flex justify-center my-1 border border-black rounded-md">
              <Box className="w-1/2 bg-cyan-300 rounded-md mx-1 my-1 flex flex-col items-center justify-center">
                <Typography className="text-center font-bold mb-3">
                  {GetReservationByID(selectedReserveID)?.title}
                </Typography>
                <div className="w-full px-3">
                  <img src={GetReservationByID(selectedReserveID)?.image_url} alt="" />
                </div>
                <Typography className="px-5 py-2 text-justify sm:text-sm">
                  {GetReservationByID(selectedReserveID)?.description}
                </Typography>
                <Box className="flex justify-center border rounded-md px-2 py-1">
                  <Rating value={Number(GetReservationByID(selectedReserveID)?.rating)} precision={0.1} readOnly />
                </Box>
              </Box>
            </Box>
            <Box className="w-full bg-gray-300 flex flex-col justify-center items-center py-2 gap-y-3">
              <RadioGroupRating value={vote} setValue={setVote} />
              <Button className="gap-x-2" variant="contained" onClick={handleSendVote}>
                {
                  isSending ?
                    <CircularProgress className="text-white size-7 opacity-100" />
                    :
                    <>
                      <p>Register Vote</p>
                      <SendIcon />
                    </>
                }
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
