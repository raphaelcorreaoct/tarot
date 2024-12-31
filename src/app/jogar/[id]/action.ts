'use server';

import data from "@/data";
import { firestore } from "@/services/firebaseAdmin";


export default async function getConsulta (docId:string){
  try {
    const docRef = firestore.collection('consulta').doc(docId);
    const docSnapshot = await docRef.get();

    if (docSnapshot.exists) {
      return { id: docSnapshot.id, ...docSnapshot.data() };
    } else {
      console.log(`Documento com ID ${docId} não encontrado.`);
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar documento:', error);
    throw new Error('Erro ao buscar documento');
  }
}

export const updateConsultaById = async (docId: string, data: Record<string, {}>) => {
  try {
    const docRef = firestore.collection('consulta').doc(docId);
    await docRef.update(data);
    return { message: 'Documento atualizado com sucesso' };
  } catch (error) {
    console.error('Erro ao atualizar documento:', error);
    throw new Error('Erro ao atualizar documento');
  }
};