import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { proveedores } from '@/data/mockData';
import type { Proveedor } from '@/data/mockData';
import ModalContainer from './modals/ModalContainer';
import { useToast } from '@/hooks/use-toast';

const SeccionProveedores = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'nuevo' | 'editar'>('nuevo');
  const [proveedorEditando, setProveedorEditando] = useState<Proveedor | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  const filteredProveedores = proveedores.filter(proveedor =>
    proveedor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    proveedor.telefono.includes(searchTerm) ||
    proveedor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const abrirModalNuevo = () => {
    setFormData({ nombre: '', telefono: '', email: '', direccion: '' });
    setModalMode('nuevo');
    setProveedorEditando(null);
    setIsModalOpen(true);
  };

  const abrirModalEditar = (proveedor: Proveedor) => {
    setFormData({
      nombre: proveedor.nombre,
      telefono: proveedor.telefono,
      email: proveedor.email,
      direccion: proveedor.direccion
    });
    setModalMode('editar');
    setProveedorEditando(proveedor);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nombre || !formData.telefono || !formData.email) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    if (modalMode === 'nuevo') {
      toast({
        title: "Proveedor creado",
        description: `${formData.nombre} ha sido agregado exitosamente`,
      });
    } else {
      toast({
        title: "Proveedor actualizado",
        description: `Los datos de ${formData.nombre} han sido actualizados`,
      });
    }

    setIsModalOpen(false);
  };

  const eliminarProveedor = (proveedor: Proveedor) => {
    toast({
      title: "Proveedor eliminado",
      description: `${proveedor.nombre} ha sido eliminado del sistema`,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Proveedores</h1>
          <p className="text-muted-foreground">Gestiona tus proveedores de repuestos</p>
        </div>
        <Button onClick={abrirModalNuevo} className="bg-primary hover:bg-primary-hover">
          <Plus className="h-4 w-4 mr-2" />
          Nuevo Proveedor
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Lista de Proveedores</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar proveedores..."
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
                <TableHead>Nombre</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Dirección</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProveedores.map((proveedor) => (
                <TableRow key={proveedor.id}>
                  <TableCell className="font-medium">{proveedor.nombre}</TableCell>
                  <TableCell>{proveedor.telefono}</TableCell>
                  <TableCell>{proveedor.email}</TableCell>
                  <TableCell>{proveedor.direccion}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => abrirModalEditar(proveedor)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => eliminarProveedor(proveedor)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
        title={modalMode === 'nuevo' ? 'Nuevo Proveedor' : 'Editar Proveedor'}
        description={modalMode === 'nuevo' ? 'Agrega un nuevo proveedor al sistema' : 'Actualiza la información del proveedor'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="nombre">Nombre *</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              placeholder="Nombre de la empresa"
            />
          </div>

          <div>
            <Label htmlFor="telefono">Teléfono *</Label>
            <Input
              id="telefono"
              value={formData.telefono}
              onChange={(e) => setFormData({...formData, telefono: e.target.value})}
              placeholder="+34 900 123 456"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="ventas@proveedor.com"
            />
          </div>

          <div>
            <Label htmlFor="direccion">Dirección</Label>
            <Input
              id="direccion"
              value={formData.direccion}
              onChange={(e) => setFormData({...formData, direccion: e.target.value})}
              placeholder="Dirección completa"
            />
          </div>

          <div className="flex justify-end space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary-hover">
              {modalMode === 'nuevo' ? 'Crear Proveedor' : 'Actualizar Proveedor'}
            </Button>
          </div>
        </form>
      </ModalContainer>
    </div>
  );
};

export default SeccionProveedores;