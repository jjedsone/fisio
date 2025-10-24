# 📸 Como Gerenciar a Galeria de Trabalhos

## 🎉 Nova Funcionalidade Criada!

Agora você pode **adicionar, editar e excluir** trabalhos da galeria diretamente pelo **Painel Admin**, sem precisar mexer no código!

---

## 🚀 Como Adicionar a Aba no Painel Admin

### Passo 1: Abrir AdminPanel.jsx

Abra o arquivo: `src/components/AdminPanel.jsx`

### Passo 2: Importar o componente GaleriaAdmin

No início do arquivo, adicione:

\`\`\`javascript
import GaleriaAdmin from './GaleriaAdmin';
\`\`\`

### Passo 3: Adicionar a aba "Galeria"

Procure por onde estão as abas (leads, conversas, consultas, etc) e adicione:

\`\`\`javascript
<button
  className={activeTab === 'galeria' ? 'active' : ''}
  onClick={() => setActiveTab('galeria')}
>
  📸 Galeria
</button>
\`\`\`

### Passo 4: Adicionar o conteúdo da aba

Na seção onde os conteúdos das abas são renderizados, adicione:

\`\`\`javascript
{activeTab === 'galeria' && (
  <GaleriaAdmin />
)}
\`\`\`

---

## 📋 Como Usar (Para o Usuário)

### 1️⃣ Acessar o Painel Admin

1. Abra o site: https://dra-teiciane-ramalho.web.app
2. Clique no ícone **⚙️** no rodapé
3. Digite a senha: **admin123** (ou a senha configurada)
4. Clique na aba **"📸 Galeria"**

### 2️⃣ Adicionar Novo Trabalho

1. Clique em **"➕ Adicionar Trabalho"**
2. Preencha o formulário:
   - **Título:** Ex: "Reabilitação Pós-Operatória"
   - **Descrição:** Descreva o tratamento realizado
   - **Categoria:** Escolha entre Fisioterapia, Pilates, Estética ou Home Care
   - **Data:** Ex: "Janeiro 2025"
   - **Imagem:** Clique em "Escolher arquivo" e selecione a foto
3. Clique em **"Adicionar"**
4. Aguarde o upload (pode levar alguns segundos)
5. Pronto! O trabalho aparece imediatamente na galeria

### 3️⃣ Editar Trabalho Existente

1. Encontre o card do trabalho
2. Clique em **"✏️ Editar"**
3. Modifique os campos desejados
4. Pode trocar a imagem se quiser
5. Clique em **"Atualizar"**

### 4️⃣ Excluir Trabalho

1. Encontre o card do trabalho
2. Clique em **"🗑️ Excluir"**
3. Confirme a exclusão
4. Pronto! Removido da galeria e do Firebase

---

## 🎨 Categorias Disponíveis

Cada categoria tem uma cor diferente:

| Categoria | Cor | Uso |
|-----------|-----|-----|
| **Fisioterapia** | 🔵 Azul | Tratamentos de fisioterapia |
| **Pilates** | 🟣 Roxo | Aulas e sessões de Pilates |
| **Estética** | 🟢 Verde | Tratamentos dermatofuncionais |
| **Home Care** | 🟠 Laranja | Atendimentos domiciliares |

---

## 📐 Requisitos das Imagens

### Formato
- ✅ **Aceitos:** JPG, PNG, WEBP
- ❌ **Não aceitos:** GIF, BMP, TIFF

### Tamanho
- **Máximo:** 5 MB por imagem
- **Recomendado:** 800x600 pixels
- **Peso ideal:** 200-500 KB

### Dicas
- Use fotos de alta qualidade
- Boa iluminação
- Foco no tratamento/paciente
- Evite imagens borradas

---

## 🔐 Privacidade e Ética

### ⚠️ IMPORTANTE - Antes de Postar Fotos

1. ✅ **Autorização por escrito** do paciente
2. ✅ **Documento arquivado** em local seguro
3. ✅ **Evite rostos identificáveis** sempre que possível
4. ✅ **Nunca exponha dados pessoais** (nome completo, endereço, etc.)
5. ✅ **Respeite a LGPD**
6. ✅ **Siga as normas do CREFITO**

### Modelo de Autorização

\`\`\`
TERMO DE AUTORIZAÇÃO DE USO DE IMAGEM

Eu, ________________________________, CPF ______________, autorizo a 
Dra. Teiciane Ramalho (CREFITO-3: XXXXXX-F) a utilizar minha imagem 
em materiais de divulgação profissional, incluindo site, redes sociais 
e materiais impressos.

Local e Data: _______________________
Assinatura: __________________________
\`\`\`

---

## 💾 Onde os Dados Ficam Salvos?

### Firebase Firestore
- Informações dos trabalhos (título, descrição, categoria, data)
- Coleção: `galeriaTrabalhos`

### Firebase Storage
- Imagens enviadas
- Pasta: `galeria/`

### Benefícios
- ✅ **Backup automático**
- ✅ **Acesso de qualquer lugar**
- ✅ **Sincronização em tempo real**
- ✅ **Escalável e seguro**

---

## 🚀 Deploy Após Mudanças

Depois de adicionar a aba no AdminPanel:

\`\`\`bash
# 1. Build do projeto
npm run build

# 2. Deploy no Firebase
npx firebase-tools deploy --only hosting
\`\`\`

---

## 🔧 Estrutura dos Arquivos Criados

\`\`\`
src/
├── services/
│   └── galeriaService.js           ← Serviço CRUD da galeria
├── components/
│   ├── GaleriaAdmin.jsx            ← Componente de gerenciamento
│   └── GaleriaAdmin.css            ← Estilos do componente
└── App.jsx                          ← Atualizado para buscar do Firebase
\`\`\`

---

## 📊 Fluxo de Dados

\`\`\`
Usuário
   ↓
AdminPanel → Aba Galeria
   ↓
GaleriaAdmin Component
   ↓
galeriaService
   ↓
Firebase Firestore + Storage
   ↓
Site Público (App.jsx)
   ↓
Visitantes do Site
\`\`\`

---

## 🎯 Recursos

### ✅ O que você pode fazer:
- Adicionar trabalhos ilimitados
- Editar título, descrição, categoria e data
- Trocar imagens
- Excluir trabalhos
- Visualizar em tempo real
- Upload direto pelo navegador

### ❌ O que NÃO pode fazer ainda:
- Reordenar cards (ordem é por data de criação)
- Adicionar múltiplas imagens por trabalho
- Adicionar vídeos

---

## 🆘 Problemas Comuns

### "Erro ao fazer upload da imagem"

**Causas possíveis:**
- Imagem maior que 5MB
- Formato não suportado
- Problema de conexão
- Firebase Storage não ativado

**Solução:**
1. Comprima a imagem: https://tinypng.com/
2. Converta para JPG se necessário
3. Verifique sua conexão
4. Ative o Storage no Firebase Console

### "Trabalho não aparece no site"

**Solução:**
- Aguarde alguns segundos e recarregue a página
- Limpe o cache do navegador (Ctrl + F5)
- Verifique se salvou corretamente no Admin

### "Não consigo editar"

**Solução:**
- Verifique se está logado no Admin
- Recarregue a página do Admin
- Tente excluir e criar novamente

---

## 📱 Responsividade

A galeria é totalmente responsiva:

- **Desktop:** 3 cards por linha
- **Tablet:** 2 cards por linha
- **Mobile:** 1 card por linha

O painel admin também funciona perfeitamente em dispositivos móveis!

---

## 🎨 Personalizações Futuras

Você pode solicitar:
- Adicionar mais categorias
- Mudar as cores das tags
- Adicionar filtros por categoria
- Sistema de busca
- Ordenação personalizada
- Múltiplas imagens por trabalho
- Galeria com lightbox (zoom)

---

## 📞 Suporte

Se precisar de ajuda:
- 💬 WhatsApp: (11) 94854-1086
- 📧 Email: suporte@exemplo.com

---

## ✅ Checklist de Integração

- [ ] Criar arquivo `galeriaService.js`
- [ ] Criar arquivo `GaleriaAdmin.jsx`
- [ ] Criar arquivo `GaleriaAdmin.css`
- [ ] Atualizar `App.jsx` (imports e galeria dinâmica)
- [ ] Atualizar `App.css` (loading e empty states)
- [ ] Adicionar aba no `AdminPanel.jsx`
- [ ] Ativar Firebase Storage no Console
- [ ] Fazer build do projeto
- [ ] Deploy no Firebase
- [ ] Testar adição de trabalho
- [ ] Testar edição
- [ ] Testar exclusão
- [ ] Verificar site público

---

**🎉 Sua Galeria Está Pronta para Ser Gerenciada!**

**Agora você tem controle total sobre os trabalhos exibidos no site, sem precisar mexer em código!** 🚀

---

**Última atualização:** Outubro 2025

