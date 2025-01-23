'use client'

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import axios from "axios"   

export default function ResetPasswordPage() {
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const router = useRouter();
    const params = useSearchParams();
    const  token  = params.get("token");

    const handleResetPassword = async (e : React.FormEvent) => {

        e.preventDefault();

        try{
            const res = await axios.post('/api/auth/reset-password',{password,token});
            setError(res.data.message);
            router.push('/login');
        }catch(error : any){
            setError(error.response.data.message);
        }
    }
    

    return (
        <>
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
                    <h1 className="text-2xl font-semibold text-center mb-6">Reset Password</h1>

                    <form onSubmit={handleResetPassword} className="space-y-4">
                        {error && (
                            <div className="p-3 bg-red-100 text-red-600 text-sm rounded">
                                {error}
                            </div>
                        )}

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                        >
                            Reset Password
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}