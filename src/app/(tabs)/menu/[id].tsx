import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { FotoConDegradado } from '@/components/FotoRemota';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { buscarPlato, formatearPrecio, NOMBRES_CATEGORIA } from '@/data/platos';

// URL: /menu/[id]   ej: /menu/7   (dentro de la tab Menú: la barra de pestañas sigue visible)
export default function DetallePlato() {
  // El id llega como TEXTO ("7"). buscarPlato() lo convierte con Number() y lo valida.
  const { id } = useLocalSearchParams<{ id: string }>();
  const plato = buscarPlato(id);
  const { agregarAlCarrito } = useComedor();
  const [agregados, setAgregados] = useState(0);

  // Validación: la ruta coincide aunque el plato no exista (ej. /menu/999 o /menu/mate).
  if (!plato) {
    return (
      <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
        <Stack.Screen options={{ title: 'No encontrado' }} />
        <View style={comunes.caja}>
          <Ionicons name="alert-circle" size={40} color={COLORES.error} />
          <Text style={comunes.titulo}>No existe el plato “{id}”</Text>
          <Link href="/menu" style={comunes.link}>Volver al menú</Link>
        </View>
        <DondeEstoy />
      </ScrollView>
    );
  }

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* Cambia el título del header desde la propia pantalla. */}
      <Stack.Screen options={{ title: plato.nombre }} />

      {/* Foto grande de internet con el nombre encima */}
      <FotoConDegradado foto={plato.foto} alto={320}>
        <Text style={estilos.chip}>{NOMBRES_CATEGORIA[plato.categoria]}</Text>
        <Text style={estilos.nombre}>{plato.nombre}</Text>
      </FotoConDegradado>

      {/* Tarjeta que se monta sobre la foto */}
      <View style={estilos.panel}>
        <View style={estilos.filaPrecio}>
          <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
          <View style={estilos.disponible}>
            <Ionicons name="storefront-outline" size={16} color={COLORES.acento} />
            <Text style={estilos.textoDisponible}>Retiro en mostrador</Text>
          </View>
        </View>
        <Text style={comunes.texto}>{plato.descripcion}</Text>

        <Boton
          icono="add-circle"
          titulo={agregados > 0 ? `Agregar otro (${agregados} en el carrito)` : 'Agregar al carrito'}
          onPress={() => {
            agregarAlCarrito(plato);
            setAgregados((n) => n + 1);
          }}
        />
        <Link href="/carrito" asChild>
          <Boton icono="cart" titulo="Ir al carrito" secundario />
        </Link>
      </View>

      <View style={{ paddingHorizontal: 16 }}>
        <DondeEstoy />
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 13,
    backgroundColor: COLORES.acento,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  nombre: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginBottom: 20 },
  panel: {
    marginTop: -24,
    marginHorizontal: 12,
    backgroundColor: COLORES.tarjeta,
    borderRadius: 24,
    padding: 20,
    gap: 14,
    shadowColor: COLORES.principalOscuro,
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  filaPrecio: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  precio: { fontSize: 30, fontWeight: '900', color: COLORES.principal },
  disponible: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: COLORES.acentoClaro,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textoDisponible: { color: COLORES.acento, fontWeight: '700', fontSize: 13 },
});
