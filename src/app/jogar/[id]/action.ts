"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_GEMINI_API_KEY || "");
import { firestore } from "@/services/firebaseAdmin";
import { remark } from "remark";
import html from "remark-html";
import { Consults } from "@/types/interfaces";

export default async function getConsulta(
  docId: string
): Promise<Consults | null> {
  try {
    const docRef = firestore.collection("consulta").doc(docId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return { id: docSnapshot.id, ...docSnapshot.data() } as Consults;
    } else {
      console.log(`Documento com ID ${docId} não encontrado.`);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar documento:", error);
    throw new Error("Erro ao buscar documento");
  }
}

export const updateConsultaById = async (
  docId: string,
  data: Partial<Consults>
) => {
  try {
    const docRef = firestore.collection("consulta").doc(docId);
    await docRef.update(data);
    return { message: "Documento atualizado com sucesso" };
  } catch (error) {
    console.error("Erro ao atualizar documento:", error);
    throw new Error("Erro ao atualizar documento");
  }
};

export const getDescription = async (cards: string[]): Promise<string> => {
  const prompt = `
    Você vai atuar como backend de uma aplicação node. Então responda apenas o necessário e sigas as regras que vou dizer 
    
    1 - Você é um especialista em cartas de tarot 
    2 - Vou enviar 4 cartas que tirei aleatoriamente e você vai fazer uma leitura dessas cartas 
    3 - Seja gentil com as palavras 
    4 - Responda em markdown pois a sua resposta será apresentada em uma página web. 

    Aqui estão as cartas 

    ${cards.join(",")}
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  const processedContent = await remark().use(html).process(text);
  const contentHtml = processedContent.toString();

  return contentHtml;
};
