import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { requireSession, unauthorized, jsonError } from '@/lib/api-utils';

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) return unauthorized();

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return jsonError('File không hợp lệ');
    }

    if (!file.type.startsWith('image/')) {
      return jsonError('Chỉ chấp nhận file ảnh');
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;
    const result = await uploadToCloudinary(base64);

    return NextResponse.json(result);
  } catch {
    return jsonError('Upload thất bại', 500);
  }
}
