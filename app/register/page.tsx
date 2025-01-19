'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';



function page() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [name , setName] = useState<string>("");
    const [error, setError] = useState<string>("");

    const router = useRouter();

    const handleRegister = async (e :React.FormEvent) => {
        e.preventDefault();

        try{
            await axios.post('/api/auth/register',{email,password,name});
            router.push('/login');

        }catch (error){
            setError("Register failed");
            console.error(error)
        }
    }

  return (
   <div className="flex min-h-screen items-center justify-center bg-gray-100">
         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
           <h1 className="text-2xl font-semibold text-center mb-6">Register</h1>
   
           <form onSubmit={handleRegister} className="space-y-4">
             {error && (
               <div className="p-3 bg-red-100 text-red-600 text-sm rounded">
                 {error}
               </div>
             )}
              <div>
               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                 Name
               </label>
               <input
                 type="text"
                 id="name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 required
                 className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
               />
             </div>
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
               className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
             >
               Register
             </button>
           </form>  
         </div>
       </div>
  )
}

export default page

