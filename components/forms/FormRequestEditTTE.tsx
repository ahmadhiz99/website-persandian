'use client';

import React, { useState, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { RequestTTE } from "@/app/types/RequestTTE";
import Image from 'next/image';
import { statusTicket } from '@/constants/statusTicket';

type FileResult = {
  filename: string;
  url: string;
  type: string;
  size: number;
} | null;

type UploadResponse = {
  success: boolean;
  error?: string;
  files: {
    identityImage: FileResult;
  };
};

export default function FormRequestEditTTE(
  { 
    id:initialId, 
    fullName: initialFullName, 
    nik: initialNik,
    nip: initialNip,
    unit: initialUnit,
    position: initialPosition,
    email:initialEmail,
    phoneNumber: initialPhoneNumber,
    description: initialDescription,
    identityImage: initialIdentityImage,
    status_request: initialStatusRequest,
    ticket: initialTicket,
  }: 
  RequestTTE
) {
  
  const [fullName, setFullName] = useState(initialFullName || '');
  const [nik, setNik] = useState(initialNik || '');
  const [nip, setNip] = useState(initialNip || '');
  const [unit, setUnit] = useState(initialUnit || '');
  const [position, setPosition] = useState(initialPosition || '');
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber || '');
  const [email, setEmail] = useState(initialEmail || '');
  const [description, setDescription] = useState(initialDescription || '');
  const [statusRequest, setStatusRequest] = useState(initialStatusRequest || '');
  const [note, setNote] = useState('');
  const [ticket] = useState(initialTicket || '');

  // Ref untuk setiap elemen input file
  const identityImageRef = useRef<HTMLInputElement>(null);
  
  const fileName = initialIdentityImage.split("/").pop(); 
  const finalPath = `/api/images/${fileName}`;
  const [identityPreview, setIdentityPreview] = useState<string | null>(finalPath || null);

  const [identityImage, setIdentityImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleIdentityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIdentityImage(file);
      
      // Buat preview untuk gambar
      const reader = new FileReader();
      reader.onload = () => setIdentityPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(uploading);
    console.log(result);
    console.log(error);
    console.log(isLoading);

     // Validasi minimal 1 file diupload
     if (!identityPreview) {
      setError('Please upload file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      identityImage ? formData.append('identityImage', identityImage) : null ;
      formData.append('fullName', fullName);
      formData.append('nik', nik);
      formData.append('nip', nip);
      formData.append('unit', unit);
      formData.append('email', email);
      formData.append('position', position);
      formData.append('phoneNumber', phoneNumber);
      formData.append('description', description);
      formData.append('ticket', ticket);
      
      if (statusRequest != initialStatusRequest){
        formData.append('statusRequest', statusRequest)
        formData.append('note', note);
      };

      const response = await fetch(`/api/requestForm/${initialId}`, {
        method: 'PATCH',
        body : formData,
      });

      const data = await response.json();

      if (!data) {
        throw new Error(data.error || 'Submit Form failed');
      }

      setResult(data);

      toast.success('Form Berhasil Dikirimkan');
      router.replace("/admin/request-tte");
      setIsLoading(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga.');
      console.error('Error submit form:', err);
      toast.error('Gagal mengirimkan form: ' + (err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga.'));
    } finally {
      setIsLoading(false);
      setUploading(false);
    }
  };

  return (
    <form 
        onSubmit={handleSubmit} 
        className="flex flex-col py-10 gap-4 max-w-6xl mx-auto p-4 border border-gray-300 rounded shadow-md">
      <h1 className="text-xl font-bold text-center mb-1">Form Request TTE</h1>
      <div>
        <h1 className="text-lg font-semibold mb-1">Nama Lengkap</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Masukkan Nama"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div>
        <h1 className="text-lg font-semibold mb-1">NIK</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Masukkan NIK"
          value={nik}
          onChange={(e) => setNik(e.target.value)}
        />
      </div>
      
      <div>
        <h1 className="text-lg font-semibold mb-1">NIP</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Masukkan NIP"
          value={nip}
          onChange={(e) => setNip(e.target.value)}
        />
      </div>
      
      <div>
        <h1 className="text-lg font-semibold mb-1">Unit</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Masukkan Unit"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
      </div>
      
      <div>
        <h1 className="text-lg font-semibold mb-1">Position</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Masukkan Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </div>

      <div>
        <h1 className="text-lg font-semibold mb-1">Email</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
      </div>
      
      <div>
        <h1 className="text-lg font-semibold mb-1">Phone Number</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="number"
          placeholder="Masukkan Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          
        />
      </div>
      
      <div>
        <h1 className="text-lg font-semibold mb-1">Description</h1>
        <input
          className="border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Masukkan Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          
        />
      </div>

       {/* Identity Image */}
       <div className="border p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Identity Image</h2>
          {identityPreview && (
            <div className="mb-3">
              <Image 
                src={identityPreview} 
                width={250}
                height={250}
                alt="Identity Preview" 
                className="max-w-xs h-auto rounded border border-gray-200"
              />
            </div>
          )}
          <input
            type="file"
            ref={identityImageRef}
            accept="image/*"
            onChange={handleIdentityChange}
            className="block w-full p-2 border rounded"
          />
          <p className="text-sm text-gray-500 mt-1">Upload your identity image (JPEG, PNG)</p>
        </div>

        <div className='border rounded -lg p-4'>
          <h1 className="text-lg font-semibold mb-2">Status Request</h1>
          <div className='grid gap-2'>
            <div>
              <h2>Ubah Status:</h2>
              <select className='border border-gray-300 px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                value={statusRequest} onChange={(e) => setStatusRequest(e.target.value)}>
                {statusTicket.map((status)=> (
                  <option key={status.id} value={status.id}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            {statusRequest !== initialStatusRequest &&
            (
              <div className='w-full'>
                <h2>Pesan atatu catatan:</h2>
                <textarea name="note" onChange={(e) => setNote(e.target.value)} id=""  className='border w-full rounded p-2 border-slate-300' />
              </div>
            )
            }

          </div>
        </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <button
        type="submit"
        className="bg-blue-600 
                  hover:bg-blue-700 text-white font-bold 
                  rounded-md p-3 w-full transition duration-300 
                  ease-in-out
                  justify-items-center
                  "
        disabled={isLoading}
      >
        {/* {isLoading ? 'Menambahkan...' : 'Submit'} */}
        {isLoading ? <Loader2 className='size-4 animate-spin' /> : 'Kirim Form'}
      </button>
    </form>
    
    
  );
}