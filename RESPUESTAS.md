# TP N° 2 — Expo Router: respuestas de las Partes A a F

**Alumno/a:** ______________________ · **Fecha de entrega:** ____________

---

## Parte A · Estructuras de datos: la pila y la cola

### A1. Conceptos

**a)** **LIFO** (*Last In, First Out*) significa "el último en entrar es el primero en salir": corresponde a la **pila**.
**FIFO** (*First In, First Out*) significa "el primero en entrar es el primero en salir": corresponde a la **cola**.

**b)**
- **Pila:** entra y sale por el **mismo extremo**, el **tope**.
- **Cola:** entra por el **final** y sale por el **frente** (extremos opuestos).

**c)**

| | Vida real | Aplicación móvil |
|---|---|---|
| Pila | Una pila de platos: se saca el de arriba, que fue el último que se apoyó. | El historial de pantallas: "atrás" vuelve a la última pantalla abierta. También el Ctrl+Z / "Deshacer". |
| Cola | La fila del comedor o del banco: se atiende primero al que llegó primero. | Los mensajes de WhatsApp que esperan para enviarse sin conexión: salen en el orden en que se escribieron. |

### A2. Seguimiento de una pila

| Paso | Pila (base → tope) |
|---|---|
| `push('Inicio')` | [Inicio] |
| `push('Productos')` | [Inicio, Productos] |
| `push('Detalle 3')` | [Inicio, Productos, Detalle 3] |
| `pop()` | [Inicio, Productos] |
| `push('Perfil')` | [Inicio, Productos, Perfil] |

- (1) `p.tope()` → **`'Perfil'`**
- (2) `p.pop()` → **`'Perfil'`** (lo saca)
- (3) `p.tope()` → **`'Productos'`**
- (4) `p.vacia` → **`false`**

**Estado final (base → tope):** `[Inicio, Productos]`

### A3. Seguimiento de una cola

| Paso | Cola (frente → final) |
|---|---|
| `encolar('Ana')` | [Ana] |
| `encolar('Beto')` | [Ana, Beto] |
| `desencolar()` | [Beto] (sale Ana) |
| `encolar('Caro')` | [Beto, Caro] |
| `encolar('Dani')` | [Beto, Caro, Dani] |

- (1) `c.frente()` → **`'Beto'`**
- (2) `c.desencolar()` → **`'Beto'`** (lo saca)
- (3) `c.vacia` → **`false`**

**Estado final (frente → final):** `[Caro, Dani]`

### A4. Análisis de la implementación

**a)** El `#` declara un **campo privado** de la clase: solo se puede usar desde adentro de la clase. Desde afuera, `p.#items` da error. Así nadie puede modificar el array directamente (por ejemplo, meter un elemento en el medio de la cola y "colarse"), y solo se usan los métodos permitidos (`push`, `pop`, `encolar`…).

**b)** `shift()` saca el primer elemento y **corre todos los demás un lugar** hacia adelante. Con una cola de *n* elementos hace *n* movimientos (es O(n)), así que con colas muy grandes se vuelve lento. Las colas "serias" guardan un **índice del frente** que se va moviendo (sin correr nada, O(1)), o usan una **lista enlazada** o un **buffer circular**.

**c)** La pila saca con **`pop()`** (saca del final del array) y la cola con **`shift()`** (saca del principio). No pueden usar el mismo porque las dos agregan con `push()` al final: la pila tiene que sacar por el **mismo** extremo por el que entra (el último), y la cola por el extremo **opuesto** (el primero).

### A5. Programación: una cola eficiente

```js
class ColaEficiente {
  #items = [];
  #frente = 0; // índice del primer elemento de la fila

  encolar(x) {
    this.#items.push(x);
  }

  desencolar() {
    if (this.vacia) return undefined;
    const x = this.#items[this.#frente];
    this.#frente++; // avanzamos el frente: no movemos ningún elemento
    if (this.vacia) { // si se vació, reiniciamos para liberar memoria
      this.#items = [];
      this.#frente = 0;
    }
    return x;
  }

  frente() {
    return this.vacia ? undefined : this.#items[this.#frente];
  }

  get vacia() {
    return this.tamanio === 0;
  }

  get tamanio() {
    return this.#items.length - this.#frente;
  }
}
```

Desencolar ahora es O(1): solo suma 1 al índice. Es la misma clase que usa la app en `src/estructuras/Cola.ts`.

### A6. Pila y cola dentro de Expo Router

**a)** El historial de pantallas de un Stack es una **pila**. La pantalla visible es el **tope** (la última que se abrió) y "atrás" hace un **pop** (la saca y se ve la de abajo).

