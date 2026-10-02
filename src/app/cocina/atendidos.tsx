import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

// URL: /cocina/atendidos   (misma sección del Drawer)
// La lista sale de una PILA, del tope a la base: el último atendido aparece primero.
export default function Atendidos() {
  const { atendidos } = useComedor();

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      {atendidos.length === 0 ? (
        <View style={{ ...comunes.caja, alignItems: 'center' }}>
          <Text style={comunes.texto}>Todavía no se atendió ningún pedido.</Text>
        </View>
      ) : (
        atendidos.map((pedido, i) => (
          <View key={pedido.numero} style={estilos.fila}>
            <Ionicons name="checkmark-circle" size={26} color={COLORES.acento} />
            <View style={{ flex: 1 }}>
              <Text style={estilos.numero}>Pedido N° {pedido.numero}</Text>
              <Text style={comunes.suave}>
                {pedido.items.length} plato(s) · {formatearPrecio(pedido.total)}
              </Text>
            </View>
            {i === 0 ? <Text style={estilos.ultimo}>ÚLTIMO</Text> : null}
          </View>
        ))
      )}
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: COLORES.tarjeta,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORES.borde,
    padding: 12,
  },
  numero: { fontSize: 16, fontWeight: '700', color: COLORES.principal },
  ultimo: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    backgroundColor: COLORES.acento,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
