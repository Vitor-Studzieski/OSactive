export interface User {
  id: string;
  name: string;
  email: string;
  role: 'operational' | 'supervisor' | 'consultant';
  avatar?: string;
}

export interface ServiceOrder {
  id: string;
  title: string;
  description: string;
  assignedTo: User;
  createdBy: User;
  status: 'pending' | 'in_progress' | 'completed' | 'overdue';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: Date;
  createdAt: Date;
  completedAt?: Date;
  recurrence: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
  parameters?: CriticalParameter[];
}

export interface CriticalParameter {
  id: string;
  name: string;
  value: number;
  unit: string;
  minLimit: number;
  maxLimit: number;
  status: 'normal' | 'warning' | 'critical';
  recordedAt: Date;
  recordedBy: User;
}

export interface Alert {
  id: string;
  type: 'parameter_out_of_range' | 'task_overdue' | 'system_notification';
  severity: 'info' | 'warning' | 'error';
  title: string;
  message: string;
  serviceOrderId?: string;
  parameterId?: string;
  isRead: boolean;
  createdAt: Date;
}

export interface Report {
  id: string;
  title: string;
  period: {
    start: Date;
    end: Date;
  };
  type: 'monthly' | 'weekly' | 'custom';
  status: 'generating' | 'ready' | 'signed';
  generatedAt: Date;
  signedAt?: Date;
  signedBy?: User;
  serviceOrders: ServiceOrder[];
  summary: {
    totalTasks: number;
    completedTasks: number;
    overdueTasks: number;
    alertsGenerated: number;
  };
}

export interface DashboardStats {
  totalServiceOrders: number;
  completedToday: number;
  pendingTasks: number;
  overdueTasks: number;
  criticalAlerts: number;
  complianceRate: number;
}