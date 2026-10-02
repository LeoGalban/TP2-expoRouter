import { Drawer } from 'expo-router/drawer';

import { BotonCerrarSesion } from '@/components/BotonCerrarSesion';
import { COLORES, opcionesHeader } from '@/constants/tema';

// DRAWER (menú lateral) de la cocina. Solo existe con sesión (ver Stack.Protected en app/_layout.tsx).
export default function LayoutCocina() {
  return (
    <Drawer
      screenOptions={{
        ...opcionesHeader,
        headerRight: () => <BotonCerrarSesion />,
        drawerStyle: { backgroundColor: COLORES.principal },
        drawerActiveBackgroundColor: COLORES.acento,
        drawerActiveTintColor: '#FFFFFF',
        drawerInactiveTintColor: COLORES.crema,
      }}>
      <Drawer.Screen name="index" options={{ title: 'Cocina' }} />
      <Drawer.Screen name="atendidos" options={{ title: 'Atendidos' }} />
    </Drawer>
  );
}
