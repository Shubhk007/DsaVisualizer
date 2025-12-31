import { VisualizationState } from '../types';

interface HashEntry {
  key: string;
  value: any;
}

export class HashMapDS {
  private buckets: (HashEntry[] | null)[];
  private size_: number = 0;
  private capacity: number = 10;

  constructor() {
    this.buckets = new Array(this.capacity).fill(null);
  }

  private hash(key: string): number {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash = (hash * 31 + key.charCodeAt(i)) % this.capacity;
    }
    return hash;
  }

  put(key: string, value: any): string {
    const index = this.hash(key);
    
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index]!;
    const existing = bucket.find(entry => entry.key === key);

    if (existing) {
      const oldValue = existing.value;
      existing.value = value;
      return `Updated key "${key}" from ${oldValue} to ${value}`;
    } else {
      bucket.push({ key, value });
      this.size_++;
      return `Inserted key "${key}" with value ${value}`;
    }
  }

  get(key: string): string {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      return `Key "${key}" not found`;
    }

    const entry = bucket.find(entry => entry.key === key);
    if (!entry) {
      return `Key "${key}" not found`;
    }

    return `Value for key "${key}": ${entry.value}`;
  }

  delete(key: string): string {
    const index = this.hash(key);
    const bucket = this.buckets[index];

    if (!bucket) {
      throw new Error(`Key "${key}" not found`);
    }

    const entryIndex = bucket.findIndex(entry => entry.key === key);
    if (entryIndex === -1) {
      throw new Error(`Key "${key}" not found`);
    }

    const value = bucket[entryIndex].value;
    bucket.splice(entryIndex, 1);
    if (bucket.length === 0) {
      this.buckets[index] = null;
    }
    this.size_--;
    return `Deleted key "${key}" with value ${value}`;
  }

  has(key: string): boolean {
    const index = this.hash(key);
    const bucket = this.buckets[index];
    return bucket ? bucket.some(entry => entry.key === key) : false;
  }

  traverse(): string {
    if (this.size_ === 0) {
      return 'HashMap is empty';
    }

    const entries: string[] = [];
    this.buckets.forEach((bucket) => {
      if (bucket && bucket.length > 0) {
        bucket.forEach(entry => {
          entries.push(`"${entry.key}" => ${entry.value}`);
        });
      }
    });

    return `HashMap: {${entries.join(', ')}}`;
  }

  size(): number {
    return this.size_;
  }

  isEmpty(): boolean {
    return this.size_ === 0;
  }

  getVisualizationState(): VisualizationState {
    const nodes: any[] = [];
    let nodeIndex = 0;

    this.buckets.forEach((bucket) => {
      if (bucket && bucket.length > 0) {
        bucket.forEach(entry => {
          nodes.push({
            id: `node-${nodeIndex}`,
            value: `${entry.key}:${entry.value}`,
            x: 100 + (nodeIndex % 5) * 120,
            y: 100 + Math.floor(nodeIndex / 5) * 80,
          });
          nodeIndex++;
        });
      }
    });

    return { nodes };
  }
}
