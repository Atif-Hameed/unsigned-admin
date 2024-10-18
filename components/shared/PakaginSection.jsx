import React from 'react'

const PakaginSection = ({data}) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl font-semibold'>Packaging Section</h1>
            <div className=' mt-3 flex flex-col gap-2'>
                {/* Display Packaging Type */}
                {data?.packing?.type && (
                    <h2 className='font-medium'>Packaging Type: {data.packing.type}</h2>
                )}

                {/* Display Logo (if exists) */}
                {data?.packing?.logo ? (
                    <div className='mt-4'>
                        <h1 className='font-medium'>Logo:</h1>
                        <a href={data.packing.custom_data.packing} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                    </div>
                ) : (
                    <h1 className='font-medium'>Logo: <span className='font-bold'>-</span></h1>
                )}



                {/* Display Custom File (Image) */}
                {data?.packing?.custom_data && (data.packing.custom_data.comments || data.packing.custom_data.packing) && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.packing.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.packing.custom_data.comments}</h1>
                        )}
                        {data.packing.custom_data.packing && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.packing.custom_data.packing} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>

    )
}

export default PakaginSection
