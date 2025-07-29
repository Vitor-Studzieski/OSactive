import React, { useState } from 'react';
import { Plus, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import ParameterCard from './ParameterCard';
import { mockParameters } from '../../data/mockData';
import { CriticalParameter } from '../../types';

const Parameters: React.FC = () => {
  const [parameters, setParameters] = useState<CriticalParameter[]>(mockParameters);

  const handleParameterUpdate = (parameterId: string, newValue: number) => {
    setParameters(parameters.map(param => {
      if (param.id === parameterId) {
        let status: CriticalParameter['status'] = 'normal';
        
        if (newValue < param.minLimit || newValue > param.maxLimit) {
          status = 'critical';
        } else if (
          newValue < param.minLimit * 1.1 || 
          newValue > param.maxLimit * 0.9
        ) {
          status = 'warning';
        }

        return {
          ...param,
          value: newValue,
          status,
          recordedAt: new Date(),
        };
      }
      return param;
    }));
  };

  const normalCount = parameters.filter(p => p.status === 'normal').length;
  const warningCount = parameters.filter(p => p.status === 'warning').length;
  const criticalCount = parameters.filter(p => p.status === 'critical').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Parâmetros Críticos</h1>
          <p className="text-gray-600">Monitore valores críticos e configure alertas</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Novo Parâmetro
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-900">{parameters.length}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-green-600 font-medium">Normal</p>
              <p className="text-2xl font-bold text-green-900">{normalCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Atenção</p>
              <p className="text-2xl font-bold text-yellow-900">{warningCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <p className="text-sm text-red-600 font-medium">Crítico</p>
              <p className="text-2xl font-bold text-red-900">{criticalCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Banner for Critical Parameters */}
      {criticalCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <div>
              <p className="text-red-800 font-medium">
                Atenção: {criticalCount} parâmetro{criticalCount > 1 ? 's' : ''} fora dos limites aceitáveis
              </p>
              <p className="text-red-600 text-sm">
                Verifique imediatamente os valores críticos e tome as ações necessárias.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Parameters Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {parameters.map((parameter) => (
          <ParameterCard
            key={parameter.id}
            parameter={parameter}
            onUpdate={handleParameterUpdate}
          />
        ))}
      </div>

      {/* Configuration Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Configurações de Alertas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              E-mails para Alertas Críticos
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              placeholder="email1@empresa.com, email2@empresa.com"
              defaultValue="supervisor@empresa.com, qualidade@empresa.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Frequência de Verificação
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="5">A cada 5 minutos</option>
              <option value="15">A cada 15 minutos</option>
              <option value="30">A cada 30 minutos</option>
              <option value="60">A cada 1 hora</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Parameters;