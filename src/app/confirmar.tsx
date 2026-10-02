import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

// URL: /confirmar   (Stack raíz, presentation: 'modal')
export default function Confirmar() {
  const { carrito, total, nota, confirmarPedido } = useComedor();

  function confirmar() {
    const numero = confirmarPedido(); // se ENCOLA el pedido y se le da un número
    if (numero === null) return;
    // REPLACE y no push: la pantalla /confirmar se CAMBIA por /turno/N.
    // Así "atrás" desde el turno NO vuelve a la confirmación (no se puede confirmar dos veces).
    router.replace({ pathname: '/turno/[numero]', params: { numero: String(numero) } });
  }

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <Text style={comunes.titulo}>Resumen del pedido</Text>
      <View style={comunes.caja}>
        {carrito.length === 0 ? <Text style={comunes.texto}>No hay nada en el carrito.</Text> : null}
        {carrito.map((item) => (
          <View key={item.idItem} style={estilos.fila}>
            <Text style={comunes.texto}>{item.plato.nombre}</Text>
            <Text style={comunes.texto}>{formatearPrecio(item.plato.precio)}</Text>
          </View>
        ))}
        {nota ? <Text style={comunes.suave}>📝 Nota: “{nota}”</Text> : null}
        <View style={estilos.total}>
          <Text style={estilos.textoTotal}>Total</Text>
          <Text style={estilos.textoTotal}>{formatearPrecio(total)}</Text>
        </View>
      </View>

      <Boton icono="checkmark-circle" titulo="Confirmar" onPress={confirmar} disabled={carrito.length === 0} />
      {/* Cancelar en un modal: simplemente lo sacamos de la pila. */}
      <Boton icono="close" titulo="Cancelar" secundario onPress={() => router.back()} />
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  fila: { flexDirection: 'row', justifyContent: 'space-between' },
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
