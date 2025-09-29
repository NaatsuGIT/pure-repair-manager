// Utilidades para persistencia de datos con localStorage

import { Cliente, Proveedor, Repuesto, Dispositivo, Reparacion, Factura } from '@/data/mockData';

const STORAGE_KEYS = {
  CLIENTES: 'clientes',
  PROVEEDORES: 'proveedores',
  REPUESTOS: 'repuestos',
  DISPOSITIVOS: 'dispositivos',
  REPARACIONES: 'reparaciones',
  FACTURAS: 'facturas'
};

// Funciones genéricas de almacenamiento
export const saveToStorage = <T>(key: string, data: T[]): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const loadFromStorage = <T>(key: string, defaultData: T[]): T[] => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultData;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultData;
  }
};

// Funciones específicas para cada entidad
export const clientesStorage = {
  save: (clientes: Cliente[]) => saveToStorage(STORAGE_KEYS.CLIENTES, clientes),
  load: (defaultData: Cliente[]) => loadFromStorage(STORAGE_KEYS.CLIENTES, defaultData),
  add: (cliente: Cliente, currentClientes: Cliente[]) => {
    const updated = [...currentClientes, cliente];
    clientesStorage.save(updated);
    return updated;
  },
  update: (id: string, cliente: Partial<Cliente>, currentClientes: Cliente[]) => {
    const updated = currentClientes.map(c => c.id === id ? { ...c, ...cliente } : c);
    clientesStorage.save(updated);
    return updated;
  },
  delete: (id: string, currentClientes: Cliente[]) => {
    const updated = currentClientes.filter(c => c.id !== id);
    clientesStorage.save(updated);
    return updated;
  }
};

export const proveedoresStorage = {
  save: (proveedores: Proveedor[]) => saveToStorage(STORAGE_KEYS.PROVEEDORES, proveedores),
  load: (defaultData: Proveedor[]) => loadFromStorage(STORAGE_KEYS.PROVEEDORES, defaultData)
};

export const repuestosStorage = {
  save: (repuestos: Repuesto[]) => saveToStorage(STORAGE_KEYS.REPUESTOS, repuestos),
  load: (defaultData: Repuesto[]) => loadFromStorage(STORAGE_KEYS.REPUESTOS, defaultData),
  add: (repuesto: Repuesto, currentRepuestos: Repuesto[]) => {
    const updated = [...currentRepuestos, repuesto];
    repuestosStorage.save(updated);
    return updated;
  },
  update: (id: string, repuesto: Partial<Repuesto>, currentRepuestos: Repuesto[]) => {
    const updated = currentRepuestos.map(r => r.id === id ? { ...r, ...repuesto } : r);
    repuestosStorage.save(updated);
    return updated;
  }
};

export const dispositivosStorage = {
  save: (dispositivos: Dispositivo[]) => saveToStorage(STORAGE_KEYS.DISPOSITIVOS, dispositivos),
  load: (defaultData: Dispositivo[]) => loadFromStorage(STORAGE_KEYS.DISPOSITIVOS, defaultData),
  add: (dispositivo: Dispositivo, currentDispositivos: Dispositivo[]) => {
    const updated = [...currentDispositivos, dispositivo];
    dispositivosStorage.save(updated);
    return updated;
  }
};

export const reparacionesStorage = {
  save: (reparaciones: Reparacion[]) => saveToStorage(STORAGE_KEYS.REPARACIONES, reparaciones),
  load: (defaultData: Reparacion[]) => loadFromStorage(STORAGE_KEYS.REPARACIONES, defaultData),
  add: (reparacion: Reparacion, currentReparaciones: Reparacion[]) => {
    const updated = [...currentReparaciones, reparacion];
    reparacionesStorage.save(updated);
    return updated;
  },
  update: (id: string, reparacion: Partial<Reparacion>, currentReparaciones: Reparacion[]) => {
    const updated = currentReparaciones.map(r => r.id === id ? { ...r, ...reparacion } : r);
    reparacionesStorage.save(updated);
    return updated;
  }
};

export const facturasStorage = {
  save: (facturas: Factura[]) => saveToStorage(STORAGE_KEYS.FACTURAS, facturas),
  load: (defaultData: Factura[]) => loadFromStorage(STORAGE_KEYS.FACTURAS, defaultData)
};
