import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { formatearPrecio } from '@/data/platos';

// URL: /cocina   (Drawer, solo con sesión)
export default function Cocina() {
  const { enEspera, atenderSiguiente } = useComedor();
  const frente = enEspera[0]; // el FRENTE de la cola: el que llegó primero

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <View style={estilos.contador}>
        <Text style={estilos.cantidad}>{enEspera.length}</Text>
        <Text style={estilos.textoContador}>pedido(s) en espera</Text>
      </View>

      {frente ? (
        <View style={estilos.pedido}>
          <View style={estilos.franja}>
            <Text style={estilos.textoFranja}>AL FRENTE DE LA COLA</Text>
            <Text style={estilos.numero}>N° {frente.numero}</Text>
          </View>
          <View style={estilos.cuerpo}>
            {frente.items.map((plato, i) => (
              <Text key={i} style={comunes.texto}>• {plato.nombre}</Text>
            ))}
            {frente.nota ? <Text style={comunes.suave}>📝 Nota: “{frente.nota}”</Text> : null}
            <Text style={estilos.total}>{formatearPrecio(frente.total)}</Text>
          </View>
        </View>
      ) : (
        <View style={{ ...comunes.caja, alignItems: 'center' }}>
          <Text style={comunes.texto}>No hay pedidos en espera. 🎉</Text>
        </View>
      )}

      {/* Desencola el del frente: nadie se puede colar. */}
      <Boton icono="checkmark-done" titulo="Atender siguiente" onPress={atenderSiguiente} disabled={!frente} />
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contador: { flexDirection: 'row', alignItems: 'baseline', gap: 8 },
  cantidad: { fontSize: 40, fontWeight: '900', color: COLORES.acento },
  textoContador: { fontSize: 16, color: COLORES.suave, fontWeight: '600' },
  pedido: {
    backgroundColor: COLORES.tarjeta,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORES.borde,
    overflow: 'hidden',
  },
  franja: { backgroundColor: COLORES.principal, padding: 14 },
  textoFranja: { color: COLORES.principalSuave, fontWeight: '700', letterSpacing: 1, fontSize: 12 },
  numero: { color: COLORES.crema, fontSize: 32, fontWeight: '900' },
  cuerpo: { padding: 14, gap: 4 },
  total: { fontSize: 18, fontWeight: '800', color: COLORES.acento, marginTop: 6 },
});
