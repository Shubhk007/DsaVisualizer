import { VisualizationState } from '../types';

class TreeNode {
  value: number;
  left: TreeNode | null = null;
  right: TreeNode | null = null;

  constructor(value: number) {
    this.value = value;
  }
}

export class BinarySearchTreeDS {
  private root: TreeNode | null = null;
  private count: number = 0;

  insert(value: number): string {
    this.root = this.insertNode(this.root, value);
    this.count++;
    return `Inserted ${value}`;
  }

  private insertNode(node: TreeNode | null, value: number): TreeNode {
    if (!node) {
      return new TreeNode(value);
    }

    if (value < node.value) {
      node.left = this.insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.insertNode(node.right, value);
    } else {
      throw new Error(`Value ${value} already exists in BST`);
    }

    return node;
  }

  delete(value: number): string {
    if (!this.search(value)) {
      throw new Error(`Value ${value} not found`);
    }
    this.root = this.deleteNode(this.root, value);
    this.count--;
    return `Deleted ${value}`;
  }

  private deleteNode(node: TreeNode | null, value: number): TreeNode | null {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.deleteNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.deleteNode(node.right, value);
    } else {
      // Node with only one child or no child
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      // Node with two children: Get inorder successor
      let minRight = node.right;
      while (minRight.left) {
        minRight = minRight.left;
      }
      node.value = minRight.value;
      node.right = this.deleteNode(node.right, minRight.value);
    }

    return node;
  }

  search(value: number): boolean {
    return this.searchNode(this.root, value) !== null;
  }

  private searchNode(node: TreeNode | null, value: number): TreeNode | null {
    if (!node) return null;
    if (value === node.value) return node;
    if (value < node.value) return this.searchNode(node.left, value);
    return this.searchNode(node.right, value);
  }

  find(value: number): string {
    const found = this.search(value);
    return found ? `Found ${value} in BST` : `Value ${value} not found`;
  }

  inorder(): string {
    const result: number[] = [];
    this.inorderTraversal(this.root, result);
    return result.length ? `Inorder: [${result.join(', ')}]` : 'Tree is empty';
  }

  private inorderTraversal(node: TreeNode | null, result: number[]) {
    if (node) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
  }

  preorder(): string {
    const result: number[] = [];
    this.preorderTraversal(this.root, result);
    return result.length ? `Preorder: [${result.join(', ')}]` : 'Tree is empty';
  }

  private preorderTraversal(node: TreeNode | null, result: number[]) {
    if (node) {
      result.push(node.value);
      this.preorderTraversal(node.left, result);
      this.preorderTraversal(node.right, result);
    }
  }

  postorder(): string {
    const result: number[] = [];
    this.postorderTraversal(this.root, result);
    return result.length ? `Postorder: [${result.join(', ')}]` : 'Tree is empty';
  }

  private postorderTraversal(node: TreeNode | null, result: number[]) {
    if (node) {
      this.postorderTraversal(node.left, result);
      this.postorderTraversal(node.right, result);
      result.push(node.value);
    }
  }

  traverse(): string {
    return this.inorder();
  }

  size(): number {
    return this.count;
  }

  isEmpty(): boolean {
    return this.root === null;
  }

  getVisualizationState(): VisualizationState {
    const nodes: any[] = [];
    const edges: any[] = [];
    
    if (!this.root) {
      return { nodes, edges };
    }

    const addNodes = (node: TreeNode | null, x: number, y: number, offset: number, id: string) => {
      if (!node) return;

      nodes.push({
        id,
        value: node.value,
        x,
        y,
      });

      if (node.left) {
        const leftId = `${id}-L`;
        edges.push({ from: id, to: leftId, label: 'L' });
        addNodes(node.left, x - offset, y + 80, offset / 2, leftId);
      }

      if (node.right) {
        const rightId = `${id}-R`;
        edges.push({ from: id, to: rightId, label: 'R' });
        addNodes(node.right, x + offset, y + 80, offset / 2, rightId);
      }
    };

    addNodes(this.root, 400, 50, 150, 'root');

    return { nodes, edges };
  }
}
