import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput } from 'react-native';

import { Boton } from '@/components/Boton';
import { DondeEstoy } from '@/components/DondeEstoy';
import { COLORES, comunes } from '@/constants/tema';
import { useComedor } from '@/context/ComedorContext';

// URL: /carrito/nota   (dentro de la tab Carrito, se abre como hoja inferior)
export default function Nota() {
  const { nota, setNota } = useComedor();
  const [texto, setTexto] = useState(nota);

  function guardar() {
    setNota(texto.trim());
    router.back(); // navegamos DESPUÉS de una lógica (guardar) -> router
  }

  return (
    <ScrollView style={comunes.pantalla} contentContainerStyle={comunes.contenido}>
      <Text style={comunes.texto}>Aclaración para la cocina:</Text>
      <TextInput
        value={texto}
        onChangeText={setTexto}
        placeholder="Ej.: sin sal"
        placeholderTextColor={COLORES.principalSuave}
        style={{ ...comunes.input, minHeight: 90, textAlignVertical: 'top' }}
        multiline
      />
      <Boton icono="save-outline" titulo="Guardar nota" onPress={guardar} />
      <DondeEstoy />
    </ScrollView>
  );
}
