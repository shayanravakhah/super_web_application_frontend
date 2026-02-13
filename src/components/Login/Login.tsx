"use client"
import TextField from "@mui/material/TextField";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import axios from "axios";

export default function Login() {

    const [name, setName] = useState<string>()
    const [passwors, setPassword] = useState<string>()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<string>("password")
    const [errors, setErrors] = useState<boolean[]>([false, false])

    const submitHandler = async (): Promise<void> => {

        if (!name) {
            setErrors([true, false, false, false, false])
            return alert("Name is required.")
        }
        if (!passwors) {
            setErrors([false, false, true, false, false])
            return alert("Password is required.")
        }
        // const formData = new FormData();
        // formData.append("name", name);
        // formData.append("password", passwors);
        // const res: any = await axios.post("https://superwebapplicationbackendshrava-production.up.railway.app/users", formData, {
        //     headers: {
        //         "Content-Type": "multipart/form-data"
        //     }
        // });
        // if (res.data.msg === "Validation error") {
        //     alert("This name has already been used.")
        //     setErrors([true, false, false, false])
        // } else {
        //     alert(res.data.msg)
        //     window.location.reload()
        // }
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
                        <TextField error={errors[0]} label="Name" value={name} onChange={(e) => setName(e.target.value)} className='w-5/6 my-2 lg:w-2/3  ' />
                        <TextField error={errors[2]} label="Password" type={passwordType} value={passwors} onChange={(e) => setPassword(e.target.value)} className='w-5/6  my-2 lg:w-2/3 '
                            slotProps={{
                                input: {
                                    endAdornment:
                                        <button className='text-black ' onClick={() => visiblePassword()}>
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

                        <div className="flex justify-center w-full">
                            <button
                                className="w-1/2 md:w-1/4 border-0 bg-[#2a79c8] text-white rounded-md px-5 py-3 my-3 hover:shadow-lg hover:bg-[#004e9c]"
                                onClick={submitHandler}
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


