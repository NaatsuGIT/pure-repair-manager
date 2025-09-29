import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from 'lucide-react';
import ModalContainer from './ModalContainer';
import { useToast } from '@/hooks/use-toast';
import { Cliente } from '@/data/mockData';

interface NuevoClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onClienteCreado?: (cliente: Cliente) => void;
}

const NuevoClienteModal = ({ isOpen, onClose, onClienteCreado }: NuevoClienteModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    direccion: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.nombre || !formData.telefono) {
      toast({
        title: "Error de validación",
        description: "Nombre y teléfono son obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Crear nuevo cliente
    const nuevoCliente: Cliente = {
      id: Date.now().toString(),
      nombre: formData.nombre,
      telefono: formData.telefono,
      email: formData.email,
      direccion: formData.direccion
    };

    // Simular guardado
    toast({
      title: "Cliente creado",
      description: `${nuevoCliente.nombre} ha sido registrado exitosamente`,
    });

    // Llamar callback si existe
    if (onClienteCreado) {
      onClienteCreado(nuevoCliente);
    }

    // Resetear formulario y cerrar
    setFormData({ nombre: '', telefono: '', email: '', direccion: '' });
    onClose();
  };

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Nuevo Cliente"
      description="Registra un nuevo cliente en el sistema"
      maxWidth="max-w-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="h-5 w-5 mr-2" />
              Información del Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="nombre">Nombre Completo *</Label>
              <Input
                id="nombre"
                value={formData.nombre}
                onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                placeholder="Juan Pérez"
                required
              />
            </div>

            <div>
              <Label htmlFor="telefono">Teléfono *</Label>
              <Input
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                placeholder="+54 11 1234-5678"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="cliente@email.com"
              />
            </div>

            <div>
              <Label htmlFor="direccion">Dirección</Label>
              <Textarea
                id="direccion"
                value={formData.direccion}
                onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                placeholder="Calle, número, ciudad"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary-hover">
            Crear Cliente
          </Button>
        </div>
      </form>
    </ModalContainer>
  );
};

export default NuevoClienteModal;
