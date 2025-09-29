import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  Plus,
  Eye,
  Edit,
  CheckCircle2,
  Clock,
  AlertCircle,
  Package
} from 'lucide-react';
import { reparaciones, dispositivos, clientes } from '@/data/mockData';
import type { Reparacion } from '@/data/mockData';

interface ReparacionesDashboardProps {
  onOpenModal: (type: string, data?: any) => void;
}

const ReparacionesDashboard = ({ onOpenModal }: ReparacionesDashboardProps) => {
  const [selectedReparacion, setSelectedReparacion] = useState<Reparacion | null>(null);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-status-pending text-status-pending-foreground';
      case 'en_proceso':
        return 'bg-status-progress text-status-progress-foreground';
      case 'listo':
        return 'bg-status-ready text-status-ready-foreground';
      case 'entregado':
        return 'bg-status-delivered text-status-delivered-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return <AlertCircle className="h-4 w-4" />;
      case 'en_proceso':
        return <Clock className="h-4 w-4" />;
      case 'listo':
        return <CheckCircle2 className="h-4 w-4" />;
      case 'entregado':
        return <Package className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'Pendiente';
      case 'en_proceso':
        return 'En Proceso';
      case 'listo':
        return 'Listo';
      case 'entregado':
        return 'Entregado';
      default:
        return estado;
    }
  };

  const getDeviceInfo = (dispositivoId: string) => {
    return dispositivos.find(d => d.id === dispositivoId);
  };

  const getClientInfo = (clienteId: string) => {
    return clientes.find(c => c.id === clienteId);
  };

  const reparacionesConDetalles = reparaciones.map(reparacion => {
    const dispositivo = getDeviceInfo(reparacion.dispositivoId);
    const cliente = dispositivo ? getClientInfo(dispositivo.clienteId) : null;
    return {
      ...reparacion,
      dispositivo,
      cliente
    };
  });

  // Estadísticas rápidas
  const stats = {
    pendientes: reparaciones.filter(r => r.estado === 'pendiente').length,
    enProceso: reparaciones.filter(r => r.estado === 'en_proceso').length,
    listos: reparaciones.filter(r => r.estado === 'listo').length,
    entregados: reparaciones.filter(r => r.estado === 'entregado').length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Panel de Reparaciones</h1>
          <p className="text-muted-foreground">Gestiona todas las reparaciones de dispositivos</p>
        </div>
        <Button 
          onClick={() => onOpenModal('nueva-reparacion')}
          className="bg-primary hover:bg-primary-hover text-primary-foreground shadow-md"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nueva Reparación
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-status-pending">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <AlertCircle className="h-4 w-4 mr-2 text-status-pending" />
              Pendientes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendientes}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-progress">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-status-progress" />
              En Proceso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enProceso}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-ready">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <CheckCircle2 className="h-4 w-4 mr-2 text-status-ready" />
              Listos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.listos}</div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-status-delivered">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Package className="h-4 w-4 mr-2 text-status-delivered" />
              Entregados
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.entregados}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabla de Reparaciones */}
      <Card>
        <CardHeader>
          <CardTitle>Listado de Reparaciones</CardTitle>
          <CardDescription>
            Todas las reparaciones registradas en el sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Cliente</TableHead>
                <TableHead>Dispositivo</TableHead>
                <TableHead>Falla</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Estimada</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reparacionesConDetalles.map((reparacion) => (
                <TableRow key={reparacion.id} className="hover:bg-muted/50">
                  <TableCell>
                    <div>
                      <div className="font-medium">{reparacion.cliente?.nombre}</div>
                      <div className="text-sm text-muted-foreground">
                        {reparacion.cliente?.telefono}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {reparacion.dispositivo?.marca} {reparacion.dispositivo?.modelo}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        S/N: {reparacion.dispositivo?.numeroSerie}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={reparacion.dispositivo?.descripcionFalla}>
                      {reparacion.dispositivo?.descripcionFalla}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(reparacion.estado)} flex items-center gap-1 w-fit`}>
                      {getStatusIcon(reparacion.estado)}
                      {getStatusLabel(reparacion.estado)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{reparacion.fechaEstimada}</div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">€{reparacion.precioTotal.toFixed(2)}</div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenModal('ver-reparacion', reparacion)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onOpenModal('editar-reparacion', reparacion)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReparacionesDashboard;