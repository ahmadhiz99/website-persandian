'use client';

import React, { useState, ChangeEvent, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

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

export default function FormRequestTTE() {
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [description, setDescription] = useState('');
  const [nik, setNik] = useState('');
  const [nip, setNip] = useState('');
  const [unit, setUnit] = useState('');

  const identityImageRef = useRef<HTMLInputElement>(null);
  
  const [identityImage, setIdentityImage] = useState<File | null>(null);
  const [identityPreview, setIdentityPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<UploadResponse | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleIdentityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, identityImage: 'Ukuran file maksimal 5MB' }));
        return;
      }
      
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, identityImage: 'File harus berupa gambar' }));
        return;
      }
      
      setIdentityImage(file);
      setErrors(prev => ({ ...prev, identityImage: '' }));
      
      const reader = new FileReader();
      reader.onload = () => setIdentityPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Validasi Nama Lengkap
    if (!fullName.trim()) {
      newErrors.fullName = 'Nama lengkap wajib diisi';
    } else if (fullName.trim().length < 3) {
      newErrors.fullName = 'Nama lengkap minimal 3 karakter';
    }

    // Validasi NIK
    if (!nik.trim()) {
      newErrors.nik = 'NIK wajib diisi';
    } else if (!/^\d{16}$/.test(nik)) {
      newErrors.nik = 'NIK harus 16 digit angka';
    }

    // Validasi NIP (opsional, tapi jika diisi harus valid)
    if (nip.trim() && !/^\d{18}$/.test(nip)) {
      newErrors.nip = 'NIP harus 18 digit angka';
    }

    // Validasi Unit
    if (!unit.trim()) {
      newErrors.unit = 'Unit wajib diisi';
    }

    // Validasi Position
    if (!position.trim()) {
      newErrors.position = 'Position wajib diisi';
    }

    // Validasi Email
    if (!email.trim()) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Validasi Phone Number
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Nomor telepon wajib diisi';
    } else if (!/^[\d+\-\s()]+$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Format nomor telepon tidak valid';
    } else if (phoneNumber.replace(/\D/g, '').length < 10) {
      newErrors.phoneNumber = 'Nomor telepon minimal 10 digit';
    }

    // Validasi Description
    if (!description.trim()) {
      newErrors.description = 'Deskripsi wajib diisi';
    } else if (description.trim().length < 10) {
      newErrors.description = 'Deskripsi minimal 10 karakter';
    }

    // Validasi Identity Image
    if (!identityImage) {
      newErrors.identityImage = 'Foto identitas wajib diupload';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi form
    if (!validateForm()) {
      toast.error('Mohon lengkapi semua field yang wajib diisi');
      return;
    }

    setIsLoading(true);
    setUploading(true);

    try {
      const formData = new FormData();
      if (identityImage) formData.append('identityImage', identityImage);
      formData.append('fullName', fullName);
      formData.append('email', email);
      formData.append('position', position);
      formData.append('phoneNumber', phoneNumber);
      formData.append('description', description);
      formData.append('nik', nik);
      formData.append('nip', nip);
      formData.append('unit', unit);

      const response = await fetch('/api/requestForm', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submit Form failed');
      }

      setResult(data);

      // Reset form
      setFullName('');
      setPosition('');
      setPhoneNumber('');
      setEmail('');
      setDescription('');
      setNik('');
      setNip('');
      setUnit('');
      setIdentityImage(null);
      setIdentityPreview(null);
      setErrors({});

      if (identityImageRef.current) {
        identityImageRef.current.value = '';
      }
      
      toast.success('Form Berhasil Dikirimkan');
      router.refresh();
      router.push(`/ticket-generated?ticket=${data.ticket}`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Terjadi kesalahan tak terduga.';
      toast.error('Gagal mengirimkan form: ' + errorMessage);
      console.error('Error submit form:', err);
    } finally {
      setIsLoading(false);
      setUploading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex flex-col py-10 gap-4 max-w-6xl mx-auto px-6 border border-gray-300 rounded shadow-md"
    >
      <h1 className="text-3xl font-bold text-center my-4">Form Permintaan Tanda Tangan Elektronik (TTE)</h1>
      
      {/* Nama Lengkap */}
      <div>
        <h1 className="text-lg font-semibold mb-1">
          Nama Lengkap <span className="text-red-500">*</span>
        </h1>
        <input
          className={`border ${errors.fullName ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="text"
          placeholder="Masukkan Nama"
          value={fullName}
          onChange={(e) => {
            setFullName(e.target.value);
            if (errors.fullName) setErrors(prev => ({ ...prev, fullName: '' }));
          }}
        />
        {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
      </div>

      {/* NIK */}
      <div>
        <h1 className="text-lg font-semibold mb-1">
          NIK <span className="text-red-500">*</span>
        </h1>
        <input
          className={`border ${errors.nik ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="text"
          placeholder="Masukkan NIK (16 digit)"
          value={nik}
          maxLength={16}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setNik(value);
            if (errors.nik) setErrors(prev => ({ ...prev, nik: '' }));
          }}
        />
        {errors.nik && <p className="text-red-500 text-sm mt-1">{errors.nik}</p>}
      </div>

      {/* NIP */}
      <div>
        <h1 className="text-lg font-semibold mb-1">NIP</h1>
        <input
          className={`border ${errors.nip ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="text"
          placeholder="Masukkan NIP (18 digit, opsional)"
          value={nip}
          maxLength={18}
          onChange={(e) => {
            const value = e.target.value.replace(/\D/g, '');
            setNip(value);
            if (errors.nip) setErrors(prev => ({ ...prev, nip: '' }));
          }}
        />
        {errors.nip && <p className="text-red-500 text-sm mt-1">{errors.nip}</p>}
      </div>

      {/* Unit */}
      <div>
        <h1 className="text-lg font-semibold mb-1">
          Unit <span className="text-red-500">*</span>
        </h1>
        <input
          className={`border ${errors.unit ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="text"
          placeholder="Masukkan Unit"
          value={unit}
          onChange={(e) => {
            setUnit(e.target.value);
            if (errors.unit) setErrors(prev => ({ ...prev, unit: '' }));
          }}
        />
        {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit}</p>}
      </div>

      {/* Position */}
      <div>
        <h1 className="text-lg font-semibold mb-1">
          Position <span className="text-red-500">*</span>
        </h1>
        <input
          className={`border ${errors.position ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="text"
          placeholder="Masukkan Position"
          value={position}
          onChange={(e) => {
            setPosition(e.target.value);
            if (errors.position) setErrors(prev => ({ ...prev, position: '' }));
          }}
        />
        {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
      </div>

      {/* Email */}
      <div>
        <h1 className="text-lg font-semibold mb-1">
          Email <span className="text-red-500">*</span>
        </h1>
        <input
          className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="email"
          placeholder="Masukkan Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
          }}
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>
      
      {/* Phone Number */}
      <div>
        <h1 className="text-lg font-semibold mb-1">
          Phone Number <span className="text-red-500">*</span>
        </h1>
        <input
          className={`border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          type="tel"
          placeholder="Masukkan Phone Number"
          value={phoneNumber}
          onChange={(e) => {
            setPhoneNumber(e.target.value);
            if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
          }}
        />
        {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
      </div>

      {/* Description */}
      <div>
        <h1 className="text-lg font-semibold mb-1">
          Description <span className="text-red-500">*</span>
        </h1>
        <textarea
          className={`border ${errors.description ? 'border-red-500' : 'border-gray-300'} px-3 py-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
          placeholder="Masukkan Deskripsi Permintaan (minimal 10 karakter)"
          value={description}
          rows={4}
          onChange={(e) => {
            setDescription(e.target.value);
            if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
          }}
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Identity Image */}
      <div className={`border ${errors.identityImage ? 'border-red-500' : 'border-slate-200'} p-4 rounded-lg`}>
        <h2 className="text-lg font-semibold mb-3">
          Identity Image (KTP)<span className="text-red-500">*</span>
        </h2>
        {identityPreview && (
          <div className="mb-3 h-48 w-48 relative">
            <Image 
              src={identityPreview} 
              alt="Identity Preview" 
              fill
              className="object-cover rounded border border-slate-200"
            />
          </div>
        )}
        <input
          type="file"
          ref={identityImageRef}
          accept="image/*"
          onChange={handleIdentityChange}
          className="block w-full p-2 border border-slate-200 rounded"
        />
        <p className="text-sm text-gray-500 mt-1">Upload foto identitas (JPEG, PNG, max 5MB)</p>
        {errors.identityImage && <p className="text-red-500 text-sm mt-1">{errors.identityImage}</p>}
      </div>

      <button
        type="submit"
        className="btn-beta text-white font-bold rounded-md p-3 w-full transition duration-300 ease-in-out flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? <Loader2 className='size-4 animate-spin' /> : 'Kirim Form'}
      </button>
    </form>
  );
}