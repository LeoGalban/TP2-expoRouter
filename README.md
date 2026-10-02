# Comedor IPF

App del comedor del Instituto Politécnico Formosa, hecha con **Expo Router (SDK 57)** y TypeScript.
Los alumnos piden comida desde el celular y la cocina atiende los pedidos **en orden de llegada**.

- Los pedidos esperan en una **Cola** (FIFO): se atiende primero al que llegó primero.
- El carrito usa una **Pila** (LIFO) para "Deshacer último".
- La cocina guarda los pedidos atendidos en otra **Pila**, y los muestra del último al primero.

Las respuestas de las Partes A a F están en [RESPUESTAS.md](RESPUESTAS.md).

## Cómo correrla

```bash
npm install
npx expo start
```

Escaneá el QR con **Expo Go** (versión para SDK 57). Celular y compu tienen que estar en la misma red Wi-Fi.

**Personal de cocina:** usuario `cocina`, clave `1234`.

## Árbol de carpetas de `src/app`

```
src/app/
├── _layout.tsx                → Stack RAÍZ (+ GestureHandlerRootView, ComedorProvider,
│                                 Stack.Protected y anchor: '(tabs)')
├── (tabs)/
│   ├── _layout.tsx            → Tabs (desde expo-router/js-tabs)
│   ├── index.tsx              → /                    Inicio
│   ├── menu/
│   │   ├── _layout.tsx        → Stack propio de la tab Menú (anchor: 'index')
│   │   ├── index.tsx          → /menu                Lista de platos por categoría
│   │   └── [id].tsx           → /menu/[id]           Detalle del plato
│   └── carrito/
│       ├── _layout.tsx        → Stack propio de la tab Carrito
│       ├── index.tsx          → /carrito             Carrito con "Deshacer último"
│       └── nota.tsx           → /carrito/nota        Nota para la cocina (formSheet)
├── categorias/
│   └── [categoria].tsx        → /categorias/[categoria]
├── buscar.tsx                 → /buscar?q=&categoria=
├── confirmar.tsx              → /confirmar           (modal)
├── turno/
│   └── [numero].tsx           → /turno/[numero]
├── login.tsx                  → /login               (modal, solo SIN sesión)
├── cocina/
│   ├── _layout.tsx            → Drawer (desde expo-router/drawer), solo CON sesión
│   ├── index.tsx              → /cocina              Frente de la cola
│   └── atendidos.tsx          → /cocina/atendidos    Historial (pila)
├── ayuda/
│   ├── index.tsx              → /ayuda               Índice de ayuda
│   └── [...slug].tsx          → /ayuda/...           Artículos (catch-all)
├── pedido.tsx                 → /pedido              <Redirect href="/carrito" />
└── +not-found.tsx             → cualquier otra URL   Pantalla 404
```

### El navegador de cada `_layout`

| Layout | Navegador | Qué contiene |
|---|---|---|
| `app/_layout.tsx` | **Stack** raíz | Las tabs, categorías, buscar, confirmar (modal), turno, ayuda, login y cocina (protegidas). |
| `app/(tabs)/_layout.tsx` | **Tabs** | Inicio, Menú y Carrito (con badge de cantidad). |
| `app/(tabs)/menu/_layout.tsx` | **Stack** | Lista y detalle de platos. El detalle no tapa la barra de pestañas. |
| `app/(tabs)/carrito/_layout.tsx` | **Stack** | Carrito y nota (como hoja inferior). |
| `app/cocina/_layout.tsx` | **Drawer** | Cocina y Atendidos, con botón "Salir" en el header. |

### Fuera de `src/app` (no son rutas)

```
src/
├── components/   Boton, Tarjeta, ItemPlato, Carruseles, FotoRemota, Encabezado, Logo,
│                 DondeEstoy, BotonCerrarSesion
├── constants/    tema.ts (colores del logo del IPF y estilos comunes)
├── context/      ComedorContext.tsx (sesión, carrito, cola y pilas)
├── data/         platos.ts (15 platos en 4 categorías), imagenes.ts (fotos), ayuda.ts
└── estructuras/  Pila.ts, Cola.ts (cola sin shift())
```

