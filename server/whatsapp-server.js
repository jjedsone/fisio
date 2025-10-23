import express from 'express';
import cors from 'cors';
import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Estado global
let client = null;
let qrCodeData = null;
let isConnected = false;
let connectionStatus = 'disconnected';
let logs = [];

const NUMERO_DRA = '5511948541086';
const DATA_DIR = './data';
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const SENT_NOTIFICATIONS_FILE = path.join(DATA_DIR, 'sent_notifications.json');

// Criar diretório de dados
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(APPOINTMENTS_FILE)) {
  fs.writeFileSync(APPOINTMENTS_FILE, '[]');
}

if (!fs.existsSync(SENT_NOTIFICATIONS_FILE)) {
  fs.writeFileSync(SENT_NOTIFICATIONS_FILE, '[]');
}

// Função para adicionar log
function addLog(type, message) {
  const log = {
    type, // 'info', 'success', 'error', 'qr'
    message,
    timestamp: new Date().toISOString()
  };
  logs.push(log);
  if (logs.length > 100) logs.shift(); // Manter apenas últimos 100 logs
  console.log(`[${type.toUpperCase()}] ${message}`);
}

// Funções auxiliares
function loadData(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    return [];
  }
}

// Inicializar cliente WhatsApp
function initializeClient() {
  if (client) {
    addLog('info', 'Cliente já existe, destruindo...');
    client.destroy();
  }

  addLog('info', 'Inicializando cliente WhatsApp...');
  connectionStatus = 'initializing';
  qrCodeData = null;

  client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  });

  client.on('qr', (qr) => {
    qrCodeData = qr;
    connectionStatus = 'qr_ready';
    addLog('qr', 'QR Code gerado! Escaneie com seu WhatsApp.');
  });

  client.on('ready', () => {
    isConnected = true;
    connectionStatus = 'connected';
    qrCodeData = null;
    addLog('success', '✅ Bot conectado e ativo!');
    startAppointmentMonitor();
  });

  client.on('authenticated', () => {
    addLog('success', 'Autenticação bem-sucedida!');
  });

  client.on('auth_failure', () => {
    isConnected = false;
    connectionStatus = 'auth_failed';
    addLog('error', 'Falha na autenticação');
  });

  client.on('disconnected', (reason) => {
    isConnected = false;
    connectionStatus = 'disconnected';
    addLog('error', `Cliente desconectado: ${reason}`);
  });

  // Sistema de conversação
  const userSessions = new Map();

  client.on('message', async (message) => {
    if (message.from === 'status@broadcast' || message.isGroupMsg) return;

    const body = message.body.toLowerCase().trim();
    const userId = message.from;

    let session = userSessions.get(userId);
    if (!session) {
      session = { step: 'menu', data: {} };
      userSessions.set(userId, session);
    }

    try {
      if (body === 'menu' || body === 'voltar' || body === 'início' || body === 'inicio') {
        session.step = 'menu';
        await sendMenu(message);
        addLog('info', `Menu enviado para ${userId}`);
        return;
      }

      switch (session.step) {
        case 'menu':
          await handleMenuResponse(message, session, body);
          break;
        case 'agendar_nome':
          session.data.nome = message.body;
          session.step = 'agendar_servico';
          await message.reply(
            `📋 Ótimo, ${session.data.nome}!\n\n` +
            `Qual serviço você deseja?\n\n` +
            `1️⃣ Fisioterapia Domiciliar\n` +
            `2️⃣ Drenagem Linfática\n` +
            `3️⃣ Massagem Relaxante\n` +
            `4️⃣ Peeling/Limpeza de Pele\n` +
            `5️⃣ Outro\n\n` +
            `Digite o número ou o nome do serviço:`
          );
          break;
        case 'agendar_servico':
          const servicos = {
            '1': 'Fisioterapia Domiciliar',
            '2': 'Drenagem Linfática',
            '3': 'Massagem Relaxante',
            '4': 'Peeling/Limpeza de Pele',
            '5': 'Outro'
          };
          session.data.servico = servicos[body] || message.body;
          session.step = 'agendar_data';
          await message.reply(
            `✅ Serviço: ${session.data.servico}\n\n` +
            `📅 Qual data você prefere?\n` +
            `(Digite no formato DD/MM/AAAA)\n\n` +
            `Exemplo: 25/10/2025`
          );
          break;
        case 'agendar_data':
          session.data.data = message.body;
          session.step = 'agendar_horario';
          await message.reply(
            `📅 Data: ${session.data.data}\n\n` +
            `🕐 Qual horário você prefere?\n\n` +
            `Horários disponíveis:\n` +
            `• Manhã: 08:00 às 12:00\n` +
            `• Tarde: 14:00 às 18:00\n\n` +
            `Digite o horário desejado (ex: 10:00):`
          );
          break;
        case 'agendar_horario':
          session.data.horario = message.body;
          session.step = 'agendar_confirmar';
          await message.reply(
            `📋 RESUMO DO AGENDAMENTO:\n\n` +
            `👤 Nome: ${session.data.nome}\n` +
            `🏥 Serviço: ${session.data.servico}\n` +
            `📅 Data: ${session.data.data}\n` +
            `🕐 Horário: ${session.data.horario}\n\n` +
            `✅ Confirmar agendamento?\n\n` +
            `Digite:\n` +
            `"SIM" para confirmar\n` +
            `"NÃO" para cancelar`
          );
          break;
        case 'agendar_confirmar':
          if (body === 'sim' || body === 's') {
            const appointment = {
              id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
              nome: session.data.nome,
              telefone: userId.replace('@c.us', ''),
              servico: session.data.servico,
              data: session.data.data,
              horario: session.data.horario,
              status: 'pendente',
              origem: 'whatsapp_bot',
              dataCriacao: new Date().toISOString()
            };

            const appointments = loadData(APPOINTMENTS_FILE);
            appointments.push(appointment);
            fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));

            await message.reply(
              `🎉 AGENDAMENTO CONFIRMADO!\n\n` +
              `✅ Sua solicitação foi enviada para a Dra. Teiciane.\n\n` +
              `📱 Em breve ela entrará em contato para confirmar o horário.\n\n` +
              `💙 Obrigada pela confiança!`
            );

            await notifyNewAppointment(appointment);
            addLog('success', `Agendamento confirmado: ${session.data.nome}`);

            session.step = 'menu';
            session.data = {};
          } else {
            await message.reply(
              `❌ Agendamento cancelado.\n\n` +
              `Digite "MENU" para voltar ao início.`
            );
            session.step = 'menu';
            session.data = {};
          }
          break;
      }
    } catch (error) {
      addLog('error', `Erro ao processar mensagem: ${error.message}`);
      await message.reply(
        `😅 Ops! Algo deu errado.\n\n` +
        `Digite "MENU" para voltar ao início.`
      );
      session.step = 'menu';
    }
  });

  client.initialize();
}

