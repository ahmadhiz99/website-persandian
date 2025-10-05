'use client';

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: '/'
        });

        if (result?.error){
            setError(result.error);
        } else {
            router.push(result?.url || '/');
        }
    };

    return (
        <div className="py-20">
            <div className="max-w-md mx-auto px-6 rounded-lg shadow-md py-10 border border-slate-200">
                <h1 className="font-bold text-lg">Login</h1>
                <form onSubmit={handleSubmit} action="" className="py-4 flex flex-col gap-4">
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                            className="shadow-sm border border-slate-200 w-full p-2 rounded-md"
                            type="email" 
                            id="email"
                            value={email}
                            placeholder="example@mail.com"
                            onChange={(e)=>setEmail(e.target.value)}
                            required
                            />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input 
                            className="shadow-sm border border-slate-200 w-full p-2 rounded-md"
                            type="password" 
                            id="password"
                            placeholder="Your Password"
                            value={password}
                            onChange={(e)=> setPassword(e.target.value)}
                            required
                        />
                    </div>
                    { error && <p style={{ color: 'red' }}>{error}</p> } 
                    <button type="submit" className="btn-beta text-sm p-2 animate-all"> Login </button>
                </form>
                {/* <p>Belum punya akun? <Link href="/auth/signup" className="text-blue-700">Daftar disini</Link></p> */}
            </div>
        </div>
    )
}

export default SignInPage;