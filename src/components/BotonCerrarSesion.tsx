import Ionicons from '@expo/vector-icons/Ionicons';
import { Pressable, Text } from 'react-native';

import { COLORES } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

// Al cerrar sesión, el guard de Stack.Protected pasa a false y toda la sección
// "cocina" desaparece del historial sola. No hace falta llamar a router.back().
export function BotonCerrarSesion() {
  const { cerrarSesion } = useComedor();
  return (
    <Pressable
      onPress={cerrarSesion}
      style={{ flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 16 }}>
      <Ionicons name="log-out-outline" size={20} color={COLORES.crema} />
      <Text style={{ color: COLORES.crema, fontWeight: '700' }}>Salir</Text>
    </Pressable>
  );
}
