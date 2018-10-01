import BinaryMinHeap from './BinaryMinHeap';

export default class PriorityQueue<T> {
  public heap: BinaryMinHeap<T>;
  public size: number;
  
  constructor() {
    this.heap = new BinaryMinHeap<T>();
    this.size = 0;
  }
  
  public enqueue(node: T) {
    /* Adds an element to the queue. */
    this.size++;
    this.heap.insert(node);
  }
  
  public dequeue(): T | null {
    /* Removes the first element from the queue. */
    if (this.isEmpty()) return null;
    this.size--;
    return this.heap.remove(1);
  }
  
  public peek(): T | null {
    /* Show the first item of the queue without removing it. */
    if (this.isEmpty()) return null;
    return this.heap.nodes[1];
  }
  
  public isEmpty(): boolean {
    /* Returns whether or not the queue has any more elements. */
    return this.size === 0;
  }
  
  public notifyUpdate(i: number) {
    this.heap.modifyPosition(i);
  }
  
  public elementAt(i: number): T | null {
    return this.heap.nodes[i];
  }
  
  public contains(node: T): number {
    return this.heap.contains(node);
  }
  
  public find(condition: (node: T) => boolean): number {
    return this.heap.find(condition);
  }
}