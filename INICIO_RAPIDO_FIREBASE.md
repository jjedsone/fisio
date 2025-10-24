# ⚡ Início Rápido - Firebase

## 🎯 5 Passos para Deploy no Firebase

### 1️⃣ Criar Projeto Firebase (5 min)

1. Acesse: https://console.firebase.google.com/
2. Clique em "Adicionar projeto"
3. Nome: `fisio-dra-teiciane`
4. Desative Analytics (opcional)
5. Clique em "Criar projeto"

### 2️⃣ Ativar Serviços (3 min)

**Firestore Database:**
- Clique em "Firestore Database" → "Criar banco de dados"
- Modo: Produção
- Localização: `southamerica-east1` (São Paulo)

**Storage:**
- Clique em "Storage" → "Começar"
- Localização: `southamerica-east1`

**Functions (Opcional):**
- Upgrade para Blaze Plan (pay-as-you-go)
- Não se preocupe: tem nível gratuito generoso!

### 3️⃣ Obter Credenciais (2 min)

1. Na página inicial do projeto, clique em "Web" (`</>`)
2. Nome do app: `Fisio Dra Teiciane`
3. **COPIE as credenciais!**

### 4️⃣ Configurar Projeto Local (5 min)

\`\`\`bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# No diretório do projeto
cd fisio-main

# Copiar arquivo de configuração
cp env.example .env

# Editar .env e colar suas credenciais
# Também edite src/config/firebase.js
\`\`\`

### 5️⃣ Deploy! (2 min)

\`\`\`bash
# Build
npm run build

# Deploy Firestore (regras)
firebase deploy --only firestore

# Deploy Site
firebase deploy --only hosting
\`\`\`

**🎉 Pronto! Seu site está no ar em:**
\`https://SEU_PROJETO.web.app\`

---

## 📦 Estrutura de Pastas Criada

\`\`\`
fisio-main/
├── 📁 src/
│   ├── 📁 config/
│   │   └── 🔥 firebase.js           ← Configuração do Firebase
│   ├── 📁 services/
│   │   └── 🔥 firebaseService.js    ← CRUD do Firestore
│   ├── 📁 hooks/
│   │   └── 🔥 useFirebase.js        ← Hooks customizados
│   └── 📁 components/
│       └── 🔥 ExemploFirebase.jsx   ← Exemplos de uso
│
├── 📁 functions/                     ← Backend (Firebase Functions)
│   ├── index.js                     ← API REST
│   └── package.json
│
├── 📁 scripts/                       ← Scripts úteis
│   ├── migrate-to-firebase.js       ← Exportar dados
│   └── import-to-firestore.js       ← Importar dados
│
├── 🔥 firebase.json                  ← Config Firebase
├── 🔥 firestore.rules               ← Segurança Firestore
├── 🔥 firestore.indexes.json        ← Índices
├── 🔥 storage.rules                 ← Segurança Storage
├── 🔥 .firebaserc                   ← Projeto ativo
│
└── 📚 Documentação/
    ├── FIREBASE_SETUP.md            ← Guia completo
    ├── DEPLOY_FIREBASE.md           ← Deploy rápido
    ├── MIGRACAO_COMPONENTES.md      ← Como migrar código
    └── README_FIREBASE.md           ← Visão geral
\`\`\`

---

## 🔥 Usando Firebase no Código

### Opção 1: Hooks (Recomendado) ⭐

\`\`\`javascript
import { useAgendamentos } from '../hooks/useFirebase';

function MeuComponente() {
  const { agendamentos, loading, criar, atualizar, deletar } = useAgendamentos();

  // Criar novo
  const novo = async () => {
    await criar({ nome: 'João', telefone: '123' });
  };

  // Atualizar
  const editar = async (id) => {
    await atualizar(id, { status: 'confirmado' });
  };

  // Deletar
  const remover = async (id) => {
    await deletar(id);
  };

  // Listar (automático!)
  return (
    <div>
      {loading && <p>Carregando...</p>}
      {agendamentos.map(item => (
        <div key={item.id}>{item.nome}</div>
      ))}
    </div>
  );
}
\`\`\`

### Opção 2: Serviços Diretos

\`\`\`javascript
import { agendamentosService } from '../services/firebaseService';

const criar = async () => {
  await agendamentosService.criar({ nome: 'João' });
};

const listar = async () => {
  const dados = await agendamentosService.listar();
  console.log(dados);
};
\`\`\`

---

## 📝 Comandos Úteis

### Desenvolvimento

\`\`\`bash
npm run dev                      # Servidor local
npm run build                    # Build para produção
npm run preview                  # Preview do build
\`\`\`

### Firebase

\`\`\`bash
firebase login                   # Login
firebase init                    # Inicializar projeto
firebase deploy                  # Deploy completo
firebase deploy --only hosting   # Apenas site
firebase deploy --only functions # Apenas backend
firebase deploy --only firestore # Apenas regras
firebase emulators:start         # Testar localmente
firebase functions:log           # Ver logs
\`\`\`

### NPM Scripts Customizados

\`\`\`bash
npm run firebase:deploy          # Build + Deploy completo
npm run firebase:deploy:hosting  # Build + Deploy site
npm run firebase:deploy:functions # Deploy functions
npm run firebase:deploy:firestore # Deploy regras
npm run firebase:logs            # Ver logs
npm run firebase:emulators       # Emuladores locais
\`\`\`

---

## 🗂️ Coleções do Firestore

### `agendamentos`
- nome, telefone, email
- data, horario, servico
- status: 'pendente' | 'confirmado' | 'cancelado'

### `leads`
- nome, telefone, email
- interesse, origem
- status: 'novo' | 'contatado' | 'convertido'

### `conversas`
- mensagens[], leadData{}
- status, origem
- criadaEm

### `configuracoes`
- horarioFuncionamento
- duracaoConsulta
- intervaloBloqueio

---

## ✅ Checklist

### Setup Inicial
- [ ] Projeto criado no Firebase
- [ ] Firestore ativado
- [ ] Storage ativado
- [ ] Credenciais copiadas
- [ ] .env configurado
- [ ] firebase.js configurado

### Deploy
- [ ] Firebase CLI instalado
- [ ] Login realizado
- [ ] Build executado
- [ ] Regras deployadas
- [ ] Site deployado
- [ ] URL funcionando

### Testes
- [ ] Criar agendamento
- [ ] Listar agendamentos
- [ ] Atualizar status
- [ ] Deletar agendamento
- [ ] Painel admin funcionando

---

## 🆘 Ajuda Rápida

### Erro: "Permission denied"
→ Deploy das regras: `firebase deploy --only firestore:rules`

### Erro: "Functions 404"
→ Upgrade para Blaze Plan + Deploy functions

### Site não atualiza
→ `npm run build` + `firebase deploy --only hosting` + Ctrl+F5

### Dados não aparecem
→ Verifique Firebase Console → Firestore Database

---

## 📚 Documentação

| Arquivo | Descrição |
|---------|-----------|
| **FIREBASE_SETUP.md** | 📖 Guia completo passo a passo |
| **DEPLOY_FIREBASE.md** | 🚀 Deploy rápido em 5 minutos |
| **MIGRACAO_COMPONENTES.md** | 🔄 Como migrar código |
| **README_FIREBASE.md** | 📋 Visão geral do Firebase |
| **ExemploFirebase.jsx** | 💻 Exemplos de código |

---

## 💰 Custos

### Uso Típico (site pequeno/médio)
- Firestore: **Grátis** (< 50k leituras/dia)
- Hosting: **Grátis** (< 10 GB/mês)
- Storage: **Grátis** (< 5 GB)
- Functions: **Grátis** (< 2M invocações/mês)

**Total estimado:** R$ 0,00 - R$ 20,00/mês

---

## 🎯 Próximos Passos

1. ✅ Deploy realizado
2. 🔄 Migrar componentes (veja MIGRACAO_COMPONENTES.md)
3. 📱 Configurar WhatsApp Bot (opcional)
4. 🔐 Configurar autenticação admin
5. 📊 Ativar Analytics (opcional)
6. 🌐 Configurar domínio customizado

---

**🔥 Firebase configurado com sucesso!**

**Precisa de ajuda?**
- 📖 Veja a documentação completa
- 💻 Consulte os exemplos de código
- 🆘 Verifique o troubleshooting

---

**Desenvolvido para Dra. Teiciane Ramalho** | Outubro 2025

