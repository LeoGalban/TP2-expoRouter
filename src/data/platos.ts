import { FOTOS, type Foto } from './imagenes';

export type Categoria = 'desayuno' | 'almuerzo' | 'bebidas' | 'kiosco';

export type Plato = {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  categoria: Categoria;
  foto: Foto;
};

export const CATEGORIAS: Categoria[] = ['desayuno', 'almuerzo', 'bebidas', 'kiosco'];

export const NOMBRES_CATEGORIA: Record<Categoria, string> = {
  desayuno: 'Desayuno',
  almuerzo: 'Almuerzo',
  bebidas: 'Bebidas',
  kiosco: 'Kiosco',
};

// Foto de portada de cada categoría.
export const PORTADAS_CATEGORIA: Record<Categoria, Foto> = {
  desayuno: FOTOS.cafeYMedialunas,
  almuerzo: FOTOS.milanesaNapolitana,
  bebidas: FOTOS.terereJarra,
  kiosco: FOTOS.alfajor,
};

export const PLATOS: Plato[] = [
  { id: 1, nombre: 'Café con leche', precio: 900, descripcion: 'Taza grande de café con leche caliente.', categoria: 'desayuno', foto: FOTOS.cafeConLeche },
  { id: 2, nombre: 'Medialunas (3)', precio: 1200, descripcion: 'Tres medialunas de manteca recién horneadas.', categoria: 'desayuno', foto: FOTOS.medialunas },
  { id: 3, nombre: 'Chipá (docena)', precio: 2500, descripcion: 'Doce chipá calentitos, bien formoseños.', categoria: 'desayuno', foto: FOTOS.chipa },
  { id: 4, nombre: 'Tostado de jamón y queso', precio: 2800, descripcion: 'Pan de miga tostado con jamón y queso.', categoria: 'desayuno', foto: FOTOS.tostado },
  { id: 5, nombre: 'Milanesa con puré', precio: 5500, descripcion: 'Milanesa de carne con puré de papas.', categoria: 'almuerzo', foto: FOTOS.milanesa },
  { id: 6, nombre: 'Guiso de arroz', precio: 4500, descripcion: 'Guiso casero de arroz con porotos y carne.', categoria: 'almuerzo', foto: FOTOS.guiso },
  { id: 7, nombre: 'Sopa paraguaya', precio: 3000, descripcion: 'Porción de sopa paraguaya de maíz y queso.', categoria: 'almuerzo', foto: FOTOS.sopaParaguaya },
  { id: 8, nombre: 'Empanadas (3)', precio: 3600, descripcion: 'Tres empanadas de carne cortada a cuchillo, al horno.', categoria: 'almuerzo', foto: FOTOS.empanadas },
  { id: 9, nombre: 'Agua mineral', precio: 800, descripcion: 'Botella de agua mineral sin gas, bien fría.', categoria: 'bebidas', foto: FOTOS.agua },
  { id: 10, nombre: 'Gaseosa', precio: 1300, descripcion: 'Botella de Coca-Cola de 2,25 L para compartir.', categoria: 'bebidas', foto: FOTOS.gaseosa },
  { id: 11, nombre: 'Jugo de naranja', precio: 1500, descripcion: 'Jugo exprimido en el momento.', categoria: 'bebidas', foto: FOTOS.jugo },
  { id: 12, nombre: 'Tereré', precio: 1000, descripcion: 'Yerba con hielo y jarra de agua fría con menta y limón.', categoria: 'bebidas', foto: FOTOS.terere },
  { id: 13, nombre: 'Alfajor', precio: 900, descripcion: 'Alfajor de chocolate relleno de dulce de leche.', categoria: 'kiosco', foto: FOTOS.alfajor },
  { id: 14, nombre: 'Barra de cereal', precio: 700, descripcion: 'Barra Cereal Mix original, ideal para el recreo.', categoria: 'kiosco', foto: FOTOS.barraCereal },
  { id: 15, nombre: 'Papas fritas', precio: 1100, descripcion: 'Paquete de papas fritas Krachitos tradicionales.', categoria: 'kiosco', foto: FOTOS.papasFritas },
];

// Platos que se muestran en el carrusel de Inicio.
export const DESTACADOS = [8, 5, 3, 12, 7].map((id) => PLATOS.find((p) => p.id === id)!);

// Los params de la URL llegan SIEMPRE como texto: "7", no 7.
// Por eso convertimos con Number() antes de comparar con el id numérico.
export function buscarPlato(id: string | undefined): Plato | undefined {
  const numero = Number(id);
  if (!Number.isInteger(numero)) return undefined;
  return PLATOS.find((p) => p.id === numero);
}

// Revisa que el texto de la URL sea una de las cuatro categorías válidas.
export function esCategoria(valor: string | undefined): valor is Categoria {
  return CATEGORIAS.includes(valor as Categoria);
}

export function formatearPrecio(precio: number): string {
  return `$${precio.toLocaleString('es-AR')}`;
}
