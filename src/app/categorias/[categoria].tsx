import Ionicons from '@expo/vector-icons/Ionicons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { FotoConDegradado } from '@/components/FotoRemota';
import { ItemPlato } from '@/components/ItemPlato';
import { COLORES, comunes } from '@/constants/tema';
import { esCategoria, NOMBRES_CATEGORIA, PLATOS, PORTADAS_CATEGORIA } from '@/data/platos';

// URL: /categorias/[categoria]   ej: /categorias/bebidas   (Stack raíz: tapa las pestañas)
export default function PlatosDeCategoria() {
  const { categoria } = useLocalSearchParams<{ categoria: string }>();

  // Validación: solo desayuno, almuerzo, bebidas o kiosco.
  if (!esCategoria(categoria)) {
    return (
      <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
        <Stack.Screen options={{ title: 'No encontrada' }} />
        <View style={comunes.caja}>
          <Ionicons name="alert-circle" size={40} color={COLORES.error} />
          <Text style={comunes.titulo}>No existe la categoría “{categoria}”</Text>
          <Text style={comunes.suave}>Las categorías son: desayuno, almuerzo, bebidas y kiosco.</Text>
          <Link href="/menu" style={comunes.link}>Ver el menú completo</Link>
        </View>
        <DondeEstoy />
      </ScrollView>
    );
  }

  const platos = PLATOS.filter((p) => p.categoria === categoria);

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <Stack.Screen options={{ title: NOMBRES_CATEGORIA[categoria] }} />
      <FotoConDegradado foto={PORTADAS_CATEGORIA[categoria]} alto={200} redondeo={24}>
        <Text style={estilos.titulo}>{NOMBRES_CATEGORIA[categoria]}</Text>
        <Text style={estilos.sub}>{platos.length} platos para elegir</Text>
      </FotoConDegradado>
      {platos.map((plato) => (
        <ItemPlato key={plato.id} plato={plato} />
      ))}
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  titulo: { color: '#FFFFFF', fontSize: 30, fontWeight: '900' },
  sub: { color: COLORES.crema, fontSize: 15, fontWeight: '600' },
});
