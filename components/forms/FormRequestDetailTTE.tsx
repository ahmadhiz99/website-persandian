'use client';

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
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

export default function FormRequestDetailTTE(
  { 
    // id, 
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
    createdAt: initialCreatedAt,
    updatedAt: initialUpdatedAt,
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
  const [statusRequest] = useState(initialStatusRequest || '');
  const [ticket] = useState(initialTicket || '');
  const [createdAt] = useState(initialCreatedAt || '');
  const [updatedAt] = useState(initialUpdatedAt || '');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(uploading);
    console.log(result);
    console.log(error);
    console.log(isLoading);

     // Validasi minimal 1 file diupload
     if (!identityImage) {
      setError('Please upload file');
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      if (identityImage) formData.append('identityImage', identityImage);
      formData.append('fullName', fullName);
      formData.append('nik', nik);
      formData.append('nip', nip);
      formData.append('unit', unit);
      formData.append('email', email);
      formData.append('position', position);
      formData.append('phoneNumber', phoneNumber);
      formData.append('description', description);
      formData.append('statusRequest', statusRequest);
      formData.append('ticket', ticket);
      formData.append('createdAt', createdAt);
      formData.append('updatedAt', updatedAt);

      const response = await fetch('/api/requestForm', {
        method: 'POST',
        body : formData,
      });

      const data = await response.json();

      if (!data) {
        throw new Error(data.error || 'Submit Form failed');
      }

      setResult(data);

      setFullName('');
      setNik('');
      setNip('');
      setUnit('');
      setPosition('');
      setPhoneNumber('');
      setEmail('');
      setDescription('');
      setIdentityImage(null);
      setIdentityPreview(null);

       // Mereset nilai input file DOM secara langsung
    if (identityImageRef.current) {
      identityImageRef.current.value = '';
    }
 
      toast.success('Form Berhasil Dikirimkan');
      router.refresh(); // Ini yang akan memicu re-render Server Component
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
  className="flex flex-col py-10 gap-2 max-w-6xl mx-auto p-6 border border-gray-300 rounded-2xl shadow-md bg-white"
>
  <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">
    Detail Form Request TTE
  </h1>

  {/* Grid utama */}
  <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
    {/* Nama Lengkap */}
    <div>
      <p className="text-sm text-gray-500">Nama Lengkap</p>
      <p className="text-sm font-semibold">{fullName}</p>
    </div>

    {/* NIK */}
    <div>
      <p className="text-sm text-gray-500">NIK</p>
      <p className="text-sm font-semibold">{nik}</p>
    </div>

    {/* NIP */}
    <div>
      <p className="text-sm text-gray-500">NIP</p>
      <p className="text-sm font-semibold">{nip}</p>
    </div>

    {/* Unit */}
    <div>
      <p className="text-sm text-gray-500">Unit</p>
      <p className="text-sm font-semibold">{unit}</p>
    </div>

    {/* Position */}
    <div>
      <p className="text-sm text-gray-500">Position</p>
      <p className="text-sm font-semibold">{position}</p>
    </div>

    {/* Email */}
    <div>
      <p className="text-sm text-gray-500">Email</p>
      <p className="text-sm font-semibold">{email}</p>
    </div>

    {/* Phone Number */}
    <div>
      <p className="text-sm text-gray-500">Phone Number</p>
      <p className="text-sm font-semibold">{phoneNumber}</p>
    </div>

    {/* Description */}
    <div className="md:col-span-2">
      <p className="text-sm text-gray-500">Description</p>
      <p className="text-sm font-semibold">{description}</p>
    </div>

    {/* Ticket */}
    <div>
      <p className="text-sm text-gray-500">Ticket</p>
      <p className="text-sm font-semibold">{ticket}</p>
    </div>

    {/* Status Request */}
    <div>
      <p className="text-sm text-gray-500">Status Request</p>
      <p className="text-sm font-semibold">
        {statusTicket.map((status)=>(
          statusRequest == status.id ? status.value : null
        ))}
      </p>
    </div>

    {/* createdAt */}
    <div>
      <p className="text-sm text-gray-500">Created At</p>
      <p className="text-sm font-semibold">{createdAt}</p>
    </div>
  </div>

  {/* Identity Image */}
  <div className="border p-4 rounded-lg mt-6 bg-gray-50">
    <h2 className="text-sm font-semibold mb-3 text-gray-700">Identity Image</h2>
    {identityPreview ? (
      <Image 
        src={identityPreview} 
        alt="Identity Preview" 
        width={250}
        height={250}
        className="rounded-xl border border-gray-200 shadow-md"
      />
    ) : (
      <p className="text-gray-400 text-sm">No image uploaded</p>
    )}
  </div>
</form>

    
  );
}