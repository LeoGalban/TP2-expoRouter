import { createContext, useContext, useRef, useState, type ReactNode } from 'react';

import type { Plato } from '@/data/platos';
import { Cola } from '@/estructuras/Cola';
import { Pila } from '@/estructuras/Pila';

// Usuario y clave fijos del personal de cocina (lo pide la consigna).
const USUARIO_COCINA = 'cocina';
const CLAVE_COCINA = '1234';

export type ItemCarrito = { idItem: number; plato: Plato };

export type Pedido = {
  numero: number;
  items: Plato[];
  total: number;
  nota: string;
};

type ValorComedor = {
  // Sesión
  usuario: string | null;
  iniciarSesion: (usuario: string, clave: string) => boolean;
  cerrarSesion: () => void;
  // Carrito + pila de deshacer
  carrito: ItemCarrito[];
  total: number;
  agregarAlCarrito: (plato: Plato) => void;
  deshacerUltimo: () => void;
  puedeDeshacer: boolean;
  nota: string;
  setNota: (texto: string) => void;
  // Cola de pedidos
  confirmarPedido: () => number | null;
  enEspera: Pedido[]; // del frente al final
  atenderSiguiente: () => void;
  // Pila de atendidos
  atendidos: Pedido[]; // del tope a la base (el último atendido primero)
};

const ComedorContext = createContext<ValorComedor | null>(null);

export function ComedorProvider({ children }: { children: ReactNode }) {
  // Las estructuras se guardan en useRef: viven mientras la app esté abierta.
  const pilaAcciones = useRef(new Pila<ItemCarrito>()); // para "Deshacer último"
  const colaPedidos = useRef(new Cola<Pedido>()); // pedidos en orden de llegada
  const pilaAtendidos = useRef(new Pila<Pedido>()); // historial de la cocina
  const proximoIdItem = useRef(1);
  const proximoNumero = useRef(1);

  // Como las clases cambian "por dentro", React no se entera solo.
  // Después de cada cambio copiamos su contenido a un useState para que la pantalla se redibuje.
  const [usuario, setUsuario] = useState<string | null>(null);
  const [carrito, setCarrito] = useState<ItemCarrito[]>([]);
  const [puedeDeshacer, setPuedeDeshacer] = useState(false);
  const [nota, setNota] = useState('');
  const [enEspera, setEnEspera] = useState<Pedido[]>([]);
  const [atendidos, setAtendidos] = useState<Pedido[]>([]);

  const total = carrito.reduce((suma, item) => suma + item.plato.precio, 0);

  function iniciarSesion(u: string, c: string) {
    if (u.trim().toLowerCase() === USUARIO_COCINA && c === CLAVE_COCINA) {
      setUsuario(USUARIO_COCINA);
      return true;
    }
    return false;
  }

  function cerrarSesion() {
    setUsuario(null);
  }

  function agregarAlCarrito(plato: Plato) {
    const item = { idItem: proximoIdItem.current++, plato };
    pilaAcciones.current.push(item); // PUSH en la pila de acciones
    setCarrito((anterior) => [...anterior, item]);
    setPuedeDeshacer(true);
  }

  function deshacerUltimo() {
    const ultimo = pilaAcciones.current.pop(); // POP: sale lo último que se agregó
    if (!ultimo) return;
    setCarrito((anterior) => anterior.filter((item) => item.idItem !== ultimo.idItem));
    setPuedeDeshacer(!pilaAcciones.current.vacia);
  }

  // Devuelve el número de turno asignado, o null si el carrito estaba vacío.
  function confirmarPedido() {
    if (carrito.length === 0) return null;
    const pedido: Pedido = {
      numero: proximoNumero.current++, // número correlativo
      items: carrito.map((item) => item.plato),
      total,
      nota,
    };
    colaPedidos.current.encolar(pedido); // ENCOLAR: entra al final de la fila
    setEnEspera(colaPedidos.current.aArray());
    // Carrito nuevo y vacío
    pilaAcciones.current = new Pila<ItemCarrito>();
    setCarrito([]);
    setPuedeDeshacer(false);
    setNota('');
    return pedido.numero;
  }

  function atenderSiguiente() {
    const pedido = colaPedidos.current.desencolar(); // DESENCOLAR: sale el del frente
    if (!pedido) return;
    pilaAtendidos.current.push(pedido); // se APILA en el historial
    setEnEspera(colaPedidos.current.aArray());
    setAtendidos(pilaAtendidos.current.aArray().reverse()); // del tope a la base
  }

  return (
    <ComedorContext.Provider
      value={{
        usuario,
        iniciarSesion,
        cerrarSesion,
        carrito,
        total,
        agregarAlCarrito,
        deshacerUltimo,
        puedeDeshacer,
        nota,
        setNota,
        confirmarPedido,
        enEspera,
        atenderSiguiente,
        atendidos,
      }}>
      {children}
    </ComedorContext.Provider>
  );
}

// Hook para usar el contexto desde cualquier pantalla.
export function useComedor() {
  const valor = useContext(ComedorContext);
  if (!valor) throw new Error('useComedor debe usarse dentro de <ComedorProvider>');
  return valor;
}
