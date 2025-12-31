import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { DSAType } from '../types';
import { codeTemplates } from '../utils/codeTemplates';
import { executeSandboxedCode } from '../utils/sandbox';
import { useTheme } from '../contexts/ThemeContext';

interface CodeEditorPanelProps {
  dsaType: DSAType;
}

const CodeEditorPanel: React.FC<CodeEditorPanelProps> = ({ dsaType }) => {
  const { theme } = useTheme();
  const [code, setCode] = useState(codeTemplates[dsaType]);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-execute code when it changes (with debounce)
  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set new timer to execute code after 800ms of no typing
    debounceTimerRef.current = setTimeout(() => {
      executeCode();
    }, 800);

    // Cleanup on unmount
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [code]);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || '');
  };

  const executeCode = () => {
    setIsRunning(true);
    setOutput([]);
    setError(null);

    try {
      const result = executeSandboxedCode(code, dsaType);

      if (result.error) {
        setError(result.error);
      } else {
        setOutput(result.output);
      }

      // Dispatch custom event for visualization panel with the visualization state
      window.dispatchEvent(
        new CustomEvent('dsaInstanceUpdate', {
          detail: { 
            visualizationState: result.visualizationState,
            dsaType 
          },
        })
      );
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setCode(codeTemplates[dsaType]);
    setOutput([]);
    setError(null);
    window.dispatchEvent(new CustomEvent('dsaReset'));
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Editor Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 px-4 py-3 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Code Editor
          <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-normal">
            {isRunning ? '⚡ Updating...' : '✓ Auto-updates'}
          </span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded transition-colors"
          >
            Reset Code
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'vs-dark' : 'light'}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
          }}
        />
      </div>

      {/* Output Console */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700">
        <div className="px-4 py-2 bg-gray-100 dark:bg-gray-750 border-b border-gray-300 dark:border-gray-700">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Console Output
          </h3>
        </div>
        <div className="px-4 py-3 h-48 overflow-y-auto font-mono text-sm">
          {error && (
            <div className="text-red-600 dark:text-red-400 mb-2 p-2 bg-red-50 dark:bg-red-900/20 rounded">
              <strong>Error:</strong> {error}
            </div>
          )}
          {output.length > 0 ? (
            output.map((line, index) => (
              <div
                key={index}
                className="text-gray-800 dark:text-gray-300 py-0.5"
              >
                {line}
              </div>
            ))
          ) : (
            <div className="text-gray-400 dark:text-gray-600 italic">
              Run your code to see output here...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorPanel;
