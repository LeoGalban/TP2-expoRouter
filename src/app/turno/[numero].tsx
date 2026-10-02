import { Link, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

const MINUTOS_POR_PEDIDO = 3;

// URL: /turno/[numero]   ej: /turno/4   (Stack raíz)
export default function Turno() {
  const { numero } = useLocalSearchParams<{ numero: string }>();
  const { enEspera, atendidos } = useComedor();
  const n = Number(numero); // llega como texto

  // Posición en la cola: 0 = está al frente.
  const posicion = enEspera.findIndex((p) => p.numero === n);
  const yaAtendido = atendidos.some((p) => p.numero === n);

  let mensaje: string;
  let detalle = '';
  if (posicion >= 0) {
    const adelante = posicion;
    // Desafío opcional: (posición en la cola) x 3 minutos.
    const minutos = (posicion + 1) * MINUTOS_POR_PEDIDO;
    mensaje = adelante === 0 ? '¡Sos el próximo!' : `Hay ${adelante} pedido(s) adelante tuyo`;
    detalle = `Tiempo estimado: ${minutos} min`;
  } else if (yaAtendido) {
    mensaje = '¡Tu pedido ya fue atendido!';
    detalle = 'Pasá a retirarlo por el mostrador.';
  } else {
    mensaje = 'No hay ningún pedido con ese número.';
  }

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={estilos.contenido}>
      <Text style={estilos.etiqueta}>TU NÚMERO DE TURNO</Text>
      <View style={estilos.circulo}>
        <Text style={estilos.numero}>{numero}</Text>
      </View>
      <View style={{ ...comunes.caja, alignSelf: 'stretch', alignItems: 'center' }}>
        <Text style={estilos.mensaje}>{mensaje}</Text>
        {detalle ? <Text style={estilos.detalle}>{detalle}</Text> : null}
      </View>

      {/* dismissTo: desapila hasta volver a las pestañas, en la de Inicio. */}
      <Link href="/" dismissTo asChild>
        <Boton icono="home" titulo="Volver al inicio" secundario />
      </Link>
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  contenido: { padding: 16, gap: 16, alignItems: 'stretch' },
  etiqueta: { textAlign: 'center', color: COLORES.suave, fontWeight: '700', letterSpacing: 2, marginTop: 12 },
  circulo: {
    alignSelf: 'center',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: COLORES.principal,
    borderWidth: 6,
    borderColor: COLORES.acento,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numero: { fontSize: 80, fontWeight: '900', color: COLORES.crema },
  mensaje: { fontSize: 18, fontWeight: '800', color: COLORES.principal, textAlign: 'center' },
  detalle: { fontSize: 16, color: COLORES.acento, fontWeight: '700' },
});
