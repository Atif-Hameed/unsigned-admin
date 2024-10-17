import React from 'react';

const AddressSection = ({ data }) => {
    const { billingAddress, deliveryAddress, contactInfo } = data?.delivery;

    return (
        <div className='w-full h-full mt-8'>
            <h1 className='text-2xl font-semibold'>Address Information</h1>
            <div className='ml-10 flex flex-col gap-6 mt-2'>
                {/* Billing Address */}
                <div className='border p-4 rounded-md'>
                    <h2 className='text-xl font-semibold'>Billing Address</h2>
                    <div className='flex flex-col ml-10 mt-2'>
                        {billingAddress?.companyName && (
                            <div className='font-medium  '>Company Name: {billingAddress.companyName}</div>
                        )}
                        {billingAddress?.addressLine1 && (
                            <div className='font-medium  '>Address Line 1: {billingAddress.addressLine1}</div>
                        )}
                        {billingAddress?.addressLine2 && (
                            <div className='font-medium  '>Address Line 2: {billingAddress.addressLine2}</div>
                        )}
                        {billingAddress?.city && (
                            <div className='font-medium  '>City: {billingAddress.city}</div>
                        )}
                        {billingAddress?.country && (
                            <div className='font-medium  '>Country: {billingAddress.country}</div>
                        )}
                        {billingAddress?.zipCode && (
                            <div className='font-medium  '>ZIP Code: {billingAddress.zipCode}</div>
                        )}
                        {billingAddress?.vat && (
                            <div className='font-medium  '>VAT: {billingAddress.vat}</div>
                        )}
                    </div>
                </div>

                {/* Contact Information */}
                <div className='border p-4 rounded-md'>
                    <h2 className='text-xl font-semibold'>Contact Information</h2>
                    <div className='flex flex-col ml-10 mt-2'>
                        {contactInfo?.name && (
                            <div className='font-medium  '>Name: {contactInfo.name}</div>
                        )}
                        {contactInfo?.email && (
                            <div className='font-medium  '>Email: {contactInfo.email}</div>
                        )}
                        {contactInfo?.phone && (
                            <div className='font-medium  '>Phone: {contactInfo.phone}</div>
                        )}
                    </div>
                </div>

                {/* Delivery Address */}
                <div className='border p-4 rounded-md'>
                    <h2 className='text-xl font-semibold'>Delivery Address</h2>
                    <div className='flex flex-col ml-10 mt-2'>
                        {deliveryAddress?.companyName && (
                            <div className='font-medium  '>Company Name: {deliveryAddress.companyName}</div>
                        )}
                        {deliveryAddress?.addressLine1 && (
                            <div className='font-medium  '>Address Line 1: {deliveryAddress.addressLine1}</div>
                        )}
                        {deliveryAddress?.addressLine2 && (
                            <div className='font-medium  '>Address Line 2: {deliveryAddress.addressLine2}</div>
                        )}
                        {deliveryAddress?.city && (
                            <div className='font-medium  '>City: {deliveryAddress.city}</div>
                        )}
                        {deliveryAddress?.country && (
                            <div className='font-medium  '>Country: {deliveryAddress.country}</div>
                        )}
                        {deliveryAddress?.zipCode && (
                            <div className='font-medium  '>ZIP Code: {deliveryAddress.zipCode}</div>
                        )}
                        {deliveryAddress?.sameAsBilling && (
                            <div className='font-medium   text-green-600'>This address is the same as billing address.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddressSection;
