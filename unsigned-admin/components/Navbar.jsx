import { usePathname } from 'next/navigation'
import React, { useState } from 'react'
import Image from 'next/image'
import { IoIosArrowDown } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";
import Link from 'next/link'
import Modal from './shared/Modal';
import logo from '@/assets/logoSmall.png'
import profile from '@/assets/profile.png'
import { useAuth } from '@/provider/auth_context';


const Navbar = ({ toggleSidebar }) => {

    const [open, setOepn] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const pathName = usePathname()
    const pathSegments = pathName.split('/');
    const { handleLogout, user } = useAuth();
    const activeName = pathSegments[pathSegments.length - 1];


    console.log("User Data:", user);

    const handleToggle = () => {
        setOepn((prev) => !prev)
    }

    const handleShowPopup = () => {
        setShowPopup(true)
    }

    const handleClosePopup = () => {
        setShowPopup(false)
    }



    return (
        <div className='bg-lightBackground border-b border-gray-400 shadow-sm  p-3 w-full h-full flex items-center justify-between ' >
            <div className='md:w-[45%] w-auto '>
                <h1 className='lg:text-2xl text-xl capitalize ml-4 font-bold text-primary' >
                    {activeName}
                </h1>
                {
                    pathName === '/dashboard/profile' && <h1 className='lg:text-2xl text-xl font-bold text-primary'>Profile</h1>
                }
            </div>

            <div className={`md:flex hidden ${pathName === '/dashboard' ? 'w-full' : 'w-[50%]'}  justify-end items-center gap-5`}>

                <div className='flex items-center gap-3 w-fit'>
                    <div onClick={handleToggle} className='flex items-center gap-2 w-full relative cursor-pointer'>
                        <div className='bg-slate-300 p-3 rounded-full'>
                            <Image alt='' className='w-7' src={profile} />
                        </div>
                        <div className='flex w-full items-center gap-2 '>
                            <p className='text-primary'>Admin</p>
                            <IoIosArrowDown className="text-secondary text-xl " />

                            {
                                open &&
                                <div className='bg-white text-primary shadow-xl flex flex-col items-center gap-2 rounded-lg p-2 px-4 absolute top-12 left-0 w-full ' >
                                    <button onClick={handleLogout} className='hover:bg-gray-300 w-full py-2 rounded-lg text-center '>Log out</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <button className='block md:hidden text-xl' onClick={toggleSidebar}>
                <RiMenu3Fill className='text-xl' />
            </button>

            {/* popup */}
            <Modal label={'Add Blog'} isOpen={showPopup} onClose={handleClosePopup}>
            </Modal>

        </div>
    )
}

export default Navbar