**b)** Las acciones de navegación se guardan en una **cola** (FIFO), la `routingQueue` de expo-router. Si el usuario toca dos links muy rápido, las dos acciones se encolan y se procesan **en el orden en que llegaron**: primero la del primer link y después la del segundo. Ninguna se pierde ni se adelanta.

---

## Parte B · Rutas basadas en archivos

### B1. Del archivo a la URL

| Archivo | URL que genera / función |
|---|---|
| `src/app/(tabs)/index.tsx` | `/` (la pestaña de inicio; el grupo `(tabs)` no aparece en la URL). |
| `src/app/acerca.tsx` | `/acerca` |
| `src/app/(tabs)/perfil.tsx` | `/perfil` |
| `src/app/(tabs)/productos/index.tsx` | `/productos` |
| `src/app/(tabs)/productos/[id].tsx` | `/productos/:id`, por ejemplo `/productos/3` (segmento dinámico). |
| `src/app/docs/[...slug].tsx` | `/docs/a`, `/docs/a/b/c`… (catch-all: uno o más segmentos). `/docs` sola **no** coincide. |
| `src/app/_layout.tsx` | **No es una pantalla.** Es el layout raíz: define el navegador (Stack, Tabs…) que envuelve a todas las rutas y es el lugar de los providers globales. |
| `src/app/+not-found.tsx` | **No tiene URL propia.** Es la pantalla 404: se muestra para cualquier URL que no coincida con ninguna ruta. |
| `src/app/Boton.tsx` | **Problema:** genera la ruta `/Boton`, porque todo archivo dentro de `src/app` es una ruta. Si no exporta un componente por defecto, Expo Router además avisa que le falta el `export default`. Hay que moverlo a `src/components`. |

### B2. De la URL al archivo

| URL | Archivo |
|---|---|
| `/categorias/bebidas` (y cualquier otra) | `src/app/categorias/[categoria].tsx` |
| `/buscar?q=mate&categoria=kiosco` | `src/app/buscar.tsx` (los `?q=` no necesitan corchetes) |
| `/ayuda/pagos/tarjeta` y `/ayuda/horarios` | `src/app/ayuda/[...slug].tsx` |
| `/ayuda` (con pantalla propia) | `src/app/ayuda/index.tsx` |

### B3. Verdadero o falso

- **a) F.** No hay que registrar nada: crear el archivo en `src/app` alcanza para que exista la pantalla.
- **b) F.** Los `_layout.tsx` no son pantallas: definen el navegador y envuelven a las rutas de su carpeta. No se pueden visitar.
- **c) V.**
- **d) F.** Conviene `npx expo install`, que instala la versión **compatible con el SDK** (y con Expo Go). `npm install` trae la última, que puede ser incompatible.
- **e) V.**
- **f) V.**
- **g) V.** La ruta más específica (`index`) tiene prioridad; además el catch-all necesita al menos un segmento.
- **h) V.** En SDK 57, `expo-router` va en la versión `~57.0.x`.

---

## Parte C · Navegar: `<Link>`, router y la pila

### C1. Métodos de router

| Método | Qué le hace a la pila |
|---|---|
| `router.push(href)` | Apila una pantalla nueva arriba. Siempre, aunque ya exista. |
| `router.navigate(href)` | Apila, salvo que el destino sea la pantalla visible: en ese caso no apila, solo le cambia los params. |
| `router.replace(href)` | Cambia el tope por la nueva pantalla. La pila no crece. |
| `router.back()` | Pop: saca el tope y se ve la pantalla de abajo. |
| `router.dismissTo(href)` | Desapila pantallas hasta llegar a esa ruta. |
| `router.dismissAll()` | Desapila todo hasta la primera pantalla de la pila. |
| `router.canGoBack()` | No cambia nada. Devuelve `true` si hay algo debajo para volver, `false` si no. |
| `router.setParams({...})` | No apila: cambia los params de la pantalla actual (la URL se actualiza). |

### C2. Simulación de la pila

Pila inicial: `[ /productos ]`

| # | Instrucción | Pila resultante (base → tope) |
|---|---|---|
| 1 | `router.push("/productos/1")` | [/productos, /productos/1] |
| 2 | `router.push("/productos/2")` | [/productos, /productos/1, /productos/2] |
| 3 | `router.navigate("/productos/5")` | [/productos, /productos/1, /productos/5] (el tope ya era `productos/[id]`: solo cambia el param) |
| 4 | `router.push("/perfil")` | [/productos, /productos/1, /productos/5, /perfil] |
| 5 | `router.replace("/buscar")` | [/productos, /productos/1, /productos/5, /buscar] |
| 6 | `router.back()` | [/productos, /productos/1, /productos/5] |
| 7 | `router.dismissTo("/productos")` | [/productos] |
| 8 | `router.canGoBack()` | Devuelve **`false`**: solo queda una pantalla. |

