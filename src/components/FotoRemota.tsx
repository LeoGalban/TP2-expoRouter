import { Image, type ImageStyle } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { COLORES } from '@/constants/tema';
import { fuenteFoto, type Foto } from '@/data/imagenes';

type Props = { foto: Foto; ancho?: 500 | 960; style?: StyleProp<ImageStyle> };

// Muestra una foto descargada de internet (Wikimedia Commons).
// expo-image la guarda en caché: la segunda vez aparece al instante.
export function FotoRemota({ foto, ancho = 500, style }: Props) {
  // Las fotos de producto (botellas sobre fondo blanco) se muestran enteras, sin recortar.
  const entera = 'local' in foto && foto.entera;
  return (
    <Image
      source={fuenteFoto(foto, ancho)}
      // Mientras descarga se ve un fondo de color.
      style={[{ backgroundColor: entera ? '#FFFFFF' : COLORES.borde }, style]}
      contentFit={entera ? 'contain' : 'cover'}
      transition={250}
    />
  );
}

type PropsDegradado = {
  foto: Foto;
  alto: number;
  children?: ReactNode;
  redondeo?: number;
  oscurecerArriba?: boolean; // para cuando también hay texto arriba de la foto
  style?: StyleProp<ViewStyle>;
};

// Foto de fondo con un degradado oscuro abajo, para poder escribir texto blanco encima.
export function FotoConDegradado({
  foto,
  alto,
  children,
  redondeo,
  oscurecerArriba = false,
  style,
}: PropsDegradado) {
  return (
    <View
      style={[
        { height: alto, overflow: 'hidden', backgroundColor: COLORES.principal },
        redondeo ? { borderRadius: redondeo } : null,
        style,
      ]}>
      <FotoRemota foto={foto} ancho={960} style={StyleSheet.absoluteFill} />
      <LinearGradient
        colors={[
          oscurecerArriba ? 'rgba(19,56,62,0.75)' : 'rgba(19,56,62,0.05)',
          'rgba(19,56,62,0.25)',
          'rgba(19,56,62,0.92)',
        ]}
        locations={[0, 0.45, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={estilos.contenido}>{children}</View>
    </View>
  );
}

const estilos = StyleSheet.create({
  contenido: { flex: 1, justifyContent: 'flex-end', padding: 16 },
});
