'use client'

import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import React, { useState, useEffect } from 'react';

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        setSidebarOpen(false);
    }, [children]);

    return (
        <div className='w-full min-h-screen flex justify-between overflow-auto  relative'>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-40 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div className={`fixed max-h-screen overflow-auto custom-scrollbar bg-Cgreen inset-0 z-50 transition-transform transform 
                ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 xl:w-[18%] lg:w-[26%] md:w-[32%] w-[70%]`}
            >
                <Sidebar />
            </div>

            <div className='flex-1 xl:w-[82%] w-full lg:w-[74%] md:w-[68%] max-h-screen custom-scrollbar overflow-auto'>
                <div className='sticky  md:z-50 z-40 top-0  w-full'>
                    <Navbar toggleSidebar={toggleSidebar} />
                </div>
                {children}
            </div>
        </div>
    );
}

export default Layout;
