import { DSAType, VisualizationState } from '../types';
import { LinkedListDS } from '../dsa/LinkedListDS';
import { BinarySearchTreeDS } from '../dsa/BinarySearchTreeDS';
import { GraphDS } from '../dsa/GraphDS';

export interface ExecutionResult {
  output: string[];
  error?: string;
  visualizationState: VisualizationState;
}

// Helper classes for LinkedList
class LinkedList {
  private impl = new LinkedListDS();
  
  add(value: number) {
    this.impl.insert(value);
  }
  
  addAt(index: number, value: number) {
    this.impl.insertAt(index, value);
  }
  
  remove(value: number) {
    this.impl.delete(value);
  }
  
  removeAt(index: number) {
    this.impl.deleteAt(index);
  }
  
  contains(value: number): boolean {
    return this.impl.search(value).includes('Found');
  }
  
  get size(): number {
    return this.impl.size();
  }
  
  toArray(): number[] {
    const str = this.impl.traverse();
    if (str === 'List is empty') return [];
    const match = str.match(/List: (.*) -> null/);
    if (!match) return [];
    return match[1].split(' -> ').map(Number);
  }
  
  getVisualizationState() {
    return this.impl.getVisualizationState();
  }
}

// Helper class for BST
class BinarySearchTree {
  private impl = new BinarySearchTreeDS();
  
  insert(value: number) {
    this.impl.insert(value);
  }
  
  remove(value: number) {
    this.impl.delete(value);
  }
  
  contains(value: number): boolean {
    return this.impl.search(value);
  }
  
  inorder(): number[] {
    const str = this.impl.inorder();
    const match = str.match(/Inorder: \[(.*)\]/);
    if (!match) return [];
    return match[1].split(', ').map(Number);
  }
  
  preorder(): number[] {
    const str = this.impl.preorder();
    const match = str.match(/Preorder: \[(.*)\]/);
    if (!match) return [];
    return match[1].split(', ').map(Number);
  }
  
  postorder(): number[] {
    const str = this.impl.postorder();
    const match = str.match(/Postorder: \[(.*)\]/);
    if (!match) return [];
    return match[1].split(', ').map(Number);
  }
  
  get size(): number {
    return this.impl.size();
  }
  
  getVisualizationState() {
    return this.impl.getVisualizationState();
  }
}

// Helper class for Graph
class Graph {
  private impl = new GraphDS();
  
  addVertex(vertex: string) {
    this.impl.addVertex(vertex);
  }
  
  addEdge(from: string, to: string) {
    this.impl.addEdge(from, to);
  }
  
  removeVertex(vertex: string) {
    this.impl.removeVertex(vertex);
  }
  
  removeEdge(from: string, to: string) {
    this.impl.removeEdge(from, to);
  }
  
  hasVertex(vertex: string): boolean {
    return this.impl.hasVertex(vertex);
  }
  
  hasEdge(from: string, to: string): boolean {
    return this.impl.hasEdge(from, to);
  }
  
  getNeighbors(vertex: string): string[] {
    const str = this.impl.getNeighbors(vertex);
    const match = str.match(/Neighbors of ".*": \[(.*)\]/);
    if (!match) return [];
    return match[1].split(', ');
  }
  
  getVertices(): string[] {
    const str = this.impl.traverse();
    const lines = str.split('\n').slice(1);
    return lines.map(line => {
      const match = line.match(/"(.*)": \[/);
      return match ? match[1] : '';
    }).filter(Boolean);
  }
  
  get vertices(): number {
    return this.impl.size();
  }
  
  getVisualizationState() {
    return this.impl.getVisualizationState();
  }
}

export const executeSandboxedCode = (
  code: string,
  _dsaType: DSAType
): ExecutionResult => {
  const output: string[] = [];
  let capturedData: any = null;
  let visualizationState: VisualizationState = { nodes: [] };

  const sandboxConsole = {
    log: (...args: any[]) => {
      output.push(args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' '));
    },
  };

  try {
    // Create the sandboxed function
    const sandboxedFunction = new Function(
      'console',
      'LinkedList',
      'BinarySearchTree',
      'Graph',
      `
      ${code}
      
      // Capture the main data structure
      if (typeof arr !== 'undefined') return { type: 'array', data: arr };
      if (typeof stack !== 'undefined') return { type: 'stack', data: stack };
      if (typeof queue !== 'undefined') return { type: 'queue', data: queue };
      if (typeof map !== 'undefined') return { type: 'map', data: map };
      if (typeof list !== 'undefined') return { type: 'linkedlist', data: list };
      if (typeof bst !== 'undefined') return { type: 'bst', data: bst };
      if (typeof graph !== 'undefined') return { type: 'graph', data: graph };
      return null;
      `
    );

    const timeoutId = setTimeout(() => {
      throw new Error('Execution timeout: Code took too long to execute (max 5 seconds)');
    }, 5000);

    try {
      capturedData = sandboxedFunction(
        sandboxConsole,
        LinkedList,
        BinarySearchTree,
        Graph
      );
      clearTimeout(timeoutId);
    } catch (execError: any) {
      clearTimeout(timeoutId);
      throw execError;
    }

    // Generate visualization based on captured data
    if (capturedData) {
      if (capturedData.type === 'array' || capturedData.type === 'stack' || capturedData.type === 'queue') {
        const arr = capturedData.data;
        const isStack = capturedData.type === 'stack';
        const isQueue = capturedData.type === 'queue';
        
        // Multi-row layout for arrays and queues to prevent overflow
        const nodeWidth = 70;
        const nodeHeight = 70;
        const spacing = 10;
        const nodesPerRow = 8; // Max nodes per row
        
        if (isStack) {
          // Stack grows vertically (bottom to top)
          visualizationState = {
            nodes: arr.map((value: any, index: number) => ({
              id: `node-${index}`,
              value: value,
              x: 150,
              y: 500 - index * (nodeHeight + spacing),
            }))
          };
        } else {
          // Array and Queue use multi-row grid layout
          visualizationState = {
            nodes: arr.map((value: any, index: number) => {
              const row = Math.floor(index / nodesPerRow);
              const col = index % nodesPerRow;
              return {
                id: `node-${index}`,
                value: value,
                x: 80 + col * (nodeWidth + spacing),
                y: 80 + row * (nodeHeight + spacing),
              };
            })
          };
        }
      } else if (capturedData.type === 'map') {
        const map = capturedData.data;
        const entries = Object.entries(map);
        
        visualizationState = {
          nodes: entries.map(([key, value], index) => ({
            id: `node-${index}`,
            value: `${key}:${value}`,
            x: 100 + (index % 5) * 120,
            y: 100 + Math.floor(index / 5) * 80,
          }))
        };
      } else if (capturedData.type === 'linkedlist') {
        visualizationState = capturedData.data.getVisualizationState();
      } else if (capturedData.type === 'bst') {
        visualizationState = capturedData.data.getVisualizationState();
      } else if (capturedData.type === 'graph') {
        visualizationState = capturedData.data.getVisualizationState();
      }
    }

    return {
      output,
      visualizationState,
    };
  } catch (error: any) {
    return {
      output,
      error: error.message || 'An unknown error occurred',
      visualizationState: { nodes: [] },
    };
  }
};
