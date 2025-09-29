import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, Calculator, UserPlus } from 'lucide-react';
import { clientes, repuestos, Cliente } from '@/data/mockData';
import { getMarcas, getModelosPorMarca } from '@/data/modelosTelefonos';
import ModalContainer from './ModalContainer';
import NuevoClienteModal from './NuevoClienteModal';
import { useToast } from '@/hooks/use-toast';
import { clientesStorage } from '@/lib/storage';

interface NuevaReparacionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NuevaReparacionModal = ({ isOpen, onClose }: NuevaReparacionModalProps) => {
  const { toast } = useToast();
  const [clientesActuales, setClientesActuales] = useState<Cliente[]>(
    clientesStorage.load(clientes)
  );
  const [showNuevoClienteModal, setShowNuevoClienteModal] = useState(false);
  const [formData, setFormData] = useState({
    clienteId: '',
    marca: '',
    modelo: '',
    numeroSerie: '',
    descripcionFalla: '',
    descripcionReparacion: '',
    costoFijo: 20,
    costoVariable: 0,
    porcentajeGanancia: 35,
    fechaEstimada: '',
    notas: ''
  });

  const [repuestosSeleccionados, setRepuestosSeleccionados] = useState<Array<{
    repuestoId: string;
    cantidad: number;
  }>>([]);

  const marcas = getMarcas();
  const modelosPorMarca = formData.marca ? getModelosPorMarca(formData.marca) : [];

  const agregarRepuesto = () => {
    setRepuestosSeleccionados([...repuestosSeleccionados, { repuestoId: '', cantidad: 1 }]);
  };

  const eliminarRepuesto = (index: number) => {
    setRepuestosSeleccionados(repuestosSeleccionados.filter((_, i) => i !== index));
  };

  const actualizarRepuesto = (index: number, field: string, value: any) => {
    const nuevosRepuestos = [...repuestosSeleccionados];
    nuevosRepuestos[index] = { ...nuevosRepuestos[index], [field]: value };
    setRepuestosSeleccionados(nuevosRepuestos);
  };

  const calcularCostoVariable = () => {
    return repuestosSeleccionados.reduce((total, item) => {
      const repuesto = repuestos.find(r => r.id === item.repuestoId);
      return total + (repuesto ? repuesto.precio * item.cantidad : 0);
    }, 0);
  };

  const calcularPrecioTotal = () => {
    const costoVariable = calcularCostoVariable();
    const costoTotal = formData.costoFijo + costoVariable;
    return costoTotal * (1 + formData.porcentajeGanancia / 100);
  };

  const handleClienteCreado = (nuevoCliente: Cliente) => {
    const updated = clientesStorage.add(nuevoCliente, clientesActuales);
    setClientesActuales(updated);
    setFormData({...formData, clienteId: nuevoCliente.id});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!formData.clienteId || !formData.marca || !formData.modelo || !formData.descripcionFalla) {
      toast({
        title: "Error de validación",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive"
      });
      return;
    }

    // Simular guardado
    toast({
      title: "Reparación creada",
      description: "La nueva reparación ha sido registrada exitosamente",
    });

