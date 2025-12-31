import { VisualizationState } from '../types';

export class GraphDS {
  private adjacencyList: Map<string, Set<string>> = new Map();

  addVertex(vertex: string): string {
    if (this.adjacencyList.has(vertex)) {
      throw new Error(`Vertex "${vertex}" already exists`);
    }
    this.adjacencyList.set(vertex, new Set());
    return `Added vertex "${vertex}"`;
  }

  addEdge(from: string, to: string): string {
    if (!this.adjacencyList.has(from)) {
      this.adjacencyList.set(from, new Set());
    }
    if (!this.adjacencyList.has(to)) {
      this.adjacencyList.set(to, new Set());
    }

    this.adjacencyList.get(from)!.add(to);
    this.adjacencyList.get(to)!.add(from); // Undirected graph
    
    return `Added edge between "${from}" and "${to}"`;
  }

  removeVertex(vertex: string): string {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error(`Vertex "${vertex}" not found`);
    }

    // Remove all edges to this vertex
    for (const [, neighbors] of this.adjacencyList) {
      neighbors.delete(vertex);
    }

    this.adjacencyList.delete(vertex);
    return `Removed vertex "${vertex}"`;
  }

  removeEdge(from: string, to: string): string {
    if (!this.adjacencyList.has(from) || !this.adjacencyList.has(to)) {
      throw new Error('One or both vertices not found');
    }

    this.adjacencyList.get(from)!.delete(to);
    this.adjacencyList.get(to)!.delete(from);

    return `Removed edge between "${from}" and "${to}"`;
  }

  hasVertex(vertex: string): boolean {
    return this.adjacencyList.has(vertex);
  }

  hasEdge(from: string, to: string): boolean {
    return this.adjacencyList.has(from) && this.adjacencyList.get(from)!.has(to);
  }

  getNeighbors(vertex: string): string {
    if (!this.adjacencyList.has(vertex)) {
      throw new Error(`Vertex "${vertex}" not found`);
    }

    const neighbors = Array.from(this.adjacencyList.get(vertex)!);
    if (neighbors.length === 0) {
      return `Vertex "${vertex}" has no neighbors`;
    }

    return `Neighbors of "${vertex}": [${neighbors.join(', ')}]`;
  }

  traverse(): string {
    if (this.adjacencyList.size === 0) {
      return 'Graph is empty';
    }

    const result: string[] = [];
    for (const [vertex, neighbors] of this.adjacencyList) {
      const neighborsList = Array.from(neighbors);
      result.push(`"${vertex}": [${neighborsList.join(', ')}]`);
    }

    return `Graph:\n${result.join('\n')}`;
  }

  size(): number {
    return this.adjacencyList.size;
  }

  isEmpty(): boolean {
    return this.adjacencyList.size === 0;
  }

  getVisualizationState(): VisualizationState {
    const nodes: any[] = [];
    const edges: any[] = [];
    const vertices = Array.from(this.adjacencyList.keys());

    // Arrange vertices in a circle
    const centerX = 400;
    const centerY = 250;
    const radius = 150;

    vertices.forEach((vertex, index) => {
      const angle = (2 * Math.PI * index) / vertices.length;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);

      nodes.push({
        id: vertex,
        value: vertex,
        x,
        y,
      });
    });

    // Add edges (avoid duplicates)
    const addedEdges = new Set<string>();
    for (const [from, neighbors] of this.adjacencyList) {
      for (const to of neighbors) {
        const edgeKey = [from, to].sort().join('-');
        if (!addedEdges.has(edgeKey)) {
          edges.push({ from, to });
          addedEdges.add(edgeKey);
        }
      }
    }

    return { nodes, edges };
  }
}
