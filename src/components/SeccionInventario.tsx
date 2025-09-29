import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Search, AlertTriangle, Package } from 'lucide-react';
import { repuestos } from '@/data/mockData';
import type { Repuesto } from '@/data/mockData';
import ModalContainer from './modals/ModalContainer';
import { useToast } from '@/hooks/use-toast';

const SeccionInventario = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'nuevo' | 'editar'>('nuevo');
  const [repuestoEditando, setRepuestoEditando] = useState<Repuesto | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    stock: 0,
    precio: 0,
    proveedor: ''
  });

  const categorias = Array.from(new Set(repuestos.map(r => r.categoria)));
  
  const filteredRepuestos = repuestos.filter(repuesto => {
    const matchesSearch = repuesto.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repuesto.categoria.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         repuesto.proveedor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategoria = filtroCategoria === 'todas' || repuesto.categoria === filtroCategoria;
    return matchesSearch && matchesCategoria;
  });

  const repuestosBajoStock = repuestos.filter(r => r.stock <= 5);

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'bg-destructive text-destructive-foreground', label: 'Sin stock' };
    if (stock <= 5) return { color: 'bg-status-pending text-status-pending-foreground', label: 'Stock bajo' };
    if (stock <= 10) return { color: 'bg-status-progress text-status-progress-foreground', label: 'Stock medio' };
    return { color: 'bg-status-ready text-status-ready-foreground', label: 'Stock bueno' };
  };

  const abrirModalNuevo = () => {
    setFormData({ nombre: '', categoria: '', stock: 0, precio: 0, proveedor: '' });
    setModalMode('nuevo');
    setRepuestoEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (repuesto: Repuesto) => {
    setFormData({
      nombre: repuesto.nombre,
      categoria: repuesto.categoria,
      stock: repuesto.stock,
      precio: repuesto.precio,
      proveedor: repuesto.proveedor
    });
    setModalMode('editar');
    setRepuestoEditando(repuesto);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.categoria || !formData.proveedor) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    if (modalMode === 'nuevo') {
      toast({
        title: "Repuesto agregado",
        description: `${formData.nombre} ha sido agregado al inventario`,
      });
    } else {
      toast({
        title: "Repuesto actualizado",
        description: `${formData.nombre} ha sido actualizado en el inventario`,
      });
    }

    setIsModalOpen(false);
  };

  const eliminarRepuesto = (repuesto: Repuesto) => {
    toast({
      title: "Repuesto eliminado",
      description: `${repuesto.nombre} ha sido eliminado del inventario`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inventario</h1>
          <p className="text-muted-foreground">Gestiona el stock de repuestos</p>
        </div>
        <Button onClick={abrirModalNuevo} className="bg-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Repuesto
        </Button>
      </div>

      {/* Alertas de stock bajo */}
      {repuestosBajoStock.length > 0 && (
        <Card className="border-l-4 border-l-status-pending">
          <CardHeader>
            <CardTitle className="text-lg flex items-center text-status-pending">
              <AlertTriangle className="h-5 w-5 mr-2" />
              Alertas de Stock
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Los siguientes repuestos tienen stock bajo o están agotados:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {repuestosBajoStock.map(repuesto => (
                <div key={repuesto.id} className="flex items-center justify-between p-2 bg-muted rounded">
                  <span className="text-sm font-medium">{repuesto.nombre}</span>
                  <Badge variant="secondary" className="text-xs">
                    {repuesto.stock} unidades
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Inventario de Repuestos
            </CardTitle>
            <div className="flex gap-4">
              <div className="relative w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar repuestos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Filtrar por categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas las categorías</SelectItem>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>
                      {categoria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Proveedor</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRepuestos.map((repuesto) => {
                const stockStatus = getStockStatus(repuesto.stock);
                return (
                  <TableRow key={repuesto.id}>
                    <TableCell className="font-medium">{repuesto.nombre}</TableCell>
                    <TableCell>{repuesto.categoria}</TableCell>
                    <TableCell className="text-center font-medium">{repuesto.stock}</TableCell>
                    <TableCell>
                      <Badge className={stockStatus.color}>
                        {stockStatus.label}
                      </Badge>
                    </TableCell>
                    <TableCell>${repuesto.precio.toFixed(2)}</TableCell>
                    <TableCell>{repuesto.proveedor}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => abrirModalEditar(repuesto)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => eliminarRepuesto(repuesto)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <ModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={modalMode === 'nuevo' ? 'Nuevo Repuesto' : 'Editar Repuesto'}
        description={modalMode === 'nuevo' ? 'Agrega un nuevo repuesto al inventario' : 'Actualiza la información del repuesto'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Nombre del repuesto"
            />
          </div>

          <div>
            <Label htmlFor="categoria">Categoría *</Label>
            <Input
              id="categoria"
              value={formData.categoria}
              onChange={(e) => setFormData({...formData, categoria: e.target.value})}
              placeholder="Pantallas, Baterías, Conectores..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                placeholder="0"
              />
            </div>
            <div>
              <Label htmlFor="precio">Precio ($)</Label>
              <Input
                id="precio"
                type="number"
                step="0.01"
                min="0"
                value={formData.precio}
                onChange={(e) => setFormData({...formData, precio: parseFloat(e.target.value) || 0})}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="proveedor">Proveedor *</Label>
            <Input
              id="proveedor"
              value={formData.proveedor}
              onChange={(e) => setFormData({...formData, proveedor: e.target.value})}
              placeholder="Nombre del proveedor"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {modalMode === 'nuevo' ? 'Crear Repuesto' : 'Actualizar Repuesto'}
            </Button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

export default SeccionInventario;