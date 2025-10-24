# 🔄 Guia de Migração de Componentes

Este guia mostra como migrar seus componentes atuais que usam LocalStorage para usar o Firebase.

## 📋 Índice

1. [Mudanças Necessárias](#mudanças-necessárias)
2. [Migrando AdminPanel](#migrando-adminpanel)
3. [Migrando Chatbot](#migrando-chatbot)
4. [Migrando AgendamentoModal](#migrando-agendamentomodal)
5. [Exemplos de Código](#exemplos-de-código)

---

## 🔧 Mudanças Necessárias

### Antes (LocalStorage)

\`\`\`javascript
// Salvar dados
const dados = { nome: 'João', telefone: '123' };
const lista = JSON.parse(localStorage.getItem('leads') || '[]');
lista.push(dados);
localStorage.setItem('leads', JSON.stringify(lista));

// Ler dados
const leads = JSON.parse(localStorage.getItem('leads') || '[]');

// Atualizar dados
const index = lista.findIndex(item => item.id === id);
lista[index] = { ...lista[index], ...novoDados };
localStorage.setItem('leads', JSON.stringify(lista));

// Deletar dados
const filtered = lista.filter(item => item.id !== id);
localStorage.setItem('leads', JSON.stringify(filtered));
\`\`\`

### Depois (Firebase)

\`\`\`javascript
import { useLeads } from '../hooks/useFirebase';

function MeuComponente() {
  const { leads, loading, error, criar, atualizar, deletar } = useLeads();

  // Criar
  await criar({ nome: 'João', telefone: '123' });

  // Ler (automático via hook)
  // leads já contém todos os dados

  // Atualizar
  await atualizar(id, novoDados);

  // Deletar
  await deletar(id);
}
\`\`\`

---

## 🎯 Migrando AdminPanel

### Arquivo: `src/components/AdminPanel.jsx`

#### Passo 1: Importar Hooks

**Adicione no topo do arquivo:**

\`\`\`javascript
import { useAgendamentos, useLeads, useConversas } from '../hooks/useFirebase';
\`\`\`

#### Passo 2: Substituir useState por Hooks

**Antes:**
\`\`\`javascript
const [appointments, setAppointments] = useState([]);
const [leads, setLeads] = useState([]);
const [conversations, setConversations] = useState([]);

useEffect(() => {
  loadLeads();
  loadAppointments();
  loadConversations();
}, [isAuthenticated]);

const loadLeads = () => {
  const stored = JSON.parse(localStorage.getItem('leads') || '[]');
  setLeads(stored);
};
\`\`\`

**Depois:**
\`\`\`javascript
const { 
  agendamentos: appointments, 
  loading: appointmentsLoading,
  deletar: deletarAgendamento,
  atualizar: atualizarAgendamento
} = useAgendamentos();

const { 
  leads, 
  loading: leadsLoading,
  atualizar: atualizarLead
} = useLeads();

const { 
  conversas: conversations, 
  loading: conversasLoading 
} = useConversas();

// Não precisa mais de loadLeads, loadAppointments, etc.
// Os hooks carregam automaticamente!
\`\`\`

#### Passo 3: Atualizar Funções de Delete

**Antes:**
\`\`\`javascript
const handleDeleteAppointment = (id) => {
  const updated = appointments.filter(a => a.id !== id);
  setAppointments(updated);
  localStorage.setItem('appointments', JSON.stringify(updated));
};
\`\`\`

**Depois:**
\`\`\`javascript
const handleDeleteAppointment = async (id) => {
  try {
    await deletarAgendamento(id);
    alert('Agendamento deletado com sucesso!');
  } catch (error) {
    alert('Erro ao deletar: ' + error.message);
  }
};
\`\`\`

#### Passo 4: Atualizar Status

**Antes:**
\`\`\`javascript
const updateLeadStatus = (id, status) => {
  const updated = leads.map(lead => 
    lead.id === id ? { ...lead, status } : lead
  );
  setLeads(updated);
  localStorage.setItem('leads', JSON.stringify(updated));
};
\`\`\`

**Depois:**
\`\`\`javascript
const updateLeadStatus = async (id, status) => {
  try {
    await atualizarLead(id, { status });
  } catch (error) {
    console.error('Erro ao atualizar status:', error);
  }
};
\`\`\`

---

## 💬 Migrando Chatbot

### Arquivo: `src/components/Chatbot.jsx`

#### Passo 1: Importar Serviços

\`\`\`javascript
import { conversasService, leadsService } from '../services/firebaseService';
\`\`\`

#### Passo 2: Salvar Conversa

**Antes:**
\`\`\`javascript
const saveConversation = (conversation) => {
  const conversations = JSON.parse(localStorage.getItem('chatbotConversations') || '[]');
  conversations.push(conversation);
  localStorage.setItem('chatbotConversations', JSON.stringify(conversations));
};
\`\`\`

**Depois:**
\`\`\`javascript
const saveConversation = async (conversation) => {
  try {
    await conversasService.salvar(conversation);
  } catch (error) {
    console.error('Erro ao salvar conversa:', error);
  }
};
\`\`\`

#### Passo 3: Salvar Lead

**Antes:**
\`\`\`javascript
const saveLead = (leadData) => {
  const leads = JSON.parse(localStorage.getItem('leads') || '[]');
  leads.push(leadData);
  localStorage.setItem('leads', JSON.stringify(leads));
};
\`\`\`

**Depois:**
\`\`\`javascript
const saveLead = async (leadData) => {
  try {
    await leadsService.criar(leadData);
    console.log('Lead salvo com sucesso!');
  } catch (error) {
    console.error('Erro ao salvar lead:', error);
  }
};
\`\`\`

---

## 📅 Migrando AgendamentoModal

### Arquivo: `src/components/AgendamentoModal.jsx`

#### Importar Serviços

\`\`\`javascript
import { agendamentosService } from '../services/firebaseService';
\`\`\`

#### Criar Agendamento

**Antes:**
\`\`\`javascript
const handleSubmit = (e) => {
  e.preventDefault();
  const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
  const newAppointment = {
    id: Date.now().toString(),
    ...formData,
    dataCriacao: new Date().toISOString()
  };
  appointments.push(newAppointment);
  localStorage.setItem('appointments', JSON.stringify(appointments));
  onClose();
};
\`\`\`

**Depois:**
\`\`\`javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    await agendamentosService.criar(formData);
    alert('Agendamento criado com sucesso!');
    onClose();
  } catch (error) {
    alert('Erro ao criar agendamento: ' + error.message);
  }
};
\`\`\`

---

## 📝 Exemplos de Código Completo

### Exemplo 1: Componente de Lista com Firebase

\`\`\`javascript
import React from 'react';
import { useAgendamentos } from '../hooks/useFirebase';

export const ListaAgendamentos = () => {
  const { agendamentos, loading, error, deletar } = useAgendamentos();

  if (loading) {
    return <div className="loading">Carregando agendamentos...</div>;
  }

  if (error) {
    return <div className="error">Erro: {error}</div>;
  }

  if (agendamentos.length === 0) {
    return <div>Nenhum agendamento encontrado.</div>;
  }

  return (
    <div className="lista-agendamentos">
      <h2>Agendamentos ({agendamentos.length})</h2>
      {agendamentos.map((agendamento) => (
        <div key={agendamento.id} className="agendamento-card">
          <h3>{agendamento.nome}</h3>
          <p>📅 {agendamento.data} às {agendamento.horario}</p>
          <p>📞 {agendamento.telefone}</p>
          <p>🏥 {agendamento.servico}</p>
          <p className={\`status \${agendamento.status}\`}>
            {agendamento.status}
          </p>
          <button 
            onClick={() => deletar(agendamento.id)}
            className="btn-deletar"
          >
            🗑️ Deletar
          </button>
        </div>
      ))}
    </div>
  );
};
\`\`\`

### Exemplo 2: Formulário com Firebase

\`\`\`javascript
import React, { useState } from 'react';
import { useAgendamentos } from '../hooks/useFirebase';

export const FormAgendamento = ({ onSuccess }) => {
  const { criar } = useAgendamentos();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    data: '',
    horario: '',
    servico: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await criar(formData);
      
      // Limpar formulário
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        data: '',
        horario: '',
        servico: ''
      });

      alert('✅ Agendamento criado com sucesso!');
      onSuccess && onSuccess();
    } catch (error) {
      alert('❌ Erro ao criar agendamento: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-agendamento">
      <input
        type="text"
        name="nome"
        placeholder="Nome completo"
        value={formData.nome}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="telefone"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="data"
        value={formData.data}
        onChange={handleChange}
        required
      />
      <input
        type="time"
        name="horario"
        value={formData.horario}
        onChange={handleChange}
        required
      />
      <select
        name="servico"
        value={formData.servico}
        onChange={handleChange}
        required
      >
        <option value="">Selecione um serviço</option>
        <option value="fisioterapia">Fisioterapia</option>
        <option value="drenagem">Drenagem Linfática</option>
        <option value="massagem">Massagem Relaxante</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? '⏳ Enviando...' : '✅ Agendar'}
      </button>
    </form>
  );
};
\`\`\`

---

## ✅ Checklist de Migração

### Para cada componente:

- [ ] Importar hooks do Firebase
- [ ] Substituir `useState` por hooks do Firebase
- [ ] Remover funções `load*` (não precisam mais!)
- [ ] Atualizar funções de criar/atualizar/deletar para `async`
- [ ] Adicionar `try/catch` para tratamento de erros
- [ ] Adicionar loading states
- [ ] Remover todas as referências a `localStorage`
- [ ] Testar CRUD completo
- [ ] Verificar tratamento de erros

---

## 🔄 Conversão Rápida

### localStorage → Firebase

| LocalStorage | Firebase |
|-------------|----------|
| `localStorage.getItem('leads')` | `useLeads()` |
| `localStorage.setItem('leads', JSON.stringify(data))` | `criar(data)` |
| Manual update array | `atualizar(id, data)` |
| Manual filter array | `deletar(id)` |
| Parse JSON | Automático |
| Stringify JSON | Automático |

---

## 🚨 Erros Comuns

### 1. Esquecer `async/await`

❌ **Errado:**
\`\`\`javascript
const handleDelete = (id) => {
  deletar(id); // Não espera completar!
};
\`\`\`

✅ **Correto:**
\`\`\`javascript
const handleDelete = async (id) => {
  await deletar(id);
};
\`\`\`

### 2. Não tratar erros

❌ **Errado:**
\`\`\`javascript
const salvar = async () => {
  await criar(dados); // Se der erro, quebra!
};
\`\`\`

✅ **Correto:**
\`\`\`javascript
const salvar = async () => {
  try {
    await criar(dados);
    alert('Sucesso!');
  } catch (error) {
    alert('Erro: ' + error.message);
  }
};
\`\`\`

### 3. Usar hooks dentro de condicionais

❌ **Errado:**
\`\`\`javascript
if (isAuthenticated) {
  const { leads } = useLeads(); // NUNCA faça isso!
}
\`\`\`

✅ **Correto:**
\`\`\`javascript
const { leads } = useLeads();

if (isAuthenticated) {
  // Usar leads aqui
}
\`\`\`

---

## 📚 Recursos

- [Exemplo Completo](./src/components/ExemploFirebase.jsx)
- [Hooks Firebase](./src/hooks/useFirebase.js)
- [Serviços Firebase](./src/services/firebaseService.js)
- [Setup Firebase](./FIREBASE_SETUP.md)

---

**🔥 Boa migração! Se precisar de ajuda, consulte os exemplos acima.**

