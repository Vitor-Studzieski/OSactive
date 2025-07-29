import React from 'react';
import { FileText, Download, Eye, CheckCircle, Clock, Edit3 } from 'lucide-react';
import { Report } from '../../types';

interface ReportCardProps {
  report: Report;
  onDownload: (reportId: string) => void;
  onView: (reportId: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onDownload, onView }) => {
  const getStatusColor = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'generating':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'signed':
        return 'text-blue-600 bg-blue-100 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return <CheckCircle className="h-4 w-4" />;
      case 'generating':
        return <Clock className="h-4 w-4" />;
      case 'signed':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: Report['status']) => {
    switch (status) {
      case 'ready':
        return 'Pronto';
      case 'generating':
        return 'Gerando';
      case 'signed':
        return 'Assinado';
      default:
        return 'Desconhecido';
    }
  };

  const complianceRate = (report.summary.completedTasks / report.summary.totalTasks) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg mr-3">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{report.title}</h3>
            <p className="text-sm text-gray-500">
              {new Date(report.period.start).toLocaleDateString('pt-BR')} - {' '}
              {new Date(report.period.end).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center ${getStatusColor(report.status)}`}>
          {getStatusIcon(report.status)}
          <span className="ml-1">{getStatusText(report.status)}</span>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">Total de Tarefas</p>
          <p className="text-2xl font-bold text-gray-900">{report.summary.totalTasks}</p>
        </div>
        <div className="text-center p-3 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Concluídas</p>
          <p className="text-2xl font-bold text-green-900">{report.summary.completedTasks}</p>
        </div>
        <div className="text-center p-3 bg-red-50 rounded-lg">
          <p className="text-sm text-red-600">Em Atraso</p>
          <p className="text-2xl font-bold text-red-900">{report.summary.overdueTasks}</p>
        </div>
        <div className="text-center p-3 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-600">Alertas</p>
          <p className="text-2xl font-bold text-yellow-900">{report.summary.alertsGenerated}</p>
        </div>
      </div>

      {/* Compliance Rate */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Taxa de Conformidade</span>
          <span>{complianceRate.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all duration-300 ${
              complianceRate >= 95 ? 'bg-green-500' :
              complianceRate >= 85 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${complianceRate}%` }}
          />
        </div>
      </div>

      {/* Signature Info */}
      {report.status === 'signed' && report.signedBy && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">
                Assinado por {report.signedBy.name}
              </p>
              <p className="text-blue-600">
                {report.signedAt && new Date(report.signedAt).toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Generation Info */}
      <div className="text-xs text-gray-400 mb-4">
        Gerado em: {new Date(report.generatedAt).toLocaleString('pt-BR')}
      </div>

      {/* Actions */}
      <div className="flex space-x-2">
        <button
          onClick={() => onView(report.id)}
          className="flex-1 bg-blue-500 text-white px-3 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center text-sm"
        >
          <Eye className="h-4 w-4 mr-1" />
          Visualizar
        </button>
        {report.status !== 'generating' && (
          <button
            onClick={() => onDownload(report.id)}
            className="flex-1 bg-emerald-500 text-white px-3 py-2 rounded-lg hover:bg-emerald-600 transition-colors flex items-center justify-center text-sm"
          >
            <Download className="h-4 w-4 mr-1" />
            Download PDF
          </button>
        )}
      </div>
    </div>
  );
};

export default ReportCard;