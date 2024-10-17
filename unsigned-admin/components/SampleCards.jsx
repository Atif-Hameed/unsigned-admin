'use client'

import React, { useEffect, useRef, useState } from 'react';
import { MdOutlineColorLens } from "react-icons/md";
import { BiDotsVerticalRounded } from 'react-icons/bi';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { deleteOrder, getAllSampleOrders } from '@/app/action/orders-action';
import toast, { Toaster } from 'react-hot-toast';
import { IoCloseOutline } from 'react-icons/io5';

const SampleCards = () => {

    const [visibleCount, setVisibleCount] = useState(10);
    const [openPopupId, setOpenPopupId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const popupRef = useRef(null);


    const { data: allSampleOrders, error, isLoading, refetch } = useQuery({
        queryKey: ['allSampleOrders'],
        queryFn: getAllSampleOrders, // No user ID required here
    });


    const handleOpenPopup = (orderId) => {
        setOpenPopupId((prevId) => (prevId === orderId ? null : orderId));
    };

    const handleDeleteClick = (order) => {
        setSelectedOrder(order);
        setShowDeleteDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedOrder) return; // Check if an order is selected
        setLoading(true); // Set loading to true
        try {
            await deleteOrder(selectedOrder.id);
            toast.success("Order deleted successfully!");
            refetch();
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
            setShowDeleteDialog(false);
            setSelectedOrder(null);
        }
    };

    const handleCancelDelete = () => {
        setShowDeleteDialog(false);
        setSelectedOrder(null);
    };

    // Close the popup when clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setOpenPopupId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Handle loading state
    if (isLoading) {
        return <div className='min-h-screen flex justify-center items-center'>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div className='min-h-screen flex justify-center items-center'>Error: {error.message}</div>;
    }
    console.log("order", allSampleOrders)


    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 10);
    };


    return (
        <div className="flex flex-col mx-auto items-center">
            <Toaster />

            {/* Check if Orders array is empty */}
            {allSampleOrders.length === 0 ? (
                <div className='my-20' >
                    <h1 className='text-2xl font-bold text-center'>No Data to Show yet</h1>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-3 grid-cols-1 py-6 gap-6 w-full">
                        {allSampleOrders.slice(0, visibleCount).map((order, i) => (
                            <div
                                key={order.id}
                                className="bg-lightBackground h-60 flex flex-col justify-between shadow-xl p-6"

                            >
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <h2 className="text-3xl font-bold flex flex-col text-[#1A1A1A]">#0{i + 1}
                                                <span className="text-sm text-labelColor">{order.category}</span>
                                            </h2>
                                            <p className="text-sm text-labelColor">{order.type}</p>
                                        </div>
                                        <div className="relative">
                                            <button onClick={() => handleOpenPopup(order.id)}>
                                                <BiDotsVerticalRounded className="text-2xl text-lightBlue" />
                                            </button>
                                            {openPopupId === order.id && (
                                                <div ref={popupRef} className='absolute right-5 top-[10%] bg-white rounded-xl shadow-xl p-2'>
                                                    <button onClick={() => router.push(`/dashboard/designs/${order.id}`)} className='px-3 w-full rounded-lg py-2 cursor-pointer hover:bg-[#d6ece3]'>Edit</button>
                                                    <button onClick={() => handleDeleteClick(order)} className='px-3 py-2 w-full rounded-lg cursor-pointer hover:bg-[#d6ece3]'>Delete</button>
                                                </div>
                                            )}
                                        </div>

                                    </div>
                                    <div className="text-primary flex items-center gap-1 mt-6">
                                        <MdOutlineColorLens className="text-lg" />
                                        <p className="">{order.status}</p>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center">
                                    <p className="text-labelColor">{order.date}</p>
                                    <Link href={`/dashboard/samples/detail?id=${order.id}`} className="bg-white hover:bg-black hover:text-white text-black px-6 py-3 rounded-full">
                                        Expand
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Load more button */}
                    {visibleCount < allSampleOrders.length && (
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


            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <div className="">
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <div className="relative">
                            <button
                                onClick={handleCancelDelete}
                                className="h-8 w-8 bg-white shadow rounded-full justify-center flex items-center absolute bottom-16 left-96 text-lightBlue"
                            >
                                <IoCloseOutline size={24} />
                            </button>
                        </div>
                        <div className="bg-cardColor p-6 rounded-2xl shadow-lg max-w-sm w-full relative">
                            <h2 className="text-2xl font-medium text-labelColor text-center mb-4">
                                Are you sure you want to delete?
                            </h2>
                            <div className="flex justify-center gap-4 mt-4">
                                <button
                                    onClick={handleCancelDelete}
                                    className="bg-bgColor text-white py-2 px-6 rounded-full"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleConfirmDelete}
                                    className="bg-primary text-white py-2 px-6 rounded-full"
                                    disabled={loading} // Disable button while loading
                                >
                                    {loading ? 'Deleting...' : 'Sure'} {/* Show loading state */}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


        </div>
    );
};

export default SampleCards;
