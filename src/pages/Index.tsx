import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ReparacionesDashboard from '@/components/ReparacionesDashboard';
import SeccionClientes from '@/components/SeccionClientes';
import SeccionProveedores from '@/components/SeccionProveedores';
import SeccionInventario from '@/components/SeccionInventario';
import SeccionFacturas from '@/components/SeccionFacturas';
import NuevaReparacionModal from '@/components/modals/NuevaReparacionModal';

const Index = () => {
  const [activeSection, setActiveSection] = useState('reparaciones');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: string;
    data?: any;
  }>({ isOpen: false, type: '' });

  const openModal = (type: string, data?: any) => {
    setModalState({ isOpen: true, type, data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, type: '' });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'reparaciones':
        return <ReparacionesDashboard onOpenModal={openModal} />;
      case 'clientes':
        return <SeccionClientes />;
      case 'proveedores':
        return <SeccionProveedores />;
      case 'inventario':
        return <SeccionInventario />;
      case 'facturas':
        return <SeccionFacturas />;
      default:
        return <ReparacionesDashboard onOpenModal={openModal} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar navegación */}
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />

      {/* Contenido principal */}
      <main className="transition-all duration-300">
        {renderSection()}
      </main>

      {/* Modales */}
      {modalState.isOpen && modalState.type === 'nueva-reparacion' && (
        <NuevaReparacionModal
          isOpen={modalState.isOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default Index;
