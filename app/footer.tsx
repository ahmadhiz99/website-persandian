import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { IoIosMail } from "react-icons/io";

export default function Footer () {
    return(
        <footer className=" mb-0 flex-col items-center gap-8 justify-center py-10 px-20 bg-radial from-[#031A65] to-[#00061B]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="my-2 relative h-[40] w-[200] rounded-sm overflow-hidden animate-all duration-300 hover:scale-105">
                    <Image
                    src="/assets/images/logo-diskominfosandi.png" 
                    alt="images"
                    fill
                    className="object-fill"
                    quality={100}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-white md:col-span-2">
                    <div className="">
                        <h1 className="font-black text-xs">Alamat</h1>
                        <p className="font-thin text-xs italic">Jl. Pramuka No.21, Lanjas, Kec. Teweh Tengah, Kabupaten Barito Utara, Kalimantan Tengah 73814</p>
                    </div>
                    <div className="">
                       
                        <h1 className="font-black text-xs">Media Sosial</h1>
                        <div className="flex gap-2">
                            <Link href="https://www.instagram.com/persandian_statistik.barut/" className="hover:scale-110 hover:text-slate-400">
                                <FaInstagram />
                            </Link>
                            <Link href="https://www.youtube.com/@BaritoUtara" className="hover:scale-110 hover:text-slate-400">
                                <FaYoutube />
                            </Link>
                            <Link href="https://www.tiktok.com/@diskominfosandibarut" className="hover:scale-110 hover:text-slate-400">
                                <FaTiktok />
                            </Link>
                            <Link href="https://www.baritoutarakab.go.id" className="hover:scale-110 hover:text-slate-400">
                                <TbWorldWww />
                            </Link>
                            <Link href="mailto:diskominfosandi@baritoutarakab.go.id" className="hover:scale-110 hover:text-slate-400">
                                <IoIosMail />
                            </Link>
                        </div>
                    </div>
                         <div className="">
                            <h1 className="font-black text-xs">Email</h1>
                            <p className="font-thin text-xs italic">diskominfosandi@baritoutarakab.go.id</p>
                        </div>
                    
                </div>
            </div>
        </footer>
    )
}