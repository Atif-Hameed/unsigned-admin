'use client';
import { auth } from "@/config/firebase-config";
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase-config";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // Fetch additional user details from Firestore
                    const userDoc = await getDoc(doc(db, "admin", firebaseUser.uid));
                    
                    if (userDoc.exists()) {
                        setUser({ ...firebaseUser, ...userDoc.data() });
                    } else {
                        setUser({ uid: firebaseUser.uid, email: firebaseUser.email });
                    }

                    localStorage.setItem("adminId", firebaseUser.uid);
                } catch (fetchError) {
                    console.error("Error fetching user data from Firestore:", fetchError);
                }
            } else {
                setUser(null);
                localStorage.removeItem("adminId");
            }
            setIsLoading(false);
        });

        return () => unsub();
    }, []);

    const handleLoginWithEmailAndPassword = async (email, password) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const loggedInUser = userCredential.user;

            // Fetch additional user details from Firestore
            const userDoc = await getDoc(doc(db, "admin", loggedInUser.uid));
            if (userDoc.exists()) {
                setUser({ ...loggedInUser, ...userDoc.data() });
            } else {
                setUser({ uid: loggedInUser.uid, email: loggedInUser.email });
            }

            localStorage.setItem("adminId", loggedInUser.uid);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogout = async () => {
        setIsLoading(true);
        try {
            await signOut(auth);
            setUser(null);
            localStorage.removeItem("adminId");
        } catch (error) {
            setError(error?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                error,
                handleLoginWithEmailAndPassword,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
