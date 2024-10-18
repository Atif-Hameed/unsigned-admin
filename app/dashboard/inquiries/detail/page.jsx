'use client'
import { deleteOrder, updateOrder } from '@/app/action/orders-action';
import { getOrder } from '@/app/action/orders-action';
import AddressSection from '@/components/shared/AdressSection';
import CareLabelSection from '@/components/shared/CareLabelSection';
import ColorSection from '@/components/shared/ColorSection';
import FabricSection from '@/components/shared/FabricSection';
import FitSection from '@/components/shared/FitSection';
import Modal from '@/components/shared/Modal';
import NeckLabelSection from '@/components/shared/NeckLabelSection';
import PakaginSection from '@/components/shared/PakaginSection';
import PrintSection from '@/components/shared/PrintSection';
import QuantitySection from '@/components/shared/QuantitySection';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
    const [data, setData] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateStatus, setUpdateStatus] = useState('');
    const [updateLoading, setUpdateLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const router = useRouter();

    const params = useSearchParams();
    const orderID = params.get('id');

    // Fetch the order details when the component mounts or orderID changes
    useEffect(() => {
        if (orderID) {
            const fetchOrder = async () => {
                setLoading(true);
                try {
                    const order = await getOrder(orderID);
                    setData(order);
                } catch (error) {
                    toast.error('Failed to fetch order.');
                    console.error('Failed to fetch order:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchOrder();
        }
    }, [orderID]);

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

    const handleConfirmDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteOrder(orderID);
            toast.success('Order deleted successfully!');
            setIsDeleteModalOpen(false);
            router.push('/dashboard/inquiries')
        } catch (error) {
            toast.error('Failed to delete order.');
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleUpdateOrderStatus = async () => {
        if (!updateStatus) {
            toast.error('Please select a status.');
            return;
        }

        setUpdateLoading(true);
        try {
            const res = await updateOrder(orderID, { status: updateStatus });
            console.log(res)
            toast.success('Order status updated successfully!');
            setIsUpdateModalOpen(false);
            router.push('/dashboard/inquiries') 
        } catch (error) {
            toast.error('Failed to update order status.');
        } finally {
            setUpdateLoading(false);
        }
    };

    if (loading) {
        return <div className="text-primary h-full w-full flex items-center justify-center text-xl">Loading...</div>;
    }

    return (
        <div className='bg-white h-full w-full p-6'>
            <Toaster />

            <h1 className='text-4xl font-bold text-center text-primary my-5'>Order Details</h1>
            <div className='ml-5 flex flex-col gap-8'>
                {/* status */}
                <div>
                    <h1 className='text-2xl font-semibold'>Status</h1>
                    <div className='ml-10 flex flex-col gap-4 w-full justify-center'>
                        <h1 className='font-medium text-center'>{data?.status || 'Inquiries'}</h1>
                    </div>
                </div>

                {/* fit section */}
                <FitSection data={data} />

                <div className='grid grid-cols-3 mt-8 gap-10 divide-x-4'>
                    {/* fabric */}
                    <div className='px-6'>
                        <FabricSection data={data} />
                    </div>

                    {/* colors Section */}
                    <div className='px-6'>
                        <ColorSection data={data} />
                    </div>

                    {/* Neck Label Section */}
                    <div className='px-6'>
                        <NeckLabelSection data={data} />
                    </div>
                </div>

                <div className='grid grid-cols-3 mt-8 gap-10 divide-x-4'>
                    <div className='px-6'>
                        {/* carelabel section */}
                        <CareLabelSection data={data} />
                    </div>

                    <div className='px-6'>
                        {/* print setion */}
                        <PrintSection data={data} />
                    </div>

                    <div className='px-6'>
                        {/* pakagin section */}
                        <PakaginSection data={data} />
                    </div>
                </div>

                {/* Quantity setion */}
                <QuantitySection data={data} />

                {/* Address section */}
                <AddressSection data={data} />

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

            {/* Update status modal */}
            <Modal
                isOpen={isUpdateModalOpen}
                onClose={handleCloseUpdateModal}
                label="Update Status"
                modalClass="your-modal-class"
            >
                <div className="flex flex-col gap-4">
                    <label htmlFor="status" className="text-lg font-semibold">Select Status:</label>
                    <select
                        id="status"
                        className="p-2 border rounded-lg"
                        onChange={(e) => setUpdateStatus(e.target.value)}
                        value={updateStatus}
                    >
                        <option value="">Select Status</option>
                        <option value="complete">Inquiries</option>
                        <option value="samples">Samples</option>
                        {/* <option value="bulks">Bulks</option> */}
                    </select>
                    <button
                        className="bg-green-500 text-white py-2 rounded-lg mt-4"
                        onClick={handleUpdateOrderStatus}
                        disabled={updateLoading}
                    >
                        {updateLoading ? 'Updating...' : 'Update'}
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
                            disabled={deleteLoading}
                        >
                            {deleteLoading ? 'Deleting...' : 'Sure'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Page;
