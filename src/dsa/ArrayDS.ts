import { VisualizationState } from '../types';

export class ArrayDS {
  private items: number[] = [];
  private maxSize: number = 20;

  insert(value: number): string {
    if (this.items.length >= this.maxSize) {
      throw new Error('Array overflow! Maximum size reached.');
    }
    this.items.push(value);
    return `Inserted ${value} at index ${this.items.length - 1}`;
  }

  insertAt(index: number, value: number): string {
    if (index < 0 || index > this.items.length) {
      throw new Error(`Invalid index ${index}. Valid range: 0-${this.items.length}`);
    }
    if (this.items.length >= this.maxSize) {
      throw new Error('Array overflow! Maximum size reached.');
    }
    this.items.splice(index, 0, value);
    return `Inserted ${value} at index ${index}`;
  }

  delete(value: number): string {
    const index = this.items.indexOf(value);
    if (index === -1) {
      throw new Error(`Value ${value} not found in array`);
    }
    this.items.splice(index, 1);
    return `Deleted ${value} from index ${index}`;
  }

  deleteAt(index: number): string {
    if (index < 0 || index >= this.items.length) {
      throw new Error(`Invalid index ${index}. Valid range: 0-${this.items.length - 1}`);
    }
    const value = this.items[index];
    this.items.splice(index, 1);
    return `Deleted ${value} from index ${index}`;
  }

  search(value: number): string {
    const index = this.items.indexOf(value);
    if (index === -1) {
      return `Value ${value} not found`;
    }
    return `Found ${value} at index ${index}`;
  }

  update(index: number, value: number): string {
    if (index < 0 || index >= this.items.length) {
      throw new Error(`Invalid index ${index}. Valid range: 0-${this.items.length - 1}`);
    }
    const oldValue = this.items[index];
    this.items[index] = value;
    return `Updated index ${index} from ${oldValue} to ${value}`;
  }

  traverse(): string {
    if (this.items.length === 0) {
      return 'Array is empty';
    }
    return `Array: [${this.items.join(', ')}]`;
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
