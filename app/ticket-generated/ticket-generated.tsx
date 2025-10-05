'use client';

import Link from "next/link"
import { useSearchParams } from "next/navigation"

const TicketGeneratedPage = () => {

  const searchParams = useSearchParams();
  const ticket = searchParams.get("ticket");
  return (
    <div className="py-20">
        <div className="flex justify-center py-20 p-10 shadow-md border border-slate-200">
          <div className="text-center">
            <div className="pb-10 ">
              <div className="flex">
                <h2 className="text-md font-medium bg-red-400 text-white rounded text-xs mb-6 px-4 py-1"><span className="font-bold">Perhatian : </span> Simpan Nomor Antrian Anda</h2>
              </div>
              <h2 className="text-md font-medium ">Nomor Antrian Anda Adalah:</h2>
              <h1 className="font-bold text-6xl py-2 mb-4 shadow-md border border-slate-200 ">{ticket}</h1>
              <Link href={`/tracking?ticket=${ticket}`} className="btn-beta px-4 py-1">Lihat Tracking</Link>
            </div>
            <div>
              <p className="text-sm">
                Anda Telah berhasil mendaftarkan permohonon Tanda Tangan Elektronik, untuk mendapatkan lebih lengkap untuk tindak lanjut permohonan tersebut anda dapat melihat monitoring dengan nomor ticket diatas.
              </p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default TicketGeneratedPage;