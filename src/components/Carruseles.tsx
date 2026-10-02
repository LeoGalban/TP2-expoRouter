import { Link } from 'expo-router';
import { Pressable, StyleSheet, Text, View, type PressableProps } from 'react-native';

import { COLORES } from '@/constants/tema';
import {
  formatearPrecio,
  NOMBRES_CATEGORIA,
  PLATOS,
  PORTADAS_CATEGORIA,
  type Categoria,
  type Plato,
} from '@/data/platos';

import { FotoConDegradado, FotoRemota } from './FotoRemota';

// Tarjeta de categoría con foto (para el carrusel horizontal de Inicio).
export function TarjetaCategoria({ categoria }: { categoria: Categoria }) {
  const cantidad = PLATOS.filter((p) => p.categoria === categoria).length;
  return (
    <Link href={{ pathname: '/categorias/[categoria]', params: { categoria } }} asChild>
      <Pressable style={estilos.categoria}>
        <FotoConDegradado foto={PORTADAS_CATEGORIA[categoria]} alto={170} redondeo={20}>
          <Text style={estilos.nombreCategoria}>{NOMBRES_CATEGORIA[categoria]}</Text>
          <Text style={estilos.cantidad}>{cantidad} opciones</Text>
        </FotoConDegradado>
      </Pressable>
    </Link>
  );
}

// Tarjeta vertical de plato (para el carrusel "Destacados").
export function TarjetaPlato({ plato }: { plato: Plato }) {
  return (
    <Link href={{ pathname: '/menu/[id]', params: { id: String(plato.id) } }} asChild>
      <CuerpoTarjetaPlato plato={plato} />
    </Link>
  );
}

function CuerpoTarjetaPlato({ plato, ...props }: PressableProps & { plato: Plato }) {
  return (
    <Pressable {...props} style={estilos.plato}>
      <FotoRemota foto={plato.foto} style={estilos.fotoPlato} />
      <View style={estilos.cuerpoPlato}>
        <Text style={estilos.nombrePlato} numberOfLines={1}>{plato.nombre}</Text>
        <View style={estilos.filaPrecio}>
          <Text style={estilos.precio}>{formatearPrecio(plato.precio)}</Text>
          <View style={estilos.mas}>
            <Text style={estilos.textoMas}>+</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const estilos = StyleSheet.create({
  categoria: { width: 150 },
  nombreCategoria: { color: '#FFFFFF', fontSize: 19, fontWeight: '900' },
  cantidad: { color: COLORES.crema, fontSize: 13, fontWeight: '600' },
  plato: {
    width: 200,
    backgroundColor: COLORES.tarjeta,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORES.borde,
  },
  fotoPlato: { width: '100%', height: 130 },
  cuerpoPlato: { padding: 12, gap: 6 },
  nombrePlato: { fontSize: 16, fontWeight: '800', color: COLORES.texto },
  filaPrecio: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  precio: { fontSize: 16, fontWeight: '800', color: COLORES.acento },
  mas: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORES.principal,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoMas: { color: COLORES.crema, fontSize: 20, fontWeight: '800', lineHeight: 22 },
});
