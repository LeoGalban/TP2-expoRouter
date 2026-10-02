import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { ScrollView, Text, View } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { comunes } from '@/constants/tema';
import { ARTICULOS } from '@/data/ayuda';

// URL: /ayuda/...   ej: /ayuda/pagos/efectivo   (catch-all: captura uno o más segmentos)
// En /ayuda/pagos/efectivo, slug = ['pagos', 'efectivo'].
export default function ArticuloAyuda() {
  const { slug } = useLocalSearchParams<{ slug: string[] }>();
  const ruta = slug.join('/'); // 'pagos/efectivo'
  const articulo = ARTICULOS[ruta];

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <Stack.Screen options={{ title: articulo ? articulo.titulo : 'No encontrado' }} />
      <Text style={comunes.suave}>Ayuda › {slug.join(' › ')}</Text>
      <View style={comunes.caja}>
        {articulo ? (
          <>
            <Text style={comunes.subtitulo}>{articulo.titulo}</Text>
            <Text style={comunes.texto}>{articulo.texto}</Text>
          </>
        ) : (
          <Text style={comunes.texto}>No hay un artículo de ayuda para “{ruta}”.</Text>
        )}
      </View>
      <Link href="/ayuda" style={comunes.link}>‹ Volver al índice de ayuda</Link>
      <DondeEstoy />
    </ScrollView>
  );
}
