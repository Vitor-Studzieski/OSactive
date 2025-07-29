import React, { useState } from 'react';
import { 
  Thermometer, 
  Droplets, 
  Gauge, 
  AlertTriangle, 
  CheckCircle, 
  Edit3,
  Save,
  X
} from 'lucide-react';
import { CriticalParameter } from '../../types';

interface ParameterCardProps {
  parameter: CriticalParameter;
  onUpdate: (parameterId: string, newValue: number) => void;
}

const ParameterCard: React.FC<ParameterCardProps> = ({ parameter, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(parameter.value.toString());

  const getIcon = (name: string) => {
    if (name.toLowerCase().includes('temperatura')) return Thermometer;
    if (name.toLowerCase().includes('umidade')) return Droplets;
    return Gauge;
  };

  const getStatusColor = (status: CriticalParameter['status']) => {
    switch (status) {
      case 'normal':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: CriticalParameter['status']) => {
    switch (status) {
      case 'normal':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
      case 'critical':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getProgressPercentage = () => {
    const range = parameter.maxLimit - parameter.minLimit;
    const position = parameter.value - parameter.minLimit;
    return Math.max(0, Math.min(100, (position / range) * 100));
  };

  const getProgressColor = () => {
    switch (parameter.status) {
      case 'normal':
        return 'bg-green-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleSave = () => {
    const newValue = parseFloat(editValue);
    if (!isNaN(newValue)) {
      onUpdate(parameter.id, newValue);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(parameter.value.toString());
    setIsEditing(false);
  };

  const Icon = getIcon(parameter.name);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{parameter.name}</h3>
            <p className="text-sm text-gray-500">
              Registrado por {parameter.recordedBy.name}
            </p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusColor(parameter.status)}`}>
          {getStatusIcon(parameter.status)}
          <span className="ml-1 capitalize">{parameter.status}</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Current Value */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">Valor Atual:</span>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-20 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
              />
              <span className="text-sm text-gray-600">{parameter.unit}</span>
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-100 rounded"
              >
                <Save className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-100 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-gray-900">
                {parameter.value} {parameter.unit}
              </span>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded"
              >
                <Edit3 className="h-3 w-3" />
              </button>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500">
            <span>Min: {parameter.minLimit}</span>
            <span>Max: {parameter.maxLimit}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>

        {/* Limits */}
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-gray-600">Limite Mín:</span>
            <span className="ml-1 font-medium">{parameter.minLimit} {parameter.unit}</span>
          </div>
          <div>
            <span className="text-gray-600">Limite Máx:</span>
            <span className="ml-1 font-medium">{parameter.maxLimit} {parameter.unit}</span>
          </div>
        </div>

        {/* Last Update */}
        <div className="text-xs text-gray-400 border-t pt-2">
          Última atualização: {new Date(parameter.recordedAt).toLocaleString('pt-BR')}
        </div>
      </div>
    </div>
  );
};

export default ParameterCard;