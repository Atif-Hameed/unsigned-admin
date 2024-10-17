import React from 'react'

const ColorSection = ({data}) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl font-semibold'>Color</h1>
            <div className=' mt-3 flex flex-col gap-2'>
                {data?.color?.color_code && (
                    <div className='flex items-center'>
                        <span className='font-medium'>Color Code:</span>
                        <div className='w-6 h-6 ml-2' style={{ backgroundColor: data.color.color_code }}></div>
                        <span className='ml-2'>{data.color.color_code}</span>
                    </div>
                )}

                {/* Color Custom Data */}
                {data?.color?.custom_data && (data.color.custom_data.comments || data.color.custom_data.file) && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.color.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.color.custom_data.comments}</h1>
                        )}
                        {data.color.custom_data.file && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.color.custom_data.file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ColorSection
