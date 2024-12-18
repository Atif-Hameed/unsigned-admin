import React from 'react'

const FitSection = ({ data }) => {
    return (
        <div className='w-full h-full'>
            <h1 className='text-2xl font-semibold'>Fit Sizes</h1>
            <div className='ml-10 flex flex-col gap-4'>

                {/* Fit Type */}
                {data?.fit?.fit_type && (
                    <div className=' font-medium  gap-2 text-xl text-center w-full  flex justify-center'>Fit Type: <span className='underline'>{data.fit.fit_type}</span></div>
                )}

                {/* Custom Data */}
                {data?.fit?.custom_data && (data.fit.custom_data.comments || data.fit.custom_data.file) && (
                    <div className='mt-4'>
                        <h1 className='text-primary'>Custom Data</h1>
                        {data.fit.custom_data.comments && (
                            <h1 className='font-medium'>Comments: {data.fit.custom_data.comments}</h1>
                        )}
                        {data.fit.custom_data.file && (
                            <h1 className='font-medium'>
                                Attached File: <a href={data.fit.custom_data.file} target="_blank" rel="noopener noreferrer" className='text-blue-500 underline'>View File</a>
                            </h1>
                        )}
                    </div>
                )}

                {/* Fit Values Table */}
                {data?.fit?.fit_values?.length > 0 ? (
                    <table className='min-w-full border-collapse border border-gray-300 mt-4'>
                        <thead>
                            <tr className='bg-gray-100'>
                                <th className='border border-gray-300 px-4 py-2 text-left'>#</th>
                                <th className='border border-gray-300 px-4 py-2 text-left'>Measurement</th>
                                <th className='border border-gray-300 px-4 py-2 text-center'>XS</th>
                                <th className='border border-gray-300 px-4 py-2 text-center'>S</th>
                                <th className='border border-gray-300 px-4 py-2 text-center'>M</th>
                                <th className='border border-gray-300 px-4 py-2 text-center'>L</th>
                                <th className='border border-gray-300 px-4 py-2 text-center'>XL</th>
                                <th className='border border-gray-300 px-4 py-2 text-center'>XXL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.fit.fit_values.map((fit, index) => (
                                <tr key={index} className='hover:bg-gray-50'>
                                    <td className='border border-gray-300 px-4 py-2'>{index+1}</td>
                                    <td className='border border-gray-300 px-4 py-2'>{fit.name}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{fit.xs || 'N/A'}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{fit.s || 'N/A'}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{fit.m || 'N/A'}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{fit.l || 'N/A'}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{fit.xl || 'N/A'}</td>
                                    <td className='border border-gray-300 px-4 py-2 text-center'>{fit.xxl || 'N/A'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <h1 className='font-medium'>No fit values available.</h1>
                )}
            </div>
        </div>
    )
}

export default FitSection
