// PILA (stack) · LIFO: Last In, First Out.
// El último elemento que entra es el primero que sale.
// Se trabaja siempre por un solo extremo: el TOPE (el final del array).
export class Pila<T> {
  // "#" = campo privado: nadie de afuera de la clase puede tocar el array.
  #items: T[] = [];

  // Apila un elemento en el tope.
  push(x: T): void {
    this.#items.push(x);
  }

  // Saca y devuelve el elemento del tope (undefined si está vacía).
  pop(): T | undefined {
    return this.#items.pop();
  }

  // Mira el elemento del tope sin sacarlo.
  tope(): T | undefined {
    return this.#items[this.#items.length - 1];
  }

  get vacia(): boolean {
    return this.#items.length === 0;
  }

  get tamanio(): number {
    return this.#items.length;
  }

  // Devuelve una COPIA (de la base al tope), así nadie modifica la pila desde afuera.
  aArray(): T[] {
    return [...this.#items];
  }
}
