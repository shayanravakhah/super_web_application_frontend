"use client"

import Modal from "@mui/material/Modal"
import TextField from "@mui/material/TextField"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react"
import axios from "axios";

export default function EditUser({
    id,
    usernameOriginal,
    birthDateOriginal,
    nationalityOriginal,
    urlOriginal,
    passwordOriginal
}: {
    id: string,
    usernameOriginal: string,
    birthDateOriginal: string,
    nationalityOriginal: string,
    urlOriginal: string | null,
    passwordOriginal: string,
}) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [errors, setErrors] = useState<boolean[]>([false, false, false, false])
    const [userName, setUserName] = useState<string>(usernameOriginal)
    const [password, setPassword] = useState<string>(passwordOriginal)
    const [birthDate, setBirthDate] = useState<string>(birthDateOriginal.split("T")[0])
    const [url, setUrl] = useState<string | null>(urlOriginal)
    const [nationality, setNationality] = useState<string>(nationalityOriginal)
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<string>("password")
    const [isSend, setIsSend] = useState<boolean>(false)

    const submitHandler = async (): Promise<void> => {
        if (!userName) {
            setErrors([true, false, false, false])
            return alert("User Name is required.")
        }
        if (!password) {
            setErrors([false, false, true, false])
            return alert("Password is required.")
        }
        if (!birthDate) {
            setErrors([false, false, false, true])
            return alert("Birth date is required.")
        }
        if (!nationality) {
            setErrors([false, false, false, false])
            return alert("Nationality is required.")
        }
        setErrors([false, false, false, false])
        setIsSend(true);
        const formData = new FormData();
        formData.append("user_name", userName);
        formData.append("password", password);
        formData.append("birth_date", birthDate);
        formData.append("nationality", nationality);
        if (url) {
            formData.append("url", url);
        }
        try {
            const res: any = await axios.put(`https://super-web-application-backend-production.up.railway.app/users/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
            alert(res.data.msg)
            setIsOpen(false)
            window.location.reload()
        } catch (error: any) {
            setIsSend(false);
            if (error.response?.data?.msg) {
                alert(error.response.data.msg);
                window.location.reload();
            } else {
                alert("Something went wrong . Please try again later . ");
                window.location.reload();
            }
            setErrors([false, false, false, false]);
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
        <>
            <button
                className=" w-1/2  lg:w-2/3 bg-green-600 rounded-md py-3 px-5 text-white"
                onClick={() => setIsOpen(true)}
            >
                EDIT
            </button>
            <Modal
                open={isOpen}
                onClose={() => setIsOpen(!isOpen)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className='w-11/12 md:w-3/4 lg:w-2/3 h-4/5 overflow-scroll flex-col item-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white border'>
                    <div className='flex flex-col items-center px-4'  >
                        <TextField
                            error={errors[0]}
                            disabled={isSend}
                            type="text"
                            label="User Name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className='w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-7 mx-10'
                        />
                        <TextField
                            error={errors[1]}
                            disabled={isSend}
                            type={passwordType}
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-7 mx-10'
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
                        <TextField
                            error={errors[2]}
                            disabled={isSend}
                            type="date"
                            label="Birth Date"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                            className='w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-7 mx-10'
                            InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                            error={errors[3]}
                            disabled={isSend}
                            label="Nationality"
                            value={nationality}
                            onChange={(e) => setNationality(e.target.value)}
                            className='w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-7 mx-10'
                        />
                        <TextField
                            label="Profile URL"
                            disabled={isSend}
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            className='w-full md:w-3/4 lg:w-3/5 xl:w-1/2 my-7 mx-10'
                        />
                        <div className="flex justify-center w-full">
                            <button
                                className={`w-1/3 md:w-1/4 xl:w-1/5 border-0 bg-sky-400 text-white rounded-md px-5 py-3 my-3
                                     hover:shadow-lg hover:bg-[rgba(56,189,248,.9)] ${isSend ? "opacity-50 cursor-not-allowed" : ""}`}
                                onClick={submitHandler}

                            >
                                EDIT
                            </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
