export type DSAType = 
  | 'array' 
  | 'linkedlist' 
  | 'doublylinkedlist'
  | 'circularlinkedlist'
  | 'stack' 
  | 'queue' 
  | 'hashmap' 
  | 'bst' 
  | 'graph';

export interface VisualNode {
  id: string;
  value: any;
  x: number;
  y: number;
  highlighted?: boolean;
  type?: 'active' | 'normal' | 'error';
}

export interface VisualEdge {
  from: string;
  to: string;
  label?: string;
}

export interface VisualizationState {
  nodes: VisualNode[];
  edges?: VisualEdge[];
  message?: string;
  error?: string;
}

export interface DSAOperation {
  name: string;
  execute: (...args: any[]) => any;
}
