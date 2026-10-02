import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router/js-tabs';

import { COLORES, opcionesHeader } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

// LAYOUT DE PESTAÑAS: Inicio, Menú y Carrito.
// En SDK 57 las Tabs se importan desde 'expo-router/js-tabs'.
export default function LayoutTabs() {
  const { carrito } = useComedor();

  return (
    <Tabs
      screenOptions={{
        ...opcionesHeader,
        // Barra de pestañas con el color principal.
        tabBarStyle: { backgroundColor: COLORES.principal, borderTopColor: COLORES.principalOscuro },
        tabBarActiveTintColor: COLORES.crema,
        tabBarInactiveTintColor: COLORES.principalSuave,
        tabBarLabelStyle: { fontWeight: '700' },
        sceneStyle: { backgroundColor: COLORES.fondo },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          headerShown: false, // la portada con foto ocupa la parte de arriba
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menú',
          headerShown: false, // el Stack de adentro ya tiene header
          tabBarIcon: ({ color, size }) => <Ionicons name="restaurant" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="carrito"
        options={{
          title: 'Carrito',
          headerShown: false,
          // Badge con la cantidad de ítems (undefined = sin badge), color acento.
          tabBarBadge: carrito.length > 0 ? carrito.length : undefined,
          tabBarBadgeStyle: { backgroundColor: COLORES.acento, color: '#FFFFFF' },
          tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
