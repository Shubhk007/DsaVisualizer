import { useState } from 'react';
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

  const handleReset = () => {
    setVisualizationKey(prev => prev + 1);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navigation 
        selectedDSA={selectedDSA}
        onDSAChange={setSelectedDSA}
        onHelpClick={() => setIsHelpOpen(true)}
        onReset={handleReset}
      />
      
      <main className="flex-1 flex overflow-hidden">
        <div className="flex w-full">
          {/* Visualization Panel - Left Side */}
          <div className="w-1/2 border-r border-gray-300 dark:border-gray-700">
            <VisualizationPanel 
              key={visualizationKey}
              dsaType={selectedDSA} 
            />
          </div>
          
          {/* Code Editor Panel - Right Side */}
          <div className="w-1/2">
            <CodeEditorPanel 
              key={`${selectedDSA}-${visualizationKey}`}
              dsaType={selectedDSA} 
            />
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
