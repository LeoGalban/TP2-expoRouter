import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TarjetaCategoria, TarjetaPlato } from '@/components/Carruseles';
import { DondeEstoy } from '@/components/DondeEstoy';
import { FotoConDegradado } from '@/components/FotoRemota';
import { Tarjeta } from '@/components/Tarjeta';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';
import { FOTOS } from '@/data/imagenes';
import { CATEGORIAS, DESTACADOS } from '@/data/platos';

// URL: /   (tab "Inicio")
export default function Inicio() {
  const { usuario } = useComedor();
  const conSesion = usuario !== null;
  const margenArriba = useSafeAreaInsets().top; // espacio de la barra de estado del celular

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={{ paddingBottom: 24 }}>
      {/* PORTADA: foto de internet + degradado + logo + buscador */}
      <FotoConDegradado
        foto={FOTOS.empanadas}
        alto={330 + margenArriba}
        oscurecerArriba
        style={estilos.portada}>
        <View style={{ ...estilos.marca, marginTop: margenArriba }}>
          <View style={estilos.circuloLogo}>
            <Image source={require('@/assets/images/logo-ipf.jpg')} style={estilos.logo} />
          </View>
          <View>
            <Text style={estilos.marcaTitulo}>Comedor IPF</Text>
            <Text style={estilos.marcaSub}>Instituto Politécnico Formosa</Text>
          </View>
        </View>
        <Text style={estilos.titulo}>¿Qué comemos hoy?</Text>

        {/* El usuario toca algo -> usamos <Link>. */}
        <Link href="/buscar" asChild>
          <Pressable style={estilos.buscador}>
            <Ionicons name="search" size={20} color={COLORES.suave} />
            <Text style={estilos.textoBuscador}>Buscar un plato…</Text>
          </Pressable>
        </Link>
      </FotoConDegradado>

      <Seccion titulo="Categorías" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.carrusel}>
        {CATEGORIAS.map((c) => (
          <TarjetaCategoria key={c} categoria={c} />
        ))}
      </ScrollView>

      <Seccion titulo="Destacados de hoy" />
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={estilos.carrusel}>
        {DESTACADOS.map((p) => (
          <TarjetaPlato key={p.id} plato={p} />
        ))}
      </ScrollView>

      <Seccion titulo="Más opciones" />
      <View style={estilos.opciones}>
        <Link href="/menu" asChild>
          <Tarjeta icono="restaurant" titulo="Menú completo" subtitulo="Todos los platos por categoría" />
        </Link>
        <Link href="/ayuda" asChild>
          <Tarjeta icono="help-circle" titulo="Ayuda" subtitulo="Horarios, pagos y cómo pedir" />
        </Link>
        {/* /cocina solo existe con sesión: si no hay sesión mandamos al login.
            (Navegar a una ruta protegida con guard en false daría el aviso "NAVIGATE ... not handled"). */}
        {conSesion ? (
          <Link href="/cocina" asChild>
            <Tarjeta icono="flame" titulo="Cocina" subtitulo="Atender los pedidos en orden" />
          </Link>
        ) : (
          <Link href="/login" asChild>
            <Tarjeta icono="lock-closed" titulo="Cocina" subtitulo="Solo personal: iniciar sesión" />
          </Link>
        )}
        <DondeEstoy />
      </View>
    </ScrollView>
  );
}

function Seccion({ titulo }: { titulo: string }) {
  return <Text style={estilos.seccion}>{titulo}</Text>;
}

const estilos = StyleSheet.create({
  portada: { borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  marca: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 'auto' },
  circuloLogo: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 4 },
  logo: { width: 40, height: 37 },
  marcaTitulo: { color: '#FFFFFF', fontSize: 17, fontWeight: '900' },
  marcaSub: { color: COLORES.crema, fontSize: 12 },
  titulo: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', marginBottom: 14 },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  textoBuscador: { color: COLORES.suave, fontSize: 16 },
  seccion: {
    fontSize: 21,
    fontWeight: '900',
    color: COLORES.principal,
    marginTop: 26,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  carrusel: { paddingHorizontal: 16, gap: 12 },
  opciones: { paddingHorizontal: 16, gap: 10 },
});
