import { User, ServiceOrder, CriticalParameter, Alert, Report, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@empresa.com',
    role: 'operational',
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria.santos@empresa.com',
    role: 'supervisor',
  },
  {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@hygieconsultoria.com',
    role: 'consultant',
  },
];

export const mockServiceOrders: ServiceOrder[] = [
  {
    id: '1',
    title: 'Controle de Umidade - Sala Limpa A',
    description: 'Registrar e monitorar os níveis de umidade na sala limpa A',
    assignedTo: mockUsers[0],
    createdBy: mockUsers[1],
    status: 'pending',
    priority: 'high',
    dueDate: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
    recurrence: {
      type: 'daily',
      interval: 1,
    },
  },
  {
    id: '2',
    title: 'Verificação de Temperatura - Sistema HVAC',
    description: 'Monitorar temperatura dos sistemas de climatização',
    assignedTo: mockUsers[0],
    createdBy: mockUsers[1],
    status: 'completed',
    priority: 'medium',
    dueDate: new Date(Date.now() - 1 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000),
    completedAt: new Date(Date.now() - 30 * 60 * 1000),
    recurrence: {
      type: 'daily',
      interval: 1,
    },
    parameters: [
      {
        id: '1',
        name: 'Temperatura HVAC',
        value: 22.5,
        unit: '°C',
        minLimit: 20,
        maxLimit: 25,
        status: 'normal',
        recordedAt: new Date(Date.now() - 30 * 60 * 1000),
        recordedBy: mockUsers[0],
      },
      {
        id: '2',
        name: 'Umidade Relativa',
        value: 55.2,
        unit: '%',
        minLimit: 40,
        maxLimit: 60,
        status: 'normal',
        recordedAt: new Date(Date.now() - 30 * 60 * 1000),
        recordedBy: mockUsers[0],
      },
    ],
  },
  {
    id: '3',
    title: 'Inspeção Semanal de Equipamentos',
    description: 'Verificação completa dos equipamentos críticos',
    assignedTo: mockUsers[0],
    createdBy: mockUsers[1],
    status: 'overdue',
    priority: 'critical',
    dueDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    recurrence: {
      type: 'weekly',
      interval: 1,
    },
  },
];

export const mockParameters: CriticalParameter[] = [
  {
    id: '1',
    name: 'Umidade Relativa',
    value: 65.2,
    unit: '%',
    minLimit: 40,
    maxLimit: 60,
    status: 'warning',
    recordedAt: new Date(Date.now() - 30 * 60 * 1000),
    recordedBy: mockUsers[0],
  },
  {
    id: '2',
    name: 'Temperatura Ambiente',
    value: 22.5,
    unit: '°C',
    minLimit: 20,
    maxLimit: 25,
    status: 'normal',
    recordedAt: new Date(Date.now() - 15 * 60 * 1000),
    recordedBy: mockUsers[0],
  },
  {
    id: '3',
    name: 'Pressão Diferencial',
    value: 8.2,
    unit: 'Pa',
    minLimit: 10,
    maxLimit: 50,
    status: 'critical',
    recordedAt: new Date(Date.now() - 45 * 60 * 1000),
    recordedBy: mockUsers[0],
  },
];

export const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'parameter_out_of_range',
    severity: 'error',
    title: 'Pressão Diferencial Crítica',
    message: 'Pressão diferencial abaixo do limite mínimo (8.2 Pa < 10 Pa)',
    parameterId: '3',
    isRead: false,
    createdAt: new Date(Date.now() - 45 * 60 * 1000),
  },
  {
    id: '2',
    type: 'task_overdue',
    severity: 'warning',
    title: 'Tarefa em Atraso',
    message: 'Inspeção Semanal de Equipamentos está 12 horas em atraso',
    serviceOrderId: '3',
    isRead: false,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'parameter_out_of_range',
    severity: 'warning',
    title: 'Umidade Acima do Limite',
    message: 'Umidade relativa acima do limite máximo (65.2% > 60%)',
    parameterId: '1',
    isRead: true,
    createdAt: new Date(Date.now() - 30 * 60 * 1000),
  },
];

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Relatório Mensal - Janeiro 2025',
    period: {
      start: new Date('2025-01-01'),
      end: new Date('2025-01-31'),
    },
    type: 'monthly',
    status: 'ready',
    generatedAt: new Date('2025-02-01'),
    serviceOrders: mockServiceOrders,
    summary: {
      totalTasks: 93,
      completedTasks: 87,
      overdueTasks: 3,
      alertsGenerated: 12,
    },
  },
  {
    id: '2',
    title: 'Relatório Mensal - Dezembro 2024',
    period: {
      start: new Date('2024-12-01'),
      end: new Date('2024-12-31'),
    },
    type: 'monthly',
    status: 'signed',
    generatedAt: new Date('2025-01-01'),
    signedAt: new Date('2025-01-03'),
    signedBy: mockUsers[2],
    serviceOrders: mockServiceOrders,
    summary: {
      totalTasks: 89,
      completedTasks: 89,
      overdueTasks: 0,
      alertsGenerated: 5,
    },
  },
];

export const mockDashboardStats: DashboardStats = {
  totalServiceOrders: 156,
  completedToday: 12,
  pendingTasks: 8,
  overdueTasks: 3,
  criticalAlerts: 1,
  complianceRate: 94.2,
};