### C3. ¿Link o router?

- **a)** `<Link>` con `href={{ pathname: '/productos/[id]', params: { id } }}` y `asChild` sobre la tarjeta. Es un toque directo del usuario.
- **b)** `router.replace('/exito')`. Se navega después de una lógica (esperar la API), y con `replace` el formulario no queda en el historial (no se vuelve a él con "atrás" ni se reenvía).
- **c)** `router.back()` (o `<Link dismissTo>`). Cancelar solo tiene que sacar el modal de la pila.
- **d)** `router.replace('/')` después de validar el login (o mejor, `Stack.Protected`). Con `replace` el usuario no vuelve al login con "atrás".
- **e)** `router.dismissTo('/pedidos')` (o `<Link href="/pedidos" dismissTo>`). Saca de una vez las pantallas que hay arriba hasta la lista.

### C4. Escribí el código

```tsx
// a) href como objeto
<Link href={{ pathname: '/productos/[id]', params: { id: '8' } }}>Ver producto 8</Link>

// b) siempre apila
<Link href="/perfil" push>Ir al perfil</Link>

// c) Pressable propio como link con asChild
<Link href="/carrito" asChild>
  <Pressable>
    <Text>Ir al carrito</Text>
  </Pressable>
</Link>
```

### C5. Pensar

En la web, al ser un `<a href>` real, el usuario puede **abrir el link en otra pestaña**, **copiarlo y compartirlo**, ver a dónde lleva antes de tocarlo, y usar los botones atrás/adelante del navegador. Los buscadores (SEO) también pueden seguir esos links.
En el celular no hay barra de direcciones, así que el usuario no ve la URL: `<Link>` es un texto tocable que navega. Pero la URL sigue existiendo por dentro, y por eso funcionan los **deep links** (abrir la app en una pantalla desde un link, un QR o una notificación).

---

## Parte D · Navegadores: Stack, Tabs y Drawer

### D1. Comparación

| | Stack | Tabs | Drawer |
|---|---|---|---|
| ¿Apila pantallas? | Sí | No (cambia de sección) | No (cambia de sección) |
| ¿Cómo cambia de pantalla el usuario? | Tocando links/botones; vuelve con la flecha, el gesto o el botón atrás. | Tocando las pestañas de la barra inferior. | Abriendo el menú lateral (☰ o deslizando desde el borde) y eligiendo una opción. |
| ¿Desde dónde se importa en SDK 57? | `expo-router` | `expo-router/js-tabs` | `expo-router/drawer` |
| Caso de uso típico | Lista → detalle de un producto. | Secciones principales: Inicio, Buscar, Perfil. | Muchas secciones o un panel de administración (como Gmail). |

### D2. Cada tab tiene su pila

Ve el **detalle del producto 4**. Cambiar de pestaña no apila ni desapila nada: solo cambia qué pestaña se ve. La pestaña Productos tiene su propio Stack y su historial queda guardado tal como estaba. Instagram se comporta así: si estás viendo un perfil dentro de Buscar, vas a Inicio y volvés a Buscar, seguís en ese perfil.

### D3. ¿Dónde va cada pantalla?

Regla práctica: si debe **tapar** las tabs, va en el Stack raíz; si debe **mantenerlas**, va dentro de la tab.

- **a)** Dentro de la tab (en el Stack de Productos).
- **b)** Stack raíz.
- **c)** Stack raíz.
- **d)** Dentro de la tab Perfil (en su Stack).

### D4. Configurar el Stack

**a)** `screenOptions` se aplica a **todas** las pantallas del Stack. Las `options` de un `Stack.Screen` se aplican solo a **esa** pantalla y pisan a las generales.

**b)** Porque el navegador de tabs ya dibuja su propio header. Si no se oculta el del Stack, aparecerían **dos headers** uno arriba del otro.

**c)** **Sí existe**: Expo Router registra solo cualquier archivo de `src/app`. Declararla sirve para **darle opciones** (título, `presentation`, ocultar el header…) o para meterla dentro de un `Stack.Protected`.

**d)** `'card'` (la normal), `'modal'`, `'transparentModal'`, `'formSheet'` (también `'fullScreenModal'` y `'containedModal'`). Para una hoja inferior al 50%: `presentation: 'formSheet'` con `sheetAllowedDetents: [0.5]`.

