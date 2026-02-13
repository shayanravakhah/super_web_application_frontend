import { useMemo, useState } from "react"
import axios from "axios"
import { Movie, Showtime } from "../type/cinemaType"

export interface ShowtimeReservation {
  id: number
  showtime: Showtime
}

export const useVote = (movies: Movie[]) => {
  const movieMap = useMemo(
    () => new Map(movies.map(m => [m.id, m])),
    [movies]
  )

  const [step, setStep] = useState<"login" | "list" | "vote" | null>(null)
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [reserves, setReserves] = useState<ShowtimeReservation[]>([])
  const [selectedReserveID, setSelectedReserveID] = useState<number | null>(null)
  const [selectedMovieID, setSelectedMovieID] = useState<number | null>(null)
  const [vote, setVote] = useState(3)

  const fetchReserves = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append("name", name)
    formData.append("password", password)

    const res = await axios.post(
      "https://super-web-application-backend-production.up.railway.app/users-showtimes",
      formData
    )

    setReserves(res.data)
    setLoading(false)
    setStep("list")
  }

  const submitVote = async () => {
    if (!selectedReserveID) return
    setLoading(true)

    const formData = new FormData()
    formData.append("vote", vote.toString())

    await axios.post(
      `https://super-web-application-backend-production.up.railway.app/reservation/${selectedReserveID}`,
      formData
    )

    window.location.reload()
  }

  return {
    step,
    setStep,
    loading,
    name,
    setName,
    password,
    setPassword,
    reserves,
    movieMap,
    selectedMovieID,
    setSelectedMovieID,
    selectedReserveID,
    setSelectedReserveID,
    vote,
    setVote,
    fetchReserves,
    submitVote
  }
}
