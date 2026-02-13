import axios from "axios"
import { VotePayload } from "../type/cinemaType"
import { Reservation } from "../type/cinemaType"

const api = axios.create({
  baseURL: "https://superwebapplicationbackendshrava-production.up.railway.app",
})

export const fetchUserShowtimes = (name: string, password: string) =>
  api.post<Reservation[]>("/users-showtimes", { name, password })

export const sendVote = (reserveId: number, payload: VotePayload) =>
  api.post(`/reservation/${reserveId}`, payload)
