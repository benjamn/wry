import { WeakTrie } from "./weak-trie";
export { WeakTrie }

const trie = new WeakTrie<{
  tuple: Tuple<any>;
}>();

export class Tuple<T extends any[]> implements Iterable<T[number]> {
  public static from<E extends any[]>(...elements: E): Tuple<E> {
    const node = trie.lookupArray(elements);
    return node.tuple || (node.tuple = new Tuple(elements));
  }

  public static isTuple(that: any): that is Tuple<any> {
    return that instanceof Tuple;
  }

  public [Symbol.iterator]: () => Iterator<T[number]>;

  private constructor(
    elements: T,
    public readonly length = elements.length,
  ) {
    Object.setPrototypeOf(elements, Tuple.prototype);
    return Object.freeze(elements);
  }
}

export default Tuple.from;