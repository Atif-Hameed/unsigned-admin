import React from 'react'

const CareLabelSection = ({ data }) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl font-semibold'>Care Label</h1>
            <div className=' mt-3 flex flex-col gap-2'>
                {data?.care_label?.carelabel_name && (
                    <div className='font-medium'>Care Label: {data.care_label.carelabel_name}</div>
                )}

                {/* Mapping Brand File */}
                {data?.care_label?.brand_file?.url && (
                    <div className='font-medium'>
                        Brand File: <a href={data.care_label.brand_file.url} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View Brand File</a>
                    </div>
                )}

                {/* Care Label Custom Data */}
                {data?.care_label?.custom_data && (data.care_label.custom_data.comments || data.care_label.custom_data.file) && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.care_label.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.care_label.custom_data.comments}</h1>
                        )}
                        {data.care_label.custom_data.file && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.care_label.custom_data.file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>

    )
}

export default CareLabelSection
