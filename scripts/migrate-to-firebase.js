// Script para migrar dados do LocalStorage para o Firebase
// Execute este script no console do navegador para exportar os dados

console.log('=== EXPORTADOR DE DADOS PARA FIREBASE ===\n');

// Função para exportar dados
function exportarDados() {
  const dados = {
    agendamentos: [],
    leads: [],
    conversas: [],
    configuracoes: null
  };

  // Exportar agendamentos
  try {
    const appointments = localStorage.getItem('appointments');
    if (appointments) {
      dados.agendamentos = JSON.parse(appointments);
      console.log(`✅ ${dados.agendamentos.length} agendamentos encontrados`);
    }
  } catch (err) {
    console.error('❌ Erro ao exportar agendamentos:', err);
  }

  // Exportar leads
  try {
    const leads = localStorage.getItem('leads');
    if (leads) {
      dados.leads = JSON.parse(leads);
      console.log(`✅ ${dados.leads.length} leads encontrados`);
    }
  } catch (err) {
    console.error('❌ Erro ao exportar leads:', err);
  }

  // Exportar conversas
  try {
    const conversations = localStorage.getItem('chatbotConversations');
    if (conversations) {
      dados.conversas = JSON.parse(conversations);
      console.log(`✅ ${dados.conversas.length} conversas encontradas`);
    }
  } catch (err) {
    console.error('❌ Erro ao exportar conversas:', err);
  }

  // Exportar configurações
  try {
    const settings = localStorage.getItem('adminSettings');
    if (settings) {
      dados.configuracoes = JSON.parse(settings);
      console.log(`✅ Configurações encontradas`);
    }
  } catch (err) {
    console.error('❌ Erro ao exportar configurações:', err);
  }

  return dados;
}

// Função para fazer download do arquivo JSON
function downloadJSON(dados, filename) {
  const json = JSON.stringify(dados, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Executar exportação
const dadosExportados = exportarDados();

console.log('\n=== DADOS EXPORTADOS ===');
console.log(dadosExportados);

console.log('\n=== COPIE O JSON ABAIXO ===');
console.log(JSON.stringify(dadosExportados, null, 2));

console.log('\n💾 Fazendo download do arquivo...');
downloadJSON(dadosExportados, `backup-dados-${Date.now()}.json`);

console.log('\n✅ Exportação concluída!');
console.log('📋 Agora você pode importar estes dados para o Firebase');
console.log('📖 Veja o arquivo FIREBASE_SETUP.md para instruções de importação');