**e)** Desde la pantalla de detalle:

```tsx
const { id } = useLocalSearchParams<{ id: string }>();
return (
  <>
    <Stack.Screen options={{ title: `Producto ${id}` }} />
    {/* ... */}
  </>
);
```

### D5. Tabs y Drawer en SDK 57

**a)** Importar `Tabs` desde `'expo-router'` quedó **deprecado**: ahora se importa desde `'expo-router/js-tabs'`. La alternativa experimental es `NativeTabs`, desde `'expo-router/unstable-native-tabs'`, que usa la barra de pestañas nativa del sistema.

**b)** `react-native-gesture-handler` y `react-native-reanimated`. En el layout raíz conviene envolver todo con `<GestureHandlerRootView style={{ flex: 1 }}>`.

**c)** **No.** En SDK 57 el Drawer ya viene incluido dentro de `expo-router` (React Navigation está empaquetado adentro). Se importa desde `expo-router/drawer`.

**d)** En el navegador **más cercano** a la pantalla actual que tenga algo para sacar. Si ese no tiene historial, la acción sube al navegador padre.

---

## Parte E · Rutas dinámicas, parámetros y hooks

### E1. Encontrá el error

Los params de la URL **siempre llegan como texto**. En `/productos/3`, `id` vale `"3"` (string), y el producto tiene `id: 3` (number). Con `===` se compara también el tipo, así que `3 === "3"` es `false` y el `find` nunca encuentra nada. Lo mismo pasa con `id === 3`.

Corrección: convertir a número una sola vez.

```tsx
export default function DetalleProducto() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const numero = Number(id); // "3" -> 3
  const producto = productos.find((p) => p.id === numero);
  if (numero === 3) console.log('Es el chipá');
  if (!producto) return <Text>No existe el producto {id}</Text>;
  return <Text>{producto.nombre}</Text>;
}
```

### E2. Catch-all

| URL | slug |
|---|---|
| `/docs/react` | `['react']` |
| `/docs/react/hooks/useState` | `['react', 'hooks', 'useState']` |
| `/docs` | No coincide con `[...slug]`, porque necesita **al menos un segmento**. Se muestra `+not-found` (o `docs/index.tsx` si existe). |

### E3. Anatomía de una URL

**a)** Scheme: `rutasipf://` · Ruta: `buscar` (`/buscar`) · Parámetros de búsqueda: `q=mate` y `categoria=bebidas`.

**b)** `{ q: 'mate', categoria: 'bebidas' }` (los dos como texto).

**c)** **No.** Los corchetes son solo para **segmentos de la ruta** (`/productos/3`). Los parámetros de búsqueda (`?clave=valor`) los acepta cualquier ruta.

**d)**
1. `router.push` apilaría **una pantalla nueva por cada letra**: para salir del buscador habría que tocar "atrás" muchas veces. `setParams` cambia los params de la misma pantalla sin apilar.
2. La pantalla no se vuelve a montar ni hace animación de entrada, así que el `TextInput` no pierde el foco ni lo escrito. Además, la URL queda siempre actualizada y la búsqueda se puede **compartir con un link**.

### E4. ¿Dónde estoy?

| Hook | En `/productos/3` | En `/buscar?q=chipa` |
|---|---|---|
| `usePathname()` | `"/productos/3"` | `"/buscar"` |
| `useSegments()` | `["(tabs)", "productos", "[id]"]` | `["buscar"]` |
| `useLocalSearchParams()` | `{ id: "3" }` | `{ q: "chipa" }` |

### E5. Local vs global

**a)** `useLocalSearchParams` devuelve los params de **la pantalla donde está el componente**, y solo se actualiza cuando cambian los de esa pantalla. `useGlobalSearchParams` devuelve los params de **la URL actual de toda la app** y se actualiza con cualquier cambio de URL, aunque la pantalla esté abajo en la pila y no se vea. La opción por defecto es **`useLocalSearchParams`**, porque evita renders innecesarios de pantallas que no están a la vista.

**b)** `useFocusEffect` ejecuta código **cada vez que la pantalla gana el foco** (cuando aparece o cuando se vuelve a ella con "atrás"), no solo la primera vez que se monta. Ejemplo: recargar la lista de pedidos cada vez que la cocina vuelve a esa pantalla.

```tsx
useFocusEffect(
  useCallback(() => {
    cargarPedidos();
  }, []),
);
```

