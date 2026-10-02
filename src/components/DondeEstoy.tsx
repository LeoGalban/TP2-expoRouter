import { usePathname, useLocalSearchParams, useSegments } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { COLORES } from '@/constants/tema';

// Poner en false para ocultar el recuadro en todas las pantallas.
const DEBUG = true;

// Muestra en vivo dónde estamos: la URL, las partes del archivo y los params.
export function DondeEstoy() {
  const pathname = usePathname();
  const segmentos = useSegments();
  const params = useLocalSearchParams();

  if (!DEBUG) return null;

  return (
    <View style={estilos.caja}>
      <Text style={estilos.titulo}>¿Dónde estoy?</Text>
      <Text style={estilos.linea}>usePathname(): {JSON.stringify(pathname)}</Text>
      <Text style={estilos.linea}>useSegments(): {JSON.stringify(segmentos)}</Text>
      <Text style={estilos.linea}>useLocalSearchParams(): {JSON.stringify(params)}</Text>
    </View>
  );
}

const estilos = StyleSheet.create({
  caja: {
    marginTop: 24,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORES.principalOscuro,
    gap: 4,
  },
  titulo: { color: '#4FD1C5', fontWeight: '700' },
  linea: { color: COLORES.crema, fontFamily: 'monospace', fontSize: 12 },
});
