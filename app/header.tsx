'use client';
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaCaretDown } from "react-icons/fa";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { useState, useEffect } from "react";

export default function Header (){
    const { data: session} = useSession();
    
    const [isNavbarOpen, setIsNavbarOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Tunggu sampai komponen di-mount di client
    useEffect(() => {
        setMounted(true);
    }, []);

    const touchNavbar = () => {
        setIsNavbarOpen(!isNavbarOpen);
    };

    if (!mounted) {
        return (
            <header className="bg-blues text-white p-2 w-full fixed z-50">
                <div className="flex sm:flex gap-2 justify-between items-center px-4">
                    <div className="hidden sm:block my-2 relative h-[30px] w-[160px] rounded-sm overflow-hidden transition-all duration-300 hover:scale-105">
                        <Image
                            src="/assets/images/logo-diskominfosandi.png" 
                            alt="images"
                            fill
                            className="object-fill"
                            quality={100}
                        />
                    </div>
                    <div className="w-full">
                        <div className="sm:hidden flex justify-between">
                            <div className="justify-center my-2 relative h-[30px] w-[160px] rounded-sm overflow-hidden transition-all duration-300 hover:scale-105">
                                <Image
                                    src="/assets/images/logo-diskominfosandi.png" 
                                    alt="images"
                                    fill
                                    className="object-contain"
                                    quality={100}
                                />
                            </div>
                            <div className="flex justify-end items-center">
                                <button className="bg-indigo-500 p-1 text-white text-xs px-4 font-bold rounded shadow-md">
                                    |||
                                </button>
                            </div>
                        </div>
                        <div className="hidden sm:flex sm:flex-row sm:gap-4 font-medium text-sm items-center w-full justify-evenly sm:justify-end">
                            {/* Konten navbar static untuk SSR */}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
    
    return(
        <header className="bg-blues text-white p-2 w-full fixed z-50">
            <div className="flex sm:flex gap-2 justify-between items-center px-4">

                {/* Logo untuk Desktop */}
                <div className="hidden sm:block my-2 relative h-[30px] w-[160px] rounded-sm overflow-hidden transition-all duration-300 hover:scale-105">
                    <Image
                        src="/assets/images/logo-diskominfosandi.png" 
                        alt="images"
                        fill
                        className="object-fill"
                        quality={100}
                    />
                </div>

                <div className="w-full">
                    {/* Mobile Header */}
                    <div className="sm:hidden flex justify-between">
                        {/* Logo Mobile */}
                        <div className="justify-center my-2 relative h-[30px] w-[160px] rounded-sm overflow-hidden transition-all duration-300 hover:scale-105">
                            <Image
                                src="/assets/images/logo-diskominfosandi.png" 
                                alt="images"
                                fill
                                className="object-contain"
                                quality={100}
                            />
                        </div>
                        
                        {/* Button Toggle Navbar Mobile */}
                        <div className="flex justify-end items-center">
                            <button 
                                id="navbar-button"
                                className={`bg-indigo-500 p-2 text-white text-xs font-bold rounded-lg shadow-md hover:cursor-pointer hover:scale-99 transition-all duration-300 transform 
                                    ${isNavbarOpen ? 'rotate-90 py-3 bg-red-400' : 'px-3'}`}
                                onClick={touchNavbar}>
                                {isNavbarOpen ? <X size={16} /> : <Menu size={16} />}
                            </button>
                        </div>
                    </div>

                    {/* Navbar Menu */}
                    <div 
                        id="navbar" 
                        className={`${isNavbarOpen ? 'flex' : 'hidden'} flex-col gap-2 sm:flex sm:flex-row sm:gap-4 font-medium text-sm items-center w-full justify-evenly sm:justify-end`}>

                        <div className="text-center py-2 sm:py-0">
                            <Link href="/" className="btn-alpha px-4 py-1 transition-all">Beranda</Link>
                        </div>

                        <div className="flex text-center justify-center py-2 sm:py-0 items-center">
                            <Link href="/#task" className="btn-alpha px-4 py-1 transition-all">Tugas Bidang</Link>
                        </div>

                        <div className="text-center py-2 sm:py-0">
                            <Link href="/#infografis" className="btn-alpha px-4 py-1 transition-all">Infografis</Link>
                        </div>
                        
                        <div className="text-center py-2 sm:py-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn-alpha">
                                        Layanan
                                        <FaCaretDown />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56 bg-white" align="start">
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href="/tte" className="w-full rounded px-4 py-1 hover:bg-slate-200 hover:cursor-pointer transition-all">
                                                TTE
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link href="/tracking" className="w-full rounded px-4 py-1 hover:bg-slate-200 hover:cursor-pointer transition-all">
                                                Tracking
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
        
                        {/* User Session / Login */}
                        {session ? (
                            <div className="m-2 bg-slate-600 p-1 rounded-lg">
                                <Link href="/admin/dashboard">
                                    <p className="text-xs font-thin hover:scale-98 text-center">
                                        {(session.user?.name || session.user?.email)?.split(" ")[0]}
                                    </p>
                                </Link>
                                <button 
                                    className="bg-red-500 p-1 text-white text-[8px] w-full font-bold rounded shadow-md hover:cursor-pointer hover:scale-99" 
                                    onClick={() => signOut()}>
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-center">
                                <Link href="/auth/signin" className="btn-beta transition-all font-thin text-sm px-3 py-1">
                                    Login
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}