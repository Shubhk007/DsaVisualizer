import React, { useEffect, useState, useRef } from 'react';
import { DSAType, VisualizationState } from '../types';

interface VisualizationPanelProps {
  dsaType: DSAType;
}

const VisualizationPanel: React.FC<VisualizationPanelProps> = ({ dsaType }) => {
  const [visualState, setVisualState] = useState<VisualizationState>({ nodes: [] });
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Listen for DS instance updates
    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent;
      const { visualizationState } = customEvent.detail;

      if (visualizationState) {
        setVisualState(visualizationState);
      }
    };

    const handleReset = () => {
      setVisualState({ nodes: [] });
    };

    window.addEventListener('dsaInstanceUpdate', handleUpdate);
    window.addEventListener('dsaReset', handleReset);

    return () => {
      window.removeEventListener('dsaInstanceUpdate', handleUpdate);
      window.removeEventListener('dsaReset', handleReset);
    };
  }, []);

  const renderNode = (node: any, index: number) => {
    const isSpecialType = dsaType === 'graph' || dsaType === 'hashmap';
    const nodeSize = isSpecialType ? 50 : 60;
    const fontSize = isSpecialType ? 12 : 14;

    return (
      <g key={node.id} className="animate-node-enter node-shadow transition-transform duration-200 hover:scale-[1.02]">
        {/* Node Rectangle */}
        <defs>
          <linearGradient id={`grad-${node.id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--accent-start)" stopOpacity="0.95" />
            <stop offset="100%" stopColor="var(--accent-end)" stopOpacity="0.95" />
          </linearGradient>
        </defs>
        <rect
          x={node.x - nodeSize / 2}
          y={node.y - nodeSize / 2}
          width={nodeSize}
          height={nodeSize}
          rx="10"
          fill={`url(#grad-${node.id})`}
          stroke="var(--accent-stroke)"
          strokeWidth="1.5"
        />
        
        {/* Node Value */}
        <text
          x={node.x}
          y={node.y}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-semibold"
          fontSize={fontSize}
        >
          {String(node.value).length > 8 
            ? String(node.value).substring(0, 8) + '...' 
            : node.value}
        </text>

        {/* Index label for arrays, stacks, queues */}
        {(dsaType === 'array' || dsaType === 'stack' || dsaType === 'queue') && (
          <text
            x={node.x}
            y={node.y + nodeSize / 2 + 20}
            textAnchor="middle"
            className="fill-gray-600 dark:fill-gray-400 text-xs"
            fontSize="12"
          >
            {index}
          </text>
        )}
      </g>
    );
  };

  const renderEdge = (edge: any) => {
    const fromNode = visualState.nodes.find(n => n.id === edge.from);
    const toNode = visualState.nodes.find(n => n.id === edge.to);

    if (!fromNode || !toNode) return null;

    // Calculate arrow position
    const dx = toNode.x - fromNode.x;
    const dy = toNode.y - fromNode.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const nodeRadius = 30;

    // Adjust start and end points to be at the edge of the circles
    const startX = fromNode.x + (dx / distance) * nodeRadius;
    const startY = fromNode.y + (dy / distance) * nodeRadius;
    const endX = toNode.x - (dx / distance) * nodeRadius;
    const endY = toNode.y - (dy / distance) * nodeRadius;

    return (
      <g key={`${edge.from}-${edge.to}`} className="animate-fadeIn">
        {/* Line */}
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          className="stroke-gray-400 dark:stroke-gray-500"
          strokeWidth="2"
          markerEnd="url(#arrowhead)"
          style={{ ['--edge-length' as any]: `${distance}` }}
          strokeDasharray={distance}
          strokeDashoffset={distance}
          className="stroke-gray-400 dark:stroke-gray-500 edge-draw"
        />
        
        {/* Edge Label */}
        {edge.label && (
          <text
            x={(startX + endX) / 2}
            y={(startY + endY) / 2 - 10}
            textAnchor="middle"
            className="fill-gray-600 dark:fill-gray-400 text-xs"
            fontSize="11"
          >
            {edge.label}
          </text>
        )}
      </g>
    );
  };

  const getEmptyStateMessage = () => {
    const messages: Record<DSAType, string> = {
      array: 'Array is empty. Run code to add elements.',
      linkedlist: 'Linked List is empty. Run code to add nodes.',
      doublylinkedlist: 'Doubly Linked List is empty. Run code to add nodes.',
      circularlinkedlist: 'Circular Linked List is empty. Run code to add nodes.',
      stack: 'Stack is empty. Run code to push elements.',
      queue: 'Queue is empty. Run code to enqueue elements.',
      hashmap: 'HashMap is empty. Run code to add key-value pairs.',
      bst: 'Binary Search Tree is empty. Run code to insert nodes.',
      graph: 'Graph is empty. Run code to add vertices and edges.',
    };
    return messages[dsaType] || 'Data structure is empty.';
  };

  const getViewBoxDimensions = () => {
    if (visualState.nodes.length === 0) {
      return { width: 800, height: 600 };
    }

    // Calculate bounds based on node positions
    const padding = 80;
    const nodeSize = 60;
    
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    
    visualState.nodes.forEach(node => {
      minX = Math.min(minX, node.x - nodeSize);
      minY = Math.min(minY, node.y - nodeSize);
      maxX = Math.max(maxX, node.x + nodeSize);
      maxY = Math.max(maxY, node.y + nodeSize);
    });

    const width = Math.max(800, maxX - minX + padding * 2);
    const height = Math.max(400, maxY - minY + padding * 2);

    return { width, height };
  };

  return (
    <div className="flex flex-col h-full">
      {/* Visualization Header */}
      <div className="panel-header">
        <h2 className="panel-title">Visualization</h2>
      </div>

      {/* SVG Canvas */}
      <div className="flex-1 overflow-auto p-4 bg-white dark:bg-gray-900 bg-grid">
        {visualState.nodes.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-400 dark:text-gray-600">
              <svg
                className="w-24 h-24 mx-auto mb-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <p className="text-lg">{getEmptyStateMessage()}</p>
            </div>
          </div>
        ) : (
          <svg
            ref={svgRef}
            className="w-full h-auto"
            viewBox={`0 0 ${getViewBoxDimensions().width} ${getViewBoxDimensions().height}`}
            preserveAspectRatio="xMidYMid meet"
            style={{ minHeight: '300px', maxHeight: '800px' }}
          >
            {/* Arrow marker definition */}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
                className="fill-gray-400 dark:fill-gray-500"
              >
                <polygon points="0 0, 10 3, 0 6" />
              </marker>
            </defs>

            {/* Render edges first (so they appear behind nodes) */}
            {visualState.edges?.map(edge => renderEdge(edge))}

            {/* Render nodes */}
            {visualState.nodes.map((node, index) => renderNode(node, index))}
          </svg>
        )}
      </div>

      {/* Info Message */}
      {visualState.message && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border-t border-blue-200 dark:border-blue-800 px-4 py-2">
          <p className="text-sm text-blue-800 dark:text-blue-300">
            {visualState.message}
          </p>
        </div>
      )}
    </div>
  );
};

export default VisualizationPanel;
