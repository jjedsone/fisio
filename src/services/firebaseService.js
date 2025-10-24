// Serviço para gerenciar operações do Firestore
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';

// ============ AGENDAMENTOS ============

export const agendamentosService = {
  // Criar novo agendamento
  async criar(agendamento) {
    try {
      const agendamentoComData = {
        ...agendamento,
        criadoEm: Timestamp.now(),
        status: agendamento.status || 'pendente'
      };
      const docRef = await addDoc(collection(db, 'agendamentos'), agendamentoComData);
      return { id: docRef.id, ...agendamentoComData };
    } catch (error) {
      console.error('Erro ao criar agendamento:', error);
      throw error;
    }
  },

  // Listar todos os agendamentos
  async listar() {
    try {
      const q = query(
        collection(db, 'agendamentos'),
        orderBy('criadoEm', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar agendamentos:', error);
      throw error;
    }
  },

  // Buscar agendamento por ID
  async buscarPorId(id) {
    try {
      const docRef = doc(db, 'agendamentos', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar agendamento:', error);
      throw error;
    }
  },

  // Atualizar agendamento
  async atualizar(id, dados) {
    try {
      const docRef = doc(db, 'agendamentos', id);
      await updateDoc(docRef, {
        ...dados,
        atualizadoEm: Timestamp.now()
      });
      return { id, ...dados };
    } catch (error) {
      console.error('Erro ao atualizar agendamento:', error);
      throw error;
    }
  },

  // Deletar agendamento
  async deletar(id) {
    try {
      await deleteDoc(doc(db, 'agendamentos', id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error);
      throw error;
    }
  },

  // Buscar por data
  async buscarPorData(data) {
    try {
      const q = query(
        collection(db, 'agendamentos'),
        where('data', '==', data),
        orderBy('horario')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar por data:', error);
      throw error;
    }
  }
};

// ============ CONVERSAS DO CHATBOT ============

export const conversasService = {
  // Salvar conversa
  async salvar(conversa) {
    try {
      const conversaComData = {
        ...conversa,
        criadaEm: Timestamp.now()
      };
      const docRef = await addDoc(collection(db, 'conversas'), conversaComData);
      return { id: docRef.id, ...conversaComData };
    } catch (error) {
      console.error('Erro ao salvar conversa:', error);
      throw error;
    }
  },

  // Listar conversas
  async listar() {
    try {
      const q = query(
        collection(db, 'conversas'),
        orderBy('criadaEm', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar conversas:', error);
      throw error;
    }
  },

  // Atualizar status da conversa
  async atualizarStatus(id, status) {
    try {
      const docRef = doc(db, 'conversas', id);
      await updateDoc(docRef, {
        status,
        atualizadoEm: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      throw error;
    }
  }
};

// ============ LEADS ============

export const leadsService = {
  // Criar lead
  async criar(lead) {
    try {
      const leadComData = {
        ...lead,
        criadoEm: Timestamp.now(),
        status: lead.status || 'novo'
      };
      const docRef = await addDoc(collection(db, 'leads'), leadComData);
      return { id: docRef.id, ...leadComData };
    } catch (error) {
      console.error('Erro ao criar lead:', error);
      throw error;
    }
  },

  // Listar leads
  async listar() {
    try {
      const q = query(
        collection(db, 'leads'),
        orderBy('criadoEm', 'desc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar leads:', error);
      throw error;
    }
  },

  // Atualizar lead
  async atualizar(id, dados) {
    try {
      const docRef = doc(db, 'leads', id);
      await updateDoc(docRef, {
        ...dados,
        atualizadoEm: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar lead:', error);
      throw error;
    }
  }
};

// ============ CONFIGURAÇÕES ============

export const configuracoesService = {
  // Buscar configurações
  async buscar() {
    try {
      const docRef = doc(db, 'configuracoes', 'geral');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        // Retorna configurações padrão
        return {
          horarioFuncionamento: {
            segunda: { inicio: '08:00', fim: '18:00', ativo: true },
            terca: { inicio: '08:00', fim: '18:00', ativo: true },
            quarta: { inicio: '08:00', fim: '18:00', ativo: true },
            quinta: { inicio: '08:00', fim: '18:00', ativo: true },
            sexta: { inicio: '08:00', fim: '18:00', ativo: true },
            sabado: { inicio: '08:00', fim: '13:00', ativo: true },
            domingo: { inicio: '00:00', fim: '00:00', ativo: false }
          },
          duracaoConsulta: 60,
          intervaloBloqueio: 30
        };
      }
    } catch (error) {
      console.error('Erro ao buscar configurações:', error);
      throw error;
    }
  },

  // Atualizar configurações
  async atualizar(config) {
    try {
      const docRef = doc(db, 'configuracoes', 'geral');
      await updateDoc(docRef, {
        ...config,
        atualizadoEm: Timestamp.now()
      });
      return true;
    } catch (error) {
      console.error('Erro ao atualizar configurações:', error);
      throw error;
    }
  }
};

// ============ MENSAGENS WHATSAPP ============

export const mensagensWhatsAppService = {
  // Salvar mensagem
  async salvar(mensagem) {
    try {
      const mensagemComData = {
        ...mensagem,
        criadaEm: Timestamp.now()
      };
      const docRef = await addDoc(collection(db, 'mensagensWhatsApp'), mensagemComData);
      return { id: docRef.id, ...mensagemComData };
    } catch (error) {
      console.error('Erro ao salvar mensagem:', error);
      throw error;
    }
  },

  // Listar mensagens por contato
  async listarPorContato(numeroContato) {
    try {
      const q = query(
        collection(db, 'mensagensWhatsApp'),
        where('numeroContato', '==', numeroContato),
        orderBy('criadaEm', 'asc')
      );
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao listar mensagens:', error);
      throw error;
    }
  },

  // Listar todas as conversas
  async listarConversas() {
    try {
      const snapshot = await getDocs(collection(db, 'mensagensWhatsApp'));
      const mensagens = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      // Agrupar por contato
      const conversas = {};
      mensagens.forEach(msg => {
        if (!conversas[msg.numeroContato]) {
          conversas[msg.numeroContato] = [];
        }
        conversas[msg.numeroContato].push(msg);
      });

      return conversas;
    } catch (error) {
      console.error('Erro ao listar conversas:', error);
      throw error;
    }
  }
};

