"use client"

import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import EditUser from "./EditUser";

interface userType {
    id: number,
    username: string,
    birth_date: string,
    nationality: string,
    url: string | null,
    password: string,
    email: string,
    created_at: string
}
export default function UserProfile() {
    const [userInfo, setUserInfo] = useState<userType>({
        id: -1,
        username: "",
        birth_date: "",
        nationality: "",
        url: "",
        password: "",
        email: "",
        created_at: ""
    })
    const [userID, setUserId] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        FetchData()

    }, []);

    async function FetchData() {
        try {
            const user_id = localStorage.getItem("user_id");
            if (!user_id) {
                router.push("/login")
                return
            }
            setUserId(user_id)
            const res: any = await axios.get(`https://super-web-application-backend-production.up.railway.app/users/${user_id}`);
            setUserInfo(res.data);
            console.log(res.data);

        } catch (error: any) {
            if (error.response?.data?.msg) {
                alert(error.response.data.msg);
            } else {
                alert("Something went wrong");
                window.location.reload();
            }
        }
    }

    function getAge(birthDate: string): number {
        if (!birthDate) return 0

        const birth = new Date(birthDate)
        const today = new Date()

        let age = today.getFullYear() - birth.getFullYear()

        const monthDiff = today.getMonth() - birth.getMonth()
        const dayDiff = today.getDate() - birth.getDate()

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--
        }

        return age
    }


    return (
        <div className="w-full flex justify-center mt-20">
            {
                userInfo.username === "" ?
                    <div className='w-full h-screen flex flex-col items-center p-10'>
                        <CircularProgress className='text-cyan-400'></CircularProgress>
                        <p className='text-center mt-4 text-cyan-200 text-lg '>Loading data, check your internet and wait for Railway response and run your VPN  </p>
                    </div>
                    :
                    <div className="w-full md:w-2/3 xl:w-1/2 px-5">
                        <div key={userInfo.id} className="bg-blue-200 hover:shadow-[0px_0px_50px_20px_rgba(255,255,255,1)] rounded-lg hover:bg-blue-400 overflow-visible relative ">
                            <div className="w-full flex flex-col lg:flex-row items-center py-7 px-5 gap-5">
                                <div className="w-full lg:w-1/3 flex justify-center">
                                    <div className="size-40 rounded-full " >
                                        {
                                            userInfo.url ?
                                                <img src={userInfo.url} className=" object-cover w-full h-full rounded-full" alt="" />
                                                :
                                                <div className="bg-black text-white w-full h-full flex items-center justify-center rounded-full">
                                                    {userInfo.username[0]?.toUpperCase()}
                                                </div>
                                        }
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3 flex flex-col items-center gap-3">
                                    <div className="flex gap-x-1">
                                        <div className="text-center font-black text-xl ">
                                            {userInfo.username}
                                        </div>
                                        <div className="flex items-center font-medium text-base text-gray-600">
                                            (  {userInfo.nationality} )
                                        </div>
                                    </div>
                                    <div className="text-center text-gray-400 text-lg">
                                        {userInfo.email}
                                    </div>
                                </div>
                                <div className="w-full lg:w-1/3 flex justify-center ">
                                    <EditUser
                                        id={userID}
                                        usernameOriginal={userInfo.username}
                                        passwordOriginal={userInfo.password}
                                        urlOriginal={userInfo.url}
                                        birthDateOriginal={userInfo.birth_date}
                                        nationalityOriginal={userInfo.nationality}
                                    >

                                    </EditUser>
                                </div>
                            </div>
                            <div className="bg-cyan-300 rounded-2xl inline-block px-3 py-1 absolute -top-3 -left-3 ">
                                {getAge(userInfo.birth_date)} years
                            </div>

                        </div>
                    </div>
            }
        </div>
    )
}
