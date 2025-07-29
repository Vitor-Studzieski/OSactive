import React from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  AlertTriangle, 
  FileText, 
  BarChart3,
  Settings,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'service-orders', label: 'Ordens de Serviço', icon: ClipboardList },
    { id: 'parameters', label: 'Parâmetros Críticos', icon: AlertTriangle },
    { id: 'reports', label: 'Relatórios', icon: FileText },
    { id: 'analytics', label: 'Indicadores', icon: BarChart3 },
    { id: 'users', label: 'Usuários', icon: Users },
    { id: 'settings', label: 'Configurações', icon: Settings },
  ];

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen">
      <div className="p-4">
        <nav className="mt-8">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => onSectionChange(item.id)}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                      activeSection === item.id
                        ? 'bg-emerald-600 text-white'
                        : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;