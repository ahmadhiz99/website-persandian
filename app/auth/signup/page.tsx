'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignUpPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nip, setNip] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        const res = await fetch('/api/auth/signup',{
            method: 'POST',
            headers: {
                'Content-Typen': 'application/json',
            },
            body: JSON.stringify({ name, email,nip, password }),
        });

        const data = await res.json();

        if(res.ok){
            alert('Pendaftaran berhasil! Silakan masuk.');
            router.push('/auth/signin')
        } else {
            setError(data.message || 'Pendaftaran gagal.');
        }
    };
    
    return (
        <div className="py-20">
            <div className="max-w-md mx-auto p-6 rounded-lg shadow-md border border-slate-200">
                <h1 className="font-bold text-lg">Daftar Akun Baru</h1>
                <form onSubmit={handleSubmit} action="" className="py-4 flex flex-col gap-4" >
                    <div>
                        <label htmlFor="name">Nama:</label>
                        <input  type="text" 
                                className="border border-slate-200 shadow-sm w-full p-2 rounded-md"
                                placeholder="Jhon Doe"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                        />
                    </div>
                    <div>
                        <label htmlFor="name">NIP:</label>
                        <input  type="text" 
                                className="border border-slate-200 shadow-sm w-full p-2 rounded-md"
                                placeholder="200010112025061008"
                                id="nip"
                                value={nip}
                                onChange={(e) => setNip(e.target.value)}
                                required
                        />
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input type="email" 
                                className="border border-slate-200 shadow-sm w-full p-2 rounded-md"
                                placeholder="example@mail.com"
                                id='email'
                                value={email}
                                onChange={(e)=> setEmail(e.target.value)}
                                required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" 
                                id='password'
                                className="border border-slate-200 shadow-sm w-full p-2 rounded-md"
                                placeholder="Masukan password"
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                                required
                        />
                    </div>
                    {error && <p style={{ color: 'red'}}>{error}</p>}
                    <button type='submit' className="btn-beta text-sm animate-all rounded p-2 text-white">Daftar</button>
                </form>
                <p>Sudah punya akun? <Link href="/auth/signin"className='text-blue-500'>Masuk disini</Link></p>
            </div>
        </div>
    )
}

export default SignUpPage;