    onClose();
  };

  const clienteSeleccionado = clientesActuales.find(c => c.id === formData.clienteId);
  const costoVariable = calcularCostoVariable();
  const precioTotal = calcularPrecioTotal();

  return (
    <ModalContainer
      isOpen={isOpen}
      onClose={onClose}
      title="Nueva Reparación"
      description="Registra un nuevo dispositivo y su reparación"
      maxWidth="max-w-4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Información del Cliente y Dispositivo */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Cliente y Dispositivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cliente">Cliente *</Label>
                  <div className="flex gap-2">
                    <Select value={formData.clienteId} onValueChange={(value) => setFormData({...formData, clienteId: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        {clientesActuales.map(cliente => (
                          <SelectItem key={cliente.id} value={cliente.id}>
                            {cliente.nombre} - {cliente.telefono}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowNuevoClienteModal(true)}
                    >
                      <UserPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {clienteSeleccionado && (
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm"><strong>Email:</strong> {clienteSeleccionado.email}</p>
                    <p className="text-sm"><strong>Dirección:</strong> {clienteSeleccionado.direccion}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="marca">Marca *</Label>
                    <Select 
                      value={formData.marca} 
                      onValueChange={(value) => setFormData({...formData, marca: value, modelo: ''})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona marca" />
                      </SelectTrigger>
                      <SelectContent>
                        {marcas.map(marca => (
                          <SelectItem key={marca} value={marca}>
                            {marca}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="modelo">Modelo *</Label>
                    <Select 
                      value={formData.modelo} 
                      onValueChange={(value) => setFormData({...formData, modelo: value})}
                      disabled={!formData.marca}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona modelo" />
                      </SelectTrigger>
                      <SelectContent>
                        {modelosPorMarca.map(modelo => (
                          <SelectItem key={modelo.modelo} value={modelo.modelo}>
                            {modelo.modelo}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="numeroSerie">Número de Serie</Label>
                  <Input
                    id="numeroSerie"
                    value={formData.numeroSerie}
                    onChange={(e) => setFormData({...formData, numeroSerie: e.target.value})}
                    placeholder="Número de serie del dispositivo"
                  />
                </div>

                <div>
                  <Label htmlFor="descripcionFalla">Descripción de la Falla *</Label>
                  <Textarea
                    id="descripcionFalla"
                    value={formData.descripcionFalla}
                    onChange={(e) => setFormData({...formData, descripcionFalla: e.target.value})}
                    placeholder="Describe detalladamente el problema del dispositivo"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Detalles de la Reparación</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="descripcionReparacion">Descripción de la Reparación</Label>
                  <Textarea
                    id="descripcionReparacion"
                    value={formData.descripcionReparacion}
                    onChange={(e) => setFormData({...formData, descripcionReparacion: e.target.value})}
                    placeholder="Describe el trabajo a realizar"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="fechaEstimada">Fecha Estimada de Entrega</Label>
                  <Input
                    id="fechaEstimada"
                    type="date"
                    value={formData.fechaEstimada}
                    onChange={(e) => setFormData({...formData, fechaEstimada: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="notas">Notas</Label>
                  <Textarea
                    id="notas"
                    value={formData.notas}
                    onChange={(e) => setFormData({...formData, notas: e.target.value})}
                    placeholder="Notas adicionales"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Repuestos y Costos */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Repuestos Utilizados
                  <Button type="button" variant="outline" size="sm" onClick={agregarRepuesto}>
                    <Plus className="h-4 w-4 mr-1" />
                    Agregar
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {repuestosSeleccionados.length === 0 && (
                  <p className="text-muted-foreground text-center py-4">
                    No hay repuestos agregados
                  </p>
                )}

                {repuestosSeleccionados.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg">
                    <div className="flex-1">
                      <Select 
                        value={item.repuestoId} 
                        onValueChange={(value) => actualizarRepuesto(index, 'repuestoId', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecciona repuesto" />
                        </SelectTrigger>
                        <SelectContent>
                          {repuestos.map(repuesto => (
                            <SelectItem key={repuesto.id} value={repuesto.id}>
                              {repuesto.nombre} - ${repuesto.precio}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Input
                      type="number"
                      min="1"
                      value={item.cantidad}
                      onChange={(e) => actualizarRepuesto(index, 'cantidad', parseInt(e.target.value) || 1)}
                      className="w-20"
                      placeholder="Qty"
                    />
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => eliminarRepuesto(index)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Calculator className="h-5 w-5 mr-2" />
                  Cálculo de Costos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="costoFijo">Costo Fijo ($)</Label>
                    <Input
                      id="costoFijo"
                      type="number"
                      step="0.01"
                      value={formData.costoFijo}
                      onChange={(e) => setFormData({...formData, costoFijo: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                  <div>
                    <Label>Costo Variable ($)</Label>
                    <Input
                      value={costoVariable.toFixed(2)}
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div>
                    <Label htmlFor="porcentajeGanancia">Ganancia (%)</Label>
                    <Input
                      id="porcentajeGanancia"
                      type="number"
                      value={formData.porcentajeGanancia}
                      onChange={(e) => setFormData({...formData, porcentajeGanancia: parseFloat(e.target.value) || 0})}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Costo Fijo:</span>
                    <span>${formData.costoFijo.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Costo Variable:</span>
                    <span>${costoVariable.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>${(formData.costoFijo + costoVariable).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ganancia ({formData.porcentajeGanancia}%):</span>
                    <span>${((formData.costoFijo + costoVariable) * formData.porcentajeGanancia / 100).toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>TOTAL:</span>
                    <Badge variant="secondary" className="text-lg px-3 py-1">
                      ${precioTotal.toFixed(2)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button type="submit" className="bg-primary hover:bg-primary-hover">
            Crear Reparación
          </Button>
        </div>
      </form>

      <NuevoClienteModal
        isOpen={showNuevoClienteModal}
        onClose={() => setShowNuevoClienteModal(false)}
        onClienteCreado={handleClienteCreado}
      />
    </ModalContainer>
  );
};

export default NuevaReparacionModal;