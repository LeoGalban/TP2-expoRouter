import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { COLORES } from '@/constants/tema';
import { formatearPrecio, type Plato } from '@/data/platos';

import { FotoRemota } from './FotoRemota';

// Un plato de una lista (foto a la izquierda). Al tocarlo abre su detalle en la tab Menú.
// Es una acción del usuario, por eso usamos <Link> (no router).
export function ItemPlato({ plato }: { plato: Plato }) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }} asChild>
      <FilaPlato plato={plato} />
    </Link>
  );
}

// Componente propio para Link asChild: recibe onPress por {...props}
// y arma su estilo adentro como UN solo objeto (nada de arrays).
function FilaPlato({ plato, ...props }: PressableProps & { plato: Plato }) {
  return (
    <Pressable {...props} style={({ pressed }) => (pressed ? estilos.filaPresionada : estilos.fila)}>
      <FotoRemota foto={plato.foto} style={estilos.foto} />
      <View style={estilos.textos}>
        <Text style={estilos.nombre} numberOfLines={1}>{plato.nombre}</Text>
        <Text style={estilos.descripcion} numberOfLines={2}>{plato.descripcion}</Text>
        <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
      </View>
    </Pressable>
  );
}

const fila = {
  flexDirection: 'row' as const,
  gap: 14,
  backgroundColor: COLORES.tarjeta,
  borderRadius: 18,
  padding: 10,
  shadowColor: COLORES.principalOscuro,
  shadowOpacity: 0.08,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 2,
};

const estilos = StyleSheet.create({
  fila,
  filaPresionada: { ...fila, backgroundColor: COLORES.acentoClaro },
  foto: { width: 92, height: 92, borderRadius: 14 },
  textos: { flex: 1, justifyContent: 'center', gap: 3 },
  nombre: { fontSize: 17, fontWeight: '800', color: COLORES.texto },
  descripcion: { fontSize: 13, color: COLORES.suave, lineHeight: 18 },
  precio: { fontSize: 16, fontWeight: '800', color: COLORES.acento, marginTop: 2 },
});
