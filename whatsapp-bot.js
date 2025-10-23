import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';

// Número da Dra. Teiciane (sem + e sem espaços)
const NUMERO_DRA = '5511948541086';

// Arquivos de dados
const DATA_DIR = './data';
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const SENT_NOTIFICATIONS_FILE = path.join(DATA_DIR, 'sent_notifications.json');

// Criar diretório de dados se não existir
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Inicializar arquivos se não existirem
if (!fs.existsSync(APPOINTMENTS_FILE)) {
  fs.writeFileSync(APPOINTMENTS_FILE, '[]');
}
if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, '[]');
}
if (!fs.existsSync(SENT_NOTIFICATIONS_FILE)) {
  fs.writeFileSync(SENT_NOTIFICATIONS_FILE, '[]');
}

// Funções auxiliares
function loadData(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (error) {
    return [];
  }
}

function saveData(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

// Cliente WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }
});

client.on('qr', qr => {
  console.log('\n🔐 ESCANEIE O QR CODE ABAIXO COM SEU WHATSAPP:\n');
  qrcode.generate(qr, { small: true });
  console.log('\n📱 Abra o WhatsApp → Menu → Aparelhos conectados → Conectar um aparelho\n');
});

client.on('ready', () => {
  console.log('\n✅ BOT DO WHATSAPP CONECTADO E ATIVO!\n');
  console.log('🤖 Funções ativas:');
  console.log('   • Responder mensagens automaticamente');
  console.log('   • Notificar novos agendamentos');
  console.log('   • Fornecer informações sobre horários\n');
  
  // Iniciar monitoramento de novos agendamentos
  startAppointmentMonitor();
});

client.on('authenticated', () => {
  console.log('🔐 Autenticação bem-sucedida!');
});

client.on('auth_failure', () => {
  console.error('❌ Falha na autenticação. Escaneie o QR Code novamente.');
});

client.on('disconnected', (reason) => {
  console.log('⚠️ Cliente desconectado:', reason);
});

// Sistema de conversação com contexto
const userSessions = new Map();

client.on('message', async message => {
  // Ignorar mensagens de status e grupos
  if (message.from === 'status@broadcast' || message.isGroupMsg) return;
  
  const body = message.body.toLowerCase().trim();
  const userId = message.from;
  
  // Obter ou criar sessão do usuário
  let session = userSessions.get(userId);
  if (!session) {
    session = { step: 'menu', data: {} };
    userSessions.set(userId, session);
  }
  
  try {
    // Comandos globais
    if (body === 'menu' || body === 'voltar' || body === 'início' || body === 'inicio') {
      session.step = 'menu';
      await sendMenu(message);
      return;
    }
    
    // Fluxo de conversação
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
          // Salvar agendamento
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
          saveData(APPOINTMENTS_FILE, appointments);
          
          await message.reply(
            `🎉 AGENDAMENTO CONFIRMADO!\n\n` +
            `✅ Sua solicitação foi enviada para a Dra. Teiciane.\n\n` +
            `📱 Em breve ela entrará em contato para confirmar o horário.\n\n` +
            `💙 Obrigada pela confiança!`
          );
          
          // Notificar a Dra.
          await notifyNewAppointment(appointment);
          
          // Resetar sessão
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
    console.error('Erro ao processar mensagem:', error);
    await message.reply(
      `😅 Ops! Algo deu errado.\n\n` +
      `Digite "MENU" para voltar ao início.`
    );
    session.step = 'menu';
  }
});

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
    case 'agendar consulta':
      session.step = 'agendar_nome';
      await message.reply(
        `📋 Ótimo! Vamos agendar sua consulta.\n\n` +
        `Para começar, qual é o seu nome completo?`
      );
      break;
    
    case '2':
    case 'horarios':
    case 'horários':
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
    case 'servicos':
    case 'serviços':
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
    case 'localizacao':
    case 'localização':
    case 'contato':
      await message.reply(
        `📍 LOCALIZAÇÃO E CONTATO\n\n` +
        `🏥 Clínica: Vila Mariana - São Paulo/SP\n\n` +
        `📱 WhatsApp: (11) 94854-1086\n\n` +
        `🌐 Site: www.drateiciane.com.br\n\n` +
        `📧 E-mail: contato@drateiciane.com.br\n\n` +
        `🚗 Atendemos também em domicílio nas regiões:\n` +
        `• Vila Mariana • Moema\n` +
        `• Brooklin • Jabaquara\n` +
        `• Santo Amaro\n\n` +
        `Digite "AGENDAR" para marcar sua consulta.`
      );
      break;
    
    case '5':
    case 'falar':
    case 'falar com dra':
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
    console.log('✅ Notificação enviada para a Dra. sobre novo agendamento');
  } catch (error) {
    console.error('❌ Erro ao enviar notificação:', error);
  }
}

// Monitorar novos agendamentos do site
let lastCheckTime = Date.now();

function startAppointmentMonitor() {
  console.log('👁️  Monitoramento de agendamentos iniciado...\n');
  
  setInterval(async () => {
    try {
      const appointments = loadData(APPOINTMENTS_FILE);
      const sentNotifications = loadData(SENT_NOTIFICATIONS_FILE);
      
      const newAppointments = appointments.filter(apt => {
        const aptTime = new Date(apt.dataCriacao).getTime();
        return aptTime > lastCheckTime && 
               !sentNotifications.includes(apt.id) &&
               apt.origem !== 'whatsapp_bot'; // Não notificar os do próprio bot
      });
      
      for (const apt of newAppointments) {
        await notifyNewAppointment(apt);
        sentNotifications.push(apt.id);
      }
      
      if (newAppointments.length > 0) {
        saveData(SENT_NOTIFICATIONS_FILE, sentNotifications);
      }
      
      lastCheckTime = Date.now();
    } catch (error) {
      console.error('Erro no monitoramento:', error);
    }
  }, 10000); // Verificar a cada 10 segundos
}

// Inicializar cliente
console.log('🚀 Iniciando bot do WhatsApp...\n');
client.initialize();

// Tratamento de sinais de encerramento
process.on('SIGINT', async () => {
  console.log('\n⚠️  Encerrando bot...');
  await client.destroy();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n⚠️  Encerrando bot...');
  await client.destroy();
  process.exit(0);
});