## Imágenes

Las fotos de los platos se **descargan de internet** desde Wikimedia Commons (fotos de uso libre)
y se muestran con `expo-image`, que las guarda en caché. Las URLs y los autores están en
`src/data/imagenes.ts`, y los créditos se ven en la app en `/ayuda/creditos`.

Wikimedia rechaza las descargas sin identificación (error 403), y en Android la app se identifica
como `okhttp`. Por eso cada imagen se pide con un encabezado `User-Agent` propio:

```ts
{ uri: 'https://thumb.wikimedia.org/.../500px-Chipa_Paraguay.jpg',
  headers: { 'User-Agent': 'ComedorIPF/1.0 (proyecto educativo)' } }
```

El logo del IPF es un archivo local (`assets/images/logo-ipf.jpg`).

## Colores

Todos están en `src/constants/tema.ts`:

| Nombre | Color | Dónde se usa |
|---|---|---|
| `principal` | `#13383E` | Headers, barra de pestañas, menú lateral, círculos de íconos |
| `acento` | `#05837E` | Botones, precios, chips activos, badge del carrito |
| `crema` | `#F4EEDC` | Textos sobre el color principal (tomado del logo del IPF) |

## `replace` vs `push` al confirmar el pedido

En `/confirmar`, después de encolar el pedido se navega con:

```ts
router.replace({ pathname: '/turno/[numero]', params: { numero: String(numero) } });
```

Usamos **`replace`** porque cambia la pantalla de confirmación por la del turno: `/confirmar`
**sale de la pila**. Así, al tocar "atrás" desde el turno, el alumno vuelve al carrito y no a la
confirmación.

Si usáramos **`push`**, `/confirmar` quedaría debajo del turno. Al tocar "atrás" el alumno vería
otra vez la pantalla de confirmar, y podría tocar "Confirmar" de nuevo y generar un pedido
duplicado (o ver un resumen de un carrito que ya se vació).

Usamos `router` (y no `<Link>`) porque la navegación ocurre **después de una lógica**: primero hay
que encolar el pedido para saber qué número de turno le tocó.

## Rutas protegidas

En `src/app/_layout.tsx`:

```tsx
<Stack.Protected guard={conSesion}>
  <Stack.Screen name="cocina" />
</Stack.Protected>
<Stack.Protected guard={!conSesion}>
  <Stack.Screen name="login" options={{ presentation: 'modal' }} />
</Stack.Protected>
```

- Al iniciar sesión, el login deja de existir y el modal se cierra solo.
- Al tocar "Salir" en la cocina, toda la sección `cocina` desaparece del historial sola, sin
  llamar a `router.back()`.

## Deep link de prueba (Expo Go)

Abre el plato 7 (Sopa paraguaya) directamente. Reemplazá la IP por la que muestra `npx expo start`:

```
exp://192.168.1.20:8081/--/menu/7
```

Desde la terminal:

```bash
npx uri-scheme open "exp://192.168.1.20:8081/--/menu/7" --android
npx uri-scheme open "exp://192.168.1.20:8081/--/menu/7" --ios
```

En una build propia sería `comedoripf://menu/7`, y en la web `http://localhost:8081/menu/7`.

## Desafíos opcionales hechos

- **Hoja inferior:** `/carrito/nota` se abre con `presentation: 'formSheet'` y `sheetAllowedDetents: [0.5, 0.9]`.
- **Tiempo estimado:** en `/turno/[numero]` se calcula la posición en la cola × 3 minutos.

## Capturas

<!-- Reemplazar por las capturas o el link al video -->

| Qué | Captura |
|---|---|
| Carrito con deshacer | `capturas/carrito.png` |
| Turno | `capturas/turno.png` |
| Cocina atendiendo pedidos | `capturas/cocina.png` |
| Login / logout | `capturas/login.png` |
| Pantalla 404 | `capturas/404.png` |
