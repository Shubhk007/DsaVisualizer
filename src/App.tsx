import { useState, useRef, useCallback, useEffect } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import VisualizationPanel from './components/VisualizationPanel';
import CodeEditorPanel from './components/CodeEditorPanel';
import HelpModal from './components/HelpModal';
import { DSAType } from './types';

function App() {
  const [selectedDSA, setSelectedDSA] = useState<DSAType>('array');
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [visualizationKey, setVisualizationKey] = useState(0);
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleReset = () => {
    setVisualizationKey(prev => prev + 1);
  };

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const newLeftWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    
    // Constrain between 20% and 80%
    if (newLeftWidth >= 20 && newLeftWidth <= 80) {
      setLeftWidth(newLeftWidth);
    }
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Add/remove mouse event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove as any);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove as any);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  return (
    <div className="flex flex-col h-screen">
      <Navigation 
        selectedDSA={selectedDSA}
        onDSAChange={setSelectedDSA}
        onHelpClick={() => setIsHelpOpen(true)}
        onReset={handleReset}
      />
      
      <main className="flex-1 overflow-hidden">
        <div className="px-3 sm:px-4 py-3 h-full">
          <div ref={containerRef} className="flex h-full gap-0">
            {/* Visualization Panel */}
            <div className="panel h-full" style={{ width: `${leftWidth}%` }}>
              <VisualizationPanel 
                key={visualizationKey}
                dsaType={selectedDSA} 
              />
            </div>

            {/* Resizable Divider */}
            <div
              onMouseDown={handleMouseDown}
              className="w-1 bg-gray-300 dark:bg-gray-600 hover:bg-primary-500 dark:hover:bg-primary-500 cursor-col-resize transition-colors relative group"
              style={{ flexShrink: 0 }}
            >
              <div className="absolute inset-y-0 -left-1 -right-1 flex items-center justify-center">
                <div className="w-1 h-12 bg-gray-400 dark:bg-gray-500 group-hover:bg-primary-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Code Editor Panel */}
            <div className="panel h-full" style={{ width: `${100 - leftWidth}%` }}>
              <CodeEditorPanel 
                key={`${selectedDSA}-${visualizationKey}`}
                dsaType={selectedDSA} 
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      
      <HelpModal 
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />
    </div>
  );
}

export default App;
