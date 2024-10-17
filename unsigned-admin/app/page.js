"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/shared/CustomInput";
import Button from "@/components/shared/Button";
import MaxContainer from "@/components/shared/MaxContainer";
import toast, { Toaster } from "react-hot-toast";
import logo from "@/assets/logoSmall.png";
import Link from "next/link";
import { useAuth } from "@/app/action/auth-action";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase-config";
import { firebaseErrorMessages } from "@/utils/firebaseErrorHandling";


const Page = () => {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      toast.error("Please enter both email and password");
      return;
    }

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      toast.error('Please enter a valid email address', {
        duration: 4000,
      });
      setIsLoading(false);
      return;
    }

    const loadingToastId = toast.loading('loading...');

    try {
      setIsLoading(true);
      const userCredential = await signInWithEmailAndPassword(auth, trimmedEmail, password);

      localStorage.setItem("adminId", userCredential.user.uid);

      setIsLoading(false);
      toast.success("Successfully logged in", {
        id: loadingToastId,
        duration: 4000,
      });
      router.push("/dashboard/inquiries");
    } catch (error) {
      // setErrorMessage(error?.message || "Failed to login.");
      console.log(error)
      // toast.error(error?.message || "Failed to login.");

      const customError = firebaseErrorMessages[error.code] || {
        code: 500,
        message: 'UNKNOWN_ERROR',
        errors: [
          {
            message: 'An unknown error occurred. Please try again later.',
            domain: 'global',
            reason: 'unknown'
          }
        ]
      };
      console.error('Error:', customError);
      setErrorMessage(customError.message)
      toast.error(customError.message, {
        id: loadingToastId,
        duration: 4000,
      });
    }

  };

  return (
    <MaxContainer>
      <Toaster />
      <div className="relative min-h-screen w-full px-6 flex flex-col justify-center items-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex justify-center w-full py-2">
          <Image alt="logo" src={logo} className="sm:w-48 w-28" unoptimized />
        </div>

        <div className="bg-white sm:mt-0 mt-16 rounded-3xl shadow-xl xl:w-[35%] lg:w-[45%] w-full space-y-6 p-8">
          <h1 className="text-center text-4xl font-semibold">Log in</h1>
          <CustomInput
            type="text"
            label="Email"
            isRequired
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CustomInput
            type="password"
            label="Password"
            isRequired
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
          <div className='flex items-center justify-center pl-3'>
            <div className='w-fit'>
              <Button label={'Log in'} onClick={handleSubmit} />
            </div>
          </div>

        </div>
      </div>
    </MaxContainer>
  );
};

export default Page;
