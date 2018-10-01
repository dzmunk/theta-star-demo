import { PathTile } from './AStar';

export default class BinaryMinHeap<T> {
  /* backbone for priority queue */
  
  public nodes: Array<T | null>;
  public size: number;

  constructor(array?: T[]) {
    /* Initializing with 0 allows for a node to find its parent by integer division. */
    this.nodes = [null];
    this.size = 0;
    array && this.heapify(array);
  }

  get content(): T[] {
    return this.nodes.slice(1) as T[];
  }
  
  private heapify(array: T[]) {
    for (const node of array) {
      this.insert(node);
    }
  }
  
  private nodeValue(i: number): number {
    if (i === 0) return 0;
    if (typeof this.nodes[i] === 'number') {
      return (this.nodes[i] as any) as number;
    }
    if (this.nodes[i] instanceof PathTile) {
      return ((this.nodes[i] as any) as PathTile).cost;
    }
    throw Error('Unrecognized node type');
  }
  
  public insert(node: T) {
    /* Inserts into the next spot in the heap, then adjusts for heap order. */
    this.nodes.push(node);
    this.size++;
    this.bubbleUp(this.size);
  }
  
  public remove(i: number): T | null {
    /* Remove a node from the heap. */
    const toRemove = this.nodes[i];
    
    this.nodes[i] = this.nodes[this.size];
    this.size--;
    this.nodes.pop();
    this.modifyPosition(i);
    
    return toRemove;
  }
  
  public modifyPosition(i: number) {
    /* Modifies the node's position when it's supposed to be in a wrong position
    (e.g. after an update or removal of a node). */
    if (i === 0 || i > this.size) return;
    if (i >= 2 && this.nodeValue(i) < this.nodeValue(Math.floor(i / 2))) {
      this.bubbleUp(i);
    } else {
      this.bubbleDown(i);
    }
  }
  
  private bubbleUp(i: number) {
    /* Adjusts for heap order when inserting. */
    while (Math.floor(i / 2) > 0) {
      if (this.nodeValue(i) < this.nodeValue(Math.floor(i / 2))) {
        [this.nodes[i], this.nodes[Math.floor(i / 2)]] = [this.nodes[Math.floor(i / 2)], this.nodes[i]];
      }
      i = Math.floor(i / 2);
    }
  }
  
  private bubbleDown(i: number) {
    /* Adjusts for heap order when removing. */
    let mChildIndex: number;
    while (i * 2 <= this.size) {
      mChildIndex = this.minChildIndex(i);
      if (this.nodeValue(i) > this.nodeValue(mChildIndex)) {
        [this.nodes[i], this.nodes[mChildIndex]] = [this.nodes[mChildIndex], this.nodes[i]];
      }
      i = mChildIndex;
    }
  }
  
  private minChildIndex(i: number): number {
    /* Helper for bubbleDown; returns the index of the smaller child. */
    if (i * 2 >= this.size) {
      return i * 2;
    } else {
      if (this.nodeValue(i * 2) < this.nodeValue(i * 2 + 1)) {
        return i * 2;
      } else {
        return i * 2 + 1;
      }
    }
  }
  
  public contains(node: T): number {
    /* Returns the index of the node if it exists, returns 0 otherwise. */
    for (let i = 1; i <= this.size; i++) {
      if (this.nodes[i] === node) {
        return i;
      }
    }
    return 0;
  }
  
  public find(condition: (node: T) => boolean): number {
    /* Returns the index of a node that fulfills the given condition */
    for (let i = 1; i <= this.size; i++) {
      if (condition(this.nodes[i] as T)) {
        return i;
      }
    }
    return 0;
  }
}