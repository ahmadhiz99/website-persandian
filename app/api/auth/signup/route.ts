import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request){
    const { name, nip, email, password } = await req.json();

    if (!name || !email || !password){
        return NextResponse.json({
            message: 'Nama, nip, email, dan password harus diisi'
        },{
            status: 400
        });
    }

    try {
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: 'Email sudah terdaftar'},
                { status: 409 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data:{
                name,
                nip,
                email,
                password: hashedPassword,
            },
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password: _, ...userWithoutPassword } = newUser;

        return NextResponse.json(
            { message: 'Pengguna Berhasil Didatarakan', user: userWithoutPassword},
            { status: 201 }
        );

    } catch (error) {
        console.error('Kesalahan pendaftaran pengguna:', error);
        return NextResponse.json(
            { message: 'Terjadi kesalahan saat pendaftaran pengguna'},
            { status:500 }
        );
    };

}