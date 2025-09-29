// Datos hardcodeados para el sistema de gestión de reparaciones

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface Proveedor {
  id: string;
  nombre: string;
  telefono: string;
  email: string;
  direccion: string;
}

export interface Repuesto {
  id: string;
  nombre: string;
  categoria: string;
  stock: number;
  precio: number;
  proveedor: string;
}

export interface Dispositivo {
  id: string;
  clienteId: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
  descripcionFalla: string;
  fechaIngreso: string;
}

export interface Reparacion {
  id: string;
  dispositivoId: string;
  estado: 'pendiente' | 'en_proceso' | 'listo' | 'entregado';
  descripcionReparacion: string;
  repuestosUtilizados: Array<{
    repuestoId: string;
    cantidad: number;
  }>;
  costoFijo: number;
  costoVariable: number;
  porcentajeGanancia: number;
  precioTotal: number;
  fechaInicio: string;
  fechaEstimada: string;
  fechaFinalizacion?: string;
  notas: string;
}

export interface Factura {
  id: string;
  proveedorId: string;
  numero: string;
  fecha: string;
  total: number;
  items: Array<{
    repuestoId: string;
    cantidad: number;
    precioUnitario: number;
  }>;
}

// Datos de ejemplo
export const clientes: Cliente[] = [
  {
    id: '1',
    nombre: 'Juan Pérez',
    telefono: '+54 11 4567-8901',
    email: 'juan.perez@email.com',
    direccion: 'Av. Corrientes 1234, Buenos Aires'
  },
  {
    id: '2',
    nombre: 'María García',
    telefono: '+54 11 2345-6789',
    email: 'maria.garcia@email.com',
    direccion: 'Calle San Martín 567, Córdoba'
  },
  {
    id: '3',
    nombre: 'Carlos López',
    telefono: '+54 351 456-7890',
    email: 'carlos.lopez@email.com',
    direccion: 'Av. Libertador 890, Rosario'
  }
];

export const proveedores: Proveedor[] = [
  {
    id: '1',
    nombre: 'TecnoPartes Argentina',
    telefono: '+54 11 5555-1111',
    email: 'ventas@tecnopartes.com.ar',
    direccion: 'Parque Industrial, Lote 12, Buenos Aires'
  },
  {
    id: '2',
    nombre: 'RepuestosMax',
    telefono: '+54 341 444-3333',
    email: 'pedidos@repuestosmax.com.ar',
    direccion: 'Calle Industria 89, Rosario'
  }
];

export const repuestos: Repuesto[] = [
  {
    id: '1',
    nombre: 'Pantalla iPhone 14',
    categoria: 'Pantallas',
    stock: 15,
    precio: 89.99,
    proveedor: 'TecnoPartes Argentina'
  },
  {
    id: '2',
    nombre: 'Batería Samsung Galaxy S22',
    categoria: 'Baterías',
    stock: 8,
    precio: 45.50,
    proveedor: 'RepuestosMax'
  },
  {
    id: '3',
    nombre: 'Conector de carga USB-C',
    categoria: 'Conectores',
    stock: 25,
    precio: 12.99,
    proveedor: 'TecnoPartes Argentina'
  },
  {
    id: '4',
    nombre: 'Placa base Xiaomi Redmi Note 11',
    categoria: 'Placas base',
    stock: 3,
    precio: 125.00,
    proveedor: 'RepuestosMax'
  }
];

export const dispositivos: Dispositivo[] = [
  {
    id: '1',
    clienteId: '1',
    marca: 'Apple',
    modelo: 'iPhone 14',
    numeroSerie: 'F2LVH1MJHX',
    descripcionFalla: 'Pantalla rota, no responde al tacto',
    fechaIngreso: '2024-01-15'
  },
  {
    id: '2',
    clienteId: '2',
    marca: 'Samsung',
    modelo: 'Galaxy S22',
    numeroSerie: 'R58MA0B2K9L',
    descripcionFalla: 'Batería se descarga muy rápido, no carga',
    fechaIngreso: '2024-01-18'
  },
  {
    id: '3',
    clienteId: '3',
    marca: 'Xiaomi',
    modelo: 'Redmi Note 11',
    numeroSerie: 'XM001122334',
    descripcionFalla: 'No enciende, posible problema en placa base',
    fechaIngreso: '2024-01-20'
  },
  {
    id: '4',
    clienteId: '1',
    marca: 'OnePlus',
    modelo: 'Nord 2',
    numeroSerie: 'OP987654321',
    descripcionFalla: 'Puerto de carga no funciona',
    fechaIngreso: '2024-01-22'
  }
];

export const reparaciones: Reparacion[] = [
  {
    id: '1',
    dispositivoId: '1',
    estado: 'listo',
    descripcionReparacion: 'Reemplazo completo de pantalla y calibración táctil',
    repuestosUtilizados: [
      { repuestoId: '1', cantidad: 1 }
    ],
    costoFijo: 25.00,
    costoVariable: 89.99,
    porcentajeGanancia: 40,
    precioTotal: 160.99,
    fechaInicio: '2024-01-16',
    fechaEstimada: '2024-01-19',
    fechaFinalizacion: '2024-01-18',
    notas: 'Reparación completada sin problemas. Pantalla funcionando perfectamente.'
  },
  {
    id: '2',
    dispositivoId: '2',
    estado: 'en_proceso',
    descripcionReparacion: 'Cambio de batería y calibración del sistema',
    repuestosUtilizados: [
      { repuestoId: '2', cantidad: 1 }
    ],
    costoFijo: 20.00,
    costoVariable: 45.50,
    porcentajeGanancia: 35,
    precioTotal: 88.43,
    fechaInicio: '2024-01-19',
    fechaEstimada: '2024-01-24',
    notas: 'Esperando confirmación del cliente para proceder'
  },
  {
    id: '3',
    dispositivoId: '3',
    estado: 'pendiente',
    descripcionReparacion: 'Diagnóstico y posible cambio de placa base',
    repuestosUtilizados: [],
    costoFijo: 30.00,
    costoVariable: 125.00,
    porcentajeGanancia: 30,
    precioTotal: 201.50,
    fechaInicio: '2024-01-21',
    fechaEstimada: '2024-01-28',
    notas: 'Pendiente de autorización del cliente debido al alto costo'
  },
  {
    id: '4',
    dispositivoId: '4',
    estado: 'en_proceso',
    descripcionReparacion: 'Reparación del puerto de carga USB-C',
    repuestosUtilizados: [
      { repuestoId: '3', cantidad: 1 }
    ],
    costoFijo: 15.00,
    costoVariable: 12.99,
    porcentajeGanancia: 50,
    precioTotal: 41.99,
    fechaInicio: '2024-01-23',
    fechaEstimada: '2024-01-26',
    notas: 'Trabajo en progreso, estimación inicial correcta'
  }
];

export const facturas: Factura[] = [
  {
    id: '1',
    proveedorId: '1',
    numero: 'FAC-2024-001',
    fecha: '2024-01-10',
    total: 1249.85,
    items: [
      { repuestoId: '1', cantidad: 10, precioUnitario: 89.99 },
      { repuestoId: '3', cantidad: 20, precioUnitario: 12.99 }
    ]
  },
  {
    id: '2',
    proveedorId: '2',
    numero: 'FAC-2024-002',
    fecha: '2024-01-12',
    total: 689.00,
    items: [
      { repuestoId: '2', cantidad: 10, precioUnitario: 45.50 },
      { repuestoId: '4', cantidad: 2, precioUnitario: 125.00 }
    ]
  }
];