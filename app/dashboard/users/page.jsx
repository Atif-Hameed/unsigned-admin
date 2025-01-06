'use client';
import { getAllUsers } from '@/app/action/profile-update-action';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 10; // Number of users to display per page

    // Fetch users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersList = await getAllUsers();
                setUsers(usersList);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Get current users based on pagination
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    // Calculate total pages
    const totalPages = Math.ceil(users.length / usersPerPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Handle previous and next button clicks
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    // Generate page numbers with "..." logic
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const totalVisiblePages = 5;

        if (totalPages <= totalVisiblePages) {
            // If total pages are less than or equal to 5, show all
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // If total pages are more than 5, show a subset of page numbers
            if (currentPage <= 3) {
                pageNumbers.push(1, 2, 3, 4, 5, '...');
            } else if (currentPage > 3 && currentPage < totalPages - 2) {
                pageNumbers.push('...', currentPage - 1, currentPage, currentPage + 1, '...');
            } else {
                pageNumbers.push('...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
        }

        return pageNumbers;
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl text-center my-5 text-primary">All Registered Users</h1>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-5">
                    <div className="w-12 h-12 border-4 border-primary border-dotted rounded-full animate-spin"></div>
                    <p className="ml-4 text-primary text-xl">Loading users...</p>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="text-center py-5">
                    <p className="text-red-500 text-xl">Failed to load users: {error}</p>
                </div>
            )}

            {/* No Users State */}
            {!loading && !error && users.length === 0 && (
                <div className="text-center py-5">
                    <p className="text-gray-500 text-xl">No users found.</p>
                </div>
            )}

            {/* Users Table */}
            {!loading && !error && users.length > 0 && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-lightBackground border-collapse shadow-md rounded-lg">
                        <thead className="bg-dark">
                            <tr>
                                <th className="p-4 text-left text-white">Name</th>
                                <th className="p-4 text-left text-white">Email</th>
                                <th className="p-4 text-left text-white">Phone</th>
                                <th className="p-4 text-left text-white">Brand / Company</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr
                                    key={user.uid}
                                    className="even:bg-background odd:bg-lightBackground"
                                >
                                    <td className="p-4 border-b border-gray-300">
                                        {user.firstName} {user.lastName || ''}
                                    </td>
                                    <td className="p-4 border-b border-gray-300">{user.email}</td>
                                    <td className="p-4 border-b border-gray-300">
                                        {user.phone || 'N/A'}
                                    </td>
                                    <td className="p-4 border-b border-gray-300">
                                        {user.brandName || 'N/A'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-5">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 mx-1 border rounded ${currentPage === 1 ? 'bg-gray-300' : 'bg-lightBackground text-primary'
                                }`}
                        >
                            Prev
                        </button>

                        {renderPageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                disabled={typeof page !== 'number'}
                                className={`px-4 py-2 mx-1 border rounded ${currentPage === page
                                    ? 'bg-primary text-white'
                                    : 'bg-lightBackground text-primary'
                                    }`}
                            >
                                {page}
                            </button>
                        ))}

                        <button
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 mx-1 border rounded ${currentPage === totalPages ? 'bg-gray-300' : 'bg-lightBackground text-primary'
                                }`}
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
