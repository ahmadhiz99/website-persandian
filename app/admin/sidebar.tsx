'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

    const touchSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
      <div className="flex">
        <div id="sidebar" 
        className={` ${isOpen ? "block" : "hidden"} w-64 bg-gray-800 text-white p-4 space-y-2 text-nowrap animation-right duration-500 transform`}>
          <h2 className="text-lg font-bold">Admin Panel</h2>
          <nav>
            <ul>
              <li><Link href="/admin/dashboard" 
                    className={`text-sm block p-2 my-2 rounded  ${pathname === "/admin/dashboard" ? "bg-gray-300 text-gray-700" : "hover:bg-gray-600"}`}>
                      Dashboard
                  </Link>
              </li>
              <li><Link href="/admin/request-tte" 
                    className={`text-sm block p-2 my-2 rounded  ${pathname === "/admin/request-tte" ? "bg-gray-300 text-gray-700" : "hover:bg-gray-600"}`}>
                      Request TTE
                  </Link>
              </li>
              
            </ul>
          </nav>
        </div>

        <div className="relative sm:pt-5">
          <div className={` ${isOpen ? '' : 'px-1'}  text-red-500 py-2`}>
            <button 
                className={`bg-gray-800 p-2 text-white text-xs font-bold  shadow-md hover:cursor-pointer hover:scale-99 transition-all duration-300 transform 
                  ${isOpen ? 'rounded-r-md' : ''}`}
                onClick={touchSidebar}>
                {isOpen ? <X size={16} />  : <Menu size={16} />}

            </button>
          </div>
        </div>

      </div>
    );
  }