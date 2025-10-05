'use client';

import { MdPeople } from "react-icons/md";
import { FaUserPen } from "react-icons/fa6";
import { HiBuildingOffice } from "react-icons/hi2";
import { IoIosCloudDone } from "react-icons/io";
import { Suspense, useEffect, useState } from "react";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { log_status } from "@prisma/client";

export default function TrackingTTEPage(){

    const searchParams = useSearchParams();
    const ticket = searchParams.get("ticket");

    const [status, setStatus] = useState('-');
    const [ticketNumber, setTicketNumber] = useState(ticket?ticket:'');
    const [datas, setDatas] = useState([]);
    const [logStatus, setLogStatus] = useState<log_status[]>([]);

    useEffect(() => {
        if (ticket) {
            handleTicket();
            console.log('test HIT');
        }
    }, [ticket])
    
    const generateStatus = () => {
        let statusGenerated = '';
        switch (status) {
            case '1':
                statusGenerated = 'Antrian';
                break
            case '2':
                statusGenerated = 'Diproses'
                break;
            case '3':
                statusGenerated = 'Dipanggil'
                break;
            case '4':
                statusGenerated = 'Diverifikasi'
                break;
            case '5':
                statusGenerated = 'Selesai'
                break;
        
            default:
                break;
        }
        return statusGenerated;
    }

    const handleTicket = async (e?: React.FormEvent) => {
        e?.preventDefault();
        console.log("ticket:", ticketNumber);

        const response = await fetch(`/api/tracking/${ticketNumber}`);
        const data = await response.json();
        console.log("tracking data:", data);

        if(data.error){
            toast.error('Nomor Tiket Tidak Ditemukan: '+ data.error);
            setStatus('-');
        }else{
            toast.success('Data Ditemukan')
            setStatus(data.status_request);
            setDatas(data);
            setLogStatus(data.logStatus);
        }

    };

    return(
        <Suspense fallback={<div>Loading...</div>}>
        
        <div className="pt-20 pb-10 max-w-2xl mx-auto px-10">
            {datas &&
                (
                    <div>
                         <h2>
                            Status: <span className="uppercase font-bold text-amber-500">{generateStatus()}</span>
                        </h2>
                    </div>
                )
            }

            <h1 className='text-lg font-bold text-center'>Tracking Nomor Antrian</h1>
            <form action="" onSubmit={handleTicket} className='py-10'>
                <h1 className='text-sm font-bold' >Nomor Ticket</h1>
                <div className='flex gap-2'>
                    <input 
                        name="ticket"
                        type="text" 
                        value={ticketNumber}
                        onChange={(e)=>setTicketNumber(e.target.value)}
                        className='w-full border border-slate-200 shadow-md rounded px-2 py-1'
                        />
                    <button type="submit" className='btn-beta text-sm px-4'>
                        Lihat
                    </button>
                </div>
            </form>
            <div className='flex gap-2 justify-evenly'>
                <div className='hover:scale-105 hover:cursor-pointer hover:contrast-120'>
                    <div className={`rounded-full p-6
                        ${status == '1' ? 'tracking-icon-now': 
                        status < '1' ? 'tracking-icon-after' : 
                        'tracking-icon-before'}
                        `}>
                        <MdPeople className='text-white' />
                    </div>
                    <h1 className=
                        {`text-xs text-center 
                        ${status == '1' ? 'tracking-text-now': 
                        status < '1' ? 'tracking-text-after' : 
                        'tracking-text-before'}`}
                    >Antrian</h1>
                </div>
                <div className='hover:scale-105 hover:cursor-pointer hover:contrast-120'>
                    <div className={`rounded-full p-6
                        ${status == '2' ? 'tracking-icon-now': 
                        status < '2' ? 'tracking-icon-after' : 
                        'tracking-icon-before'}
                        `}>
                        <FaUserPen className='text-white' />
                    </div>
                    <h1 className=
                        {`text-xs text-center 
                        ${status == '2' ? 'tracking-text-now': 
                        status < '2' ? 'tracking-text-after' : 
                        'tracking-text-before'}`}
                    >Diproses</h1>
                </div>
                <div className='hover:scale-105 hover:cursor-pointer hover:contrast-120'>
                    <div className={`rounded-full p-6
                        ${status == '3' ? 'tracking-icon-now': 
                        status < '3' ? 'tracking-icon-after' : 
                        'tracking-icon-before'}
                        `}>
                        <HiBuildingOffice className='text-white' />
                    </div>
                    <h1 className=
                        {`text-xs text-center 
                        ${status == '3' ? 'tracking-text-now': 
                        status < '3' ? 'tracking-text-after' : 
                        'tracking-text-before'}`}
                    >Dipanggil</h1>
                </div>
                <div className='hover:scale-105 hover:cursor-pointer hover:contrast-120'>
                    <div className={`rounded-full p-6
                        ${status == '4' ? 'tracking-icon-now': 
                        status < '4' ? 'tracking-icon-after' : 
                        'tracking-icon-before'}
                        `}>
                        <FaUserPen className='text-white' />
                    </div>
                    <h1 className=
                        {`text-xs text-center 
                        ${status == '4' ? 'tracking-text-now': 
                        status < '4' ? 'tracking-text-after' : 
                        'tracking-text-before'}`}
                    >Diverifikasi</h1>
                </div>
                <div className='hover:scale-105 hover:cursor-pointer hover:contrast-120'>
                    <div className={`rounded-full p-6
                        ${status == '5' ? 'tracking-icon-now ': 
                        status < '5' ? 'tracking-icon-after' : 
                        'tracking-icon-before'}
                        `}>
                        <IoIosCloudDone className='text-white' />
                    </div>
                    <h1 className=
                        {`text-xs text-center 
                        ${status == '5' ? 'tracking-text-now': 
                        status < '5' ? 'tracking-text-after' : 
                        'tracking-text-before'}`}
                    >Selesai</h1>
                </div>
               
            </div>

            {/* <div className='my-6 py-4 px-4 shadow-md rounded border border-slate-200'>
                <h6 className=' text-xs font-semibold my-1'>Status : <span className="text-yellow-500 uppercase">{status}</span> </h6>
                <h6 className=' text-xs font-bold my-3'>Rincian:</h6>
                <h6 className=' text-xs font-semibold'>19:17:21 - File Diproses</h6>
                <h6 className='text-xs font-thin'>10:22:10 - Masuk Kedalam Antrian</h6>
            </div> */}

            {status > '0' ?
                (
                    <div className="my-6 py-4 px-4 shadow-md rounded border border-slate-200">
                        {/* Status terbaru */}
                        <h6 className="text-xs font-bold my-1 bg-indigo-500 px-2 py-1 rounded-lg flex text-white">
                            Status :  
                            <span className="text-yellow-500 uppercase mx-1">
                            {logStatus[0]?.statusName}
                            </span>
                        </h6>
                        <hr className="text-slate-300" />

                        {/* Rincian */}
                        <h6 className="text-sm font-bold mt-3 mb-1">Rincian:</h6>
                        {logStatus.map((log, i) => (
                            <h6
                            key={log.id}
                            className={`text-xs ${i === 0 ? 'font-semibold' : 'font-thin'}`}
                            >
                            {new Date(log.createdAt).toLocaleTimeString('id-ID')} -{" "}
                            {log.note || log.statusName}
                            </h6>
                        ))}
                        </div>

                )
                :
                (
                    <div className="my-6 py-4 px-4 shadow-md rounded border border-slate-200 text-center">
                            <h1 className="text-sm font-semibold my-1">
                               Data Tidak Ditemukan
                            </h1>
                            <h1 className="text-xs font-thin my-1">
                               Masukan Nomor Antian yang Valid
                            </h1>
                    </div>
                )
            }
        </div>
    </Suspense>
    )
}