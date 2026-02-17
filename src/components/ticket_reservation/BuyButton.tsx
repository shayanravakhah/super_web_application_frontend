"use client"

import { useState } from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import Fade from "@mui/material/Fade"
import Alert from "@mui/material/Alert"
import Backdrop from "@mui/material/Backdrop"
import Modal from "@mui/material/Modal"
import CircularProgress from "@mui/material/CircularProgress"
import { Seat } from "./type/cinemaType"
import { reserveSeat } from "./service/cinemaService"

interface BuyButtonProps {
  seats: Seat[]
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>
  selectedSeat: number
  setSelectedSeat: React.Dispatch<React.SetStateAction<number>>
  selectedShowtime: number
  userID: string
}

export const BuyButton = ({
  selectedSeat,
  selectedShowtime,
  setSelectedSeat,
  userID
}: BuyButtonProps) => {

  const images = [
    "/shopping1.gif",
    "/shopping2.gif",
    "/shopping3.gif",
    "/shopping4.gif",
    "/Failed1.gif",
    "/Failed2.gif",
  ]

  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleBuy = async () => {
    if (selectedSeat === -1 || selectedShowtime === -1) {
      setSuccess(false)
      setOpen(true)
      return
    }
    const formData = new FormData()
    formData.append("user_id", userID)
    formData.append("showtime_id", selectedShowtime.toString())
    formData.append("seat_number", selectedSeat.toString())
    try {
      setLoading(true)
      const res = await reserveSeat(formData)
      if (res.status >= 200 && res.status < 300) {
        setSuccess(true)
        setOpen(true)
        setSelectedSeat(-1)
        setTimeout(() => {
          window.location.reload()
        }, 2500)
      } else {
        setSuccess(false)
      }
    } catch {
      setSuccess(false)
    } finally {
      setLoading(false)
    }
  }




  return (
    <>
      <Box className="w-full flex justify-center">
        <button
          disabled={loading}
          className={`flex items-center justify-center gap-2 px-7 py-2 bg-[#ff9800] text-white hover:bg-[#e68900] ${loading ? "cursor-not-allowed" : ""} rounded-md text-lg`}
          onClick={handleBuy}
        >
          {
            loading ?
              <CircularProgress className="text-white size-7 opacity-100" />
              :
              <>
                <Typography>BUY</Typography>
                <AddShoppingCartIcon />
              </>
          }
        </button>
      </Box>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <div className={`${success ? "bg-green-200" : "bg-red-200"} w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 h-2/5 lg:h-1/2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-14 py-6 overflow-y-scroll`}>
            {loading ? (
              <Box className="flex justify-center items-center h-full">
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box className="flex justify-center">
                  <img
                    src={
                      success
                        ? images[Math.floor(Math.random() * 4)]
                        : images[Math.floor(Math.random() * 2) + 4]
                    }
                    alt=""
                  />
                </Box>
                <Alert className="my-2" severity={success ? "success" : "error"}>
                  {success ? "Your ticket purchase was successful!" : "Your purchase failed!"}
                </Alert>
                <Alert className="my-1" color={success ? 'success' : 'error'}>
                  {success ? "Enjoy your movie!" : "Please select at least a seat or a showtime !"}
                </Alert>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </>
  )
}
