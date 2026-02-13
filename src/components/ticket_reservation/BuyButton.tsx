"use client"

import { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import Fade from "@mui/material/Fade"
import Alert from "@mui/material/Alert"
import TextField from "@mui/material/TextField"
import Backdrop from "@mui/material/Backdrop"
import Modal from "@mui/material/Modal"
import CircularProgress from "@mui/material/CircularProgress"
import { Seat } from "./type/cinemaType"
import { loginUser, reserveSeat } from "./service/cinemaService"

interface BuyButtonProps {
  seats: Seat[]
  setSeats: React.Dispatch<React.SetStateAction<Seat[]>>
  selectedSeats: number[]
  selectedShowtime: number
  setSelectedSeats: React.Dispatch<React.SetStateAction<number[]>>
}

export const BuyButton = ({
  seats,
  setSeats,
  selectedSeats,
  selectedShowtime,
  setSelectedSeats,
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

  const [userId, setUserId] = useState<number | null>(null)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (userId !== null) {
      handleBuy()
    }
  }, [userId])

  const handleBuy = async () => {
    setOpen(true)

    if (!userId || selectedSeats.length === 0) {
      setSuccess(false)
      return
    }

    try {
      await Promise.all(
        selectedSeats.map(seatNumber => {
          const formData = new FormData()
          formData.append("user_id", userId.toString())
          formData.append("showtime_id", selectedShowtime.toString())
          formData.append("seat_number", seatNumber.toString())
          formData.append("booking_time", new Date().toISOString())
          return reserveSeat(formData)
        })
      )

      setSeats(prev =>
        prev.map((seat, i) =>
          selectedSeats.includes(i + 1)
            ? { ...seat, isReserved: true, isSelected: false }
            : seat
        )
      )

      setSelectedSeats([])
      setSuccess(true)
    } catch {
      setSuccess(false)
    }
  }

  const handleRegister = async () => {
    if (!username || !password) {
      alert("Username and password are required")
      return
    }

    setLoading(true)
    try {
      const res = await loginUser({ name: username, password })
      setUserId(res.data.id)
    } catch {
      alert("The username or password is incorrect.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Box className="w-full flex justify-center">
        <Button
          variant="text"
          className="flex px-5 gap-2 bg-[#ff9800] text-white hover:bg-[#e68900]"
          onClick={handleBuy}
        >
          <Typography>BUY</Typography>
          <AddShoppingCartIcon />
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
          <Box className={`${success ? "bg-green-200" : "bg-red-200"} w-11/12 md:w-3/5 lg:w-1/2 xl:w-1/3 h-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-14 py-6`}>

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

                {!userId && (
                  <>
                    <TextField
                      label="Username"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      fullWidth
                      className="my-1"
                    />
                    <TextField
                      label="Password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      fullWidth
                      className="my-1"
                    />
                    <Box className="flex justify-center my-2">
                      <Button onClick={handleRegister} variant="contained" color="error">
                        Register
                      </Button>
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </>
  )
}
