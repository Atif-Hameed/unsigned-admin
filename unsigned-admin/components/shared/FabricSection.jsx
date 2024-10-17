import React from 'react'

const FabricSection = ({data}) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl font-semibold' >Fabric</h1>
            <div className=' mt-3 flex flex-col gap-2'>
                {data?.fabric?.fabric_name && (
                    <h1 className='font-medium'>Fabric Name: {data.fabric.fabric_name}</h1>
                )}

                {data?.fabric?.custom_data && (data.fabric.custom_data.comments || data.fabric.custom_data.file) && (
                    <div className='mt-2'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.fabric.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.fabric.custom_data.comments}</h1>
                        )}
                        {data.fabric.custom_data.file && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.fabric.custom_data.file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}

export default FabricSection
