import React, { useState } from 'react';
import { X, Plus, ArrowLeft } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { User } from '../../types';

interface CreateServiceOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (orderData: any) => void;
}

interface Parameter {
  id: string;
  name: string;
  minValue: string;
  maxValue: string;
  unit: string;
}

const CreateServiceOrderModal: React.FC<CreateServiceOrderModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: '',
    sector: '',
    description: '',
    assignedTo: '',
    priority: '',
    dueDate: '',
    isRecurrent: false,
    recurrenceType: 'daily',
    recurrenceInterval: 1,
  });

  const [parameters, setParameters] = useState<Parameter[]>([]);

  const sectors = [
    'Produção',
    'Qualidade',
    'Manutenção',
    'Laboratório',
    'Sala Limpa A',
    'Sala Limpa B',
    'HVAC',
    'Utilidades',
  ];

  const priorities = [
    { value: 'low', label: 'Baixa' },
    { value: 'medium', label: 'Média' },
    { value: 'high', label: 'Alta' },
    { value: 'critical', label: 'Crítica' },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const addParameter = () => {
    const newParameter: Parameter = {
      id: Date.now().toString(),
      name: '',
      minValue: '',
      maxValue: '',
      unit: '',
    };
    setParameters([...parameters, newParameter]);
  };

  const updateParameter = (id: string, field: string, value: string) => {
    setParameters(parameters.map(param =>
      param.id === id ? { ...param, [field]: value } : param
    ));
  };

  const removeParameter = (id: string) => {
    setParameters(parameters.filter(param => param.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = {
      ...formData,
      parameters: parameters.filter(p => p.name && p.minValue && p.maxValue),
      createdAt: new Date(),
    };

    onSubmit(orderData);
    
    // Reset form
    setFormData({
      title: '',
      sector: '',
      description: '',
      assignedTo: '',
      priority: '',
      dueDate: '',
      isRecurrent: false,
      recurrenceType: 'daily',
      recurrenceInterval: 1,
    });
    setParameters([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="mr-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nova Ordem de Serviço</h2>
              <p className="text-sm text-gray-600">Crie uma nova OS ou configure uma tarefa recorrente</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          {/* Informações Básicas */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Informações Básicas</h3>
              <p className="text-sm text-gray-600 mb-4">Defina as informações principais da ordem de serviço</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Título da OS <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Ex: Controle de Temperatura Diário"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Setor <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Selecione o setor</option>
                  {sectors.map((sector) => (
                    <option key={sector} value={sector}>
                      {sector}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Descreva detalhadamente a tarefa a ser executada..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Responsável <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.assignedTo}
                  onChange={(e) => handleInputChange('assignedTo', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Selecione o responsável</option>
                  {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prioridade <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => handleInputChange('priority', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                >
                  <option value="">Selecione a prioridade</option>
                  {priorities.map((priority) => (
                    <option key={priority.value} value={priority.value}>
                      {priority.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prazo
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange('dueDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Configuração de Recorrência */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Configuração de Recorrência</h3>
              <p className="text-sm text-gray-600 mb-4">Configure se esta OS deve ser executada periodicamente</p>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isRecurrent"
                checked={formData.isRecurrent}
                onChange={(e) => handleInputChange('isRecurrent', e.target.checked)}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="isRecurrent" className="text-sm font-medium text-gray-700">
                Tarefa Recorrente
              </label>
            </div>

            {formData.isRecurrent && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Recorrência
                  </label>
                  <select
                    value={formData.recurrenceType}
                    onChange={(e) => handleInputChange('recurrenceType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="daily">Diária</option>
                    <option value="weekly">Semanal</option>
                    <option value="monthly">Mensal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Intervalo
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.recurrenceInterval}
                    onChange={(e) => handleInputChange('recurrenceInterval', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Parâmetros de Controle */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Parâmetros de Controle</h3>
              <p className="text-sm text-gray-600 mb-4">Defina os parâmetros que devem ser monitorados e seus limites</p>
            </div>

            <div className="space-y-4">
              {parameters.map((parameter, index) => (
                <div key={parameter.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Parâmetro
                    </label>
                    <input
                      type="text"
                      value={parameter.name}
                      onChange={(e) => updateParameter(parameter.id, 'name', e.target.value)}
                      placeholder="Ex: Temperatura"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor Mínimo
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={parameter.minValue}
                      onChange={(e) => updateParameter(parameter.id, 'minValue', e.target.value)}
                      placeholder="Ex: 15"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Valor Máximo
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={parameter.maxValue}
                      onChange={(e) => updateParameter(parameter.id, 'maxValue', e.target.value)}
                      placeholder="Ex: 25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div className="flex items-end space-x-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Unidade
                      </label>
                      <input
                        type="text"
                        value={parameter.unit}
                        onChange={(e) => updateParameter(parameter.id, 'unit', e.target.value)}
                        placeholder="Ex: °C"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeParameter(parameter.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addParameter}
                className="flex items-center justify-center w-full p-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-emerald-500 hover:bg-emerald-50 transition-colors text-gray-600 hover:text-emerald-600"
              >
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Parâmetro
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Criar Ordem de Serviço
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateServiceOrderModal;