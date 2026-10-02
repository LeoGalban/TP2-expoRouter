import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { Logo } from '@/components/Logo';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

// URL: /login   (modal, solo existe SIN sesión: ver Stack.Protected en app/_layout.tsx)
export default function Login() {
  const { iniciarSesion } = useComedor();
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [error, setError] = useState('');

  function ingresar() {
    const ok = iniciarSesion(usuario, clave);
    if (!ok) {
      setError('Usuario o clave incorrectos.');
    }
    // Si salió bien NO navegamos: el guard !conSesion pasa a false,
    // la pantalla login deja de existir y el modal se cierra solo.
  }

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <View style={estilos.cabecera}>
        <Logo ancho={110} />
        <Text style={comunes.titulo}>Ingreso del personal</Text>
        <Text style={comunes.suave}>Usuario: cocina · Clave: 1234</Text>
      </View>
      <TextInput
        value={usuario}
        onChangeText={setUsuario}
        placeholder="Usuario"
        placeholderTextColor={COLORES.principalSuave}
        autoCapitalize="none"
        style={comunes.input}
      />
      <TextInput
        value={clave}
        onChangeText={setClave}
        placeholder="Clave"
        placeholderTextColor={COLORES.principalSuave}
        secureTextEntry
        style={comunes.input}
      />
      {error ? <Text style={estilos.error}>{error}</Text> : null}
      <Boton icono="log-in-outline" titulo="Ingresar" onPress={ingresar} />
      <DondeEstoy />
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  cabecera: { alignItems: 'center', gap: 8, marginVertical: 12 },
  error: { color: COLORES.error, fontWeight: '700', textAlign: 'center' },
});
