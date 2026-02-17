"use client"
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "next/link";
import { useRouter } from "next/navigation"


export default function Signup() {

    const router = useRouter()
    const [name, setName] = useState<string>()
    const [password, setPassword] = useState<string>()
    const [birthDate, setBirthDate] = useState<string>()
    const [url, setUrl] = useState<string>()
    const [nationality, setNationality] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<string>("password")
    const [errors, setErrors] = useState<boolean[]>([false, false, false, false, false])
    const [isSend, setIsSend] = useState<boolean>(false)



    const submitHandler = async (): Promise<void> => {
        if (!name) {
            setErrors([true, false, false, false, false])
            return alert("Name is required.")
        }
        if (!email) {
            setErrors([false, true, false, false, false])
            return alert("Email is required.")
        }
        if (!password) {
            setErrors([false, false, true, false, false])
            return alert("Password is required.")
        }
        if (!birthDate) {
            setErrors([false, false, false, true, false])
            return alert("Birth date is required.")
        }
        if (!nationality) {
            setErrors([false, false, false, false, true])
            return alert("Nationality is required.")
        }
        setErrors([false, false, false, false, false])
        setIsSend(true);
        const formData = new FormData();
        formData.append("user_name", name);
        formData.append("password", password);
        formData.append("birth_date", birthDate);
        formData.append("nationality", nationality);
        formData.append("email", email);
        if (url) {
            formData.append("url", url);
        }
        try {
            const res: any = await axios.post("https://super-web-application-backend-production.up.railway.app/users",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            alert(res.data.msg)
            router.push("/login")
        } catch (error: any) {
            setIsSend(false);
            if (error.response?.data?.msg) {
                alert(error.response.data.msg);
            } else {
                alert("Something went wrong");
                window.location.reload();
            }
            setErrors([false, false, false, false, false]);
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
                <div className="w-full md:w-2/3 lg:w-1/2 border border-black rounded-lg ">
                    <div className="w-full bg-sky-600 rounded-t-lg py-7 mb-9">
                        <a href=" " className="flex justify-center  "> <img alt="" src="/icon.png" className="w-2/5 " /></a>
                    </div>
                    <div className='flex flex-col items-center'>
                        <TextField
                            error={errors[0]}
                            disabled={isSend}
                            label="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='w-5/6 my-2 lg:w-2/3  '
                        />
                        <TextField
                            error={errors[1]}
                            disabled={isSend}
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='w-5/6  my-2 lg:w-2/3  '
                        />
                        <TextField
                            error={errors[2]}
                            disabled={isSend}
                            label="Password"
                            type={passwordType}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-5/6  my-2 lg:w-2/3 '
                            slotProps={{
                                input: {
                                    endAdornment:
                                        <button
                                            disabled={isSend}
                                            className={`text-black ${isSend ? "opacity-50 cursor-not-allowed" : ""} `}
                                            onClick={() => visiblePassword()}
                                        >
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
                        <TextField
                            error={errors[3]}
                            disabled={isSend}
                            label="Birth Date"
                            type="date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className='w-5/6 my-2 lg:w-2/3'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            error={errors[4]}
                            disabled={isSend}
                            label="Nationality"
                            type="text"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className='w-5/6 my-2 lg:w-2/3'
                        />
                        <TextField
                            error={errors[5]}
                            disabled={isSend}
                            label="URL Profile"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className='w-5/6 my-2 lg:w-2/3'
                            placeholder="Please Enter URL of your profile"
                        />

                        <div className="flex flex-col items-center w-full">
                            <button
                                disabled={isSend}
                                className={`w-1/2 md:w-1/4 border-0 bg-[#2a79c8] text-white rounded-md px-5 py-3 my-3
                                     hover:shadow-lg hover:bg-[#004e9c] ${isSend ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={submitHandler}
                            >
                                Sign Up
                            </button>
                            <div className={`mb-7 ${isSend ? "flex" : "hidden"} flex-col items-center gap-y-1`}>
                                <CircularProgress></CircularProgress>
                                <p className='text-sky-400'>Please wait for server response</p>
                            </div>
                            <div className="flex gap-x-1 my-3">
                                <div className="font-semibold">Do you have any account ? </div>
                                <Link href="/login" className="text-blue-500"> Log In</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


