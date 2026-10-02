import { FOTOS, nombreFoto, type Foto } from './imagenes';

// Lista de autores de las fotos (las licencias CC piden nombrarlos).
const creditos = (Object.values(FOTOS) as Foto[])
  .map((f) => `• ${nombreFoto(f)} — ${f.autor} (${f.licencia})`)
  .join('\n');

// Artículos de ayuda. La clave es la ruta que va después de /ayuda/.
export const ARTICULOS: Record<string, { titulo: string; texto: string }> = {
  horarios: {
    titulo: 'Horarios',
    texto: 'El comedor atiende de lunes a viernes de 7:30 a 14:00.',
  },
  'pagos/efectivo': {
    titulo: 'Pagar en efectivo',
    texto: 'Pagás en la caja del comedor al retirar tu pedido. Tené a mano tu número de turno.',
  },
  'pagos/tarjeta': {
    titulo: 'Pagar con tarjeta',
    texto: 'Aceptamos tarjetas de débito en la caja del comedor.',
  },
  'pedidos/como-pedir': {
    titulo: 'Cómo hacer un pedido',
    texto: 'Elegí platos en el Menú, agregalos al carrito y tocá "Confirmar pedido". Te damos un número de turno.',
  },
  creditos: {
    titulo: 'Créditos de las fotos',
    texto: `Las fotos se descargan de Wikimedia Commons y son de uso libre:\n\n${creditos}`,
  },
};
