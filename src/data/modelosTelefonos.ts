// Catálogo de modelos de teléfonos predefinidos

export interface ModeloTelefono {
  marca: string;
  modelo: string;
  categoria: string;
}

export const modelosTelefonos: ModeloTelefono[] = [
  // Apple iPhone
  { marca: 'Apple', modelo: 'iPhone 15 Pro Max', categoria: 'Premium' },
  { marca: 'Apple', modelo: 'iPhone 15 Pro', categoria: 'Premium' },
  { marca: 'Apple', modelo: 'iPhone 15', categoria: 'Premium' },
  { marca: 'Apple', modelo: 'iPhone 14 Pro Max', categoria: 'Premium' },
  { marca: 'Apple', modelo: 'iPhone 14 Pro', categoria: 'Premium' },
  { marca: 'Apple', modelo: 'iPhone 14', categoria: 'Premium' },
  { marca: 'Apple', modelo: 'iPhone 13', categoria: 'Premium' },
  { marca: 'Apple', modelo: 'iPhone 12', categoria: 'Gama Media' },
  { marca: 'Apple', modelo: 'iPhone SE (2022)', categoria: 'Gama Media' },
  
  // Samsung Galaxy
  { marca: 'Samsung', modelo: 'Galaxy S24 Ultra', categoria: 'Premium' },
  { marca: 'Samsung', modelo: 'Galaxy S24+', categoria: 'Premium' },
  { marca: 'Samsung', modelo: 'Galaxy S24', categoria: 'Premium' },
  { marca: 'Samsung', modelo: 'Galaxy S23 Ultra', categoria: 'Premium' },
  { marca: 'Samsung', modelo: 'Galaxy S23', categoria: 'Premium' },
  { marca: 'Samsung', modelo: 'Galaxy S22', categoria: 'Premium' },
  { marca: 'Samsung', modelo: 'Galaxy A54', categoria: 'Gama Media' },
  { marca: 'Samsung', modelo: 'Galaxy A34', categoria: 'Gama Media' },
  { marca: 'Samsung', modelo: 'Galaxy A24', categoria: 'Gama Baja' },
  { marca: 'Samsung', modelo: 'Galaxy A14', categoria: 'Gama Baja' },
  
  // Xiaomi
  { marca: 'Xiaomi', modelo: 'Xiaomi 14 Pro', categoria: 'Premium' },
  { marca: 'Xiaomi', modelo: 'Xiaomi 14', categoria: 'Premium' },
  { marca: 'Xiaomi', modelo: 'Xiaomi 13 Pro', categoria: 'Premium' },
  { marca: 'Xiaomi', modelo: 'Xiaomi 13', categoria: 'Premium' },
  { marca: 'Xiaomi', modelo: 'Redmi Note 13 Pro', categoria: 'Gama Media' },
  { marca: 'Xiaomi', modelo: 'Redmi Note 13', categoria: 'Gama Media' },
  { marca: 'Xiaomi', modelo: 'Redmi Note 12 Pro', categoria: 'Gama Media' },
  { marca: 'Xiaomi', modelo: 'Redmi Note 11', categoria: 'Gama Media' },
  { marca: 'Xiaomi', modelo: 'Redmi 12', categoria: 'Gama Baja' },
  { marca: 'Xiaomi', modelo: 'Redmi 10', categoria: 'Gama Baja' },
  
  // Motorola
  { marca: 'Motorola', modelo: 'Moto Edge 40 Pro', categoria: 'Premium' },
  { marca: 'Motorola', modelo: 'Moto Edge 30 Ultra', categoria: 'Premium' },
  { marca: 'Motorola', modelo: 'Moto G84', categoria: 'Gama Media' },
  { marca: 'Motorola', modelo: 'Moto G73', categoria: 'Gama Media' },
  { marca: 'Motorola', modelo: 'Moto G54', categoria: 'Gama Media' },
  { marca: 'Motorola', modelo: 'Moto G32', categoria: 'Gama Baja' },
  { marca: 'Motorola', modelo: 'Moto E13', categoria: 'Gama Baja' },
  
  // OnePlus
  { marca: 'OnePlus', modelo: 'OnePlus 12', categoria: 'Premium' },
  { marca: 'OnePlus', modelo: 'OnePlus 11', categoria: 'Premium' },
  { marca: 'OnePlus', modelo: 'OnePlus Nord 3', categoria: 'Gama Media' },
  { marca: 'OnePlus', modelo: 'OnePlus Nord CE 3', categoria: 'Gama Media' },
  { marca: 'OnePlus', modelo: 'OnePlus Nord 2', categoria: 'Gama Media' },
  
  // Realme
  { marca: 'Realme', modelo: 'Realme GT 3', categoria: 'Premium' },
  { marca: 'Realme', modelo: 'Realme 11 Pro+', categoria: 'Gama Media' },
  { marca: 'Realme', modelo: 'Realme 11 Pro', categoria: 'Gama Media' },
  { marca: 'Realme', modelo: 'Realme C55', categoria: 'Gama Baja' },
  { marca: 'Realme', modelo: 'Realme C35', categoria: 'Gama Baja' },
];

export const getMarcas = (): string[] => {
  return Array.from(new Set(modelosTelefonos.map(m => m.marca))).sort();
};

export const getModelosPorMarca = (marca: string): ModeloTelefono[] => {
  return modelosTelefonos.filter(m => m.marca === marca);
};
