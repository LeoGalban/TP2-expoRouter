import { Image, StyleSheet, Text, View } from 'react-native';

import { COLORES } from '@/constants/tema';

// Franja azul con el logo del IPF, para la parte de arriba de una pantalla.
export function Encabezado({ titulo, subtitulo }: { titulo: string; subtitulo?: string }) {
  return (
    <View style={estilos.franja}>
      {/* El logo tiene fondo blanco: lo ponemos sobre un recuadro claro. */}
      <View style={estilos.marcoLogo}>
        <Image source={require('@/assets/images/logo-ipf.jpg')} style={estilos.logo} />
      </View>
      <View style={estilos.textos}>
        <Text style={estilos.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
        <Text style={estilos.estrellas}>★ ★ ★ ★ ★</Text>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  franja: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: COLORES.principal,
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: COLORES.crema,
  },
  marcoLogo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 6,
  },
  logo: { width: 72, height: 66 },
  textos: { flex: 1, gap: 4 },
  titulo: { fontSize: 22, fontWeight: '800', color: COLORES.crema },
  subtitulo: { fontSize: 14, color: COLORES.principalSuave },
  estrellas: { fontSize: 12, color: COLORES.crema, letterSpacing: 2 },
});
