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
    const updatedAt = new Date();
    const identityImageUrl = identityImageResult ? identityImageResult.url : null;

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
                status_request,
                updatedAt,
                logStatus: {      
                  create: {
                    statusName: status_log,
                    note: ''
                  }
                },

                ...(identityImageUrl && { identityImage: identityImageUrl }),
            }
    })

    // const { id } = await params
    // const body = await request.json()
    // const updatedRequestForm = await prisma.requestForm.update({
    //   where: { id },
    //   data: body,
    // })
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
