import React from 'react'

const NeckLabelSection = ({ data }) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl font-semibold'>Neck Label</h1>
            <div className=' mt-3 flex flex-col gap-2'>
                {data?.neck_label?.label_name && (
                    <div className='font-medium'>Label: {data.neck_label.label_name}</div>
                )}
                {data?.neck_label?.label_material && (
                    <div className='font-medium'>Label Material: {data.neck_label.label_material}</div>
                )}
                {data?.neck_label?.label_color && (
                    <div className='flex items-center'>
                        <span className='font-medium'>Label Color:</span>
                        <div className='w-6 h-6 ml-2' style={{ backgroundColor: data.neck_label.label_color }}></div>
                        <span className='ml-2'>{data.neck_label.label_color}</span>
                    </div>
                )}


                {/* Mapping Files */}
                {data?.neck_label?.files && data.neck_label.files.length > 0 && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Files:</h1>
                        {data.neck_label.files.map((file, index) => (
                            <div key={index} className='font-medium'>
                                <a href={file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>File {index + 1}</a>
                            </div>
                        ))}
                    </div>
                )}

                {/* Neck Label Custom Data */}
                {data?.neck_label?.custom_data && (data.neck_label.custom_data.comments || data.neck_label.custom_data.custom_file) && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.neck_label.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.neck_label.custom_data.comments}</h1>
                        )}
                        {data.neck_label.custom_data.custom_file && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.neck_label.custom_data.custom_file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default NeckLabelSection
