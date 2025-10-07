import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import path from "path";
import fs from 'fs';
import { statusTicket } from '@/constants/statusTicket';

// Konfigurasi folder upload
const UPLOAD_DIRS = {
  image: path.join(process.cwd(), 'uploads', 'images'),
  document: path.join(process.cwd(), 'uploads', 'documents'),
};

const PUBLIC_URLS = {
  image: '/file/images',
  document: '/file/documents',
};

// Validasi tipe file
const ALLOWED_TYPES = {
  image: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  document: ['application/pdf'],
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const requestForm = await prisma.requestForm.findUnique({
      where: { id },
    })

    if (!requestForm) {
      return NextResponse.json({ message: 'Request form not found.' }, { status: 404 })
    }
    return NextResponse.json(requestForm, { status: 200 })
  } catch (error) {
    console.error('Error fetching request form by ID:', error)
    return NextResponse.json(
      { message: 'Error fetching request form.', error: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  const formData = await request.formData();
  const { id } = await params
  try {
      const identityImage = formData.get('identityImage') as File | null;
      let identityImageResult = null;
      
      if (identityImage && identityImage.size > 0) {
        if (!ALLOWED_TYPES.image.includes(identityImage.type)) {
          throw new Error('Identity Image must be an image (JPEG, PNG, GIF, WEBP)');
        }
  
        const bytes = await identityImage.arrayBuffer();
        const filename = `identity-${Date.now()}.${identityImage.name.split('.').pop()}`;
        const filePath = path.join(UPLOAD_DIRS.image, filename);
        
        await fs.promises.writeFile(filePath, Buffer.from(bytes));
        
        identityImageResult = {
          filename,
          url: `${PUBLIC_URLS.image}/${filename}`,
          type: identityImage.type,
          size: identityImage.size,
        };
      }

    const fullName = formData.get('fullName') as string | null;
    const email = formData.get('email') as string | null;
    const nik = formData.get('nik') as string | null;
    const nip = formData.get('nip') as string | null;
    const unit = formData.get('unit') as string | null;
    const position = formData.get('position') as string | null;
    const phoneNumber = formData.get('phoneNumber') as string | null;
    const description = formData.get('description') as string | null;
    const status_request = formData.get('statusRequest') as string | null;
    const note = formData.get('note') as string | '';
    const updatedAt = new Date();
    const identityImageUrl = identityImageResult ? identityImageResult.url : null;

    if (!email) {
      return NextResponse.json(
        { error: 'Email field harus diisi.' }, 
        { status: 400 }
      );
    }

     let status_log = '-';
      statusTicket.forEach(status => {
        if(status_request == status.id) {
          status_log = status.value 
        }
      });
      

    const updatedRequestForm = await prisma.requestForm.update({
      where: { id },
       data : {
                fullName,
                email,
                nik,
                nip,
                position,
                unit,
                phoneNumber,
                description,
                updatedAt,
                ...(status_request && { status_request }),
                ...(status_request && {
                logStatus: {      
                  create: {
                    statusName: status_log,
                    note: note || ''
                  }
                }
              }),

                ...(identityImageUrl && { identityImage: identityImageUrl }),
            }
    })

    if (status_request && updatedRequestForm.ticket) {
      const emailResult = await handleEmail(
        email, 
        updatedRequestForm.ticket, 
        status_request, 
        note || '',
      );
      
      // Log jika email gagal (tapi tidak menghentikan response)
      if (!emailResult.success) {
        console.error('Email notification failed:', emailResult.message);
      }
    }
    
    return NextResponse.json(updatedRequestForm, { status: 200 })

  } catch (error) {
    console.error('Error updating request form:', error)
    return NextResponse.json(
      { message: 'Error updating request form.', error: (error as Error).message },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.requestForm.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting request form:', error)
    if ((error as { code?: string }).code === 'P2025') {
      return NextResponse.json({ message: 'Request form not found for deletion.' }, { status: 404 })
    }
    return NextResponse.json(
      { message: 'Error deleting request form.', error: (error as Error).message },
      { status: 500 }
    )
  }
}


const handleEmail = async (
  email: string, 
  ticket: string, 
  status: string, 
  note: string
) => {
  // Konfigurasi status dengan warna yang sesuai
  const statusConfig: Record<string, { 
    alias: string; 
    color: string; 
    title: string; 
    message: string;
    displayText: string;
  }> = {
    '1': {
      alias: 'queue',
      color: '#F59E0B', // Orange - Dalam Antrian
      title: 'Permohonan Sedang Diproses',
      message: 'Permohonan Anda sedang dalam tahap review.',
      displayText: 'DALAM ANTRIAN'
    },
    '2': {
      alias: 'validation',
      color: '#3B82F6', // Blue - Validasi
      title: 'Permohonan Dalam Validasi',
      message: 'Permohonan Anda sedang dalam tahap validasi.',
      displayText: 'VALIDASI'
    },
    '3': {
      alias: 'calling',
      color: '#8B5CF6', // Purple - Pemanggilan
      title: 'Permohonan Menunggu Konfirmasi',
      message: 'Silakan konfirmasi panggilan untuk melanjutkan permohonan Anda.',
      displayText: 'PEMANGGILAN'
    },
    '4': {
      alias: 'verification',
      color: '#06B6D4', // Cyan - Verifikasi
      title: 'Permohonan Dalam Verifikasi',
      message: 'Permohonan Anda sedang dalam tahap verifikasi akhir.',
      displayText: 'VERIFIKASI'
    },
    '5': {
      alias: 'completed',
      color: '#10B981', // Green - Selesai
      title: 'Permohonan Selesai',
      message: 'Selamat! Permohonan Anda telah selesai diproses.',
      displayText: 'SELESAI'
    },
    '6': {
      alias: 'rejected',
      color: '#EF4444', // Red - Ditolak
      title: 'Permohonan Ditolak',
      message: 'Mohon maaf, permohonan Anda tidak dapat disetujui.',
      displayText: 'DITOLAK'
    }
  };

  // Pastikan status adalah string dan ambil konfigurasi yang sesuai
  const config = statusConfig[status.toString()] || {
    alias: 'unknown',
    color: '#6B7280',
    title: 'Update Status Permohonan',
    message: 'Status permohonan Anda telah diperbarui.',
    displayText: 'PENDING'
  };

  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #031A65 0%, #00061B 100%); padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
      <h1 style="color: #fff; margin: 0; font-size: 24px;">Diskominfosandi Barito Utara</h1>
    </div>
    
    <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-top: none;">
      <h2 style="color: ${config.color}; margin-top: 0;">${config.title}</h2>
      <p>Halo,</p>
      <p>${config.message}</p>
      
      <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p style="margin: 0 0 10px 0; font-weight: 600; color: #4b5563;">Nomor Ticket:</p>
        <div style="
          background: #031A65;
          color: #fff;
          padding: 12px 20px;
          display: inline-block;
          border-radius: 8px;
          font-size: 20px;
          font-weight: bold;
          letter-spacing: 2px;
        ">
          ${ticket}
        </div>
        
        <div style="margin-top: 20px;">
          <p style="margin: 5px 0; font-weight: 600; color: #4b5563;">Status:</p>
          <span style="
            background: ${config.color}; 
            color: #fff; 
            padding: 8px 16px; 
            border-radius: 20px; 
            font-size: 14px;
            font-weight: 600;
            display: inline-block;
          ">
            ${config.displayText}
          </span>
        </div>
        
        ${note ? `
        <div style="margin-top: 20px;">
          <p style="margin: 5px 0; font-weight: 600; color: #4b5563;">Catatan:</p>
          <p style="
            background: #fff; 
            border-left: 4px solid ${config.color}; 
            padding: 12px; 
            margin: 10px 0;
            color: #374151;
          ">
            ${note}
          </p>
        </div>
        ` : ''}
      </div>
      
      <p>Silakan cek berkala menggunakan fitur tracking dengan nomor ticket tersebut.</p>
      
      <div style="text-align: center; margin-top: 30px;">
        <a href="${process.env.NEXT_PUBLIC_BASE_URL}/tracking" style="
          background: #031A65;
          color: #fff;
          padding: 12px 30px;
          text-decoration: none;
          border-radius: 6px;
          display: inline-block;
          font-weight: 600;
        ">
          Tracking Permohonan
        </a>
      </div>
    </div>
    
    <div style="background: #f9fafb; padding: 20px; text-align: center; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
      <p style="font-size: 12px; color: #6b7280; margin: 0;">
        Email ini dikirim otomatis, mohon tidak membalas.
      </p>
      <p style="font-size: 12px; color: #6b7280; margin: 5px 0 0 0;">
        © ${new Date().getFullYear()} Diskominfosandi Barito Utara
      </p>
    </div>
  </div>
  `;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: `Update Status Permohonan - ${ticket}`,
        text: `Nomor Ticket: ${ticket}\nStatus: ${config.displayText}\n${note ? `Catatan: ${note}` : ''}`,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    if (data.success) {
      console.log("Email berhasil dikirim ke:", email);
      return { success: true, message: "Email berhasil dikirim" };
    } else {
      console.error("Gagal mengirim email:", data);
      return { success: false, message: "Gagal mengirim email" };
    }
  } catch (error) {
    console.error("Error mengirim email:", error);
    return { success: false, message: "Terjadi kesulitan saat mengirim email" };
  }
};