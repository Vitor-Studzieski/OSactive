import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  User, 
  Calendar,
  Flag,
  Download
} from 'lucide-react';
import { ServiceOrder } from '../../types';
import { exportServiceOrderToExcel } from '../../utils/excelExport';

interface ServiceOrderCardProps {
  order: ServiceOrder;
  onStatusChange: (orderId: string, status: ServiceOrder['status']) => void;
}

const ServiceOrderCard: React.FC<ServiceOrderCardProps> = ({ order, onStatusChange }) => {
  const getStatusColor = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: ServiceOrder['priority']) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600';
      case 'high':
        return 'text-orange-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Clock className="h-4 w-4" />;
      case 'in_progress':
        return <AlertCircle className="h-4 w-4" />;
      case 'overdue':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const isOverdue = new Date(order.dueDate) < new Date() && order.status !== 'completed';

  const handleDownloadExcel = () => {
    exportServiceOrderToExcel(order);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm border-2 ${
      isOverdue ? 'border-red-200' : 'border-gray-200'
    } p-6 hover:shadow-md transition-all duration-200`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{order.title}</h3>
          <p className="text-gray-600 text-sm mb-3">{order.description}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Flag className={`h-4 w-4 ${getPriorityColor(order.priority)}`} />
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
            {getStatusIcon(order.status)}
            <span className="ml-1 capitalize">{order.status.replace('_', ' ')}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <User className="h-4 w-4 mr-2" />
          <span>{order.assignedTo.name}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>{new Date(order.dueDate).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">
          Recorrência: {order.recurrence.type === 'daily' ? 'Diária' : 
                        order.recurrence.type === 'weekly' ? 'Semanal' : 'Mensal'}
        </div>
        
        <div className="flex space-x-2">
          {order.status === 'completed' && (
            <button
              onClick={handleDownloadExcel}
              className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-md hover:bg-emerald-600 transition-colors flex items-center"
            >
              <Download className="h-3 w-3 mr-1" />
              Excel
            </button>
          )}
          
          {order.status !== 'completed' && (
            <>
              {order.status === 'pending' && (
                <button
                  onClick={() => onStatusChange(order.id, 'in_progress')}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md hover:bg-blue-600 transition-colors"
                >
                  Iniciar
                </button>
              )}
              {(order.status === 'pending' || order.status === 'in_progress') && (
                <button
                  onClick={() => onStatusChange(order.id, 'completed')}
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors"
                >
                  Concluir
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isOverdue && (
        <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800 text-xs font-medium">
            ⚠️ Esta tarefa está atrasada
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceOrderCard;