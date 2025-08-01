import React, { useState } from 'react';
import { BookOpen, Download, Eye, Search, Filter, FileText, Calendar } from 'lucide-react';

interface POP {
  id: string;
  title: string;
  description: string;
  fileName: string;
  filePath: string;
  category: 'procedimento' | 'manual' | 'instrucao';
  version: string;
  lastUpdated: Date;
  size: string;
}

const POPs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Lista dos POPs baseada nos arquivos anexados
  const pops: POP[] = [
    {
      id: '1',
      title: 'POP 3 - Higienização dos Equipamentos, Utensílios e Instalações',
      description: 'Procedimento operacional padrão para higienização adequada de equipamentos, utensílios e instalações',
      fileName: 'POP_3_-_Higienização_dos_Equipamentos,_Utensílios_e_Instalações[1].pdf',
      filePath: '/pops/POP_3_-_Higienização_dos_Equipamentos,_Utensílios_e_Instalações[1].pdf',
      category: 'procedimento',
      version: '1.0',
      lastUpdated: new Date('2024-01-15'),
      size: '2.1 MB'
    },
    {
      id: '2',
      title: 'POP 5 - Manutenção Preventiva e Calibração dos Equipamentos',
      description: 'Procedimento para manutenção preventiva e calibração adequada dos equipamentos',
      fileName: 'POP_5_-_Manutencao_preventiva_e_calibracao_dos_equipamentos[1].pdf',
      filePath: '/pops/POP_5_-_Manutencao_preventiva_e_calibracao_dos_equipamentos[1].pdf',
      category: 'procedimento',
      version: '1.0',
      lastUpdated: new Date('2024-01-20'),
      size: '1.8 MB'
    },
    {
      id: '3',
      title: 'POP 7 - Seleção de Matérias Primas, Ingredientes e Embalagens',
      description: 'Procedimento para seleção adequada de matérias primas, ingredientes e embalagens',
      fileName: 'POP_7_-_Selecao_de_materias_primas_ingredientes_e_embalagens[1].pdf',
      filePath: '/pops/POP_7_-_Selecao_de_materias_primas_ingredientes_e_embalagens[1].pdf',
      category: 'procedimento',
      version: '1.0',
      lastUpdated: new Date('2024-01-25'),
      size: '2.3 MB'
    },
    {
      id: '4',
      title: 'POP 10 - Recebimento de Matéria-Prima e Insumos',
      description: 'Procedimento operacional para recebimento adequado de matéria-prima e insumos',
      fileName: 'POP_10_-_Recebimento_de_Matéria-Prima,_Insumos[1].pdf',
      filePath: '/pops/POP_10_-_Recebimento_de_Matéria-Prima,_Insumos[1].pdf',
      category: 'procedimento',
      version: '1.0',
      lastUpdated: new Date('2024-02-01'),
      size: '1.9 MB'
    }
  ];

  const handleDownload = (pop: POP) => {
    // Criar um link temporário para download
    const link = document.createElement('a');
    link.href = pop.filePath;
    link.download = pop.fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (pop: POP) => {
    // Abrir o PDF em uma nova aba
    window.open(pop.filePath, '_blank');
  };

  const getCategoryText = (category: POP['category']) => {
    switch (category) {
      case 'procedimento':
        return 'Procedimento';
      case 'manual':
        return 'Manual';
      case 'instrucao':
        return 'Instrução';
      default:
        return 'Documento';
    }
  };

  const getCategoryColor = (category: POP['category']) => {
    switch (category) {
      case 'procedimento':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'manual':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'instrucao':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredPOPs = pops.filter(pop => {
    const matchesSearch = pop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || pop.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalPOPs = pops.length;
  const procedimentosCount = pops.filter(p => p.category === 'procedimento').length;
  const manuaisCount = pops.filter(p => p.category === 'manual').length;
  const instrucoesCount = pops.filter(p => p.category === 'instrucao').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">POPs e Manuais</h1>
          <p className="text-gray-600">Acesse e gerencie procedimentos operacionais padrão e manuais</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
          <BookOpen className="h-4 w-4 mr-2" />
          Novo Documento
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-900">{totalPOPs}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <BookOpen className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Procedimentos</p>
              <p className="text-2xl font-bold text-blue-900">{procedimentosCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-green-600 font-medium">Manuais</p>
              <p className="text-2xl font-bold text-green-900">{manuaisCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-purple-600 mr-2" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Instruções</p>
              <p className="text-2xl font-bold text-purple-900">{instrucoesCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="all">Todas as Categorias</option>
              <option value="procedimento">Procedimentos</option>
              <option value="manual">Manuais</option>
              <option value="instrucao">Instruções</option>
            </select>
          </div>
        </div>
      </div>

      {/* POPs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPOPs.map((pop) => (
          <div key={pop.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{pop.title}</h3>
                  <p className="text-sm text-gray-600">{pop.description}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(pop.category)}`}>
                {getCategoryText(pop.category)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Versão {pop.version}</span>
              </div>
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                <span>{pop.size}</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              Última atualização: {pop.lastUpdated.toLocaleDateString('pt-BR')}
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => handleView(pop)}
                className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-sm"
              >
                <Eye className="h-4 w-4 mr-1" />
                Visualizar
              </button>
              <button
                onClick={() => handleDownload(pop)}
                className="flex-1 bg-emerald-500 text-white px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center text-sm"
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredPOPs.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum documento encontrado</p>
          <p className="text-gray-400 text-sm">Tente ajustar os filtros de busca</p>
        </div>
      )}

      {/* Upload Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Adicionar Novo Documento</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-emerald-500 hover:bg-emerald-50 transition-colors cursor-pointer">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-2">Clique para fazer upload ou arraste arquivos aqui</p>
          <p className="text-sm text-gray-500">Formatos aceitos: PDF, DOC, DOCX (máx. 10MB)</p>
          <button className="mt-4 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Selecionar Arquivos
          </button>
        </div>
      </div>

      {/* Document Management */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Controle de Versões</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Revisão Automática</p>
              <p className="text-sm text-gray-600">Notificar quando documentos precisarem de revisão</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-emerald-600" defaultChecked />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Controle de Acesso</p>
              <p className="text-sm text-gray-600">Restringir acesso por nível de usuário</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Histórico de Alterações</p>
              <p className="text-sm text-gray-600">Manter log de todas as modificações</p>
            </div>
            <input type="checkbox" className="h-4 w-4 text-emerald-600" defaultChecked />
          </div>
        </div>
      </div>
    </div>
  );
};

export default POPs;