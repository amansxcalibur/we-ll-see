"use client";
import { useState } from "react";

import Image from "next/image"
import modern_art from "@/public/Assets/scroll_art.png"
import logo from "@/public/Assets/logo.png"

export default function Login() {
    const [isRegister, setIsRegister] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const passwordsMatch = password === confirmPass || !isRegister;

    return (
        <div className="grid grid-cols-[60%_40%] gap-4 h-screen overflow-hidden">
            <div className="absolute top-5 right-5 z-50">
                <Image src={logo} alt="logo" className="rounded-full border-white shadow-lg h-17 w-17 mr-25" />
            </div>
            <div className="relative overflow-hidden h-full">
                <div className="absolute inset-0 pl-50 scroll-wrapper animate-vertical-scroll">
                    <Image src={modern_art} alt="modern art" className="w-200 object-cover"/>                    
                    <Image src={modern_art} alt="modern art duplicate" className="w-200 object-cover"/>
                </div>
            </div>
            <div className="flex h-screen bg-black-500">
            <div className="m-auto bg-black-500 p-10 max-w-md w-full ml-20">

            <h1 className="text-4xl font-bold text-white mb-3">
            {isRegister ? "Register" : "Sign in"}
            </h1>

            <label className="text-gray-200 text-sm">Email</label>
            <input
            type="text"
            placeholder="Enter email"
            className="w-full p-3 mt-1 mb-5 bg-black/30 border border-gray-600 rounded-lg text-gray-200"
            />

            <label className="text-gray-200 text-sm">Password</label>
            <input
            type="password"
            placeholder="Enter password"
            className="w-full p-3 mt-1 mb-5 bg-black/30 border border-gray-600 rounded-lg text-gray-200"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />

            {isRegister && (
            <>
                <label className="text-gray-200 text-sm">Confirm Password</label>
                <input
                type="password"
                placeholder="Confirm password"
                className={`w-full p-3 mt-1 mb-5 bg-black/30 rounded-lg text-gray-200 border 
                    ${passwordsMatch ? "border-gray-600" : "border-red-500"}`}
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                />

                {!passwordsMatch && (
                <p className="text-red-400 text-sm -mt-4 mb-4">
                    Passwords do not match.
                </p>
                )}
            </>
            )}

            {!isRegister && (
            <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 text-gray-300">
                <input type="checkbox" />
                Remember me
                </label>

                <a className="text-blue-400 hover:underline cursor-pointer">
                Forgot your password?
                </a>
            </div>
            )}

            <button
            className={`w-full ${
                isRegister ? "bg-blue-600 hover:bg-blue-700" : "bg-blue-600 hover:bg-blue-700"
            } text-white p-3 rounded-lg text-lg font-semibold`}
            >
            {isRegister ? "Register" : "Sign in"}
            </button>

            <p className="text-gray-300 text-center mt-5">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}

            <span
                className="text-blue-400 ml-1 hover:underline cursor-pointer"
                onClick={() => {
                setIsRegister(!isRegister);
                setConfirmPass("");
                setPassword("");
                }}
            >
                {isRegister ? "Sign in" : "Register here"}
            </span>
            </p>
            </div>
            </div>
        </div>
    )
}