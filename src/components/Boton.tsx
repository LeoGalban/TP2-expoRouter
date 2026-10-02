import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { COLORES, type NombreIcono } from '@/constants/tema';

type Props = PressableProps & { titulo: string; secundario?: boolean; icono?: NombreIcono };

// Botón propio. También sirve dentro de <Link asChild>.
export function Boton({ titulo, secundario = false, icono, disabled, ...props }: Props) {
  // Elegimos UN objeto de estilo (no un array) según el estado.
  const estilo = disabled
    ? estilos.deshabilitado
    : secundario
      ? estilos.secundario
      : estilos.primario;
  const colorTexto = secundario && !disabled ? COLORES.principal : '#FFFFFF';

  return (
    <Pressable
      {...props}
      disabled={disabled}
      style={({ pressed }) => (pressed && !disabled ? { ...estilo, opacity: 0.8 } : estilo)}>
      {icono ? <Ionicons name={icono} size={20} color={colorTexto} /> : null}
      <Text style={{ ...estilos.texto, color: colorTexto }}>{titulo}</Text>
    </Pressable>
  );
}

const base = {
  flexDirection: 'row' as const,
  gap: 8,
  paddingVertical: 14,
  paddingHorizontal: 16,
  borderRadius: 12,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

const estilos = StyleSheet.create({
  primario: { ...base, backgroundColor: COLORES.acento },
  secundario: { ...base, backgroundColor: COLORES.tarjeta, borderWidth: 2, borderColor: COLORES.principal },
  deshabilitado: { ...base, backgroundColor: COLORES.deshabilitado },
  texto: { fontSize: 16, fontWeight: '700' },
});
