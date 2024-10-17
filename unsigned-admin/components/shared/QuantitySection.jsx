import React from 'react'

const QuantitySection = ({ data }) => {
    return (
        <div className='w-full h-full mt-8'>
            <h1 className='text-2xl font-semibold'>Quantity</h1>
            <div className='ml-10 flex flex-col gap-4'>


                {/* Display Quantities */}
                {data.quantity.quantities && (
                    <div className='mt-5'>
                        <h2 className='font-semibold'>Quantities:</h2>
                        <div className='border mt-3 border-gray-300 w-full rounded-lg p-4'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='border-b-2 border-gray-300 pb-2 text-center'>Size</th>
                                        <th className='border-b-2 border-gray-300 pb-2 text-center'>Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(data.quantity.quantities).map(([size, quantity]) => (
                                        <tr key={size} className='border-b border-gray-200'>
                                            <td className='py-2 text-center'>{size}</td>
                                            <td className='py-2 text-center'>{quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Display Custom Data Comments */}
                {data?.quantity?.custom_data && (data.quantity.custom_data.comments || data.quantity.custom_data.file) && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.quantity.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.quantity.custom_data.comments}</h1>
                        )}
                        {data.quantity.custom_data.file && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.quantity.custom_data.file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>

    )
}

export default QuantitySection
