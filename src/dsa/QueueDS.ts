import { VisualizationState } from '../types';

export class QueueDS {
  private items: number[] = [];
  private maxSize: number = 15;

  enqueue(value: number): string {
    if (this.items.length >= this.maxSize) {
      throw new Error('Queue overflow! Maximum size reached.');
    }
    this.items.push(value);
    return `Enqueued ${value}`;
  }

  dequeue(): string {
    if (this.items.length === 0) {
      throw new Error('Queue underflow! Queue is empty.');
    }
    const value = this.items.shift()!;
    return `Dequeued ${value}`;
  }

  front(): string {
    if (this.items.length === 0) {
      throw new Error('Queue is empty');
    }
    return `Front element: ${this.items[0]}`;
  }

  rear(): string {
    if (this.items.length === 0) {
      throw new Error('Queue is empty');
    }
    return `Rear element: ${this.items[this.items.length - 1]}`;
  }

  search(value: number): string {
    const index = this.items.indexOf(value);
    if (index === -1) {
      return `Value ${value} not found`;
    }
    return `Found ${value} at position ${index}`;
  }

  traverse(): string {
    if (this.items.length === 0) {
      return 'Queue is empty';
    }
    return `Queue (front to rear): [${this.items.join(', ')}]`;
  }

  size(): number {
    return this.items.length;
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  getVisualizationState(): VisualizationState {
    const nodes = this.items.map((value, index) => ({
      id: `node-${index}`,
      value,
      x: 100 + index * 80,
      y: 200,
    }));

    return { nodes };
  }
}
