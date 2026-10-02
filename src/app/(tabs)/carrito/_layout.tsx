import { Stack } from 'expo-router';

import { COLORES, opcionesHeader } from '@/constants/tema';

// STACK PROPIO de la tab Carrito.
export default function LayoutCarrito() {
  return (
    <Stack
      screenOptions={{
        ...opcionesHeader,
        headerBackButtonDisplayMode: 'minimal',
        contentStyle: { backgroundColor: COLORES.fondo },
      }}>
      <Stack.Screen name="index" options={{ title: 'Carrito' }} />
      {/* Desafío opcional: la nota se abre como hoja inferior (formSheet). */}
      <Stack.Screen
        name="nota"
        options={{
          title: 'Nota para la cocina',
          presentation: 'formSheet',
          sheetAllowedDetents: [0.5, 0.9],
          sheetGrabberVisible: true,
        }}
      />
    </Stack>
  );
}
