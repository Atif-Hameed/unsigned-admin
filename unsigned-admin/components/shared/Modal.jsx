"use client";
import { ReactNode } from "react";
import { RxCross1 } from "react-icons/rx";

const Modal = ({ isOpen, onClose, children, label, modalClass }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex p-4 px-6 items-center justify-center z-50">
            <div
                className="fixed top-0 left-0 w-full h-full bg-[#838383ad]"
                onClick={onClose}
            ></div>
            <div
                className={`fixed xl:w-[35%] md:w-[48%] sm:w-[80%] w-[90%] max-h-[96%] custom-scrollbar flex flex-col gap-4 overflow-auto justify-between bg-white px-4 py-3 rounded-lg shadow-lg ${modalClass}`}
            >
                <div className="w-full flex items-center justify-between">
                    <h1 className="sm:text-2xl text-xl font-bold">{label}</h1>
                    <button className="" onClick={onClose}>
                        <RxCross1 className="text-2xl" />
                    </button>
                </div>

                <div className="w-full">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
