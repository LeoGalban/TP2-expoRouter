import { Link, Stack, usePathname } from 'expo-router';
import { ScrollView, StyleSheet, Text } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Logo } from '@/components/Logo';
import { COLORES, comunes } from '@/constants/tema';

// Pantalla 404: se muestra cuando ninguna ruta coincide con la URL.
export default function NoEncontrada() {
  const pathname = usePathname();

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <Stack.Screen options={{ title: 'Página no encontrada' }} />
      <Logo ancho={90} />
      <Text style={estilos.codigo}>404</Text>
      <Text style={estilos.mensaje}>No existe la ruta “{pathname}”.</Text>
      <Link href="/" asChild>
        <Boton icono="home" titulo="Ir al inicio" />
      </Link>
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  codigo: { fontSize: 72, fontWeight: '900', color: COLORES.principal, textAlign: 'center' },
  mensaje: { fontSize: 16, color: COLORES.texto, textAlign: 'center' },
});
