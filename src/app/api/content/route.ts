import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import fs from "fs/promises";
import path from "path";

// ID para o Dinão Skull no Supabase (usando 2 para não conflitar com o projeto id:1)
const SITE_ID = 2;

export async function GET() {
  try {
    // 1. Tenta buscar no Supabase primeiro
    const { data, error } = await supabase
      .from('landing_content')
      .select('content')
      .eq('id', SITE_ID)
      .single();

    if (data && !error) {
      return NextResponse.json(data.content);
    }

    // 2. Fallback para arquivo local se não estiver no Supabase ou der erro
    const filePath = path.join(process.cwd(), "src/data/content.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(JSON.parse(fileContent));
  } catch (error) {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newContent = await request.json();

    // 1. Tenta salvar no Supabase (Upsert)
    const { error } = await supabase
      .from('landing_content')
      .upsert({ 
        id: SITE_ID, 
        content: newContent,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error("Supabase Save Error:", error);
      // Se estiver em localhost, ainda tenta salvar no arquivo como backup
      if (process.env.NODE_ENV === 'development') {
        const filePath = path.join(process.cwd(), "src/data/content.json");
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), "utf-8");
      }
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 2. Se estiver em localhost, salva no arquivo também para manter o código atualizado
    if (process.env.NODE_ENV === 'development') {
      try {
        const filePath = path.join(process.cwd(), "src/data/content.json");
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), "utf-8");
      } catch (e) {
        console.warn("Failed to write to local file, but saved to Supabase");
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