**c)** **No es un error de Expo Router.** La URL `/productos/mate` coincide con el patrón `productos/[id]`, así que la ruta existe. Expo Router no sabe qué productos hay. **Validar el dato es responsabilidad del programador** (buscarlo y mostrar "no existe" si no está).

---

## Parte F · Redirecciones, rutas protegidas y deep links

### F1. Redirect

**a)** Apenas se dibuja, navega a `/productos` **reemplazando** la ruta actual (la pantalla que redirige no queda en el historial). Equivale a `router.replace('/productos')`.

**b)** Si apilara, la ruta que redirige quedaría debajo en la pila. Al tocar "atrás" el usuario volvería a ella, y esa ruta lo mandaría otra vez hacia adelante: un **bucle**. El usuario nunca podría volver.

### F2. Stack.Protected

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="privado" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" options={{ presentation: 'modal' }} />
</Stack.Protected>
```

**a)** La pantalla **deja de existir para el navegador**: no se puede navegar a ella, y si estaba abierta se saca del historial sola.

**b)** Al iniciar sesión, `conSesion` pasa a `true`, así que el guard del login (`!conSesion`) pasa a `false`. La pantalla login deja de existir y el Stack la saca de la pila: el modal se cierra solo.

**c)** Lo causa **navegar a una pantalla cuyo guard está en `false`**: para el navegador esa pantalla no existe, así que nadie maneja la acción. Se evita mostrando el link o botón **solo cuando corresponde** (por ejemplo, el link a `/privado` solo con sesión, y si no hay sesión, mandar a `/login`).

**d)** Las reglas de acceso quedan **en un solo lugar** (el layout) en vez de repetidas en cada pantalla. Además, cuando cambia la sesión las pantallas aparecen o desaparecen del historial solas, y no hay riesgo de olvidarse de proteger una pantalla ni de crear bucles de redirecciones.

### F3. 404, anchor y rutas tipadas

**a)** `+not-found.tsx`: es la pantalla **404**, se muestra cuando ninguna ruta coincide con la URL. Se define en `src/app/+not-found.tsx`.

**b)** `unstable_settings = { anchor: "(tabs)" }`: indica **qué pantalla queda debajo** en la pila cuando se entra directo a otra ruta (por ejemplo, con un deep link). Así "atrás" tiene a dónde volver. Se exporta desde el `_layout.tsx` del navegador, en este caso `src/app/_layout.tsx`.

**c)** `typedRoutes` hace que TypeScript conozca todas las rutas. `<Link href="/prodcutos" />` da un **error de TypeScript** en el editor (`"/prodcutos"` no es un `Href` válido), antes de ejecutar la app. Se activa en `app.json` (`"experiments": { "typedRoutes": true }`) y los tipos se generan en **`.expo/types/router.d.ts`** al correr `npx expo start`.

### F4. Deep links

| Dónde | URL |
|---|---|
| App instalada (build propia) | `comedoripf://menu/7` |
| Expo Go en desarrollo | `exp://192.168.1.20:8081/--/menu/7` |
| Web (`npx expo start --web`) | `http://localhost:8081/menu/7` |

La parte **`/--/`** separa la **dirección del servidor de desarrollo** (qué proyecto tiene que cargar Expo Go) de la **ruta dentro de la app** (`/menu/7`).

El scheme propio no funciona en Expo Go porque el scheme se **registra en el sistema operativo cuando se compila la app** (queda en su configuración nativa). Expo Go es otra app, ya compilada, que solo tiene registrado su propio scheme `exp://`. Para usar `comedoripf://` hace falta una build propia (de desarrollo o de producción).

### F5. Errores comunes

**a)** **Causa:** `Link asChild` le pasa sus props al hijo a través de un `Slot`, y el `Slot` no acepta un **array** de estilos (`[estilos.boton, activo && estilos.activo]`). **Solución:** envolver el hijo en un componente propio que arme su estilo adentro como un solo objeto (o usar `StyleSheet.flatten`).

**b)** **Causa:** todo archivo dentro de `src/app` es una ruta, así que se creó `/TarjetaProducto`. **Solución:** moverlo a `src/components/TarjetaProducto.tsx`.

**c)** **Causa:** `push` apila el inicio **encima** del login, así que el login queda abajo en la pila. **Solución:** usar `router.replace("/")` o, mejor, `Stack.Protected` con `guard={!conSesion}` en el login, para que desaparezca solo.

**d)** **Causa:** `npm install` trajo la última versión del paquete, que no coincide con la que soporta el SDK 57 / Expo Go. **Solución:** reinstalarlo con `npx expo install paquete` (o correr `npx expo install --fix`), que elige la versión compatible.
