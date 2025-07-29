import React from 'react';
import { BarChart3, TrendingUp, PieChart, Activity } from 'lucide-react';

const Analytics: React.FC = () => {
  // Mock data for charts
  const complianceData = [
    { month: 'Jan', rate: 94.2 },
    { month: 'Fev', rate: 96.1 },
    { month: 'Mar', rate: 92.8 },
    { month: 'Abr', rate: 95.5 },
    { month: 'Mai', rate: 97.2 },
    { month: 'Jun', rate: 93.9 },
  ];

  const taskDistribution = [
    { status: 'Concluídas', count: 87, color: 'bg-green-500' },
    { status: 'Pendentes', count: 8, color: 'bg-yellow-500' },
    { status: 'Atrasadas', count: 3, color: 'bg-red-500' },
    { status: 'Em Andamento', count: 12, color: 'bg-blue-500' },
  ];

  const alertTrends = [
    { type: 'Parâmetros Críticos', count: 15, trend: -12 },
    { type: 'Tarefas Atrasadas', count: 8, trend: -25 },
    { type: 'Não Conformidades', count: 3, trend: -40 },
    { type: 'Alertas Sistema', count: 22, trend: 18 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Indicadores</h1>
        <p className="text-gray-600">Visualize métricas e tendências das operações</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Taxa de Conformidade</p>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-sm text-green-600">+2.1% vs. mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Tempo Médio Resolução</p>
              <p className="text-2xl font-bold text-gray-900">2.4h</p>
              <p className="text-sm text-green-600">-15min vs. mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <BarChart3 className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Eficiência Operacional</p>
              <p className="text-2xl font-bold text-gray-900">87.5%</p>
              <p className="text-sm text-green-600">+5.2% vs. mês anterior</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg mr-3">
              <PieChart className="h-5 w-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Alertas Mensais</p>
              <p className="text-2xl font-bold text-gray-900">48</p>
              <p className="text-sm text-red-600">-12% vs. mês anterior</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compliance Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Taxa de Conformidade</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {complianceData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{item.month}</span>
                <div className="flex items-center space-x-2 flex-1 mx-4">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.rate}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">
                    {item.rate}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Distribuição de Tarefas</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {taskDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${item.color} mr-3`} />
                  <span className="text-sm text-gray-600">{item.status}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">{item.count}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">
                {taskDistribution.reduce((sum, item) => sum + item.count, 0)}
              </p>
              <p className="text-sm text-gray-500">Total de Tarefas</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alert Trends */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Tendências de Alertas</h3>
          <BarChart3 className="h-5 w-5 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {alertTrends.map((item, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{item.type}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{item.count}</p>
              <p className={`text-sm ${item.trend >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                {item.trend >= 0 ? '+' : ''}{item.trend}% vs. mês anterior
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Exportar Dados</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <BarChart3 className="h-6 w-6 text-blue-500 mb-2" />
            <p className="font-medium text-gray-900">Power BI</p>
            <p className="text-sm text-gray-500">Exportar para Power BI</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Activity className="h-6 w-6 text-green-500 mb-2" />
            <p className="font-medium text-gray-900">Excel</p>
            <p className="text-sm text-gray-500">Baixar como planilha</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <PieChart className="h-6 w-6 text-purple-500 mb-2" />
            <p className="font-medium text-gray-900">CSV</p>
            <p className="text-sm text-gray-500">Dados em formato CSV</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;