// Exemplo de componente usando Firebase
// Este arquivo demonstra como usar os hooks e serviços do Firebase

import React, { useState, useEffect } from 'react';
import { useAgendamentos, useLeads, useConversas } from '../hooks/useFirebase';
import { agendamentosService } from '../services/firebaseService';

// ============ EXEMPLO 1: Listar Agendamentos ============

export const ListaAgendamentos = () => {
  const { agendamentos, loading, error, deletar } = useAgendamentos();

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Agendamentos</h2>
      {agendamentos.map((agendamento) => (
        <div key={agendamento.id}>
          <h3>{agendamento.nome}</h3>
          <p>{agendamento.data} - {agendamento.horario}</p>
          <p>Status: {agendamento.status}</p>
          <button onClick={() => deletar(agendamento.id)}>
            Deletar
          </button>
        </div>
      ))}
    </div>
  );
};

// ============ EXEMPLO 2: Criar Agendamento ============

export const FormularioAgendamento = () => {
  const { criar } = useAgendamentos();
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    data: '',
    horario: '',
    servico: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await criar(formData);
      alert('Agendamento criado com sucesso!');
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        data: '',
        horario: '',
        servico: ''
      });
    } catch (error) {
      alert('Erro ao criar agendamento: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome"
        value={formData.nome}
        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Telefone"
        value={formData.telefone}
        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="date"
        value={formData.data}
        onChange={(e) => setFormData({ ...formData, data: e.target.value })}
        required
      />
      <input
        type="time"
        value={formData.horario}
        onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
        required
      />
      <select
        value={formData.servico}
        onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
        required
      >
        <option value="">Selecione um serviço</option>
        <option value="fisioterapia">Fisioterapia</option>
        <option value="drenagem">Drenagem Linfática</option>
        <option value="massagem">Massagem Relaxante</option>
      </select>
      <button type="submit">Agendar</button>
    </form>
  );
};

// ============ EXEMPLO 3: Atualizar Status ============

export const AtualizarStatus = ({ agendamentoId }) => {
  const { atualizar } = useAgendamentos();

  const handleStatusChange = async (novoStatus) => {
    try {
      await atualizar(agendamentoId, { status: novoStatus });
      alert('Status atualizado!');
    } catch (error) {
      alert('Erro: ' + error.message);
    }
  };

  return (
    <div>
      <button onClick={() => handleStatusChange('confirmado')}>
        Confirmar
      </button>
      <button onClick={() => handleStatusChange('cancelado')}>
        Cancelar
      </button>
    </div>
  );
};

// ============ EXEMPLO 4: Listar Leads ============

export const ListaLeads = () => {
  const { leads, loading, error } = useLeads();

  if (loading) return <div>Carregando leads...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Leads ({leads.length})</h2>
      {leads.map((lead) => (
        <div key={lead.id}>
          <h3>{lead.nome}</h3>
          <p>📱 {lead.telefone}</p>
          <p>✉️ {lead.email}</p>
          <p>Status: {lead.status}</p>
        </div>
      ))}
    </div>
  );
};

// ============ EXEMPLO 5: Salvar Conversa do Chatbot ============

export const SalvarConversa = ({ mensagens, leadData }) => {
  const { salvar } = useConversas();

  const handleSalvar = async () => {
    try {
      const conversa = {
        mensagens: mensagens,
        leadData: leadData,
        origem: 'chatbot',
        status: 'completo'
      };
      
      await salvar(conversa);
      console.log('Conversa salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar conversa:', error);
    }
  };

  return (
    <button onClick={handleSalvar}>
      Salvar Conversa
    </button>
  );
};

// ============ EXEMPLO 6: Uso Direto do Serviço ============

export const BuscarPorData = () => {
  const [data, setData] = useState('');
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleBuscar = async () => {
    setLoading(true);
    try {
      const resultado = await agendamentosService.buscarPorData(data);
      setAgendamentos(resultado);
    } catch (error) {
      console.error('Erro:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="date"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button onClick={handleBuscar} disabled={loading}>
        {loading ? 'Buscando...' : 'Buscar'}
      </button>
      
      <div>
        {agendamentos.map((agendamento) => (
          <div key={agendamento.id}>
            {agendamento.horario} - {agendamento.nome}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============ EXEMPLO 7: Upload de Imagem para Storage ============

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/firebase';

export const UploadImagem = () => {
  const [arquivo, setArquivo] = useState(null);
  const [url, setUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async () => {
    if (!arquivo) return;

    setUploading(true);
    try {
      // Criar referência no Storage
      const storageRef = ref(storage, `servicos/${arquivo.name}`);
      
      // Upload do arquivo
      await uploadBytes(storageRef, arquivo);
      
      // Obter URL pública
      const downloadURL = await getDownloadURL(storageRef);
      setUrl(downloadURL);
      
      alert('Upload realizado com sucesso!');
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setArquivo(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? 'Enviando...' : 'Upload'}
      </button>
      
      {url && (
        <div>
          <p>URL da imagem:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
          <img src={url} alt="Upload" style={{ maxWidth: '200px' }} />
        </div>
      )}
    </div>
  );
};

// ============ EXEMPLO 8: Escutar Mudanças em Tempo Real ============

import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export const AgendamentosTempoReal = () => {
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    // Criar listener em tempo real
    const unsubscribe = onSnapshot(
      collection(db, 'agendamentos'),
      (snapshot) => {
        const dados = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setAgendamentos(dados);
        console.log('Dados atualizados em tempo real!');
      },
      (error) => {
        console.error('Erro no listener:', error);
      }
    );

    // Cleanup: cancelar listener quando componente desmontar
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Agendamentos (Tempo Real)</h2>
      <p>Total: {agendamentos.length}</p>
      {agendamentos.map((agendamento) => (
        <div key={agendamento.id}>
          {agendamento.nome} - {agendamento.data}
        </div>
      ))}
    </div>
  );
};

// ============ NOTAS DE USO ============

/*
COMO USAR FIREBASE NO SEU PROJETO:

1. HOOKS (Recomendado):
   - useAgendamentos()
   - useLeads()
   - useConversas()
   - useConfiguracoes()
   - useMensagensWhatsApp()

2. SERVIÇOS DIRETOS:
   - agendamentosService.criar()
   - agendamentosService.listar()
   - agendamentosService.atualizar()
   - agendamentosService.deletar()
   - leadsService.criar()
   - conversasService.salvar()
   
3. FIREBASE DIRETAMENTE:
   - import { db, storage, auth } from '../config/firebase'
   - Use para operações avançadas

CONVERSÃO DE LOCALSTORAGE PARA FIREBASE:

ANTES (LocalStorage):
  const leads = JSON.parse(localStorage.getItem('leads') || '[]');
  localStorage.setItem('leads', JSON.stringify([...leads, novoLead]));

DEPOIS (Firebase):
  const { leads, criar } = useLeads();
  await criar(novoLead);

VANTAGENS:
  ✅ Dados persistentes na nuvem
  ✅ Sincronização entre dispositivos
  ✅ Backup automático
  ✅ Escalável
  ✅ Seguro
  ✅ Tempo real
*/