async function sendMenu(message) {
  await message.reply(
    `👋 Olá! Bem-vindo(a) à Clínica Dra. Teiciane Ramalho!\n\n` +
    `🤖 Sou o assistente virtual. Como posso ajudar?\n\n` +
    `1️⃣ Agendar consulta\n` +
    `2️⃣ Ver horários disponíveis\n` +
    `3️⃣ Informações sobre serviços\n` +
    `4️⃣ Localização e contato\n` +
    `5️⃣ Falar com a Dra.\n\n` +
    `Digite o número da opção desejada:`
  );
}

async function handleMenuResponse(message, session, body) {
  switch (body) {
    case '1':
    case 'agendar':
      session.step = 'agendar_nome';
      await message.reply(
        `📋 Ótimo! Vamos agendar sua consulta.\n\n` +
        `Para começar, qual é o seu nome completo?`
      );
      break;
    case '2':
      await message.reply(
        `🕐 HORÁRIOS DE ATENDIMENTO\n\n` +
        `📅 Segunda a Sexta:\n` +
        `• Manhã: 08:00 às 12:00\n` +
        `• Tarde: 14:00 às 18:00\n\n` +
        `📅 Sábado:\n` +
        `• Manhã: 08:00 às 12:00\n\n` +
        `🚫 Domingo: Fechado\n\n` +
        `Digite "AGENDAR" para marcar sua consulta.`
      );
      break;
    case '3':
      await message.reply(
        `✨ NOSSOS SERVIÇOS\n\n` +
        `🏥 FISIOTERAPIA:\n` +
        `• Fisioterapia Domiciliar\n` +
        `• Reabilitação Neurológica\n` +
        `• Fisioterapia Ortopédica\n` +
        `• Fisioterapia Geriátrica\n\n` +
        `💆 ESTÉTICA:\n` +
        `• Drenagem Linfática\n` +
        `• Massagem Relaxante\n` +
        `• Peeling e Limpeza de Pele\n` +
        `• Microagulhamento\n\n` +
        `Digite "AGENDAR" para marcar sua consulta.`
      );
      break;
    case '4':
      await message.reply(
        `📍 LOCALIZAÇÃO E CONTATO\n\n` +
        `🏥 Clínica: Vila Mariana - São Paulo/SP\n\n` +
        `📱 WhatsApp: (11) 94854-1086\n\n` +
        `Digite "AGENDAR" para marcar sua consulta.`
      );
      break;
    case '5':
      await message.reply(
        `👩‍⚕️ A Dra. Teiciane será notificada!\n\n` +
        `📱 Ou você pode ligar diretamente:\n` +
        `(11) 94854-1086\n\n` +
        `💙 Ela terá prazer em atendê-lo(a)!`
      );
      break;
    default:
      await sendMenu(message);
      break;
  }
}

