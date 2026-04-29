import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 1. Tenta fazer upload para o Supabase Storage primeiro
    const filename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    
    const { data, error } = await supabase.storage
      .from('cms-assets') 
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: true
      });

    if (!error && data) {
      // Pega a URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('cms-assets')
        .getPublicUrl(filename);
      
      return NextResponse.json({ url: publicUrl });
    }

    console.warn("Supabase Upload failed, falling back to local:", error);

    // 2. Fallback para Local (Só funciona em localhost)
    if (process.env.NODE_ENV === 'development') {
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (e) {}

      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      return NextResponse.json({ url: `/uploads/${filename}` });
    }

    return NextResponse.json({ error: "Upload failed on production" }, { status: 500 });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
