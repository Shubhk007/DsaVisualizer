import { VisualizationState } from '../types';

export class StackDS {
  private items: number[] = [];
  private maxSize: number = 15;

  push(value: number): string {
    if (this.items.length >= this.maxSize) {
      throw new Error('Stack overflow! Maximum size reached.');
    }
    this.items.push(value);
    return `Pushed ${value} onto stack`;
  }

  pop(): string {
    if (this.items.length === 0) {
      throw new Error('Stack underflow! Stack is empty.');
    }
    const value = this.items.pop()!;
    return `Popped ${value} from stack`;
  }

  peek(): string {
    if (this.items.length === 0) {
      throw new Error('Stack is empty');
    }
    return `Top element: ${this.items[this.items.length - 1]}`;
  }

  search(value: number): string {
    const index = this.items.lastIndexOf(value);
    if (index === -1) {
      return `Value ${value} not found`;
    }
    return `Found ${value} at position ${this.items.length - index - 1} from top`;
  }

  traverse(): string {
    if (this.items.length === 0) {
      return 'Stack is empty';
    }
    return `Stack (top to bottom): [${[...this.items].reverse().join(', ')}]`;
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
      x: 300,
      y: 400 - index * 50,
    }));

    return { nodes };
  }
}
