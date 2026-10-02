import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { FotoRemota } from '@/components/FotoRemota';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

// URL: /carrito   (tab "Carrito")
export default function Carrito() {
  const { carrito, total, deshacerUltimo, puedeDeshacer, nota } = useComedor();

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      {carrito.length === 0 ? (
        <View style={estilos.vacio}>
          <Ionicons name="cart-outline" size={56} color={COLORES.principalSuave} />
          <Text style={comunes.texto}>El carrito está vacío.</Text>
          <Link href="/menu" style={comunes.link}>Ver el menú</Link>
        </View>
      ) : (
        <View style={comunes.caja}>
          {carrito.map((item) => (
            <View key={item.idItem} style={estilos.fila}>
              <FotoRemota foto={item.plato.foto} style={estilos.miniatura} />
              <Text style={estilos.nombre}>{item.plato.nombre}</Text>
              <Text style={comunes.texto}>{formatearPrecio(item.plato.precio)}</Text>
            </View>
          ))}
          <View style={estilos.total}>
            <Text style={estilos.textoTotal}>Total</Text>
            <Text style={estilos.textoTotal}>{formatearPrecio(total)}</Text>
          </View>
        </View>
      )}

      {nota ? <Text style={comunes.suave}>📝 Nota: “{nota}”</Text> : null}

      {/* "Deshacer último" hace POP en la pila de acciones.
          Se deshabilita cuando la pila está vacía. */}
      <Boton
        icono="arrow-undo"
        titulo="Deshacer último"
        secundario
        disabled={!puedeDeshacer}
        onPress={deshacerUltimo}
      />

      <Link href="/carrito/nota" asChild>
        <Boton
          icono="create-outline"
          titulo={nota ? 'Editar nota para la cocina' : 'Agregar nota para la cocina'}
          secundario
        />
      </Link>

      {carrito.length === 0 ? (
        <Boton icono="checkmark-circle" titulo="Confirmar pedido" disabled />
      ) : (
        <Link href="/confirmar" asChild>
          <Boton icono="checkmark-circle" titulo="Confirmar pedido" />
        </Link>
      )}

      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  vacio: { alignItems: 'center', gap: 8, paddingVertical: 24 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 6 },
  miniatura: { width: 52, height: 52, borderRadius: 12 },
  nombre: { flex: 1, fontSize: 16, fontWeight: '700', color: COLORES.texto },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 2,
    borderTopColor: COLORES.acento,
    paddingTop: 10,
    marginTop: 4,
  },
  textoTotal: { fontSize: 18, fontWeight: '800', color: COLORES.principal },
});
