import React from 'react';
import { 
  ClipboardList, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Users 
} from 'lucide-react';
import StatsCard from './StatsCard';
import RecentActivity from './RecentActivity';
import CreateServiceOrderModal from '../ServiceOrders/CreateServiceOrderModal';
import { mockDashboardStats, mockServiceOrders, mockAlerts } from '../../data/mockData';
import { useState } from 'react';

const Dashboard: React.FC = () => {
  const stats = mockDashboardStats;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateServiceOrder = (orderData: any) => {
    console.log('Nova OS criada:', orderData);
    // Aqui você integraria com a API para criar a OS
    alert('Ordem de Serviço criada com sucesso!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Visão geral das operações e indicadores</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatsCard
          title="Total de OS"
          value={stats.totalServiceOrders}
          icon={ClipboardList}
          color="blue"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Concluídas Hoje"
          value={stats.completedToday}
          icon={CheckCircle}
          color="green"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Pendentes"
          value={stats.pendingTasks}
          icon={Clock}
          color="yellow"
        />
        <StatsCard
          title="Em Atraso"
          value={stats.overdueTasks}
          icon={AlertTriangle}
          color="red"
          trend={{ value: -25, isPositive: true }}
        />
        <StatsCard
          title="Alertas Críticos"
          value={stats.criticalAlerts}
          icon={AlertTriangle}
          color="red"
        />
        <StatsCard
          title="Taxa de Conformidade"
          value={`${stats.complianceRate}%`}
          icon={TrendingUp}
          color="green"
          trend={{ value: 2.1, isPositive: true }}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity serviceOrders={mockServiceOrders} />
        </div>

        {/* Alerts Panel */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Alertas Recentes</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {mockAlerts.slice(0, 4).map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <div className={`p-1 rounded-full ${
                    alert.severity === 'error' ? 'bg-red-100' :
                    alert.severity === 'warning' ? 'bg-yellow-100' : 'bg-blue-100'
                  }`}>
                    <AlertTriangle className={`h-4 w-4 ${
                      alert.severity === 'error' ? 'text-red-600' :
                      alert.severity === 'warning' ? 'text-yellow-600' : 'text-blue-600'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{alert.title}</p>
                    <p className="text-sm text-gray-500">{alert.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(alert.createdAt).toLocaleDateString('pt-BR')} às {new Date(alert.createdAt).toLocaleTimeString('pt-BR')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <ClipboardList className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Nova OS</p>
            <p className="text-xs text-gray-500">Criar ordem de serviço</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <AlertTriangle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Registrar Parâmetro</p>
            <p className="text-xs text-gray-500">Inserir valores monitorados</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Gerar Relatório</p>
            <p className="text-xs text-gray-500">Relatório consolidado</p>
          </button>
        </div>
      </div>

      {/* Modal de Criação de OS */}
      <CreateServiceOrderModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateServiceOrder}
      />
    </div>
  );
};

export default Dashboard;