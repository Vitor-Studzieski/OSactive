import React, { useState } from 'react';
import { Plus, FileText, Download, Filter } from 'lucide-react';
import ReportCard from './ReportCard';
import { mockReports } from '../../data/mockData';
import { Report } from '../../types';

const Reports: React.FC = () => {
  const [reports] = useState<Report[]>(mockReports);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const handleDownload = (reportId: string) => {
    // Simulate PDF download
    console.log('Downloading report:', reportId);
    alert('Download do relatório iniciado!');
  };

  const handleView = (reportId: string) => {
    // Simulate report viewing
    console.log('Viewing report:', reportId);
    alert('Abrindo visualização do relatório...');
  };

  const filteredReports = reports.filter(report => {
    return statusFilter === 'all' || report.status === statusFilter;
  });

  const totalReports = reports.length;
  const readyReports = reports.filter(r => r.status === 'ready').length;
  const signedReports = reports.filter(r => r.status === 'signed').length;
  const generatingReports = reports.filter(r => r.status === 'generating').length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Relatórios</h1>
          <p className="text-gray-600">Gere e gerencie relatórios consolidados</p>
        </div>
        <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          Gerar Relatório
        </button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total</p>
              <p className="text-2xl font-bold text-blue-900">{totalReports}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <Download className="h-5 w-5 text-green-600 mr-2" />
            <div>
              <p className="text-sm text-green-600 font-medium">Prontos</p>
              <p className="text-2xl font-bold text-green-900">{readyReports}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-purple-600 mr-2" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Assinados</p>
              <p className="text-2xl font-bold text-purple-900">{signedReports}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center">
            <FileText className="h-5 w-5 text-yellow-600 mr-2" />
            <div>
              <p className="text-sm text-yellow-600 font-medium">Gerando</p>
              <p className="text-2xl font-bold text-yellow-900">{generatingReports}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center space-x-4">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">Todos os Status</option>
            <option value="ready">Prontos</option>
            <option value="generating">Gerando</option>
            <option value="signed">Assinados</option>
          </select>
        </div>
      </div>

      {/* Generate New Report Panel */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Gerar Novo Relatório</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Relatório
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
              <option value="monthly">Mensal</option>
              <option value="weekly">Semanal</option>
              <option value="custom">Período Personalizado</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Início
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              defaultValue="2025-01-01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Data Fim
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              defaultValue="2025-01-31"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
            Gerar Relatório
          </button>
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredReports.map((report) => (
          <ReportCard
            key={report.id}
            report={report}
            onDownload={handleDownload}
            onView={handleView}
          />
        ))}
      </div>

      {filteredReports.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">Nenhum relatório encontrado</p>
          <p className="text-gray-400 text-sm">Gere seu primeiro relatório para começar</p>
        </div>
      )}
    </div>
  );
};

export default Reports;