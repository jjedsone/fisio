import React, { useState, useEffect } from 'react';
import { galeriaService } from '../services/galeriaService';
import './GaleriaAdmin.css';

const GaleriaAdmin = () => {
  const [trabalhos, setTrabalhos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    titulo: '',
    descricao: '',
    categoria: 'Fisioterapia',
    data: '',
    imagemUrl: '',
    imagemFile: null
  });

  // Carregar trabalhos ao montar
  useEffect(() => {
    carregarTrabalhos();
  }, []);

  const carregarTrabalhos = async () => {
    try {
      setLoading(true);
      const dados = await galeriaService.listar();
      setTrabalhos(dados);
    } catch (error) {
      alert('Erro ao carregar trabalhos: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Imagem muito grande! Máximo 5MB');
        return;
      }

      // Validar tipo
      if (!file.type.startsWith('image/')) {
        alert('Apenas imagens são permitidas!');
        return;
      }

      setFormData(prev => ({
        ...prev,
        imagemFile: file,
        imagemUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setUploading(true);

      let imagemUrl = formData.imagemUrl;

      // Upload da imagem se houver arquivo novo
      if (formData.imagemFile) {
        imagemUrl = await galeriaService.uploadImagem(formData.imagemFile);
      }

      const trabalhoData = {
        titulo: formData.titulo,
        descricao: formData.descricao,
        categoria: formData.categoria,
        data: formData.data,
        imagemUrl: imagemUrl
      };

      if (editingId) {
        // Atualizar
        await galeriaService.atualizar(editingId, trabalhoData);
        alert('Trabalho atualizado com sucesso!');
      } else {
        // Criar
        await galeriaService.criar(trabalhoData);
        alert('Trabalho adicionado com sucesso!');
      }

      // Limpar e recarregar
      handleCancel();
      carregarTrabalhos();
    } catch (error) {
      alert('Erro ao salvar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (trabalho) => {
    setEditingId(trabalho.id);
    setFormData({
      titulo: trabalho.titulo,
      descricao: trabalho.descricao,
      categoria: trabalho.categoria,
      data: trabalho.data,
      imagemUrl: trabalho.imagemUrl,
      imagemFile: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id, imagemUrl) => {
    if (!window.confirm('Tem certeza que deseja excluir este trabalho?')) {
      return;
    }

    try {
      await galeriaService.deletar(id, imagemUrl);
      alert('Trabalho excluído com sucesso!');
      carregarTrabalhos();
    } catch (error) {
      alert('Erro ao excluir: ' + error.message);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({
      titulo: '',
      descricao: '',
      categoria: 'Fisioterapia',
      data: '',
      imagemUrl: '',
      imagemFile: null
    });
  };

  const getCategoriaColor = (categoria) => {
    const colors = {
      'Fisioterapia': '#0066cc',
      'Pilates': '#7b1fa2',
      'Estética': '#388e3c',
      'Home Care': '#f57c00'
    };
    return colors[categoria] || '#0066cc';
  };

  return (
    <div className="galeria-admin">
      <div className="galeria-header">
        <h2>📸 Gerenciar Galeria de Trabalhos</h2>
        <button 
          className="btn-add-trabalho"
          onClick={() => setShowModal(true)}
        >
          ➕ Adicionar Trabalho
        </button>
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="trabalhos-grid">
          {trabalhos.length === 0 ? (
            <div className="empty-state">
              <p>Nenhum trabalho cadastrado ainda.</p>
              <p>Clique em "Adicionar Trabalho" para começar!</p>
            </div>
          ) : (
            trabalhos.map(trabalho => (
              <div key={trabalho.id} className="trabalho-card">
                <div className="trabalho-image">
                  <img src={trabalho.imagemUrl} alt={trabalho.titulo} />
                  <span 
                    className="trabalho-tag"
                    style={{ backgroundColor: getCategoriaColor(trabalho.categoria) }}
                  >
                    {trabalho.categoria}
                  </span>
                </div>
                <div className="trabalho-content">
                  <h3>{trabalho.titulo}</h3>
                  <p>{trabalho.descricao}</p>
                  <span className="trabalho-data">📅 {trabalho.data}</span>
                </div>
                <div className="trabalho-actions">
                  <button 
                    className="btn-edit"
                    onClick={() => handleEdit(trabalho)}
                  >
                    ✏️ Editar
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => handleDelete(trabalho.id, trabalho.imagemUrl)}
                  >
                    🗑️ Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Modal de Adicionar/Editar */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>{editingId ? '✏️ Editar Trabalho' : '➕ Adicionar Trabalho'}</h3>
            
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  name="titulo"
                  value={formData.titulo}
                  onChange={handleInputChange}
                  placeholder="Ex: Reabilitação Pós-Operatória"
                  required
                />
              </div>

              <div className="form-group">
                <label>Descrição *</label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  placeholder="Descreva o tratamento realizado..."
                  rows="4"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Categoria *</label>
                  <select
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Fisioterapia">Fisioterapia</option>
                    <option value="Pilates">Pilates</option>
                    <option value="Estética">Estética</option>
                    <option value="Home Care">Home Care</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Data *</label>
                  <input
                    type="text"
                    name="data"
                    value={formData.data}
                    onChange={handleInputChange}
                    placeholder="Ex: Janeiro 2025"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Imagem {!editingId && '*'}</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  required={!editingId}
                />
                <small>Máximo 5MB. Formatos: JPG, PNG, WEBP</small>
              </div>

              {formData.imagemUrl && (
                <div className="image-preview">
                  <img src={formData.imagemUrl} alt="Preview" />
                </div>
              )}

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-cancel"
                  onClick={handleCancel}
                  disabled={uploading}
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="btn-save"
                  disabled={uploading}
                >
                  {uploading ? 'Salvando...' : (editingId ? 'Atualizar' : 'Adicionar')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaAdmin;

