const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const cors = require('cors');

// Inicializar Firebase Admin
admin.initializeApp();
const db = admin.firestore();

// ============ API EXPRESS ============

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Firebase Functions Online!' });
});

// ============ AGENDAMENTOS ============

// Criar agendamento
app.post('/api/agendamentos', async (req, res) => {
  try {
    const agendamento = {
      ...req.body,
      criadoEm: admin.firestore.FieldValue.serverTimestamp(),
      status: 'pendente'
    };
    
    const docRef = await db.collection('agendamentos').add(agendamento);
    
    // Criar notificação
    await db.collection('notificacoes').add({
      tipo: 'novo_agendamento',
      agendamentoId: docRef.id,
      mensagem: `Novo agendamento: ${agendamento.nome} - ${agendamento.data} ${agendamento.horario}`,
      lida: false,
      criadaEm: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.status(201).json({ id: docRef.id, ...agendamento });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ error: error.message });
  }
});

// Listar agendamentos
app.get('/api/agendamentos', async (req, res) => {
  try {
    const snapshot = await db.collection('agendamentos')
      .orderBy('criadoEm', 'desc')
      .get();
    
    const agendamentos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(agendamentos);
  } catch (error) {
    console.error('Erro ao listar agendamentos:', error);
    res.status(500).json({ error: error.message });
  }
});

// Atualizar status do agendamento
app.patch('/api/agendamentos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    await db.collection('agendamentos').doc(id).update({
      status,
      atualizadoEm: admin.firestore.FieldValue.serverTimestamp()
    });
    
    res.json({ id, status });
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error);
    res.status(500).json({ error: error.message });
  }
});

// Deletar agendamento
app.delete('/api/agendamentos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('agendamentos').doc(id).delete();
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============ CONVERSAS ============

// Salvar conversa do chatbot
app.post('/api/conversas', async (req, res) => {
  try {
    const conversa = {
      ...req.body,
      criadaEm: admin.firestore.FieldValue.serverTimestamp()
    };
    
    const docRef = await db.collection('conversas').add(conversa);
    res.status(201).json({ id: docRef.id, ...conversa });
  } catch (error) {
    console.error('Erro ao salvar conversa:', error);
    res.status(500).json({ error: error.message });
  }
});

// Listar conversas
app.get('/api/conversas', async (req, res) => {
  try {
    const snapshot = await db.collection('conversas')
      .orderBy('criadaEm', 'desc')
      .get();
    
    const conversas = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(conversas);
  } catch (error) {
    console.error('Erro ao listar conversas:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============ LEADS ============

// Criar lead
app.post('/api/leads', async (req, res) => {
  try {
    const lead = {
      ...req.body,
      criadoEm: admin.firestore.FieldValue.serverTimestamp(),
      status: 'novo'
    };
    
    const docRef = await db.collection('leads').add(lead);
    res.status(201).json({ id: docRef.id, ...lead });
  } catch (error) {
    console.error('Erro ao criar lead:', error);
    res.status(500).json({ error: error.message });
  }
});

// Listar leads
app.get('/api/leads', async (req, res) => {
  try {
    const snapshot = await db.collection('leads')
      .orderBy('criadoEm', 'desc')
      .get();
    
    const leads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(leads);
  } catch (error) {
    console.error('Erro ao listar leads:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============ CONFIGURAÇÕES ============

// Buscar configurações
app.get('/api/configuracoes', async (req, res) => {
  try {
    const doc = await db.collection('configuracoes').doc('geral').get();
    
    if (doc.exists) {
      res.json(doc.data());
    } else {
      // Configurações padrão
      const configPadrao = {
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
      res.json(configPadrao);
    }
  } catch (error) {
    console.error('Erro ao buscar configurações:', error);
    res.status(500).json({ error: error.message });
  }
});

// Atualizar configurações
app.put('/api/configuracoes', async (req, res) => {
  try {
    await db.collection('configuracoes').doc('geral').set(req.body, { merge: true });
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao atualizar configurações:', error);
    res.status(500).json({ error: error.message });
  }
});

// ============ NOTIFICAÇÕES ============

// Listar notificações
app.get('/api/notificacoes', async (req, res) => {
  try {
    const snapshot = await db.collection('notificacoes')
      .orderBy('criadaEm', 'desc')
      .limit(50)
      .get();
    
    const notificacoes = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    res.json(notificacoes);
  } catch (error) {
    console.error('Erro ao listar notificações:', error);
    res.status(500).json({ error: error.message });
  }
});

// Marcar notificação como lida
app.patch('/api/notificacoes/:id/lida', async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection('notificacoes').doc(id).update({ lida: true });
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao marcar notificação:', error);
    res.status(500).json({ error: error.message });
  }
});

// Exportar API
exports.api = functions.https.onRequest(app);

// ============ TRIGGERS DO FIRESTORE ============

// Trigger quando um novo agendamento é criado
exports.onNovoAgendamento = functions.firestore
  .document('agendamentos/{agendamentoId}')
  .onCreate(async (snap, context) => {
    const agendamento = snap.data();
    
    console.log('Novo agendamento criado:', agendamento);
    
    // Aqui você pode adicionar lógica adicional, como:
    // - Enviar email de confirmação
    // - Enviar notificação push
    // - Integrar com calendário
    // - Enviar mensagem WhatsApp
    
    return null;
  });

// Trigger quando uma conversa é criada
exports.onNovaConversa = functions.firestore
  .document('conversas/{conversaId}')
  .onCreate(async (snap, context) => {
    const conversa = snap.data();
    
    console.log('Nova conversa registrada:', conversa);
    
    // Criar notificação para o admin
    await db.collection('notificacoes').add({
      tipo: 'nova_conversa',
      conversaId: context.params.conversaId,
      mensagem: `Nova conversa do chatbot: ${conversa.nome || 'Anônimo'}`,
      lida: false,
      criadaEm: admin.firestore.FieldValue.serverTimestamp()
    });
    
    return null;
  });

// Função agendada para limpar dados antigos (executa diariamente às 2h)
exports.limparDadosAntigos = functions.pubsub
  .schedule('0 2 * * *')
  .timeZone('America/Sao_Paulo')
  .onRun(async (context) => {
    const trintaDiasAtras = new Date();
    trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
    
    // Deletar conversas antigas
    const conversasAntigas = await db.collection('conversas')
      .where('criadaEm', '<', trintaDiasAtras)
      .get();
    
    const batch = db.batch();
    conversasAntigas.docs.forEach(doc => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    
    console.log(`Limpeza concluída: ${conversasAntigas.size} conversas antigas removidas`);
    return null;
  });

