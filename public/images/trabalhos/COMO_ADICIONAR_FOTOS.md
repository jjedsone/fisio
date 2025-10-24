# 📸 Como Adicionar Fotos na Galeria de Trabalhos

## 📁 Localização

Coloque suas fotos nesta pasta:
`public/images/trabalhos/`

---

## 📝 Nomeando as Fotos

Nomeie suas fotos de forma simples:
- `trabalho-1.jpg`
- `trabalho-2.jpg`
- `trabalho-3.jpg`
- `trabalho-4.jpg`
- ...e assim por diante

---

## ✅ Formato das Imagens

**Formatos aceitos:** JPG, PNG, WEBP

**Tamanho recomendado:** 800x600 pixels

**Peso máximo:** 500 KB por imagem (para carregar rápido)

---

## 🖼️ Tipos de Fotos

Você pode adicionar fotos de:
- ✅ Atendimentos domiciliares (home care)
- ✅ Sessões de Pilates
- ✅ Tratamentos de fisioterapia
- ✅ Procedimentos estéticos/dermatofuncionais
- ✅ Equipamentos e espaço de trabalho
- ✅ Resultados (antes/depois) - COM AUTORIZAÇÃO DO PACIENTE

---

## ⚠️ IMPORTANTE - Privacidade e Ética

**SEMPRE:**
- ✅ Solicite autorização por escrito do paciente
- ✅ Mantenha documento de autorização arquivado
- ✅ Se possível, não mostre rostos identificáveis
- ✅ Respeite a Lei Geral de Proteção de Dados (LGPD)
- ✅ Nunca exponha dados pessoais dos pacientes

**Modelos de autorização:** Consulte o CREFITO ou seu advogado

---

## 🔧 Como Editar o Texto da Galeria

Abra o arquivo: `fisio-main/src/App.jsx`

Procure por: `{/* Gallery Section - Galeria de Trabalhos */}`

**Estrutura de cada card:**

\`\`\`javascript
<div className="gallery-card">
  <div className="gallery-image">
    <img 
      src="/images/trabalhos/trabalho-1.jpg"  ← Caminho da foto
      alt="Descrição da foto"
    />
    <div className="gallery-overlay">
      <span className="gallery-tag">Fisioterapia</span>  ← Tag colorida
    </div>
  </div>
  <div className="gallery-content">
    <h3>Título do Trabalho</h3>  ← Título
    <p>Descrição do tratamento realizado.</p>  ← Descrição
    <span className="gallery-date">📅 Janeiro 2025</span>  ← Data
  </div>
</div>
\`\`\`

---

## 🎨 Tags Disponíveis

Você pode usar essas tags (com cores diferentes):
- `Fisioterapia` - Azul
- `Pilates` - Roxo
- `Estética` - Verde
- `Home Care` - Laranja

---

## 📋 Exemplo Completo

**1. Adicione a foto:**
- Copie `minha-foto.jpg` para `public/images/trabalhos/trabalho-5.jpg`

**2. Edite o código (App.jsx):**

\`\`\`javascript
<div className="gallery-card">
  <div className="gallery-image">
    <img 
      src="/images/trabalhos/trabalho-5.jpg" 
      alt="Sessão de Pilates com paciente"
    />
    <div className="gallery-overlay">
      <span className="gallery-tag">Pilates</span>
    </div>
  </div>
  <div className="gallery-content">
    <h3>Sessão de Pilates - Fortalecimento</h3>
    <p>Aula individual focada em fortalecimento do core e correção postural.</p>
    <span className="gallery-date">📅 Fevereiro 2025</span>
  </div>
</div>
\`\`\`

**3. Faça o build e deploy:**

\`\`\`bash
npm run build
npx firebase-tools deploy --only hosting
\`\`\`

---

## 🚀 Deploy Rápido

Depois de adicionar/alterar fotos e textos:

\`\`\`bash
# 1. Build
npm run build

# 2. Deploy
npx firebase-tools deploy --only hosting

# 3. Aguarde 1-2 minutos e acesse:
# https://dra-teiciane-ramalho.web.app
\`\`\`

---

## 💡 Dicas

### Otimizar Fotos (Reduzir Tamanho)

Use ferramentas gratuitas online:
- **TinyPNG:** https://tinypng.com/
- **Squoosh:** https://squoosh.app/
- **Compressor.io:** https://compressor.io/

### Fotos Profissionais

Para fotos de alta qualidade:
- Use boa iluminação natural
- Mantenha o ambiente organizado
- Tire fotos em alta resolução e depois reduza
- Considere contratar um fotógrafo profissional

---

## 🆘 Problemas Comuns

### "Foto não aparece no site"

**Solução:**
1. Verifique se o nome do arquivo está correto
2. Verifique se está na pasta certa: `public/images/trabalhos/`
3. Faça build novamente: `npm run build`
4. Deploy: `npx firebase-tools deploy --only hosting`

### "Foto muito pesada, site lento"

**Solução:**
- Comprima a imagem em sites como TinyPNG
- Tamanho ideal: 800x600 pixels, menos de 500 KB

---

## 📞 Precisa de Ajuda?

Se tiver dúvidas sobre como adicionar fotos ou editar textos, entre em contato com seu desenvolvedor!

---

**🎨 Galeria criada para mostrar seus trabalhos de forma profissional e ética!**