async function notifyNewAppointment(appointment) {
  try {
    const chatId = `${NUMERO_DRA}@c.us`;
    const message =
      `🆕 NOVO AGENDAMENTO VIA WHATSAPP!\n\n` +
      `👤 Nome: ${appointment.nome}\n` +
      `📱 Telefone: ${appointment.telefone}\n` +
      `🏥 Serviço: ${appointment.servico}\n` +
      `📅 Data: ${appointment.data}\n` +
      `🕐 Horário: ${appointment.horario}\n\n` +
      `⏰ Agendado em: ${new Date(appointment.dataCriacao).toLocaleString('pt-BR')}\n\n` +
      `💡 Acesse o painel administrativo do site para confirmar!`;

    await client.sendMessage(chatId, message);
    addLog('success', 'Notificação enviada para a Dra.');
  } catch (error) {
    addLog('error', `Erro ao enviar notificação: ${error.message}`);
  }
}

let monitorInterval = null;
let lastCheckTime = Date.now();

function startAppointmentMonitor() {
  if (monitorInterval) clearInterval(monitorInterval);

  addLog('info', 'Monitoramento de agendamentos iniciado');

  monitorInterval = setInterval(async () => {
    try {
      const appointments = loadData(APPOINTMENTS_FILE);
      const sentNotifications = loadData(SENT_NOTIFICATIONS_FILE);

      const newAppointments = appointments.filter(apt => {
        const aptTime = new Date(apt.dataCriacao).getTime();
        return aptTime > lastCheckTime &&
          !sentNotifications.includes(apt.id) &&
          apt.origem !== 'whatsapp_bot';
      });

      for (const apt of newAppointments) {
        await notifyNewAppointment(apt);
        sentNotifications.push(apt.id);
      }

      if (newAppointments.length > 0) {
        fs.writeFileSync(SENT_NOTIFICATIONS_FILE, JSON.stringify(sentNotifications, null, 2));
      }

      lastCheckTime = Date.now();
    } catch (error) {
      addLog('error', `Erro no monitoramento: ${error.message}`);
    }
  }, 10000);
}

// Rotas da API
app.get('/api/status', (req, res) => {
  res.json({
    isConnected,
    connectionStatus,
    hasQrCode: !!qrCodeData,
    qrCode: qrCodeData
  });
});

app.get('/api/logs', (req, res) => {
  res.json({ logs });
});

app.post('/api/start', (req, res) => {
  if (client && isConnected) {
    return res.json({ success: false, message: 'Bot já está conectado' });
  }

  try {
    initializeClient();
    res.json({ success: true, message: 'Bot iniciado' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post('/api/stop', async (req, res) => {
  if (!client) {
    return res.json({ success: false, message: 'Bot não está rodando' });
  }

  try {
    await client.destroy();
    client = null;
    isConnected = false;
    connectionStatus = 'disconnected';
    qrCodeData = null;
    if (monitorInterval) clearInterval(monitorInterval);
    addLog('info', 'Bot desconectado');
    res.json({ success: true, message: 'Bot desconectado' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

app.post('/api/restart', async (req, res) => {
  try {
    if (client) {
      await client.destroy();
      if (monitorInterval) clearInterval(monitorInterval);
    }
    initializeClient();
    res.json({ success: true, message: 'Bot reiniciado' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  addLog('success', `🚀 Servidor rodando na porta ${PORT}`);
  console.log(`\n🌐 API disponível em: http://localhost:${PORT}`);
  console.log(`📊 Status: http://localhost:${PORT}/api/status`);
  console.log(`📋 Logs: http://localhost:${PORT}/api/logs\n`);
});

