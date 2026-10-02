import { Link } from 'expo-router';
import { ScrollView, Text } from 'react-native';

import { DondeEstoy } from '@/components/DondeEstoy';
import { Tarjeta } from '@/components/Tarjeta';
import { comunes } from '@/constants/tema';
import { ARTICULOS } from '@/data/ayuda';

// URL: /ayuda   (pantalla propia del índice; tiene prioridad sobre el catch-all)
export default function IndiceAyuda() {
  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <Text style={comunes.titulo}>¿En qué te ayudamos?</Text>
      {Object.entries(ARTICULOS).map(([ruta, articulo]) => (
        <Link
          key={ruta}
          href={{ pathname: '/ayuda/[...slug]', params: { slug: ruta.split('/') } }}
          asChild>
          <Tarjeta icono="document-text" titulo={articulo.titulo} subtitulo={`/ayuda/${ruta}`} />
        </Link>
      ))}
      <DondeEstoy />
    </ScrollView>
  );
}
