import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // TODO: dto 타입 정의
  const { name, email, phone, role, interests } = await req.json();
  console.log(name, email, phone, role, interests);
  return NextResponse.json({ message: 'Info added successfully' });
}
