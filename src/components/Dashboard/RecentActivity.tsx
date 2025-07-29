import React from 'react';
import { Clock, CheckCircle, AlertCircle, XCircle } from 'lucide-react';
import { ServiceOrder } from '../../types';

interface RecentActivityProps {
  serviceOrders: ServiceOrder[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ serviceOrders }) => {
  const getStatusIcon = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in_progress':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'overdue':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'completed':
        return 'Concluída';
      case 'pending':
        return 'Pendente';
      case 'in_progress':
        return 'Em Andamento';
      case 'overdue':
        return 'Atrasada';
      default:
        return 'Desconhecido';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Atividade Recente</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {serviceOrders.slice(0, 5).map((order) => (
            <div key={order.id} className="flex items-start space-x-3">
              {getStatusIcon(order.status)}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{order.title}</p>
                <p className="text-sm text-gray-500">
                  Atribuída para {order.assignedTo.name}
                </p>
                <p className="text-xs text-gray-400">
                  {new Date(order.createdAt).toLocaleDateString('pt-BR')} - {getStatusText(order.status)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;