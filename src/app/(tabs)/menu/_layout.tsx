import { Stack } from 'expo-router';

import { COLORES, opcionesHeader } from '@/constants/tema';

// Si se abre /menu/7 con un deep link, la lista del menú queda debajo.
export const unstable_settings = {
  anchor: 'index',
};

// STACK PROPIO de la tab Menú: lista -> detalle, sin tapar la barra de pestañas.
export default function LayoutMenu() {
  return (
    <Stack
      screenOptions={{
        ...opcionesHeader,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: COLORES.fondo },
      }}>
      <Stack.Screen name="index" options={{ title: 'Menú' }} />
      <Stack.Screen name="[id]" options={{ title: 'Plato' }} />
    </Stack>
  );
}
