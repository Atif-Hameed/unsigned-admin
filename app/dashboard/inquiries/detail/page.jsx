'use client'
import { deleteOrder, updateOrder, getOrder } from '@/app/action/orders-action';
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
import html2pdf from 'html2pdf.js';

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

    const handleUpdateClick = () => setIsUpdateModalOpen(true);
    const handleDeleteClick = () => setIsDeleteModalOpen(true);
    const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);
    const handleCloseDeleteModal = () => setIsDeleteModalOpen(false);

    const handleConfirmDelete = async () => {
        setDeleteLoading(true);
        try {
            await deleteOrder(orderID);
            toast.success('Order deleted successfully!');
            setIsDeleteModalOpen(false);
            router.push('/dashboard/inquiries');
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
            await updateOrder(orderID, { status: updateStatus });
            toast.success('Order status updated successfully!');
            setIsUpdateModalOpen(false);
            router.push('/dashboard/inquiries');
        } catch (error) {
            toast.error('Failed to update order status.');
        } finally {
            setUpdateLoading(false);
        }
    };

    const generatePDF = async () => {
        if (typeof window === 'undefined') {
            console.error('PDF generation can only be done in the browser.');
            return;
        }

        const element = document.getElementById('order-details');
        if (!element) {
            console.error('Element to capture for PDF not found.');
            return;
        }

        const options = {
            margin: 0.5,
            filename: `Order_${orderID}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        try {
            await html2pdf().set(options).from(element).save();
        } catch (error) {
            console.error('Error generating PDF:', error);
            toast.error('Failed to generate PDF.');
        }
    };

    if (loading) {
        return <div className="text-primary h-full w-full flex items-center justify-center text-xl">Loading...</div>;
    }

    return (
        <div className='bg-white h-full w-full p-6'>
            <Toaster />

            <h1 className='text-4xl font-bold text-center text-primary my-5'>Order Details</h1>

            <div id="order-details" className='ml-5 flex flex-col gap-8'>
                <div>
                    <h1 className='text-2xl font-semibold'>Status</h1>
                    <div className='flex flex-col gap-4 w-full justify-center'>
                        <h1 className='font-medium text-center'>{data?.status || 'Inquiries'}</h1>
                    </div>
                </div>

                <FitSection data={data} />
                <div className='grid grid-cols-3 mt-8 gap-10 divide-x-4'>
                    <div className='px-6'><FabricSection data={data} /></div>
                    <div className='px-6'><ColorSection data={data} /></div>
                    <div className='px-6'><NeckLabelSection data={data} /></div>
                </div>

                <div className='grid grid-cols-3 mt-8 gap-10 divide-x-4'>
                    <div className='px-6'><CareLabelSection data={data} /></div>
                    <div className='px-6'><PrintSection data={data} /></div>
                    <div className='px-6'><PakaginSection data={data} /></div>
                </div>

                <QuantitySection data={data} />
                <AddressSection data={data} />
            </div>

            <div className='w-full py-6 flex justify-end'>
                <div className='flex gap-6 items-center'>
                    <button className="bg-yellow-500 whitespace-nowrap text-white py-3 px-6 text-xl rounded-lg" onClick={generatePDF}>
                        Download PDF
                    </button>
                    <button className="bg-green-500 whitespace-nowrap text-white px-6 py-3 text-xl rounded-lg" onClick={handleUpdateClick}>
                        Update Status
                    </button>
                    <button className="bg-primary text-white whitespace-nowrap px-6 py-3 text-xl rounded-lg" onClick={handleDeleteClick}>
                        Reject
                    </button>
                </div>
            </div>

            {/* Update and Delete modals */}
            <Modal isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} label="Update Status">
                <div className="flex flex-col gap-4">
                    <label htmlFor="status" className="text-lg font-semibold">Select Status:</label>
                    <select id="status" className="p-2 border rounded-lg" onChange={(e) => setUpdateStatus(e.target.value)} value={updateStatus}>
                        <option value="">Select Status</option>
                        <option value="samples">Samples</option>
                    </select>
                    <button className="bg-green-500 text-white py-2 rounded-lg mt-4" onClick={handleUpdateOrderStatus} disabled={updateLoading}>
                        {updateLoading ? 'Updating...' : 'Update'}
                    </button>
                </div>
            </Modal>

            <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal} label="Confirm Rejection">
                <div className="flex flex-col gap-4">
                    <p className="text-lg">Are you sure you want to reject this order?</p>
                    <div className="flex gap-4 w-full">
                        <button className="bg-gray-300 text-black w-1/2 py-2 rounded-lg" onClick={handleCloseDeleteModal}>
                            Cancel
                        </button>
                        <button className="bg-red-500 text-white w-1/2 py-2 rounded-lg" onClick={handleConfirmDelete} disabled={deleteLoading}>
                            {deleteLoading ? 'Deleting...' : 'Sure'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Page;
