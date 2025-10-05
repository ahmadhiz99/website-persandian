import { 
  MdSecurity, MdVpnKey, MdVisibility, MdSupportAgent, MdOutlinePhishing 
} from "react-icons/md";
import { 
  FaRegFileAlt, FaDatabase, FaUsersCog, FaChartPie, FaNetworkWired 
} from "react-icons/fa";
import { 
  BsJournalText, BsShieldCheck 
} from "react-icons/bs";

export default function TaskCard() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 p-2 max-w-5xl mx-auto">
      
      {/* Persandian */}
      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#359BEE] rounded-lg p-2">
          <MdSecurity size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Pengamanan Informasi</h1>
        <p className="text-center text-xs font-thin p-2">
          Menjaga kerahasiaan komunikasi kedinasan serta melindungi data penting pemerintah.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#359BEE] rounded-lg p-2">
          <MdVpnKey size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Sistem Sandi</h1>
        <p className="text-center text-xs font-thin p-2">
          Mengatur perangkat dan aplikasi persandian agar informasi tetap aman.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#359BEE] rounded-lg p-2">
          <MdVisibility size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Pengawasan</h1>
        <p className="text-center text-xs font-thin p-2">
          Mengawasi serta mengendalikan potensi kebocoran atau penyalahgunaan informasi.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#359BEE] rounded-lg p-2">
          <MdSupportAgent size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Layanan Persandian</h1>
        <p className="text-center text-xs font-thin p-2">
          Memberikan dukungan teknis keamanan informasi bagi perangkat daerah.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#359BEE] rounded-lg p-2">
          <MdOutlinePhishing size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Pencegahan Siber</h1>
        <p className="text-center text-xs font-thin p-2">
          Melakukan deteksi dini dan pencegahan terhadap serangan siber.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#359BEE] rounded-lg p-2">
          <FaRegFileAlt size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Otentikasi Dokumen</h1>
        <p className="text-center text-xs font-thin p-2">
          Menjamin keaslian dokumen resmi dan komunikasi elektronik pemerintah.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#359BEE] rounded-lg p-2">
          <BsShieldCheck size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Koordinasi</h1>
        <p className="text-center text-xs font-thin p-2">
          Berkolaborasi dengan BSSN dan lembaga lain untuk keamanan informasi.
        </p>
      </div>

      {/* Statistik */}
      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#21cd82] rounded-lg p-2">
          <FaDatabase size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Data Valid</h1>
        <p className="text-center text-xs font-thin p-2">
          Menyediakan data statistik akurat untuk perencanaan pembangunan daerah.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#21cd82] rounded-lg p-2">
          <FaUsersCog size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Pengelolaan Statistik</h1>
        <p className="text-center text-xs font-thin p-2">
          Mengumpulkan, mengolah, dan menyajikan data statistik daerah.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#21cd82] rounded-lg p-2">
          <FaChartPie size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Satu Data</h1>
        <p className="text-center text-xs font-thin p-2">
          Menjamin konsistensi data melalui penerapan Satu Data Indonesia.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#21cd82] rounded-lg p-2">
          <FaNetworkWired size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Koordinasi Data</h1>
        <p className="text-center text-xs font-thin p-2">
          Sinkronisasi dan pembinaan data dengan BPS serta perangkat daerah.
        </p>
      </div>

      <div className="flex flex-col px-4 py-6 justify-center items-center text-black rounded-md bg-white shadow-md hover:scale-105 duration-300 hover:contrast-95">
        <div className="bg-[#21cd82] rounded-lg p-2">
          <BsJournalText size={50} className="invert" />
        </div>
        <h1 className="font-bold text-lg mt-4 text-center">Publikasi</h1>
        <p className="text-center text-xs font-thin p-2">
          Menerbitkan data statistik yang mendukung kebijakan daerah.
        </p>
      </div>

      
    </div>
  );
}
