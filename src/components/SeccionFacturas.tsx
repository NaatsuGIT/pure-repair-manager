import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Eye, Search, FileText, DollarSign } from 'lucide-react';
import { facturas, proveedores, repuestos } from '@/data/mockData';
import type { Factura } from '@/data/mockData';
import ModalContainer from './modals/ModalContainer';
import { useToast } from '@/hooks/use-toast';

const SeccionFacturas = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'nueva' | 'ver'>('nueva');
  const [facturaSeleccionada, setFacturaSeleccionada] = useState<Factura | null>(null);
  const [formData, setFormData] = useState({
    proveedorId: '',
    numero: '',
    fecha: '',
    items: [{ repuestoId: '', cantidad: 1, precioUnitario: 0 }]
  });

  const filteredFacturas = facturas.filter(factura => {
    const proveedor = proveedores.find(p => p.id === factura.proveedorId);
    return factura.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
           proveedor?.nombre.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const abrirModalNueva = () => {
    setFormData({
      proveedorId: '',
      numero: '',
      fecha: '',
      items: [{ repuestoId: '', cantidad: 1, precioUnitario: 0 }]
    });
    setModalType('nueva');
    setFacturaSeleccionada(null);
    setIsModalOpen(true);
  };

  const verFactura = (factura: Factura) => {
    setFacturaSeleccionada(factura);
    setModalType('ver');
    setIsModalOpen(true);
  };

  const agregarItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { repuestoId: '', cantidad: 1, precioUnitario: 0 }]
    });
  };

  const eliminarItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const actualizarItem = (index: number, field: string, value: any) => {
    const nuevosItems = [...formData.items];
    nuevosItems[index] = { ...nuevosItems[index], [field]: value };
    setFormData({ ...formData, items: nuevosItems });
  };

  const calcularTotal = () => {
    return formData.items.reduce((total, item) => total + (item.cantidad * item.precioUnitario), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.proveedorId || !formData.numero || !formData.fecha) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Factura creada",
      description: `Factura ${formData.numero} ha sido registrada exitosamente`,
    });

    setIsModalOpen(false);
  };

  const getProveedorNombre = (proveedorId: string) => {
    return proveedores.find(p => p.id === proveedorId)?.nombre || 'Desconocido';
  };

  const getRepuestoNombre = (repuestoId: string) => {
    return repuestos.find(r => r.id === repuestoId)?.nombre || 'Desconocido';
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Facturas</h1>
          <p className="text-muted-foreground">Gestiona las facturas de proveedores</p>
        </div>
        <Button onClick={abrirModalNueva} className="bg-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Nueva Factura
        </Button>
      </div>

      {/* Resumen financiero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-primary" />
              Total Facturas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{facturas.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-status-ready" />
              Gasto Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${facturas.reduce((total, f) => total + f.total, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <FileText className="h-4 w-4 mr-2 text-status-progress" />
              Promedio por Factura
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${facturas.length > 0 ? (facturas.reduce((total, f) => total + f.total, 0) / facturas.length).toFixed(2) : '0.00'}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2" />
              Lista de Facturas
            </CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar facturas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Número</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFacturas.map((factura) => (
                <TableRow key={factura.id}>
                  <TableCell className="font-medium">{factura.numero}</TableCell>
                  <TableCell>{getProveedorNombre(factura.proveedorId)}</TableCell>
                  <TableCell>{factura.fecha}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {factura.items.length} items
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">${factura.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => verFactura(factura)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalType === 'nueva' ? 'Nueva Factura' : `Factura ${facturaSeleccionada?.numero}`}
        description={modalType === 'nueva' ? 'Registra una nueva factura de proveedor' : 'Detalles de la factura'}
        maxWidth="max-w-3xl"
      >
        {modalType === 'nueva' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="proveedor">Proveedor *</Label>
                <Select value={formData.proveedorId} onValueChange={(value) => setFormData({...formData, proveedorId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona proveedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {proveedores.map(proveedor => (
                      <SelectItem key={proveedor.id} value={proveedor.id}>
                        {proveedor.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="numero">Número de Factura *</Label>
                <Input
                  id="numero"
                  value={formData.numero}
                  onChange={(e) => setFormData({...formData, numero: e.target.value})}
                  placeholder="FAC-2024-001"
                />
              </div>

              <div>
                <Label htmlFor="fecha">Fecha *</Label>
                <Input
                  id="fecha"
                  type="date"
                  value={formData.fecha}
                  onChange={(e) => setFormData({...formData, fecha: e.target.value})}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Items de la Factura</h3>
                <Button type="button" variant="outline" size="sm" onClick={agregarItem}>
                  <Plus className="h-4 w-4 mr-1" />
                  Agregar Item
                </Button>
              </div>

              <div className="space-y-3">
                {formData.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-12 gap-2 items-center p-3 border rounded-lg">
                    <div className="col-span-6">
                      <Select 
                        value={item.repuestoId} 
                        onValueChange={(value) => actualizarItem(index, 'repuestoId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona repuesto" />
                        </SelectTrigger>
                        <SelectContent>
                          {repuestos.map(repuesto => (
                            <SelectItem key={repuesto.id} value={repuesto.id}>
                              {repuesto.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-2">
                      <Input
                        type="number"
                        min="1"
                        value={item.cantidad}
                        onChange={(e) => actualizarItem(index, 'cantidad', parseInt(e.target.value) || 1)}
                        placeholder="Qty"
                      />
                    </div>
                    <div className="col-span-3">
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        value={item.precioUnitario}
                        onChange={(e) => actualizarItem(index, 'precioUnitario', parseFloat(e.target.value) || 0)}
                        placeholder="Precio"
                      />
                    </div>
                    <div className="col-span-1">
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm"
                        onClick={() => eliminarItem(index)}
                        disabled={formData.items.length === 1}
                      >
                        ×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-4">
                <div className="text-lg font-bold">
                  Total: ${calcularTotal().toFixed(2)}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit" className="bg-primary hover:bg-primary-hover">
                Crear Factura
              </Button>
            </div>
          </form>
        ) : (
          facturaSeleccionada && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Proveedor</Label>
                  <p className="font-medium">{getProveedorNombre(facturaSeleccionada.proveedorId)}</p>
                </div>
                <div>
                  <Label>Fecha</Label>
                  <p className="font-medium">{facturaSeleccionada.fecha}</p>
                </div>
              </div>

              <div>
                <Label>Items</Label>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Repuesto</TableHead>
                      <TableHead>Cantidad</TableHead>
                      <TableHead>Precio Unit.</TableHead>
                      <TableHead>Subtotal</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {facturaSeleccionada.items.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{getRepuestoNombre(item.repuestoId)}</TableCell>
                        <TableCell>{item.cantidad}</TableCell>
                        <TableCell>${item.precioUnitario.toFixed(2)}</TableCell>
                        <TableCell>${(item.cantidad * item.precioUnitario).toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-2xl font-bold">${facturaSeleccionada.total.toFixed(2)}</span>
              </div>
            </div>
          )
        )}
      </ModalContainer>
    </div>
  );
};

export default SeccionFacturas;