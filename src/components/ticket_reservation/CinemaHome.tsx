"use client"

import CinemaHeader from "./CinemaHeader"
import { CinemaSeats } from "./CinemaSeats"
import { BuyButton } from "./BuyButton"
import { ShowtimeList } from "./ShowtimeList"
import { VoteButton } from "./VoteButton"
import { useCinema } from "./variable/cinemaVariable"

export default function CinemaPage() {
  const cinema = useCinema()

  return (
    <div className="bg-[#1c1c1c] min-h-screen flex flex-col items-center">
      <CinemaHeader />

      <CinemaSeats {...cinema} />

      <div className="w-full flex flex-col items-center">

        <div className="flex justify-center">
          <BuyButton {...cinema} />
        </div>
        <div className="flex justify-center mt-3 flex-col md:flex-row gap-y-3 gap-x-0 md:gap-y-0  md:gap-x-4">
          <VoteButton movieInfo={cinema.movies} />
          <ShowtimeList {...cinema} />
        </div>
      </div>

    </div>
  )
}