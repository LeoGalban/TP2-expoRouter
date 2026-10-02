import { Image, View } from 'react-native';

import { COLORES } from '@/constants/tema';

// Logo del IPF dentro de un marco blanco (la imagen tiene fondo blanco).
export function Logo({ ancho = 110 }: { ancho?: number }) {
  return (
    <View
      style={{
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 10,
        borderWidth: 1,
        borderColor: COLORES.borde,
      }}>
      {/* La imagen original mide 390 x 360: mantenemos la proporción. */}
      <Image
        source={require('@/assets/images/logo-ipf.jpg')}
        style={{ width: ancho, height: (ancho * 360) / 390 }}
      />
    </View>
  );
}
