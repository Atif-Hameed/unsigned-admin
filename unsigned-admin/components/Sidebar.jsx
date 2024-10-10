'use client'
import React from 'react';
import logo from '@/assets/logoSmall.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaAnglesRight } from "react-icons/fa6";

const Sidebar = () => {
    const pathName = usePathname();

    const SidebarMenu = [
        { name: 'Inquiries', src: '/dashboard/inquiries' },
        { name: 'Samples', src: '/dashboard/samples' },
        { name: 'Bulks', src: '/dashboard/bulks' },
    ];

    // Function to check if the path includes the first two segments of the given src
    const isActive = (src) => {
        const trimmedSrc = src.split('/').slice(0, 3).join('/');
        return pathName.startsWith(trimmedSrc);
    };

    return (
        <div className='bg-lightBackground text-gray flex flex-col border-r border-gray-400 items-center gap-4 h-full max-h-[900px] p-4 w-full'>
            <div className='w-full flex flex-col items-center'>
                <div>
                    <Image alt='' src={logo} className='w-48' />
                </div>
            </div>

            <div className='w-full flex flex-col items-center'>
                <div className='py-5 w-full flex justify-center'>
                    <div className='mt-3 flex w-full flex-col gap-1'>
                        {
                            SidebarMenu.map((e, i) => (
                                <Link
                                    href={e.src}
                                    className={`flex items-center justify-between text-center text-3xl font-medium gap-3 p-2 w-full ${isActive(e.src) ? 'bg-dark rounded-lg text-white' : 'bg-transparent'}`}
                                    key={i}
                                >
                                    <p>{e.name}</p>
                                    {isActive(e.src) && <FaAnglesRight className='text-white text-2xl' />}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
