import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { COLORES, opcionesHeader } from '@/constants/tema';
import { ComedorProvider, useComedor } from '@/context/ComedorContext';

// anchor: si alguien entra directo con un deep link (ej. /categorias/bebidas),
// las pestañas (tabs) quedan DEBAJO en la pila, así "atrás" tiene a dónde volver.
export const unstable_settings = {
  anchor: '(tabs)',
};

// LAYOUT RAÍZ: Stack principal de la app.
export default function LayoutRaiz() {
  return (
    // GestureHandlerRootView: necesario para los gestos del Drawer (menú lateral).
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* El provider va acá para que TODAS las pantallas accedan al estado global. */}
      <ComedorProvider>
        <NavegacionRaiz />
      </ComedorProvider>
    </GestureHandlerRootView>
  );
}

// Está separado porque useComedor() solo funciona DENTRO del ComedorProvider.
function NavegacionRaiz() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;

  return (
    <Stack
      screenOptions={{
        ...opcionesHeader, // header azul con texto crema (colores del logo)
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: COLORES.fondo },
      }}>
      {/* Las tabs tienen su propio header, por eso ocultamos el del Stack. */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="categorias/[categoria]" options={{ title: 'Categoría' }} />
      <Stack.Screen name="buscar" options={{ title: 'Buscar' }} />
      <Stack.Screen name="confirmar" options={{ title: 'Confirmar pedido', presentation: 'modal' }} />
      <Stack.Screen name="turno/[numero]" options={{ title: 'Tu turno' }} />
      <Stack.Screen name="ayuda/index" options={{ title: 'Ayuda' }} />
      <Stack.Screen name="ayuda/[...slug]" options={{ title: 'Artículo de ayuda' }} />

      {/* La cocina SOLO existe con sesión iniciada. */}
      <Stack.Protected guard={conSesion}>
        <Stack.Screen name="cocina" options={{ headerShown: false }} />
      </Stack.Protected>

      {/* El login SOLO existe sin sesión: al iniciar sesión desaparece y el modal se cierra solo. */}
      <Stack.Protected guard={!conSesion}>
        <Stack.Screen name="login" options={{ title: 'Ingreso cocina', presentation: 'modal' }} />
      </Stack.Protected>
    </Stack>
  );
}
