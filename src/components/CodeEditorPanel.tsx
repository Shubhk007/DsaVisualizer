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

  const handleEditorMount = (editor: any, monaco: any) => {
    // Define elegant light theme
    monaco.editor.defineTheme('elegant-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: '', foreground: '1f2937' },
        { token: 'comment', foreground: '6b7280' },
        { token: 'string', foreground: '16a34a' },
        { token: 'number', foreground: '0ea5e9' },
        { token: 'keyword', foreground: '4f46e5', fontStyle: 'bold' },
      ],
      colors: {
        'editor.background': '#ffffff',
        'editorLineNumber.foreground': '#9ca3af',
        'editorLineNumber.activeForeground': '#4b5563',
        'editorGutter.background': '#f3f4f6',
        'editor.selectionBackground': '#e0e7ff',
        'editor.inactiveSelectionBackground': '#e0e7ff88',
        'editorCursor.foreground': '#4338ca',
      },
    });

    // Define elegant dark theme
    monaco.editor.defineTheme('elegant-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: '', foreground: 'e5e7eb' },
        { token: 'comment', foreground: '94a3b8' },
        { token: 'string', foreground: '22c55e' },
        { token: 'number', foreground: '38bdf8' },
        { token: 'keyword', foreground: '818cf8', fontStyle: 'bold' },
      ],
      colors: {
        'editor.background': '#0f172a',
        'editorLineNumber.foreground': '#475569',
        'editorLineNumber.activeForeground': '#cbd5e1',
        'editorGutter.background': '#0b1220',
        'editor.selectionBackground': '#312e81',
        'editor.inactiveSelectionBackground': '#312e8188',
        'editorCursor.foreground': '#a5b4fc',
      },
    });
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
    <div className="flex flex-col h-full">
      {/* Editor Header */}
      <div className="panel-header">
        <h2 className="panel-title">
          Code Editor
          <span className="ml-3 text-xs text-gray-500 dark:text-gray-400 font-normal">
            {isRunning ? '⚡ Updating...' : '✓ Auto-updates'}
          </span>
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="btn-secondary"
          >
            Reset Code
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-900">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          value={code}
          onChange={handleEditorChange}
          theme={theme === 'dark' ? 'elegant-dark' : 'elegant-light'}
          onMount={handleEditorMount}
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
      <div className="border-t border-gray-200 dark:border-gray-700">
        <div className="panel-header">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21h8a2 2 0 002-2V7a2 2 0 00-2-2H8a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Console Output
          </h3>
        </div>
        <div className="px-4 py-3 h-48 overflow-y-auto font-mono text-sm bg-white dark:bg-gray-800">
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
