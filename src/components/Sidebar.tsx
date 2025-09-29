import { useState } from 'react';
import { 
  Settings, 
  Users, 
  Truck, 
  Package, 
  FileText,
  Home,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const menuItems = [
    { id: 'reparaciones', label: 'Reparaciones', icon: Settings },
    { id: 'clientes', label: 'Clientes', icon: Users },
    { id: 'proveedores', label: 'Proveedores', icon: Truck },
    { id: 'inventario', label: 'Inventario', icon: Package },
    { id: 'facturas', label: 'Facturas', icon: FileText },
  ];

  return (
    <div 
      className={`fixed left-4 bottom-4 z-50 transition-all duration-300 ${
        isExpanded ? 'w-64' : 'w-16'
      }`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
        <div className="p-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className={`flex items-center transition-opacity duration-300 ${
              isExpanded ? 'opacity-100' : 'opacity-0'
            }`}>
              <Home className="h-5 w-5 text-primary mr-2" />
              <span className="font-semibold text-sm text-foreground">Sistema</span>
            </div>
            <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`} />
          </div>

          {/* Menu Items */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  className={`w-full justify-start transition-all duration-200 ${
                    isExpanded ? 'px-3' : 'px-2'
                  } ${isActive ? 'bg-primary text-primary-foreground shadow-sm' : 'hover:bg-secondary'}`}
                  onClick={() => onSectionChange(item.id)}
                >
                  <Icon className={`h-4 w-4 ${isExpanded ? 'mr-2' : ''}`} />
                  <span className={`transition-opacity duration-300 text-xs ${
                    isExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'
                  }`}>
                    {item.label}
                  </span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;