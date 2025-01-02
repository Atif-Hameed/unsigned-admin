'use client';
import { getAllUsers } from '@/app/action/profile-update-action';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

    return (
        <div className="p-5">
            <h1 className="text-2xl text-center my-5">All Registered Users</h1>

            {/* Loading State */}
            {loading && (
                <div className="flex justify-center items-center py-5">
                    <div className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
                    <p className="ml-4 text-blue-500 text-xl">Loading users...</p>
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
            {!loading && !error && (
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
                            {users.map((user) => (
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
                </div>
            )}
        </div>
    );
};

export default Page;
