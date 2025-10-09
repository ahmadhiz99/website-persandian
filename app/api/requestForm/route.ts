import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { sendEmail } from "@/lib/email";
import path from "path";
import fs from 'fs';
import { nanoid } from "nanoid";
import { statusTicket } from "@/constants/statusTicket";

function generateTicket() {
  return "REQ" + nanoid(8).toUpperCase(); // contoh: TRK5G7K9X
}

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

  
// Handler POST
export async function POST(request: Request){
     // Buat folder uploads jika belum ada
      Object.values(UPLOAD_DIRS).forEach(dir => {
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      });
    
      const formData = await request.formData();

    try {

         // Proses identityImage (gambar)
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
        const status_request = "1"; //[1]queue | [2]validation:success,failed | [3]calling | [4]verification:success,failed | [5]done
        const ticket = generateTicket();
        const createdAt = new Date();
        const updatedAt = new Date();

        const identityImageUrl = identityImageResult ? identityImageResult.url : null;
        
        if(!fullName || !email || !phoneNumber || !description){
            return NextResponse.json({error: 'Semua field harus diisi.'},{status:400});
        }

        let status_log = '-';
        statusTicket.forEach(status => {
          if(status_request == status.id) {
            status_log = status.value 
          }
        });

        const newFormRequest = await prisma.requestForm.create({
            data : {
                fullName,
                email,
                nik,
                nip,
                position,
                unit,
                phoneNumber,
                description,
                identityImage: identityImageUrl,
                status_request,
                ticket,
                createdAt,
                updatedAt,
                logStatus: {      
                  create: {
                    statusName: status_log,
                    note: ''
                  }
                }
            }
        })

        // Kirim email menggunakan lib
        await handleEmail(email, ticket);

        console.log('New Request Form Created:', newFormRequest);

        return NextResponse.json(newFormRequest,{status:201});

    } catch (error) {
        console.error('Error saat menambahkan request form:', error);
        return NextResponse.json({error: 'Terjadi kesalahan server.'}, {status:500});
    }
}

const handleEmail = async (email: string, ticket: string) => {
  const htmlContent = `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #031A65;">Nomor Antrian Anda</h2>
    <p>Halo,</p>
    <p>Terima kasih telah melakukan pendaftaran. Berikut adalah nomor antrian Anda:</p>
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
    <p>Silakan Cek Berkala dengan fitur tracking dengan menggunakan nomor tersebut.</p>
    <br/>
    <hr style="border: none; border-top: 1px solid #ccc;" />
    <p style="font-size: 12px; color: #777;">
      Email ini dikirim otomatis, mohon tidak membalas.
    </p>
  </div>
  `;

  try {
    const result = await sendEmail({
      to: email,
      subject: "Nomor Ticket Pendaftaran",
      text: "Nomor Antrian anda adalah " + ticket,
      html: htmlContent,
    });

    if (result.success) {
      console.log("✅ Email berhasil dikirim ke:", email);
    } else {
      console.error("❌ Gagal mengirim email:", result.error);
    }
  } catch (error) {
    console.error("❌ Error saat mengirim email:", error);
  }
};

// Handler untuk method GET (Mengambil semua user)
export async function GET(req:Request) {
  const {searchParams} = new URL(req.url);
  const page = parseInt(searchParams.get('page') || "", 10);
  const limit = parseInt(searchParams.get('limit') || "", 10);

  const skip = (page - 1) * limit;

    try {
        const [data, total] = await Promise.all([
          prisma.requestForm.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc'},
          }),
          prisma.requestForm.count(),
        ]);

        return NextResponse.json({data, total});
    } catch (error) {
        console.error('Error saat mengambil user:', error);
        return NextResponse.json({error:'Terjadi kesalahan server.'},{status:500})
        
    }
}