import { Link } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { FotoConDegradado } from '@/components/FotoRemota';
import { ItemPlato } from '@/components/ItemPlato';
import { COLORES, comunes } from '@/constants/tema';
import { CATEGORIAS, NOMBRES_CATEGORIA, PLATOS, PORTADAS_CATEGORIA } from '@/data/platos';

// URL: /menu   (tab "Menú")
export default function Menu() {
  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      {CATEGORIAS.map((categoria) => (
        <View key={categoria} style={{ gap: 10, marginBottom: 8 }}>
          {/* Portada de la categoría con foto */}
          <FotoConDegradado foto={PORTADAS_CATEGORIA[categoria]} alto={110} redondeo={20}>
            <View style={estilos.filaPortada}>
              <Text style={estilos.categoria}>{NOMBRES_CATEGORIA[categoria]}</Text>
              {/* Abre /categorias/[categoria] en el Stack raíz. */}
              <Link href={{ pathname: '/categorias/[categoria]', params: { categoria } }} style={estilos.verTodo}>
                Ver todo ›
              </Link>
            </View>
          </FotoConDegradado>
          {PLATOS.filter((p) => p.categoria === categoria).map((plato) => (
            <ItemPlato key={plato.id} plato={plato} />
          ))}
        </View>
      ))}
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  filaPortada: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  categoria: { fontSize: 26, fontWeight: '900', color: '#FFFFFF' },
  verTodo: {
    color: '#FFFFFF',
    fontWeight: '800',
    backgroundColor: COLORES.acento,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
