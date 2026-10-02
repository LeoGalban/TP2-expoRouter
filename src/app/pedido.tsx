import { Redirect } from 'expo-router';

// URL: /pedido   (URL vieja de la versión anterior)
// <Redirect> REEMPLAZA esta ruta por /carrito (equivale a router.replace).
// Si apilara, al tocar "atrás" volveríamos acá y nos redirigiría otra vez: un bucle.
export default function PedidoViejo() {
  return <Redirect href="/carrito" />;
}
