import React, { useEffect } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-3xl max-h-[90vh] overflow-y-auto m-4 animate-slideDown">
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Help & Documentation
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 space-y-6 text-gray-700 dark:text-gray-300">
          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              What is this?
            </h3>
            <p>
              The <strong>DSA Visual Practice Platform</strong> is an interactive learning tool that helps you understand 
              data structures and algorithms through live visualization. Write code, execute operations, and see the 
              results visually in real-time.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              How to Use
            </h3>
            <ol className="list-decimal list-inside space-y-2 ml-2">
              <li><strong>Select a Data Structure</strong> from the dropdown in the navigation bar</li>
              <li><strong>Write your code</strong> in the Monaco editor (right panel) using the provided template</li>
              <li><strong>Click "Run Code"</strong> to execute your operations</li>
              <li><strong>Watch the visualization</strong> update in real-time (left panel)</li>
              <li><strong>Use Reset</strong> to clear the state and start fresh</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Supported Data Structures
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Array</strong>
                <p className="text-sm">Dynamic arrays with index-based access</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Linked List (Singly)</strong>
                <p className="text-sm">One-directional node connections</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Linked List (Doubly)</strong>
                <p className="text-sm">Bi-directional node connections</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Linked List (Circular)</strong>
                <p className="text-sm">Last node points to first node</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Stack</strong>
                <p className="text-sm">LIFO (Last In, First Out)</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Queue</strong>
                <p className="text-sm">FIFO (First In, First Out)</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>HashMap</strong>
                <p className="text-sm">Key-value pair storage</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Binary Search Tree</strong>
                <p className="text-sm">Sorted binary tree structure</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <strong>Graph</strong>
                <p className="text-sm">Vertices and edges (adjacency list)</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Available Operations
            </h3>
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg space-y-2">
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">insert(value)</code> - Add element</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">insertAt(index, value)</code> - Insert at specific position</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">delete(value)</code> - Remove element by value</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">deleteAt(index)</code> - Remove element at index</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">search(value)</code> - Find element</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">update(index, value)</code> - Update element</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">traverse()</code> - Display all elements</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">size()</code> - Get size</p>
              <p><code className="bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded">isEmpty()</code> - Check if empty</p>
              <p className="text-sm italic mt-2">* Specific operations vary by data structure</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Code Execution
            </h3>
            <p className="mb-2">
              Your code runs in a <strong>sandboxed environment</strong> for safety. You can only use the provided 
              API functions - direct DOM manipulation or network requests are not allowed.
            </p>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-3 rounded-lg">
              <p className="text-sm"><strong>⚠️ Note:</strong> Infinite loops are automatically terminated after 5 seconds.</p>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Example Code
            </h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Array example
insert(10);
insert(20);
insert(30);
insertAt(1, 15);
search(20);
deleteAt(2);
traverse();`}
            </pre>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Tips for Learning
            </h3>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Start with simple operations to understand the basic behavior</li>
              <li>Watch how the visualization updates with each operation</li>
              <li>Try edge cases (empty structure, full structure, invalid operations)</li>
              <li>Use the starter templates as a guide</li>
              <li>Toggle dark/light mode for comfortable viewing</li>
              <li>Use Reset to start fresh anytime</li>
            </ul>
          </section>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full btn-primary"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
