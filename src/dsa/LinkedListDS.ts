import { VisualizationState } from '../types';

class ListNode {
  value: number;
  next: ListNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export class LinkedListDS {
  private head: ListNode | null = null;
  private count: number = 0;

  insert(value: number): string {
    const newNode = new ListNode(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.count++;
    return `Inserted ${value} at the end`;
  }

  insertAt(index: number, value: number): string {
    if (index < 0 || index > this.count) {
      throw new Error(`Invalid index ${index}. Valid range: 0-${this.count}`);
    }

    const newNode = new ListNode(value);

    if (index === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current!.next;
      }
      newNode.next = current!.next;
      current!.next = newNode;
    }
    this.count++;
    return `Inserted ${value} at index ${index}`;
  }

  delete(value: number): string {
    if (!this.head) {
      throw new Error('List is empty');
    }

    if (this.head.value === value) {
      this.head = this.head.next;
      this.count--;
      return `Deleted ${value}`;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;
    }

    if (!current.next) {
      throw new Error(`Value ${value} not found`);
    }

    current.next = current.next.next;
    this.count--;
    return `Deleted ${value}`;
  }

  deleteAt(index: number): string {
    if (index < 0 || index >= this.count) {
      throw new Error(`Invalid index ${index}. Valid range: 0-${this.count - 1}`);
    }

    let value: number;
    if (index === 0) {
      value = this.head!.value;
      this.head = this.head!.next;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) {
        current = current!.next;
      }
      value = current!.next!.value;
      current!.next = current!.next!.next;
    }
    this.count--;
    return `Deleted ${value} from index ${index}`;
  }

  search(value: number): string {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return `Found ${value} at index ${index}`;
      }
      current = current.next;
      index++;
    }
    return `Value ${value} not found`;
  }

  traverse(): string {
    if (!this.head) {
      return 'List is empty';
    }
    const values: number[] = [];
    let current: ListNode | null = this.head;
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    return `List: ${values.join(' -> ')} -> null`;
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  getVisualizationState(): VisualizationState {
    const nodes = [];
    const edges = [];
    let current: ListNode | null = this.head;
    let index = 0;

    while (current) {
      nodes.push({
        id: `node-${index}`,
        value: current.value,
        x: 100 + index * 120,
        y: 200,
      });

      if (current.next) {
        edges.push({
          from: `node-${index}`,
          to: `node-${index + 1}`,
        });
      }

      current = current.next;
      index++;
    }

    return { nodes, edges };
  }
}
