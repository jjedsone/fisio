# ⚡ Quick Start - Galeria de Trabalhos

## 🚀 3 Passos para Ativar

### 1️⃣ Adicionar Aba no AdminPanel

Abra `src/components/AdminPanel.jsx` e adicione:

**No início do arquivo:**
\`\`\`javascript
import GaleriaAdmin from './GaleriaAdmin';
\`\`\`

**Nas abas (procure por "leads", "conversas", etc):**
\`\`\`javascript
<button
  className={activeTab === 'galeria' ? 'active' : ''}
  onClick={() => setActiveTab('galeria')}
>
  📸 Galeria
</button>
\`\`\`

**No conteúdo das abas:**
\`\`\`javascript
{activeTab === 'galeria' && <GaleriaAdmin />}
\`\`\`

### 2️⃣ Deploy das Regras do Firestore

\`\`\`bash
npx firebase-tools deploy --only firestore:rules
\`\`\`

### 3️⃣ Build e Deploy

\`\`\`bash
npm run build
npx firebase-tools deploy --only hosting
\`\`\`

---

## ✅ Pronto!

Acesse o painel admin → Aba "📸 Galeria" → Adicione seus trabalhos!

---

## 📸 Usar a Galeria

1. Site → Rodapé → **⚙️** → Senha: admin123
2. Clique na aba **"📸 Galeria"**
3. Clique em **"➕ Adicionar Trabalho"**
4. Preencha e envie a foto
5. Pronto! Aparece no site automaticamente

---

**📖 Guia completo:** [COMO_GERENCIAR_GALERIA.md](./COMO_GERENCIAR_GALERIA.md)

