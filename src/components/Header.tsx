"use client"
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Link from 'next/link'
import { JSX, useState } from 'react';

interface properties {
    href: string,
    title: string,
    icon: JSX.Element
}

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const items: properties[] = [
        { href: "/", title: "Home", icon: <HomeIcon className='text-white'></HomeIcon> },
        { href: "/book-ticket", title: "Book Tickets", icon: <LocalActivityIcon className='text-white'></LocalActivityIcon> },
        { href: "/exchange-rate", title: "Exchamge Rates", icon: <MonetizationOnIcon className='text-white'></MonetizationOnIcon> },
    ]

    return (
        <div className='flex justify-center w-full bg-[#1976d2] z-10 fixed top-0 py-7'>
            <div className='hidden justify-center md:flex gap-10 w-full  '>
                <div className='w-2/3 justify-center md:flex gap-10'>
                    {
                        items.map((item) => {
                            return (
                                <Link href={item.href}  >
                                    <div className={`flex gap-1 cursor-pointer hover:scale-125 transition duration-700`}  >
                                        {item.icon}
                                        <div className='text-white font-bold text-lg'> {item.title} </div>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
                <div className='w-1/3 flex justify-center '>
                    <img src="/icon.png" alt="icon" className='w-3/5 xl:w-2/5' />
                </div>
            </div>
            <div className="flex w-full justify-start md:hidden text-white">
                <MenuIcon className="cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
                <div className='w-full flex justify-center '>
                    <img src="/icon.png" alt="icon" className='w-1/3' />
                </div>
                <Drawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    slotProps={{
                        paper: {
                            className: 'bg-sky-300 w-2/3 py-10',
                        },
                    }}
                >
                    <div className='flex flex-col md:hidden w-full h-full'>
                        {
                            items.map((item) => {
                                return (
                                    <Link onClick={()=>{setIsOpen(!isOpen)}} href={item.href} className='hover:bg-yellow-400 py-5 px-7'>
                                        <div className={`flex gap-1 cursor-pointer`}  >
                                            {item.icon}
                                            <div className='text-white font-bold text-lg'> {item.title} </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </Drawer>
            </div>
        </div>
    )
}
