'use client'
import Modal from '@/components/shared/Modal';
import React, { useState } from 'react'

const Page = () => {


    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleUpdateClick = () => {
        setIsUpdateModalOpen(true);
    };

    const handleDeleteClick = () => {
        setIsDeleteModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    const handleCloseDeleteModal = () => {
        setIsDeleteModalOpen(false);
    };

    const handleConfirmDelete = () => {
        // Add your delete logic here
        console.log("Order has been rejected.");
        setIsDeleteModalOpen(false);
    };


    return (
        <div className='bg-white h-full w-full p-6'>
            <h1 className='text-4xl font-bold text-center text-primary my-5'>Order Details</h1>
            <div className='ml-5 flex flex-col gap-8'>
                <div>
                    <h1 className='text-2xl font-semibold' >Status</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Inquiries'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Fit</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Toatal Length :'}</h1>
                        <h1 className='font-medium'>{'Chest Width :'}</h1>
                        <h1 className='font-medium'>{'Bottom Width :'}</h1>
                        <h1 className='font-medium'>{'Neck Opening :'}</h1>
                        <h1 className='font-medium'>{'Armhole :'}</h1>
                        <h1 className='font-medium'>{'Sleeve Opening :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Fabric</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Color</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Necklabel</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Carelabel</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Print</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Quantity</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Pakaging</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>
                <div>
                    <h1 className='text-2xl font-semibold' >Delivery</h1>
                    <div className='ml-10 flex flex-col gap-4'>
                        <h1 className='font-medium'>{'Name :'}</h1>
                    </div>
                </div>

                <div className='w-full my-5 flex justify-end'>
                    <div className='w-1/2 flex gap-6 items-center'>
                        <button
                            className="bg-green-500 text-white w-1/2 py-3 text-xl rounded-lg"
                            onClick={handleUpdateClick}
                        >
                            Update Status
                        </button>
                        <button
                            className="bg-primary text-white w-1/2 py-3 text-xl rounded-lg"
                            onClick={handleDeleteClick}
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>


            {/* update status modal */}
            <Modal
                isOpen={isUpdateModalOpen}
                onClose={handleCloseUpdateModal}
                label="Update Status"
                modalClass="your-modal-class"
            >
                <div className="flex flex-col gap-4">
                    <label htmlFor="status" className="text-lg font-semibold">Select Status:</label>
                    <select id="status" className="p-2 border rounded-lg">
                        <option value="rejected">Inquiries</option>
                        <option value="pending">Samples</option>
                        <option value="approved">Bulks</option>
                    </select>
                    <button className="bg-green-500 text-white py-2 rounded-lg mt-4">
                        Update
                    </button>
                </div>
            </Modal>


            {/* Modal for delete confirmation */}
            <Modal
                isOpen={isDeleteModalOpen}
                onClose={handleCloseDeleteModal}
                label="Confirm Rejection"
                modalClass="your-modal-class"
            >
                <div className="flex flex-col gap-4">
                    <p className="text-lg">Are you really sure you want to reject this order?</p>
                    <div className="flex gap-4 w-full">
                        <button
                            className="bg-gray-300 text-black w-1/2 py-2 rounded-lg"
                            onClick={handleCloseDeleteModal}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-500 text-white w-1/2 py-2 rounded-lg"
                            onClick={handleConfirmDelete}
                        >
                            Sure
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Page
