import fs from 'fs';
import path from 'path';

/**
 * Script para sincronizar dados do site com o bot do WhatsApp
 * 
 * Como usar:
 * 1. Exporte os dados do localStorage do navegador (via console):
 *    console.log(JSON.stringify({ 
 *      appointments: localStorage.getItem('appointments'),
 *      leads: localStorage.getItem('leads')
 *    }))
 * 
 * 2. Cole os dados em data/browser-data.json
 * 
 * 3. Execute: node sync-data.js
 */

const DATA_DIR = './data';
const BROWSER_DATA_FILE = path.join(DATA_DIR, 'browser-data.json');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Criar diretório se não existir
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  console.log('📁 Diretório data/ criado');
}

// Verificar se existe arquivo de dados do navegador
if (!fs.existsSync(BROWSER_DATA_FILE)) {
  console.log('⚠️  Arquivo browser-data.json não encontrado');
  console.log('\n📝 Para sincronizar dados do site:');
  console.log('1. Abra o console do navegador (F12)');
  console.log('2. Execute este comando:');
  console.log('\n   console.log(JSON.stringify({');
  console.log('     appointments: localStorage.getItem("appointments"),');
  console.log('     leads: localStorage.getItem("leads")');
  console.log('   }, null, 2))');
  console.log('\n3. Copie o resultado e salve em data/browser-data.json');
  console.log('4. Execute novamente: node sync-data.js\n');
  
  // Criar arquivo exemplo
  const example = {
    appointments: '[]',
    leads: '[]'
  };
  fs.writeFileSync(BROWSER_DATA_FILE, JSON.stringify(example, null, 2));
  console.log('✅ Arquivo exemplo criado em data/browser-data.json\n');
  process.exit(0);
}

try {
  // Ler dados do navegador
  const browserData = JSON.parse(fs.readFileSync(BROWSER_DATA_FILE, 'utf8'));
  
  // Parsear e salvar appointments
  if (browserData.appointments) {
    const appointments = JSON.parse(browserData.appointments);
    fs.writeFileSync(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
    console.log(`✅ ${appointments.length} agendamentos sincronizados`);
  }
  
  // Parsear e salvar leads
  if (browserData.leads) {
    const leads = JSON.parse(browserData.leads);
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
    console.log(`✅ ${leads.length} leads sincronizados`);
  }
  
  console.log('\n🎉 Sincronização concluída com sucesso!\n');
} catch (error) {
  console.error('❌ Erro na sincronização:', error.message);
  process.exit(1);
}

