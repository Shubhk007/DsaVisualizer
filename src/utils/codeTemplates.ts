import { DSAType } from '../types';

export const codeTemplates: Record<DSAType, string> = {
  array: `// Create an array
let arr = [10, 20, 30];

// Add elements
arr.push(40);      // Add at end
arr.unshift(5);    // Add at start

// Access elements
console.log('First element:', arr[0]);
console.log('Array length:', arr.length);

// Remove elements
// arr.pop();       // Remove from end
// arr.shift();     // Remove from start

// Modify elements
arr[2] = 25;       // Update index 2

// Insert at specific position
arr.splice(2, 0, 15);  // Insert 15 at index 2

console.log('Final array:', arr);
`,

  linkedlist: `// Create a linked list
let list = new LinkedList();

// Add nodes
list.add(10);      // Add at end
list.add(20);
list.add(30);

// Add at specific position
list.addAt(1, 15); // Add 15 at index 1

// Get values
console.log('Size:', list.size);

// Display
console.log('List:', list.toArray());
`,

  doublylinkedlist: `// Create a linked list
let list = new LinkedList();

// Add nodes
list.add(10);
list.add(20);
list.add(30);

console.log('List:', list.toArray());
`,

  circularlinkedlist: `// Create a linked list
let list = new LinkedList();

// Add nodes
list.add(10);
list.add(20);
list.add(30);

console.log('List:', list.toArray());
`,

  stack: `// Create a stack
let stack = [];

// Push elements (LIFO - Last In First Out)
stack.push(10);
stack.push(20);
stack.push(30);
stack.push(40);

console.log('Stack:', stack);

// Peek at top
console.log('Top element:', stack[stack.length - 1]);

// Pop elements
let popped = stack.pop();
console.log('Popped:', popped);

console.log('Final stack:', stack);
console.log('Size:', stack.length);
`,

  queue: `// Create a queue
let queue = [];

// Enqueue elements (FIFO - First In First Out)
queue.push(10);    // Add to rear
queue.push(20);
queue.push(30);
queue.push(40);

console.log('Queue:', queue);

// Peek at front and rear
console.log('Front:', queue[0]);
console.log('Rear:', queue[queue.length - 1]);

// Dequeue elements
let removed = queue.shift();  // Remove from front
console.log('Dequeued:', removed);

console.log('Final queue:', queue);
console.log('Size:', queue.length);
`,

  hashmap: `// Create a hash map (object)
let map = {};

// Add key-value pairs
map['name'] = 'John';
map['age'] = 25;
map['city'] = 'New York';

// Another way to add
map.country = 'USA';

console.log('Map:', map);

// Get value
console.log('Name:', map['name']);

// Update value
map['age'] = 26;

// Check if key exists
console.log('Has name:', 'name' in map);

// Get all keys and values
console.log('Keys:', Object.keys(map));
console.log('Values:', Object.values(map));
`,

  bst: `// Create a binary search tree
let bst = new BinarySearchTree();

// Insert values
bst.insert(50);
bst.insert(30);
bst.insert(70);
bst.insert(20);
bst.insert(40);
bst.insert(60);
bst.insert(80);

// Search for value
console.log('Contains 40:', bst.contains(40));

// Traversals
console.log('Inorder:', bst.inorder());

console.log('Size:', bst.size);
`,

  graph: `// Create a graph
let graph = new Graph();

// Add vertices
graph.addVertex('A');
graph.addVertex('B');
graph.addVertex('C');
graph.addVertex('D');

// Add edges
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('B', 'C');
graph.addEdge('C', 'D');

// Get neighbors
console.log('Neighbors of A:', graph.getNeighbors('A'));

// Check connections
console.log('Has edge A-B:', graph.hasEdge('A', 'B'));

console.log('Vertices:', graph.getVertices());
`,
};
