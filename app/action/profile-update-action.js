

import { db } from '@/config/firebase-config';
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';

// Function to update user data
export const updateUserData = async (uid, userData) => {
    // Create a reference to the user's document
    const userRef = doc(db, "users", uid); // 'users' is the collection name and uid is the document ID

    try {
        // Update the user document with new data
        await updateDoc(userRef, userData);
        console.log("User data updated successfully in Firestore");
    } catch (error) {
        console.error("Error updating user data in Firestore:", error.message);
        throw new Error("Failed to update user data");
    }
};



// Function to get all users
export const getAllUsers = async () => {
    const usersRef = collection(db, "users"); // 'users' is the collection name

    try {
        const querySnapshot = await getDocs(usersRef);
        const usersList = querySnapshot.docs.map((doc) => ({
            uid: doc.id,
            ...doc.data(),
        }));
        return usersList;
    } catch (error) {
        console.error("Error fetching users from Firestore:", error.message);
        throw new Error("Failed to get users");
    }
};
