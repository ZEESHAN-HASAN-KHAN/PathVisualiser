import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  'use server';
  const body = await req.json();
  await prisma.maze.create({ data: body });
  return NextResponse.json({ ok: true });
}
