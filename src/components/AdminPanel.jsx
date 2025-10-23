import React, { useState, useEffect } from 'react';
import './AdminPanel.css';

const AdminPanel = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('leads');
  const [appointments, setAppointments] = useState([]);
  const [leads, setLeads] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [whatsappStatus, setWhatsappStatus] = useState({
    isConnected: false,
    connectionStatus: 'disconnected',
    hasQrCode: false,
    qrCode: null
  });
  const [whatsappLogs, setWhatsappLogs] = useState([]);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState(null);
  const [appointmentForm, setAppointmentForm] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    endereco: '',
    bairro: '',
    cidade: 'São Paulo',
    servico: '',
    data: '',
    horario: '',
    observacoes: '',
    status: 'confirmado'
  });
  const [settings, setSettings] = useState({
    workDays: [1, 2, 3, 4, 5, 6], // 0=Domingo, 1=Segunda, ..., 6=Sábado
    startTime: '08:00',
    endTime: '18:00',
    breakStart: '12:00',
    breakEnd: '13:00',
    appointmentDuration: 60 // minutos
  });

  const ADMIN_PASSWORD = 'admin123'; // Em produção, usar autenticação real

  useEffect(() => {
    if (isAuthenticated) {
      loadLeads();
      loadAppointments();
      loadConversations();
      loadSettings();
      
      // Verificar status do WhatsApp a cada 3 segundos
      const whatsappInterval = setInterval(() => {
        if (activeTab === 'whatsapp') {
          fetchWhatsappStatus();
          fetchWhatsappLogs();
        }
      }, 3000);
      
      return () => clearInterval(whatsappInterval);
    }
  }, [isAuthenticated, activeTab]);

  const loadLeads = () => {
    const stored = JSON.parse(localStorage.getItem('leads') || '[]');
    setLeads(stored.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao)));
  };

  const loadConversations = () => {
    const stored = JSON.parse(localStorage.getItem('chatbotConversations') || '[]');
    setConversations(stored.sort((a, b) => new Date(b.dataInicio) - new Date(a.dataInicio)));
  };

  const loadAppointments = () => {
    const stored = JSON.parse(localStorage.getItem('appointments') || '[]');
    setAppointments(stored.sort((a, b) => new Date(b.dataCriacao) - new Date(a.dataCriacao)));
  };

  const loadSettings = () => {
    const stored = JSON.parse(localStorage.getItem('adminSettings') || 'null');
    if (stored) {
      setSettings(stored);
    } else {
      saveSettings(settings);
    }
  };

  const saveSettings = (newSettings) => {
    localStorage.setItem('adminSettings', JSON.stringify(newSettings));
    setSettings(newSettings);
  };

  // Funções do WhatsApp Bot
  const API_URL = 'http://localhost:3001/api';

  const fetchWhatsappStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/status`);
      const data = await response.json();
      setWhatsappStatus(data);
    } catch (error) {
      console.error('Erro ao buscar status do WhatsApp:', error);
    }
  };

  const fetchWhatsappLogs = async () => {
    try {
      const response = await fetch(`${API_URL}/logs`);
      const data = await response.json();
      setWhatsappLogs(data.logs || []);
    } catch (error) {
      console.error('Erro ao buscar logs:', error);
    }
  };

  const startWhatsappBot = async () => {
    try {
      const response = await fetch(`${API_URL}/start`, { method: 'POST' });
      const data = await response.json();
      if (data.success) {
        setTimeout(fetchWhatsappStatus, 2000);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert('Erro ao iniciar bot. Certifique-se de que o servidor está rodando.');
    }
  };

  const stopWhatsappBot = async () => {
    try {
      const response = await fetch(`${API_URL}/stop`, { method: 'POST' });
      const data = await response.json();
      alert(data.message);
      fetchWhatsappStatus();
    } catch (error) {
      alert('Erro ao parar bot.');
    }
  };

  const restartWhatsappBot = async () => {
    try {
      const response = await fetch(`${API_URL}/restart`, { method: 'POST' });
      const data = await response.json();
      alert(data.message);
      setTimeout(fetchWhatsappStatus, 2000);
    } catch (error) {
      alert('Erro ao reiniciar bot.');
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('Senha incorreta!');
    }
  };

  const updateAppointmentStatus = (id, newStatus) => {
    const updated = appointments.map(apt => 
      apt.id === id ? { ...apt, status: newStatus } : apt
    );
    setAppointments(updated);
    localStorage.setItem('appointments', JSON.stringify(updated));
  };

  const updateLeadStatus = (id, newStatus) => {
    const updated = leads.map(lead => 
      lead.id === id ? { ...lead, status: newStatus } : lead
    );
    setLeads(updated);
    localStorage.setItem('leads', JSON.stringify(updated));
  };

  const deleteLead = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este lead?')) {
      const updated = leads.filter(lead => lead.id !== id);
      setLeads(updated);
      localStorage.setItem('leads', JSON.stringify(updated));
    }
  };

  const deleteConversation = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta conversa?')) {
      const updated = conversations.filter(conv => conv.id !== id);
      setConversations(updated);
      localStorage.setItem('chatbotConversations', JSON.stringify(updated));
    }
  };

  const deleteAppointment = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta consulta?')) {
      const updated = appointments.filter(apt => apt.id !== id);
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
    }
  };

  const openNewAppointmentModal = () => {
    setEditingAppointment(null);
    setAppointmentForm({
      nome: '',
      telefone: '',
      email: '',
      dataNascimento: '',
      endereco: '',
      bairro: '',
      cidade: 'São Paulo',
      servico: '',
      data: '',
      horario: '',
      observacoes: '',
      status: 'confirmado'
    });
    setShowAppointmentModal(true);
  };

  const openEditAppointmentModal = (appointment) => {
    setEditingAppointment(appointment);
    setAppointmentForm({
      nome: appointment.nome || '',
      telefone: appointment.telefone || '',
      email: appointment.email || '',
      dataNascimento: appointment.dataNascimento || '',
      endereco: appointment.endereco || '',
      bairro: appointment.bairro || '',
      cidade: appointment.cidade || 'São Paulo',
      servico: appointment.servico || '',
      data: appointment.data || '',
      horario: appointment.horario || '',
      observacoes: appointment.observacoes || '',
      status: appointment.status || 'confirmado'
    });
    setShowAppointmentModal(true);
  };

  const handleAppointmentFormChange = (e) => {
    const { name, value } = e.target;
    setAppointmentForm(prev => ({ ...prev, [name]: value }));
  };

  const checkTimeConflict = (date, horario, excludeId = null) => {
    return appointments.some(apt => {
      if (excludeId && apt.id === excludeId) return false;
      if (apt.status === 'cancelado') return false;
      return apt.data === date && apt.horario === horario;
    });
  };

  const saveAppointment = () => {
    // Validações
    if (!appointmentForm.nome || !appointmentForm.telefone || !appointmentForm.servico || 
        !appointmentForm.data || !appointmentForm.horario) {
      alert('Por favor, preencha todos os campos obrigatórios:\n- Nome\n- Telefone\n- Serviço\n- Data\n- Horário');
      return;
    }

    // Verificar conflito de horário
    const hasConflict = checkTimeConflict(
      appointmentForm.data, 
      appointmentForm.horario, 
      editingAppointment?.id
    );

    if (hasConflict) {
      const confirm = window.confirm(
        '⚠️ ATENÇÃO: Já existe uma consulta agendada para este horário!\n\n' +
        `📅 Data: ${new Date(appointmentForm.data + 'T00:00:00').toLocaleDateString('pt-BR')}\n` +
        `🕐 Horário: ${appointmentForm.horario}\n\n` +
        '🔒 Como administrador, você pode sobrescrever este horário.\n\n' +
        'Deseja confirmar mesmo assim?'
      );
      
      if (!confirm) return;
    }

    if (editingAppointment) {
      // Atualizar consulta existente
      const updated = appointments.map(apt => 
        apt.id === editingAppointment.id 
          ? {
              ...apt,
              ...appointmentForm,
              dataAtualizacao: new Date().toISOString()
            }
          : apt
      );
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
      alert('✅ Consulta atualizada com sucesso!');
    } else {
      // Criar nova consulta com ID único
      const newAppointment = {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        ...appointmentForm,
        origem: 'admin',
        dataCriacao: new Date().toISOString()
      };
      const updated = [...appointments, newAppointment];
      setAppointments(updated);
      localStorage.setItem('appointments', JSON.stringify(updated));
      alert('✅ Consulta cadastrada com sucesso!');
    }

    setShowAppointmentModal(false);
    setEditingAppointment(null);
  };

  const generateTimeOptions = () => {
    const times = [];
    const [startHour] = settings.startTime.split(':').map(Number);
    const [endHour] = settings.endTime.split(':').map(Number);
    
    for (let h = startHour; h < endHour; h++) {
      times.push(`${String(h).padStart(2, '0')}:00`);
      times.push(`${String(h).padStart(2, '0')}:30`);
    }
    
    return times;
  };

  const toggleWorkDay = (day) => {
    const newWorkDays = settings.workDays.includes(day)
      ? settings.workDays.filter(d => d !== day)
      : [...settings.workDays, day].sort();
    saveSettings({ ...settings, workDays: newWorkDays });
  };

  const weekDays = [
    { id: 0, name: 'Domingo' },
    { id: 1, name: 'Segunda' },
    { id: 2, name: 'Terça' },
    { id: 3, name: 'Quarta' },
    { id: 4, name: 'Quinta' },
    { id: 5, name: 'Sexta' },
    { id: 6, name: 'Sábado' }
  ];

  if (!isAuthenticated) {
    return (
      <div className="admin-overlay">
        <div className="admin-login">
          <button className="admin-close" onClick={onClose}>✕</button>
          <div className="admin-login-header">
            <h2>🔐 Painel Administrativo</h2>
            <p>Digite a senha para acessar</p>
          </div>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="admin-password-input"
              autoFocus
            />
            <button type="submit" className="admin-login-btn">
              Entrar
            </button>
          </form>
          <p className="admin-hint"></p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        <div className="admin-header">
          <h2>⚙️ Painel Administrativo</h2>
          <button className="admin-close" onClick={onClose}>✕</button>
        </div>

        <div className="admin-tabs">
          <button 
            className={`admin-tab ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
          >
            🎯 Novos Leads ({leads.filter(l => l.status === 'novo').length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'conversations' ? 'active' : ''}`}
            onClick={() => setActiveTab('conversations')}
          >
            💬 Conversas ({conversations.filter(c => !c.finalizado).length})
          </button>
          <button 
            className={`admin-tab ${activeTab === 'appointments' ? 'active' : ''}`}
            onClick={() => setActiveTab('appointments')}
          >
            📅 Consultas ({appointments.length})
            {appointments.filter(apt => apt.status === 'pendente').length > 0 && (
              <span className="badge-new">{appointments.filter(apt => apt.status === 'pendente').length}</span>
            )}
          </button>
          <button 
            className={`admin-tab ${activeTab === 'whatsapp' ? 'active' : ''}`}
            onClick={() => setActiveTab('whatsapp')}
          >
            📱 WhatsApp Bot
            {whatsappStatus.isConnected && (
              <span className="badge-connected">●</span>
            )}
          </button>
          <button 
            className={`admin-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            ⚙️ Configurações
          </button>
        </div>

        <div className="admin-content">
          {activeTab === 'conversations' && (
            <div className="conversations-list">
              <div className="admin-section-header">
                <h3>💬 Conversas do Chatbot</h3>
                <button className="btn-refresh" onClick={loadConversations}>
                  🔄 Atualizar
                </button>
              </div>

              {conversations.length === 0 ? (
                <div className="empty-state">
                  <p>💬 Nenhuma conversa registrada ainda</p>
                </div>
              ) : (
                <div className="conversations-grid">
                  {conversations.map(conv => {
                    const duracao = conv.dataFim 
                      ? Math.round((new Date(conv.dataFim) - new Date(conv.dataInicio)) / 1000 / 60)
                      : Math.round((new Date() - new Date(conv.dataInicio)) / 1000 / 60);
                    
                    return (
                      <div key={conv.id} className={`conversation-card status-${conv.status}`}>
                        <div className="conversation-header">
                          <span className={`status-badge ${conv.status}`}>
                            {conv.status === 'em_andamento' && '⏳ Em Andamento'}
                            {conv.status === 'completo' && '✅ Completo'}
                            {conv.status === 'abandonado' && '❌ Abandonado'}
                          </span>
                          <button 
                            className="btn-delete"
                            onClick={() => deleteConversation(conv.id)}
                            title="Excluir"
                          >
                            🗑️
                          </button>
                        </div>

                        <div className="conversation-info">
                          <p className="conversation-time">
                            📅 Iniciada em: {new Date(conv.dataInicio).toLocaleString('pt-BR')}
                          </p>
                          <p className="conversation-duration">
                            ⏱️ Duração: {duracao} minutos
                          </p>
                          <p className="conversation-messages">
                            💬 Mensagens: {conv.mensagens?.length || 0}
                          </p>

                          {conv.leadParcial && Object.keys(conv.leadParcial).length > 0 && (
                            <div className="lead-parcial">
                              <h4>📋 Informações Coletadas:</h4>
                              {conv.leadParcial.nome && <p><strong>Nome:</strong> {conv.leadParcial.nome}</p>}
                              {conv.leadParcial.telefone && <p><strong>Telefone:</strong> {conv.leadParcial.telefone}</p>}
                              {conv.leadParcial.tipoServico && (
                                <p><strong>Interesse:</strong> {conv.leadParcial.tipoServico === 'estetico' ? 'Estética' : 'Fisioterapia'}</p>
                              )}
                              {conv.leadParcial.servicoEscolhido && (
                                <p><strong>Serviço:</strong> {conv.leadParcial.servicoEscolhido}</p>
                              )}
                              {conv.leadParcial.necessidade && (
                                <p><strong>Necessidade:</strong> {conv.leadParcial.necessidade}</p>
                              )}
                              {conv.leadParcial.urgencia && (
                                <p><strong>Urgência:</strong> {conv.leadParcial.urgencia}</p>
                              )}
                            </div>
                          )}

                          <details className="conversation-messages-details">
                            <summary>Ver Histórico de Mensagens ({conv.mensagens?.length || 0})</summary>
                            <div className="messages-history">
                              {conv.mensagens?.map((msg, idx) => (
                                <div key={idx} className={`history-message ${msg.type}`}>
                                  <span className="message-type">
                                    {msg.type === 'bot' ? '🤖 Bot:' : '👤 Usuário:'}
                                  </span>
                                  <span className="message-text">{msg.text}</span>
                                  {msg.options && (
                                    <div className="message-options-shown">
                                      <small>Opções: {msg.options.join(', ')}</small>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </details>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'leads' && (
            <div className="leads-list">
              <div className="admin-section-header">
                <h3>🎯 Leads Capturados pelo Chatbot</h3>
                <button className="btn-refresh" onClick={loadLeads}>
                  🔄 Atualizar
                </button>
              </div>

              {leads.length === 0 ? (
                <div className="empty-state">
                  <p>🎯 Nenhum lead capturado ainda</p>
                </div>
              ) : (
                <div className="leads-grid">
                  {leads.map(lead => (
                    <div key={lead.id} className={`lead-card status-${lead.status}`}>
                      <div className="lead-header">
                        <span className={`status-badge ${lead.status}`}>
                          {lead.status === 'novo' && '🆕 Novo'}
                          {lead.status === 'contatado' && '📞 Contatado'}
                          {lead.status === 'agendado' && '✅ Agendado'}
                          {lead.status === 'perdido' && '❌ Perdido'}
                        </span>
                        <button 
                          className="btn-delete"
                          onClick={() => deleteLead(lead.id)}
                          title="Excluir"
                        >
                          🗑️
                        </button>
                      </div>

                      <div className="lead-info">
                        <h4>{lead.nome}</h4>
                        
                        <div className="info-grid">
                          <div className="info-item">
                            <span className="info-label">📱 Telefone:</span>
                            <span className="info-value">{lead.telefone}</span>
                          </div>
                          
                          <div className="info-item">
                            <span className="info-label">👶 Idade:</span>
                            <span className="info-value">{lead.idade} anos</span>
                          </div>
                          
                          <div className="info-item">
                            <span className="info-label">📏 Altura:</span>
                            <span className="info-value">{lead.altura}m</span>
                          </div>
                          
                          <div className="info-item">
                            <span className="info-label">⚖️ Peso:</span>
                            <span className="info-value">{lead.peso}kg</span>
                          </div>
                        </div>

                        <div className="lead-details">
                          <p><strong>🏥 Necessidade:</strong> {lead.necessidade}</p>
                          <p><strong>⏰ Urgência:</strong> {lead.urgencia}</p>
                          <p><strong>📍 Conheceu por:</strong> {lead.conheceu}</p>
                          {lead.observacoes && (
                            <p><strong>📝 Observações:</strong> {lead.observacoes}</p>
                          )}
                        </div>

                        <p className="lead-created">
                          Cadastrado em: {new Date(lead.dataCriacao).toLocaleString('pt-BR')}
                        </p>
                      </div>

                      <div className="lead-actions">
                        {lead.status === 'novo' && (
                          <>
                            <button 
                              className="btn-action contacted"
                              onClick={() => updateLeadStatus(lead.id, 'contatado')}
                            >
                              📞 Marcar como Contatado
                            </button>
                            <button 
                              className="btn-action lost"
                              onClick={() => updateLeadStatus(lead.id, 'perdido')}
                            >
                              ❌ Marcar como Perdido
                            </button>
                          </>
                        )}
                        {lead.status === 'contatado' && (
                          <>
                            <button 
                              className="btn-action scheduled"
                              onClick={() => updateLeadStatus(lead.id, 'agendado')}
                            >
                              ✅ Marcar como Agendado
                            </button>
                            <button 
                              className="btn-action lost"
                              onClick={() => updateLeadStatus(lead.id, 'perdido')}
                            >
                              ❌ Perdido
                            </button>
                          </>
                        )}
                      </div>

                      <div className="lead-contact">
                        <a 
                          href={`https://wa.me/55${lead.telefone.replace(/\D/g, '')}?text=Olá ${lead.nome.split(' ')[0]}! Aqui é a Dra. Teiciane Ramalho. Vi seu interesse em fisioterapia domiciliar. Vamos conversar sobre como posso te ajudar?`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-whatsapp-lead"
                        >
                          💬 Chamar no WhatsApp
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="appointments-list">
              <div className="admin-section-header">
                <h3>📅 Consultas Agendadas</h3>
                <div className="header-actions">
                  <button className="btn-add-new" onClick={openNewAppointmentModal}>
                    ➕ Nova Consulta
                  </button>
                  <button className="btn-refresh" onClick={loadAppointments}>
                    🔄 Atualizar
                  </button>
                </div>
              </div>

              {appointments.length === 0 ? (
                <div className="empty-state">
                  <p>📋 Nenhuma consulta agendada ainda</p>
                </div>
              ) : (
                <div className="appointments-grid">
                  {appointments.map((apt) => {
                    // Verifica se é um agendamento novo (menos de 1 hora)
                    const isNew = apt.dataCriacao && 
                      (new Date() - new Date(apt.dataCriacao)) < 3600000; // 1 hora em ms
                    
                    return (
                      <div key={apt.id} className={`appointment-card status-${apt.status} ${isNew ? 'is-new' : ''}`}>
                        <div className="appointment-header">
                          {isNew && <span className="new-badge">🆕 NOVO!</span>}
                          <span className={`status-badge ${apt.status}`}>
                            {apt.status === 'pendente' && '⏳ Pendente'}
                            {apt.status === 'confirmado' && '✅ Confirmado'}
                            {apt.status === 'cancelado' && '❌ Cancelado'}
                            {apt.status === 'concluido' && '✔️ Concluído'}
                          </span>
                          <div className="card-buttons">
                            <button 
                              className="btn-edit"
                              onClick={() => openEditAppointmentModal(apt)}
                              title="Editar"
                            >
                              ✏️
                            </button>
                            <button 
                              className="btn-delete"
                              onClick={() => deleteAppointment(apt.id)}
                              title="Excluir"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>

                        <div className="appointment-info">
                          <p><strong>👤 Paciente:</strong> {apt.nome}</p>
                          <p><strong>📱 Telefone:</strong> {apt.telefone}</p>
                          <p><strong>📧 E-mail:</strong> {apt.email}</p>
                          <p><strong>🏥 Serviço:</strong> {apt.servico}</p>
                          <p><strong>📅 Data:</strong> {new Date(apt.data + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
                          <p><strong>🕐 Horário:</strong> {apt.horario}</p>
                          {apt.observacoes && (
                            <p><strong>📝 Observações:</strong> {apt.observacoes}</p>
                          )}
                          <p className="appointment-created">
                            Agendado em: {new Date(apt.dataCriacao).toLocaleString('pt-BR')}
                          </p>
                        </div>

                        <div className="appointment-actions">
                          {apt.status === 'pendente' && (
                            <>
                              <button 
                                className="btn-action confirm"
                                onClick={() => updateAppointmentStatus(apt.id, 'confirmado')}
                              >
                                ✅ Confirmar
                              </button>
                              <button 
                                className="btn-action cancel"
                                onClick={() => updateAppointmentStatus(apt.id, 'cancelado')}
                              >
                                ❌ Cancelar
                              </button>
                            </>
                          )}
                          {apt.status === 'confirmado' && (
                            <>
                              <button 
                                className="btn-action complete"
                                onClick={() => updateAppointmentStatus(apt.id, 'concluido')}
                              >
                                ✔️ Concluir
                              </button>
                              <button 
                                className="btn-action cancel"
                                onClick={() => updateAppointmentStatus(apt.id, 'cancelado')}
                              >
                                ❌ Cancelar
                              </button>
                            </>
                          )}
                        </div>

                        <div className="appointment-contact">
                          <a 
                            href={`https://wa.me/55${apt.telefone.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp-small"
                          >
                            💬 WhatsApp
                          </a>
                          <a 
                            href={`mailto:${apt.email}`}
                            className="btn-email-small"
                          >
                            ✉️ E-mail
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'whatsapp' && (
            <div className="whatsapp-panel">
              <div className="admin-section-header">
                <h3>📱 Bot do WhatsApp</h3>
                <div className="whatsapp-status-badge">
                  {whatsappStatus.isConnected ? (
                    <span className="status-online">● Online</span>
                  ) : whatsappStatus.connectionStatus === 'qr_ready' ? (
                    <span className="status-qr">● Aguardando QR</span>
                  ) : whatsappStatus.connectionStatus === 'initializing' ? (
                    <span className="status-loading">● Iniciando...</span>
                  ) : (
                    <span className="status-offline">● Offline</span>
                  )}
                </div>
              </div>

              <div className="whatsapp-controls">
                {!whatsappStatus.isConnected && whatsappStatus.connectionStatus === 'disconnected' && (
                  <button className="btn-whatsapp-action start" onClick={startWhatsappBot}>
                    ▶️ Iniciar Bot
                  </button>
                )}
                {whatsappStatus.isConnected && (
                  <>
                    <button className="btn-whatsapp-action stop" onClick={stopWhatsappBot}>
                      ⏹️ Parar Bot
                    </button>
                    <button className="btn-whatsapp-action restart" onClick={restartWhatsappBot}>
                      🔄 Reiniciar
                    </button>
                  </>
                )}
                {whatsappStatus.connectionStatus === 'qr_ready' && (
                  <button className="btn-whatsapp-action restart" onClick={restartWhatsappBot}>
                    🔄 Gerar Novo QR
                  </button>
                )}
              </div>

              {whatsappStatus.hasQrCode && whatsappStatus.qrCode && (
                <div className="qrcode-container">
                  <h4>📱 Escaneie o QR Code com seu WhatsApp:</h4>
                  <div className="qrcode-instructions">
                    <p>1. Abra o WhatsApp no celular</p>
                    <p>2. Toque em <strong>Menu (⋮)</strong> ou <strong>Configurações</strong></p>
                    <p>3. Toque em <strong>Aparelhos conectados</strong></p>
                    <p>4. Toque em <strong>Conectar um aparelho</strong></p>
                    <p>5. Aponte a câmera para o QR Code abaixo</p>
                  </div>
                  <div className="qrcode-box">
                    <img 
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(whatsappStatus.qrCode)}`}
                      alt="QR Code WhatsApp"
                      className="qrcode-image"
                    />
                  </div>
                  <p className="qrcode-note">
                    ⏱️ O QR Code expira em alguns minutos. Se expirar, clique em "Gerar Novo QR".
                  </p>
                </div>
              )}

              {whatsappStatus.isConnected && (
                <div className="whatsapp-connected-info">
                  <div className="success-message">
                    <span className="success-icon">✅</span>
                    <div>
                      <h4>Bot Conectado e Ativo!</h4>
                      <p>O bot está respondendo mensagens automaticamente e monitorando novos agendamentos.</p>
                    </div>
                  </div>

                  <div className="bot-features">
                    <h4>🤖 Funcionalidades Ativas:</h4>
                    <ul>
                      <li>✅ Responder mensagens automaticamente</li>
                      <li>✅ Processar agendamentos via WhatsApp</li>
                      <li>✅ Enviar notificações de novos agendamentos</li>
                      <li>✅ Monitorar agendamentos do site</li>
                      <li>✅ Fornecer informações sobre horários e serviços</li>
                    </ul>
                  </div>

                  <div className="bot-info">
                    <h4>📞 Número Conectado:</h4>
                    <p>Dra. Teiciane: <strong>(11) 94854-1086</strong></p>
                  </div>
                </div>
              )}

              {whatsappStatus.connectionStatus === 'initializing' && (
                <div className="loading-message">
                  <div className="spinner"></div>
                  <p>Inicializando bot do WhatsApp...</p>
                  <p className="loading-note">Isso pode levar até 30 segundos.</p>
                </div>
              )}

              <div className="whatsapp-logs-section">
                <div className="logs-header">
                  <h4>📋 Logs do Bot</h4>
                  <button 
                    className="btn-refresh-logs" 
                    onClick={() => {
                      fetchWhatsappLogs();
                      fetchWhatsappStatus();
                    }}
                  >
                    🔄 Atualizar
                  </button>
                </div>
                <div className="logs-container">
                  {whatsappLogs.length === 0 ? (
                    <p className="no-logs">Nenhum log ainda. Inicie o bot para ver os logs.</p>
                  ) : (
                    <div className="logs-list">
                      {whatsappLogs.slice().reverse().map((log, index) => (
                        <div key={index} className={`log-item log-${log.type}`}>
                          <span className="log-time">
                            {new Date(log.timestamp).toLocaleTimeString('pt-BR')}
                          </span>
                          <span className={`log-type-badge type-${log.type}`}>
                            {log.type === 'success' && '✅'}
                            {log.type === 'error' && '❌'}
                            {log.type === 'info' && 'ℹ️'}
                            {log.type === 'qr' && '📱'}
                          </span>
                          <span className="log-message">{log.message}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="whatsapp-help">
                <h4>💡 Dicas:</h4>
                <ul>
                  <li>Mantenha o bot conectado 24/7 para resposta automática</li>
                  <li>Os clientes podem digitar "MENU" para ver as opções</li>
                  <li>Agendamentos via WhatsApp aparecem na aba "Consultas"</li>
                  <li>Você recebe notificação no WhatsApp para cada novo agendamento</li>
                  <li>Se o bot desconectar, basta escane o QR Code novamente</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-panel">
              <h3>⚙️ Configurações de Horário</h3>

              <div className="settings-section">
                <h4>📅 Dias de Atendimento</h4>
                <div className="weekdays-grid">
                  {weekDays.map(day => (
                    <label key={day.id} className="weekday-checkbox">
                      <input
                        type="checkbox"
                        checked={settings.workDays.includes(day.id)}
                        onChange={() => toggleWorkDay(day.id)}
                      />
                      <span>{day.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="settings-section">
                <h4>🕐 Horários de Funcionamento</h4>
                <div className="time-inputs">
                  <div className="time-input-group">
                    <label>Início do expediente:</label>
                    <input
                      type="time"
                      value={settings.startTime}
                      onChange={(e) => saveSettings({ ...settings, startTime: e.target.value })}
                    />
                  </div>
                  <div className="time-input-group">
                    <label>Fim do expediente:</label>
                    <input
                      type="time"
                      value={settings.endTime}
                      onChange={(e) => saveSettings({ ...settings, endTime: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h4>☕ Intervalo para Almoço</h4>
                <div className="time-inputs">
                  <div className="time-input-group">
                    <label>Início do intervalo:</label>
                    <input
                      type="time"
                      value={settings.breakStart}
                      onChange={(e) => saveSettings({ ...settings, breakStart: e.target.value })}
                    />
                  </div>
                  <div className="time-input-group">
                    <label>Fim do intervalo:</label>
                    <input
                      type="time"
                      value={settings.breakEnd}
                      onChange={(e) => saveSettings({ ...settings, breakEnd: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="settings-section">
                <h4>⏱️ Duração da Consulta</h4>
                <div className="duration-select">
                  <select
                    value={settings.appointmentDuration}
                    onChange={(e) => saveSettings({ ...settings, appointmentDuration: parseInt(e.target.value) })}
                  >
                    <option value={30}>30 minutos</option>
                    <option value={45}>45 minutos</option>
                    <option value={60}>1 hora</option>
                    <option value={90}>1 hora e 30 minutos</option>
                    <option value={120}>2 horas</option>
                  </select>
                </div>
              </div>

              <div className="settings-info">
                <p>ℹ️ <strong>Informações:</strong></p>
                <ul>
                  <li>Os horários disponíveis são gerados automaticamente</li>
                  <li>Cada consulta tem duração de {settings.appointmentDuration} minutos</li>
                  <li>O sistema evita conflitos de horários automaticamente</li>
                  <li>Pacientes podem agendar até 60 dias no futuro</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Modal de Cadastro/Edição de Consulta */}
        {showAppointmentModal && (
          <div className="modal-overlay" onClick={() => setShowAppointmentModal(false)}>
            <div className="modal-content appointment-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header-form">
                <h3>{editingAppointment ? '✏️ Editar Consulta' : '➕ Nova Consulta'}</h3>
                <button className="modal-close-btn" onClick={() => setShowAppointmentModal(false)}>✕</button>
              </div>

              <div className="modal-body">
                <div className="form-section">
                  <h4>👤 Dados do Paciente</h4>
                  <div className="form-row">
                    <div className="form-field full">
                      <label>Nome Completo *</label>
                      <input
                        type="text"
                        name="nome"
                        value={appointmentForm.nome}
                        onChange={handleAppointmentFormChange}
                        placeholder="Nome completo do paciente"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>WhatsApp *</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={appointmentForm.telefone}
                        onChange={handleAppointmentFormChange}
                        placeholder="(11) 99999-9999"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>E-mail</label>
                      <input
                        type="email"
                        name="email"
                        value={appointmentForm.email}
                        onChange={handleAppointmentFormChange}
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Data de Nascimento</label>
                      <input
                        type="date"
                        name="dataNascimento"
                        value={appointmentForm.dataNascimento}
                        onChange={handleAppointmentFormChange}
                      />
                    </div>
                    <div className="form-field">
                      <label>Cidade</label>
                      <input
                        type="text"
                        name="cidade"
                        value={appointmentForm.cidade}
                        onChange={handleAppointmentFormChange}
                        placeholder="São Paulo"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field full">
                      <label>Endereço</label>
                      <input
                        type="text"
                        name="endereco"
                        value={appointmentForm.endereco}
                        onChange={handleAppointmentFormChange}
                        placeholder="Rua, número"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Bairro</label>
                      <input
                        type="text"
                        name="bairro"
                        value={appointmentForm.bairro}
                        onChange={handleAppointmentFormChange}
                        placeholder="Nome do bairro"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h4>📅 Dados da Consulta</h4>
                  <div className="form-row">
                    <div className="form-field full">
                      <label>Serviço *</label>
                      <input
                        type="text"
                        name="servico"
                        value={appointmentForm.servico}
                        onChange={handleAppointmentFormChange}
                        placeholder="Ex: Fisioterapia Domiciliar, Drenagem Linfática, etc."
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Data *</label>
                      <input
                        type="date"
                        name="data"
                        value={appointmentForm.data}
                        onChange={handleAppointmentFormChange}
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Horário *</label>
                      <select
                        name="horario"
                        value={appointmentForm.horario}
                        onChange={handleAppointmentFormChange}
                        required
                      >
                        <option value="">Selecione um horário</option>
                        {generateTimeOptions().map(time => {
                          const hasConflict = checkTimeConflict(
                            appointmentForm.data, 
                            time, 
                            editingAppointment?.id
                          );
                          return (
                            <option key={time} value={time}>
                              {time} {hasConflict ? '⚠️ (Ocupado)' : '✅'}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Status *</label>
                      <select
                        name="status"
                        value={appointmentForm.status}
                        onChange={handleAppointmentFormChange}
                        required
                      >
                        <option value="pendente">⏳ Pendente</option>
                        <option value="confirmado">✅ Confirmado</option>
                        <option value="concluido">✔️ Concluído</option>
                        <option value="cancelado">❌ Cancelado</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field full">
                      <label>Observações</label>
                      <textarea
                        name="observacoes"
                        value={appointmentForm.observacoes}
                        onChange={handleAppointmentFormChange}
                        placeholder="Informações adicionais sobre a consulta..."
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                </div>

                {appointmentForm.data && appointmentForm.horario && 
                 checkTimeConflict(appointmentForm.data, appointmentForm.horario, editingAppointment?.id) && (
                  <div className="warning-box">
                    <span className="warning-icon">⚠️</span>
                    <div className="warning-text">
                      <strong>ATENÇÃO:</strong> Já existe uma consulta agendada para este horário.
                      Como administrador, você pode sobrescrever, mas recomenda-se escolher outro horário.
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button className="btn-cancel" onClick={() => setShowAppointmentModal(false)}>
                  Cancelar
                </button>
                <button className="btn-save" onClick={saveAppointment}>
                  {editingAppointment ? '💾 Salvar Alterações' : '✅ Cadastrar Consulta'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;

