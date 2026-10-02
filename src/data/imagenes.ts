// Hay dos tipos de fotos:
// 1. De INTERNET (Wikimedia Commons, uso libre): se descargan cuando se muestran.
//    Se guarda la "ruta" del archivo en Wikimedia y con ella armamos la URL
//    del tamaño que necesitamos: 500px para listas y 960px para fotos grandes.
// 2. LOCALES: archivos dentro de assets/images, que van incluidos en la app.

export type Foto =
  | { ruta: string; autor: string; licencia: string } // ej: '9/9e/Chipa_Paraguay.jpg'
  | {
      local: number; // lo que devuelve require()
      nombre: string;
      autor: string;
      licencia: string;
      entera?: boolean; // true = mostrarla completa sobre fondo blanco (fotos de producto)
    };

// Nombre legible de la foto (para la pantalla de créditos).
export function nombreFoto(foto: Foto): string {
  if ('local' in foto) return foto.nombre;
  return decodeURIComponent(foto.ruta.split('/').pop()!).replace(/_/g, ' ');
}

const BASE = 'https://thumb.wikimedia.org/wikipedia/commons/thumb';

// Wikimedia rechaza (error 403) las descargas que no dicen quién las pide.
// En Android la app se identifica como "okhttp" y queda bloqueada,
// por eso mandamos un User-Agent propio en cada imagen.
const ENCABEZADOS = { 'User-Agent': 'ComedorIPF/1.0 (proyecto educativo)' };

export function fuenteFoto(foto: Foto, ancho: 500 | 960 = 500) {
  if ('local' in foto) return foto.local; // foto incluida en la app: no se descarga
  const archivo = foto.ruta.split('/').pop();
  return { uri: `${BASE}/${foto.ruta}/${ancho}px-${archivo}`, headers: ENCABEZADOS };
}

export const FOTOS = {
  cafeConLeche: { ruta: '8/80/Caf%C3%A9_con_leche_-_Perch_on_the_Pier_2026-05-07.jpg', autor: 'Andy Li', licencia: 'CC0' },
  medialunas: { ruta: '9/95/Medialunas_argentinas.jpg', autor: 'David', licencia: 'CC BY 2.0' },
  chipa: { ruta: '9/9e/Chipa_Paraguay.jpg', autor: 'Ekem', licencia: 'CC BY-SA 3.0' },
  tostado: { ruta: 'f/fd/Carlito_%28sandwich_argentino%29.jpg', autor: 'Horacio Cambeiro', licencia: 'CC BY-SA 4.0' },
  milanesa: { ruta: '5/58/Milanesa_con_pur%C3%A9_de_papas.jpg', autor: 'Horacio Cambeiro', licencia: 'CC BY-SA 4.0' },
  guiso: { ruta: '0/0a/Guiso_casero_de_arroz_y_porotos_negros.jpg', autor: 'Horacio Cambeiro', licencia: 'CC BY-SA 3.0' },
  sopaParaguaya: { ruta: 'c/c2/Sopa_paraguaya_%28porci%C3%B3n_de_bandeja%29.jpg', autor: 'Tubby3', licencia: 'CC BY-SA 4.0' },
  empanadas: { ruta: 'd/d9/Empanadas_argentinas_de_carne_cortadas_a_cuchillo_y_al_horno.jpg', autor: 'Horacio Cambeiro', licencia: 'CC BY-SA 4.0' },
  // Fotos de producto elegidas por el alumno, guardadas en el proyecto.
  agua: { local: require('@/assets/images/agua-mineral.jpg'), nombre: 'agua-mineral.jpg', autor: 'Elegida por el alumno', licencia: 'Uso educativo', entera: true },
  gaseosa: { local: require('@/assets/images/gaseosa.jpg'), nombre: 'gaseosa.jpg', autor: 'Elegida por el alumno', licencia: 'Uso educativo', entera: true },
  jugo: { ruta: '8/8c/Glass_of_Fresh_Orange_Juice.jpg', autor: 'Rebeloasisx', licencia: 'CC BY-SA 4.0' },
  // Foto elegida por el alumno, guardada en el proyecto (assets/images/terere.png).
  terere: { local: require('@/assets/images/terere.png'), nombre: 'terere.png', autor: 'Elegida por el alumno', licencia: 'Uso educativo' },
  alfajor: { ruta: '5/50/Alfajor_H.jpg', autor: 'Silvio Tanaka', licencia: 'CC BY 2.0' },
  barraCereal: { local: require('@/assets/images/barra-cereal.jpg'), nombre: 'barra-cereal.jpg', autor: 'Elegida por el alumno', licencia: 'Uso educativo' },
  papasFritas: { local: require('@/assets/images/papas-fritas.jpg'), nombre: 'papas-fritas.jpg', autor: 'Elegida por el alumno', licencia: 'Uso educativo', entera: true },
  // Portadas de categorías
  cafeYMedialunas: { ruta: '3/3a/Caf%C3%A9_y_medialunas_en_Buenos_Aires.jpg', autor: 'Ivanmartinez', licencia: 'CC BY-SA 3.0' },
  milanesaNapolitana: { ruta: '4/44/Milanesa_napolitana_con_pur%C3%A9_de_papas.jpg', autor: 'Horacio Cambeiro', licencia: 'CC BY 3.0' },
  terereJarra: { ruta: '9/9c/Terer%C3%A9.jpg', autor: 'Overkill53', licencia: 'CC BY-SA 4.0' },
} satisfies Record<string, Foto>;
