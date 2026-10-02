// COLA (queue) · FIFO: First In, First Out.
// El primero que llega es el primero que sale (como la fila del comedor).
// Se agrega por el FINAL y se saca por el FRENTE.
//
// Es la "ColaEficiente" del ejercicio A5: NO usa shift().
// shift() corre todos los elementos un lugar (lento con colas grandes).
// En cambio guardamos en #frente el índice del primer elemento y lo avanzamos.
export class Cola<T> {
  #items: T[] = [];
  #frente = 0; // índice del elemento que está primero en la fila

  // Agrega al final de la cola.
  encolar(x: T): void {
    this.#items.push(x);
  }

  // Saca y devuelve el del frente (undefined si está vacía).
  desencolar(): T | undefined {
    if (this.vacia) return undefined;
    const x = this.#items[this.#frente];
    this.#frente++; // el frente pasa al siguiente: no movemos nada
    // Si se vació, reiniciamos para no acumular lugares viejos en memoria.
    if (this.vacia) {
      this.#items = [];
      this.#frente = 0;
    }
    return x;
  }

  // Mira quién sigue, sin sacarlo.
  frente(): T | undefined {
    return this.vacia ? undefined : this.#items[this.#frente];
  }

  get vacia(): boolean {
    return this.tamanio === 0;
  }

  get tamanio(): number {
    return this.#items.length - this.#frente;
  }

  // Copia de la cola, del frente al final.
  aArray(): T[] {
    return this.#items.slice(this.#frente);
  }
}
