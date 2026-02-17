"use client"
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";

export default function Login() {
    const router = useRouter()
    const [name, setName] = useState<string>()
    const [passwors, setPassword] = useState<string>()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<string>("password")
    const [errors, setErrors] = useState<boolean[]>([false, false])
    const [isSend, setIsSend] = useState<boolean>(false)

    const submitHandler = async (): Promise<void> => {

        if (!name) {
            setErrors([true, false])
            return alert("Name is required.")
        }
        if (!passwors) {
            setErrors([false, true])
            return alert("Password is required.")
        }
        setErrors([false, false])
        setIsSend(true);
        try {
            const res: any = await axios.post("https://super-web-application-backend-production.up.railway.app/login",
                { "user_name": name, "password": passwors },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }

                }
            );
            localStorage.setItem("user_id", res.data.id)
            router.push("/");
        } catch (error) {
            setIsSend(false);
            alert("Username or passsword are wrong .")
            setErrors([true, true])
        }
    }
    const visiblePassword = () => {
        if (isVisible) {
            setPasswordType("password")
        } else {
            setPasswordType("text")
        }
        setIsVisible(!isVisible)
    }
    return (
        <div >
            <div className=" w-full mt-48 mb-20 flex items-center justify-center bg-white flex-col px-5">
                <div className="w-full md:w-2/3 lg:w-2/5 border border-black rounded-lg ">
                    <div className="w-full bg-sky-600 rounded-t-lg py-7 mb-9">
                        <a href=" " className="flex justify-center  "> <img alt="" src="/icon.png" className="w-2/5 " /></a>
                    </div>
                    <div className='flex flex-col items-center'>
                        <TextField
                            disabled={isSend}
                            error={errors[0]}
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-5/6 my-2 lg:w-2/3  '
                        />
                        <TextField
                            disabled={isSend}
                            error={errors[1]}
                            label="Password"
                            type={passwordType}
                            value={passwors}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-5/6  my-2 lg:w-2/3 '
                            slotProps={{
                                input: {
                                    endAdornment:
                                        <button disabled={isSend} className={`text-black ${isSend ? "opacity-50 cursor-not-allowed" : ""}`} onClick={() => visiblePassword()}>
                                            {
                                                isVisible ?
                                                    <VisibilityOffIcon></VisibilityOffIcon>
                                                    :
                                                    <VisibilityIcon></VisibilityIcon>
                                            }
                                        </button>,
                                },
                            }}
                        />
                        <div className="flex flex-col items-center w-full">
                            <button
                                disabled={isSend}
                                className={`w-1/2 md:w-1/4 border-0 bg-[#2a79c8] text-white rounded-md px-5 py-3 my-3 hover:shadow-lg hover:bg-[#004e9c] ${isSend ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={submitHandler}
                            >
                                LOGIN
                            </button>
                            <div className={`mb-7 ${isSend ? "flex" : "hidden"} flex-col items-center gap-y-1`}>
                                <CircularProgress></CircularProgress>
                                <p className='text-sky-400'>Please wait for server response</p>
                            </div>
                            <div className="flex gap-x-1 my-3">
                                <div className="font-semibold">Do you want create an account ? </div>
                                <Link href="/signup" className="text-blue-500"> Sign Up</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


