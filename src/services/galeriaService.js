// Serviço para gerenciar a Galeria de Trabalhos
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  Timestamp 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../config/firebase';

const COLLECTION_NAME = 'galeriaTrabalhos';

// ============ GALERIA DE TRABALHOS ============

export const galeriaService = {
  // Listar todos os trabalhos
  async listar() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('criadoEm', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar trabalhos:', error);
      throw error;
    }
  },

  // Criar novo trabalho
  async criar(trabalho) {
    try {
      const trabalhoComData = {
        ...trabalho,
        criadoEm: Timestamp.now(),
        atualizadoEm: Timestamp.now()
      };
      const docRef = await addDoc(collection(db, COLLECTION_NAME), trabalhoComData);
      return { id: docRef.id, ...trabalhoComData };
    } catch (error) {
      console.error('Erro ao criar trabalho:', error);
      throw error;
    }
  },

  // Atualizar trabalho
  async atualizar(id, dados) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      const dadosAtualizados = {
        ...dados,
        atualizadoEm: Timestamp.now()
      };
      await updateDoc(docRef, dadosAtualizados);
      return { id, ...dadosAtualizados };
    } catch (error) {
      console.error('Erro ao atualizar trabalho:', error);
      throw error;
    }
  },

  // Deletar trabalho
  async deletar(id, imagemUrl) {
    try {
      // Deletar imagem do Storage se existir
      if (imagemUrl && imagemUrl.includes('firebase')) {
        try {
          const imageRef = ref(storage, imagemUrl);
          await deleteObject(imageRef);
        } catch (imgError) {
          console.warn('Erro ao deletar imagem:', imgError);
        }
      }

      // Deletar documento do Firestore
      await deleteDoc(doc(db, COLLECTION_NAME, id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar trabalho:', error);
      throw error;
    }
  },

  // Upload de imagem
  async uploadImagem(file) {
    try {
      // Criar nome único para a imagem
      const timestamp = Date.now();
      const fileName = `trabalho-${timestamp}-${file.name}`;
      const storageRef = ref(storage, `galeria/${fileName}`);

      // Upload da imagem
      await uploadBytes(storageRef, file);

      // Obter URL pública
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload da imagem:', error);
      throw error;
    }
  }
};

export default galeriaService;

