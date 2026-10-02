import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { COLORES, type NombreIcono } from '@/constants/tema';

type Props = PressableProps & { titulo: string; subtitulo?: string; icono?: NombreIcono };

// Tarjeta tocable pensada para usarse dentro de <Link asChild>.
// Link le pasa onPress y href a través de {...props}.
// El estilo se arma ADENTRO como un solo objeto (no un array), para evitar el error
// "You are passing an array of styles to a child of <Slot>".
export function Tarjeta({ titulo, subtitulo, icono, ...props }: Props) {
  return (
    <Pressable {...props} style={({ pressed }) => (pressed ? estilos.presionada : estilos.tarjeta)}>
      {icono ? (
        <View style={estilos.circulo}>
          <Ionicons name={icono} size={22} color={COLORES.crema} />
        </View>
      ) : null}
      <View style={estilos.textos}>
        <Text style={estilos.titulo}>{titulo}</Text>
        {subtitulo ? <Text style={estilos.subtitulo}>{subtitulo}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={20} color={COLORES.principalSuave} />
    </Pressable>
  );
}

const base = {
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  gap: 14,
  backgroundColor: COLORES.tarjeta,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: COLORES.borde,
  borderLeftWidth: 5,
  borderLeftColor: COLORES.acento,
  padding: 14,
};

const estilos = StyleSheet.create({
  tarjeta: base,
  presionada: { ...base, backgroundColor: COLORES.acentoClaro },
  circulo: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: COLORES.principal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textos: { flex: 1, gap: 2 },
  titulo: { fontSize: 17, fontWeight: '700', color: COLORES.texto },
  subtitulo: { fontSize: 14, color: COLORES.suave },
});
