import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { mergeContent } from "@/lib/contentDefaults";
import fs from "fs/promises";
import path from "path";

// ID para o Dinão Skull no Supabase (usando 2 para não conflitar com o projeto id:1)
const SITE_ID = 2;
const noStoreHeaders = { "Cache-Control": "no-store, max-age=0" };

export async function GET() {
  try {
    // 1. Tenta buscar no Supabase primeiro
    if (supabase) {
      const { data, error } = await supabase
        .from('landing_content')
        .select('content')
        .eq('id', SITE_ID)
        .single();

      if (data && !error) {
        const remoteVersion = isRecord(data.content) && typeof data.content.schema_version === "number"
          ? data.content.schema_version
          : 0;
        const remoteContent = mergeContent(data.content);
        return NextResponse.json(remoteVersion >= 2 ? remoteContent : mergeContent(null), {
          headers: noStoreHeaders,
        });
      }
    }

    // 2. Fallback para arquivo local se não estiver no Supabase ou der erro
    const filePath = path.join(process.cwd(), "src/data/content.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    return NextResponse.json(mergeContent(JSON.parse(fileContent)), { headers: noStoreHeaders });
  } catch {
    return NextResponse.json({ error: "Failed to read content" }, { status: 500, headers: noStoreHeaders });
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export async function POST(request: Request) {
  try {
    const newContent = await request.json();

    // 1. Tenta salvar no Supabase (Upsert)
    if (!supabase && process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { error: "Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel." },
        { status: 500, headers: noStoreHeaders }
      );
    }

    const { error } = supabase
      ? await supabase
          .from('landing_content')
          .upsert({
            id: SITE_ID,
            content: newContent,
            updated_at: new Date().toISOString()
          })
      : { error: null };

    if (error) {
      console.error("Supabase Save Error:", error);
      // Se estiver em localhost, ainda tenta salvar no arquivo como backup
      if (process.env.NODE_ENV === 'development') {
        const filePath = path.join(process.cwd(), "src/data/content.json");
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), "utf-8");
      }
      return NextResponse.json({ error: error.message }, { status: 500, headers: noStoreHeaders });
    }

    // 2. Se estiver em localhost, salva no arquivo também para manter o código atualizado
    if (process.env.NODE_ENV === 'development') {
      try {
        const filePath = path.join(process.cwd(), "src/data/content.json");
        await fs.writeFile(filePath, JSON.stringify(newContent, null, 2), "utf-8");
      } catch {
        console.warn("Failed to write to local file, but saved to Supabase");
      }
    }

    return NextResponse.json({ success: true }, { headers: noStoreHeaders });
  } catch {
    return NextResponse.json({ error: "Failed to save content" }, { status: 500, headers: noStoreHeaders });
  }
}
