'use client'

import axios from "axios";
import { useState } from "react";

function ForgotPassword() {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    const handleForgotPassword = async (e : React.FormEvent) =>{
        e.preventDefault();

        try{
            const res = await axios.post('/api/auth/forgot-password',{email});
            setError(res.data.message);

        }catch(error : any){
            setError(error.response.data.message);

        }


    }
  return (
    <div>
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <h1 className="text-2xl font-semibold text-center mb-6">Forgot Password</h1>
    
            <form onSubmit={handleForgotPassword} className="space-y-4">
                {error && (
                <div className="p-3 bg-red-100 text-red-600 text-sm rounded">
                    {error}
                </div>
                )}
    
                <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                />
                </div>
    
                <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                Send Email
                </button>
            </form>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassword;