import React from 'react'

const PrintSection = ({ data }) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl font-semibold'>Print</h1>
            <div className=' mt-3 flex flex-col gap-2'>

                <h1 className='font-medium flex items-center gap-2'>
                    Template File:{
                        data.print.template_file?.url ?
                            <a href={data.print.template_file.url} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>Download Template</a>
                            :
                            <h1>No file</h1>
                    }
                </h1>

                {/* Print Custom Data */}
                {data?.print?.custom_data && (data.print.custom_data.comments || data.print.custom_data.file) && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.print.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.print.custom_data.comments}</h1>
                        )}
                        {data.print.custom_data.file && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.print.custom_data.file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}
            </div>
        </div>

    )
}

export default PrintSection
