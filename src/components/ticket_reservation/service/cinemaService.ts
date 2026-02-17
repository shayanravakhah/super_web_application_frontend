import axios from "axios"

const api = axios.create({
  baseURL: "https://super-web-application-backend-production.up.railway.app",
});

export const fetchShowtimes = () => api.get("/showtimes")

export const reserveSeat = async (data: FormData) => {
  try {
    const res = await api.post("/reservation", data)
    return { status: res.status, msg: res.data.msg }
  } catch (error: any) {
    return {
      status: error.response?.status,
      msg: error.response?.data?.msg
    }
  }
}

export const fetchUserShowtimes = (userID: string) => api.get(`/users/${userID}/reservations`)

export const sendVote = async (reserveId: number, vote: number) => {
  try {
    const res = await api.put(`/reservation/${reserveId}`, { vote: vote })
    return { status: res.status, msg: res.data.msg }
  } catch (error: any) {
    return {
      status: error.response?.status,
      msg: error.response?.data?.msg
    }
  }
}

export const getSeatReservation = (showtimeId: number) => api.get(`/showtimes/${showtimeId}/reservations`)


