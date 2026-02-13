"use client"

import { Button, Typography } from "@mui/material"
import HowToVoteIcon from "@mui/icons-material/HowToVote"
import {Movie} from "../type/cinemaType"
import { useVote } from "./useVote"

interface VoteButtonProps {
  movieInfo: Movie[]
}

export const VoteButton = ({ movieInfo }: VoteButtonProps) => {
  const vote = useVote(movieInfo)

  return (
    <>
      <Button
        onClick={() => vote.setStep("login")}
        className="bg-red-500 text-white hover:bg-red-600 gap-2"
      >
        <Typography>Vote Now</Typography>
        <HowToVoteIcon />
      </Button>

      {/* LoginModal */}
      {/* ShowtimesModal */}
      {/* VoteModal */}
      {/* LoadingModal */}
    </>
  )
}
