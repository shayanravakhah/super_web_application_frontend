import axios from "axios"

const api = axios.create({
  baseURL: "https://superwebapplicationbackendshrava-production.up.railway.app",
})

export const fetchShowtimes = () => api.get("/showtimes")
export const fetchMovies = () => api.get("/movies")

export const reserveSeat = (data: FormData) =>
  api.post("/reservation", data)

export const loginUser = (payload: { name: string; password: string }) =>
  api.post("/userID", payload)
