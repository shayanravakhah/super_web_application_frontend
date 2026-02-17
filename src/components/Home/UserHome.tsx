"use client"

import UserHead from "./UserHead"
import UserProfile from "./UserProfile"


export default function UserHome() {

  return (
    <div className=" w-full min-h-screen bg-gray-400">
      <UserHead></UserHead>
      <UserProfile></UserProfile>
    </div>
  )
}
