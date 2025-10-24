// Script para importar dados para o Firestore
// Execute: node scripts/import-to-firestore.js backup-dados-XXXXX.json

const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Inicializar Firebase Admin
// IMPORTANTE: Você precisa baixar a chave de serviço do Firebase Console
// Vá em: Configurações do Projeto > Contas de Serviço > Gerar nova chave privada
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Ler arquivo de backup
const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('❌ Uso: node import-to-firestore.js backup-dados-XXXXX.json');
  process.exit(1);
}

const backupFile = args[0];
const backupPath = path.join(__dirname, backupFile);

if (!fs.existsSync(backupPath)) {
  console.error(`❌ Arquivo não encontrado: ${backupPath}`);
  process.exit(1);
}

console.log(`📂 Lendo arquivo: ${backupFile}\n`);
const dados = JSON.parse(fs.readFileSync(backupPath, 'utf8'));

async function importarDados() {
  let totalImportado = 0;

  // Importar agendamentos
  if (dados.agendamentos && dados.agendamentos.length > 0) {
    console.log(`📅 Importando ${dados.agendamentos.length} agendamentos...`);
    for (const item of dados.agendamentos) {
      try {
        await db.collection('agendamentos').add({
          ...item,
          criadoEm: admin.firestore.FieldValue.serverTimestamp(),
          importadoEm: admin.firestore.FieldValue.serverTimestamp()
        });
        totalImportado++;
      } catch (err) {
        console.error('  ❌ Erro ao importar agendamento:', err.message);
      }
    }
    console.log(`✅ ${dados.agendamentos.length} agendamentos importados\n`);
  }

  // Importar leads
  if (dados.leads && dados.leads.length > 0) {
    console.log(`📝 Importando ${dados.leads.length} leads...`);
    for (const item of dados.leads) {
      try {
        await db.collection('leads').add({
          ...item,
          criadoEm: admin.firestore.FieldValue.serverTimestamp(),
          importadoEm: admin.firestore.FieldValue.serverTimestamp()
        });
        totalImportado++;
      } catch (err) {
        console.error('  ❌ Erro ao importar lead:', err.message);
      }
    }
    console.log(`✅ ${dados.leads.length} leads importados\n`);
  }

  // Importar conversas
  if (dados.conversas && dados.conversas.length > 0) {
    console.log(`💬 Importando ${dados.conversas.length} conversas...`);
    for (const item of dados.conversas) {
      try {
        await db.collection('conversas').add({
          ...item,
          importadaEm: admin.firestore.FieldValue.serverTimestamp()
        });
        totalImportado++;
      } catch (err) {
        console.error('  ❌ Erro ao importar conversa:', err.message);
      }
    }
    console.log(`✅ ${dados.conversas.length} conversas importadas\n`);
  }

  // Importar configurações
  if (dados.configuracoes) {
    console.log(`⚙️  Importando configurações...`);
    try {
      await db.collection('configuracoes').doc('geral').set({
        ...dados.configuracoes,
        atualizadoEm: admin.firestore.FieldValue.serverTimestamp(),
        importadoEm: admin.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
      console.log(`✅ Configurações importadas\n`);
    } catch (err) {
      console.error('  ❌ Erro ao importar configurações:', err.message);
    }
  }

  console.log(`\n🎉 Importação concluída!`);
  console.log(`📊 Total de documentos importados: ${totalImportado}`);
}

// Executar importação
importarDados()
  .then(() => {
    console.log('\n✅ Processo finalizado com sucesso!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Erro durante a importação:', err);
    process.exit(1);
  });

