# 🔥 Projeto Migrado para Firebase

## 📌 O que mudou?

Este projeto foi migrado do armazenamento local (LocalStorage) para o **Firebase**, trazendo:

### ✅ Vantagens da Migração

1. **🗄️ Banco de Dados em Nuvem (Firestore)**
   - Dados persistentes e seguros
   - Acesso de qualquer dispositivo
   - Backup automático
   - Sincronização em tempo real

2. **🚀 Hospedagem Profissional (Firebase Hosting)**
   - HTTPS grátis
   - CDN global
   - Deploy com um comando
   - Domínio personalizado gratuito

3. **⚡ Serverless Functions**
   - Backend escalável
   - Sem servidor para gerenciar
   - Paga apenas pelo uso
   - APIs REST prontas

4. **📦 Storage de Arquivos**
   - Upload de imagens
   - Armazenamento seguro
   - Otimização automática

5. **🔐 Autenticação Integrada**
   - Login seguro para admin
   - Múltiplos provedores
   - Gerenciamento de usuários

## 📁 Nova Estrutura do Projeto

\`\`\`
fisio-main/
├── src/
│   ├── config/
│   │   └── firebase.js           # Configuração do Firebase
│   ├── services/
│   │   └── firebaseService.js    # Serviços CRUD
│   ├── hooks/
│   │   └── useFirebase.js        # Hooks customizados
│   └── ...
├── functions/                     # Firebase Functions
│   ├── index.js                  # API Backend
│   └── package.json
├── scripts/
│   ├── migrate-to-firebase.js    # Exportar dados
│   └── import-to-firestore.js    # Importar para Firestore
├── firebase.json                  # Configuração Firebase
├── firestore.rules               # Regras de segurança
├── firestore.indexes.json        # Índices do banco
├── storage.rules                 # Regras do Storage
├── .firebaserc                   # Projeto ativo
├── FIREBASE_SETUP.md             # Guia completo
└── DEPLOY_FIREBASE.md            # Deploy rápido
\`\`\`

## 🚀 Como Usar

### Desenvolvimento Local

\`\`\`bash
# 1. Instalar dependências
npm install

# 2. Configurar credenciais (copie env.example para .env)
cp env.example .env

# 3. Edite .env com suas credenciais do Firebase

# 4. Iniciar desenvolvimento
npm run dev
\`\`\`

### Deploy para Produção

\`\`\`bash
# 1. Build do projeto
npm run build

# 2. Deploy completo
firebase deploy

# OU deploy individual:
firebase deploy --only hosting    # Apenas site
firebase deploy --only functions  # Apenas backend
firebase deploy --only firestore  # Apenas regras do banco
\`\`\`

## 📚 Documentação

- **[FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** - Guia completo passo a passo
- **[DEPLOY_FIREBASE.md](./DEPLOY_FIREBASE.md)** - Deploy rápido em 5 minutos
- **[COMO_USAR.md](./COMO_USAR.md)** - Como usar o sistema

## 🔄 Migrar Dados Existentes

Se você já tem dados no LocalStorage:

### 1. Exportar dados

Abra o console do navegador no site antigo e execute:

\`\`\`javascript
// Cole e execute o conteúdo de scripts/migrate-to-firebase.js
\`\`\`

Isso irá gerar um arquivo JSON com todos os seus dados.

### 2. Importar para o Firestore

\`\`\`bash
# Baixe a chave de serviço do Firebase Console
# Salve como scripts/serviceAccountKey.json

# Execute o script de importação
cd scripts
node import-to-firestore.js backup-dados-XXXXX.json
\`\`\`

## 🗂️ Coleções do Firestore

O banco de dados está organizado nas seguintes coleções:

### `agendamentos`
\`\`\`javascript
{
  nome: string,
  telefone: string,
  email: string,
  data: string,
  horario: string,
  servico: string,
  status: 'pendente' | 'confirmado' | 'cancelado',
  criadoEm: timestamp,
  atualizadoEm: timestamp
}
\`\`\`

### `leads`
\`\`\`javascript
{
  nome: string,
  telefone: string,
  email: string,
  interesse: string,
  origem: string,
  status: 'novo' | 'contatado' | 'convertido',
  criadoEm: timestamp
}
\`\`\`

### `conversas`
\`\`\`javascript
{
  nome: string,
  mensagens: array,
  leadData: object,
  status: 'em_andamento' | 'completo',
  origem: 'chatbot' | 'whatsapp',
  criadaEm: timestamp
}
\`\`\`

### `configuracoes`
\`\`\`javascript
{
  horarioFuncionamento: object,
  duracaoConsulta: number,
  intervaloBloqueio: number
}
\`\`\`

## 🛡️ Segurança

### Firestore Rules

As regras de segurança estão em `firestore.rules`:

- ✅ Qualquer pessoa pode criar agendamentos/leads
- ✅ Apenas admins podem ler/editar/deletar
- ✅ Configurações: leitura pública, escrita apenas admin

### Storage Rules

As regras do Storage estão em `storage.rules`:

- ✅ Imagens públicas: leitura livre
- ✅ Upload: apenas admins autenticados

## 📊 Monitoramento

### Logs das Functions

\`\`\`bash
# Ver logs em tempo real
firebase functions:log

# Ver logs de uma função específica
firebase functions:log --only api
\`\`\`

### Console do Firebase

Acesse: https://console.firebase.google.com

- Firestore Database: Ver e editar dados
- Functions: Logs e métricas
- Hosting: Histórico de deploys
- Analytics: Tráfego do site (se ativado)

## 💰 Custos

### Plano Spark (Gratuito)

- ✅ Firestore: 50k leituras/dia
- ✅ Hosting: 10 GB transferidos/mês
- ✅ Storage: 5 GB armazenados
- ❌ Functions: Não disponível

### Plano Blaze (Pay-as-you-go)

**Necessário para Functions!**

- ✅ Tudo do Spark +
- ✅ Functions: 2M invocações/mês grátis
- 💵 Paga apenas o que exceder

**Estimativa mensal:** R$ 0 - R$ 20 (tráfego normal)

## 🆘 Problemas Comuns

### "Permission denied" no Firestore

**Causa:** Regras de segurança bloqueando acesso

**Solução:**
1. Verifique `firestore.rules`
2. Deploy das regras: `firebase deploy --only firestore:rules`
3. Para testes, pode usar regras abertas (NÃO recomendado em produção)

### Functions retornam 404

**Causa:** Functions não deployadas ou plano incorreto

**Solução:**
1. Upgrade para plano Blaze
2. Deploy: `firebase deploy --only functions`
3. Aguarde alguns minutos após deploy

### Site não atualiza

**Causa:** Cache do navegador ou build não executado

**Solução:**
1. Execute: `npm run build`
2. Deploy: `firebase deploy --only hosting`
3. Limpe cache: Ctrl + F5

## 📞 Suporte

- 📧 Email: suporte@exemplo.com
- 💬 WhatsApp: (11) 94854-1086
- 📖 Docs Firebase: https://firebase.google.com/docs

## 🎉 Recursos Adicionais

- [Firebase Console](https://console.firebase.google.com)
- [Documentação Firebase](https://firebase.google.com/docs)
- [Firestore Pricing](https://firebase.google.com/pricing)
- [Status do Firebase](https://status.firebase.google.com)

---

**🔥 Powered by Firebase | Desenvolvido para Dra. Teiciane Ramalho**

**Última atualização:** Outubro 2025

