import { GoogleGenAI, Type, ThinkingLevel } from "@google/genai";
import { ExtractionResult } from "../types";

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result?.toString().split(',')[1];
      if (base64String) resolve(base64String);
      else reject(new Error("Failed to convert file to base64"));
    };
    reader.onerror = error => reject(error);
  });
};

const extractWithModel = async (ai: GoogleGenAI, base64Data: string, file: File, modelName: string) => {
  const prompt = `Act as a high-precision document parser. 
Extract ALL tables from ALL pages of this document.
Output Format: Compact JSON only.
Schema: { "tables": [{ "tableName": "Page X Table Y", "headers": ["Col1", "Col2"], "rows": [["Val1", "Val2"]] }], "summary": "brief summary" }
Critical Rules:
1. Merge tables that continue across page breaks.
2. Preserve every row and column accurately.
3. If a cell is empty, use "".
4. No conversational text, only valid JSON.`;

  const config: any = {
    maxOutputTokens: 40000,
    responseMimeType: "application/json",
    responseSchema: {
      type: Type.OBJECT,
      properties: {
        tables: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              tableName: { type: Type.STRING },
              headers: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING } 
              },
              rows: {
                type: Type.ARRAY,
                items: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                }
              }
            },
            required: ["headers", "rows"]
          }
        },
        summary: { type: Type.STRING }
      },
      required: ["tables"]
    }
  };

  if (modelName.includes("flash") || modelName.includes("gemini-3")) {
    config.thinkingConfig = { thinkingLevel: ThinkingLevel.LOW };
  }

  return await ai.models.generateContent({
    model: modelName,
    contents: {
      parts: [
        {
          inlineData: {
            mimeType: file.type,
            data: base64Data,
          },
        },
        { text: prompt },
      ],
    },
    config
  });
};

export const extractTablesFromDocument = async (file: File): Promise<ExtractionResult> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const ai = new GoogleGenAI({ apiKey });
  const base64Data = await fileToBase64(file);

  let response;
  try {
    response = await extractWithModel(ai, base64Data, file, "gemini-3.1-pro-preview");
  } catch (error: any) {
    const isQuotaError = error.message?.includes("Quota exceeded") || error.status === 429 || error.message?.includes("429");
    if (isQuotaError) {
      response = await extractWithModel(ai, base64Data, file, "gemini-3-flash-preview");
    } else {
      throw error;
    }
  }

  try {
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI. The document might be too large or unreadable.");
    }

    const parsed = JSON.parse(text) as ExtractionResult;
    
    if (!parsed.tables || !Array.isArray(parsed.tables)) {
      return { tables: [], summary: parsed.summary || "No tables detected." };
    }

    parsed.tables = parsed.tables.map(table => ({
      tableName: table.tableName || "Extracted Table",
      headers: (table.headers || []).map(h => String(h ?? "")),
      rows: (table.rows || []).map(row => 
        (Array.isArray(row) ? row : []).map(cell => String(cell ?? "")))
    }));

    return parsed;
  } catch (err: any) {
    console.error("Extraction Service Error:", err);
    if (err.message?.includes("429") || err.message?.includes("quota")) {
      throw new Error("Rate limit exceeded. Please wait a moment and try again.");
    }
    throw new Error(`Extraction failed: ${err.message || "Unknown error"}`);
  }
};