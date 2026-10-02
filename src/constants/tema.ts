import type Ionicons from '@expo/vector-icons/Ionicons';
import type { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

import type { Categoria } from '@/data/platos';

// Paleta de la app. Cambiando un valor acá, cambia en TODA la app.
export const COLORES = {
  principal: '#13383E', // verde petróleo oscuro: headers, barra de pestañas, menú lateral
  principalOscuro: '#0B2427', // para sombras y el recuadro "¿Dónde estoy?"
  principalSuave: '#8DB4B5', // íconos y textos apagados sobre el principal
  acento: '#05837E', // verde azulado: botones, precios, chips, badge
  acentoClaro: '#DDF0EE', // fondo suave del acento (tarjeta presionada, etiquetas)
  crema: '#F4EEDC', // tomado de las letras del logo del IPF
  fondo: '#F5F6F1',
  tarjeta: '#FFFFFF',
  texto: '#13383E',
  suave: '#5A6F70',
  borde: '#DCE6E2',
  deshabilitado: '#C5D0CD',
  error: '#B3261E',
};

export type NombreIcono = ComponentProps<typeof Ionicons>['name'];

export const ICONOS_CATEGORIA: Record<Categoria, NombreIcono> = {
  desayuno: 'cafe',
  almuerzo: 'restaurant',
  bebidas: 'water',
  kiosco: 'ice-cream',
};

// Header color principal con texto crema, igual en todos los navegadores.
export const opcionesHeader = {
  headerStyle: { backgroundColor: COLORES.principal },
  headerTintColor: COLORES.crema,
  headerTitleStyle: { fontWeight: '700' as const },
  headerShadowVisible: false,
};

// Estilos que se repiten en casi todas las pantallas.
export const comunes = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: COLORES.fondo },
  contenido: { padding: 16, gap: 12 },
  titulo: { fontSize: 24, fontWeight: '800', color: COLORES.texto },
  subtitulo: { fontSize: 18, fontWeight: '700', color: COLORES.texto, marginTop: 8 },
  texto: { fontSize: 16, color: COLORES.texto, lineHeight: 22 },
  suave: { fontSize: 14, color: COLORES.suave },
  link: { fontSize: 16, color: COLORES.acento, fontWeight: '700' },
  caja: {
    backgroundColor: COLORES.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORES.borde,
    padding: 16,
    gap: 6,
  },
  input: {
    backgroundColor: COLORES.tarjeta,
    borderColor: COLORES.borde,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: COLORES.texto,
  },
});
