'use client'

import React, { useState } from 'react';
import { MdOutlineColorLens } from "react-icons/md";
import { Orders } from '@/data';
import Link from 'next/link';

const InquiryCards = () => {
    const [visibleCount, setVisibleCount] = useState(10);


    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };


    return (
        <div className="flex flex-col mx-auto items-center">

            {/* Check if Orders array is empty */}
            {Orders.length === 0 ? (
                <div className='my-20' >
                    <h1 className='text-2xl font-bold text-center'>No Data to Show yet</h1>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-3 grid-cols-1 py-6 gap-6 w-full">
                        {Orders.slice(0, visibleCount).map((order) => (
                            <div
                                key={order.id}
                                className="bg-lightBackground h-60 flex flex-col justify-between shadow-xl p-6"

                            >
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <h2 className="text-3xl font-bold text-[#1A1A1A]">{order.id}</h2>
                                            <p className="text-sm text-labelColor">{order.type}</p>
                                        </div>

                                    </div>
                                    <div className="text-primary flex items-center gap-1 mt-6">
                                        <MdOutlineColorLens className="text-lg" />
                                        <p className="">{order.status}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-labelColor">{order.date}</p>
                                    <Link href={'/dashboard/inquiries/detail'} className="bg-white hover:bg-black hover:text-white text-black px-6 py-3 rounded-full">
                                        Expand
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load more button */}
                    {visibleCount < Orders.length && (
                        <div className="w-full flex items-end justify-end py-6">
                            <button
                                onClick={handleLoadMore}
                                className="bg-primary text-white px-6 py-3 rounded-full"
                            >
                                Load More
                            </button>
                        </div>
                    )}
                </>
            )}


        </div>
    );
};

export default InquiryCards;
