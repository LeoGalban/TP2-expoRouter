import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { ItemPlato } from '@/components/ItemPlato';
import { COLORES, comunes } from '@/constants/tema';
import { CATEGORIAS, esCategoria, NOMBRES_CATEGORIA, PLATOS } from '@/data/platos';

// URL: /buscar?q=mate&categoria=bebidas   (Stack raíz)
// La búsqueda VIVE EN LA URL: se puede compartir con un link.
// No hacen falta corchetes en el nombre del archivo para recibir ?q= y ?categoria=.
export default function Buscar() {
  const { q = '', categoria } = useLocalSearchParams<{ q?: string; categoria?: string }>();

  const resultados = PLATOS.filter(
    (p) =>
      p.nombre.toLowerCase().includes(q.toLowerCase()) &&
      (!esCategoria(categoria) || p.categoria === categoria),
  );

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <View style={estilos.buscador}>
        <Ionicons name="search" size={20} color={COLORES.principalSuave} />
        {/* setParams cambia los params de ESTA pantalla, sin apilar una nueva. */}
        <TextInput
          defaultValue={q}
          onChangeText={(texto) => router.setParams({ q: texto })}
          placeholder="Buscar plato…"
          placeholderTextColor={COLORES.principalSuave}
          style={estilos.input}
        />
      </View>

      <View style={estilos.chips}>
        <Chip texto="Todas" activo={!categoria} onPress={() => router.setParams({ categoria: undefined })} />
        {CATEGORIAS.map((c) => (
          <Chip
            key={c}
            texto={NOMBRES_CATEGORIA[c]}
            activo={categoria === c}
            onPress={() => router.setParams({ categoria: c })}
          />
        ))}
      </View>

      <Text style={comunes.suave}>{resultados.length} resultado(s)</Text>
      {resultados.map((plato) => (
        <ItemPlato key={plato.id} plato={plato} />
      ))}

      <DondeEstoy />
    </ScrollView>
  );
}

function Chip({ texto, activo, onPress }: { texto: string; activo: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={activo ? estilos.chipActivo : estilos.chip}>
      <Text style={activo ? estilos.textoChipActivo : estilos.textoChip}>{texto}</Text>
    </Pressable>
  );
}

const chipBase = { paddingVertical: 7, paddingHorizontal: 14, borderRadius: 999, borderWidth: 1 };

const estilos = StyleSheet.create({
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: COLORES.tarjeta,
    borderColor: COLORES.borde,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  input: { flex: 1, paddingVertical: 12, fontSize: 16, color: COLORES.texto },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { ...chipBase, borderColor: COLORES.principal, backgroundColor: COLORES.tarjeta },
  chipActivo: { ...chipBase, borderColor: COLORES.acento, backgroundColor: COLORES.acento },
  textoChip: { color: COLORES.principal, fontWeight: '600' },
  textoChipActivo: { color: '#FFFFFF', fontWeight: '700' },
});
