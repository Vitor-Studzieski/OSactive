import * as XLSX from 'xlsx';
import { ServiceOrder, CriticalParameter } from '../types';

export const exportServiceOrderToExcel = (order: ServiceOrder) => {
  // Criar um novo workbook
  const workbook = XLSX.utils.book_new();

  // Dados básicos da OS
  const basicData = [
    ['ORDEM DE SERVIÇO - RELATÓRIO DE EXECUÇÃO', ''],
    ['', ''],
    ['ID da OS:', order.id],
    ['Título:', order.title],
    ['Descrição:', order.description],
    ['Setor:', 'N/A'], // Pode ser adicionado ao tipo ServiceOrder se necessário
    ['', ''],
    ['RESPONSABILIDADES', ''],
    ['Criado por:', order.createdBy.name],
    ['E-mail:', order.createdBy.email],
    ['Atribuído para:', order.assignedTo.name],
    ['E-mail:', order.assignedTo.email],
    ['', ''],
    ['CRONOGRAMA', ''],
    ['Data de Criação:', new Date(order.createdAt).toLocaleDateString('pt-BR')],
    ['Data de Vencimento:', new Date(order.dueDate).toLocaleDateString('pt-BR')],
    ['Data de Conclusão:', order.completedAt ? new Date(order.completedAt).toLocaleDateString('pt-BR') : 'N/A'],
    ['Status:', getStatusText(order.status)],
    ['Prioridade:', getPriorityText(order.priority)],
    ['', ''],
    ['RECORRÊNCIA', ''],
    ['Tipo:', getRecurrenceText(order.recurrence.type)],
    ['Intervalo:', `${order.recurrence.interval} ${order.recurrence.type === 'daily' ? 'dia(s)' : order.recurrence.type === 'weekly' ? 'semana(s)' : 'mês(es)'}`],
  ];

  // Criar worksheet com dados básicos
  const worksheet = XLSX.utils.aoa_to_sheet(basicData);

  // Se houver parâmetros, adicionar seção de parâmetros
  if (order.parameters && order.parameters.length > 0) {
    const parametersData = [
      ['', ''],
      ['PARÂMETROS MONITORADOS', ''],
      ['Nome do Parâmetro', 'Valor Registrado', 'Unidade', 'Limite Mínimo', 'Limite Máximo', 'Status', 'Data de Registro', 'Registrado por'],
    ];

    order.parameters.forEach(param => {
      parametersData.push([
        param.name,
        param.value.toString(),
        param.unit,
        param.minLimit.toString(),
        param.maxLimit.toString(),
        getParameterStatusText(param.status),
        new Date(param.recordedAt).toLocaleString('pt-BR'),
        param.recordedBy.name
      ]);
    });

    // Adicionar dados de parâmetros ao worksheet
    XLSX.utils.sheet_add_aoa(worksheet, parametersData, { origin: -1 });
  }

  // Adicionar seção de assinatura
  const signatureData = [
    ['', ''],
    ['ASSINATURAS E APROVAÇÕES', ''],
    ['', ''],
    ['Executado por:', '________________________'],
    ['Nome:', order.assignedTo.name],
    ['Data:', order.completedAt ? new Date(order.completedAt).toLocaleDateString('pt-BR') : '___/___/______'],
    ['Assinatura:', ''],
    ['', ''],
    ['Aprovado por:', '________________________'],
    ['Nome:', order.createdBy.name],
    ['Data:', '___/___/______'],
    ['Assinatura:', ''],
    ['', ''],
    ['Observações:', ''],
    ['', ''],
    ['', ''],
    ['', ''],
  ];

  XLSX.utils.sheet_add_aoa(worksheet, signatureData, { origin: -1 });

  // Configurar largura das colunas
  worksheet['!cols'] = [
    { width: 25 },
    { width: 30 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 15 },
    { width: 20 },
    { width: 20 }
  ];

  // Adicionar worksheet ao workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Ordem de Serviço');

  // Gerar nome do arquivo
  const fileName = `OS_${order.id}_${order.title.replace(/[^a-zA-Z0-9]/g, '_')}_${new Date().toISOString().split('T')[0]}.xlsx`;

  // Fazer download do arquivo
  XLSX.writeFile(workbook, fileName);
};

const getStatusText = (status: ServiceOrder['status']): string => {
  switch (status) {
    case 'pending': return 'Pendente';
    case 'in_progress': return 'Em Andamento';
    case 'completed': return 'Concluída';
    case 'overdue': return 'Atrasada';
    default: return 'Desconhecido';
  }
};

const getPriorityText = (priority: ServiceOrder['priority']): string => {
  switch (priority) {
    case 'low': return 'Baixa';
    case 'medium': return 'Média';
    case 'high': return 'Alta';
    case 'critical': return 'Crítica';
    default: return 'Desconhecida';
  }
};

const getRecurrenceText = (type: 'daily' | 'weekly' | 'monthly'): string => {
  switch (type) {
    case 'daily': return 'Diária';
    case 'weekly': return 'Semanal';
    case 'monthly': return 'Mensal';
    default: return 'Desconhecida';
  }
};

const getParameterStatusText = (status: CriticalParameter['status']): string => {
  switch (status) {
    case 'normal': return 'Normal';
    case 'warning': return 'Atenção';
    case 'critical': return 'Crítico';
    default: return 'Desconhecido';
  }
};