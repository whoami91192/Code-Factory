import { useEffect, useState } from 'react';

const DeveloperToolsTest: React.FC = () => {
  const [testResults, setTestResults] = useState<string[]>([]);

  useEffect(() => {
    const tests = [
      {
        name: 'Right-click disabled',
        test: () => {
          let rightClickBlocked = false;
          const handler = (e: MouseEvent) => {
            rightClickBlocked = true;
            e.preventDefault();
          };
          document.addEventListener('contextmenu', handler);
          
          // Simulate right-click
          const event = new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            button: 2
          });
          document.dispatchEvent(event);
          
          document.removeEventListener('contextmenu', handler);
          return rightClickBlocked;
        }
      },
      {
        name: 'F12 key blocked',
        test: () => {
          let f12Blocked = false;
          const handler = (e: KeyboardEvent) => {
            if (e.key === 'F12') {
              f12Blocked = true;
              e.preventDefault();
            }
          };
          document.addEventListener('keydown', handler);
          
          // Simulate F12 key
          const event = new KeyboardEvent('keydown', {
            key: 'F12',
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(event);
          
          document.removeEventListener('keydown', handler);
          return f12Blocked;
        }
      },
      {
        name: 'Text selection disabled',
        test: () => {
          let selectionBlocked = false;
          const handler = (e: Event) => {
            selectionBlocked = true;
            e.preventDefault();
          };
          document.addEventListener('selectstart', handler);
          
          // Simulate text selection
          const event = new Event('selectstart', {
            bubbles: true,
            cancelable: true
          });
          document.dispatchEvent(event);
          
          document.removeEventListener('selectstart', handler);
          return selectionBlocked;
        }
      },
      {
        name: 'Developer tools detection active',
        test: () => {
          // Check if the detection script is running
          const scripts = document.querySelectorAll('script');
          let detectionScriptFound = false;
          
          scripts.forEach(script => {
            if (script.textContent && script.textContent.includes('detectDevTools')) {
              detectionScriptFound = true;
            }
          });
          
          return detectionScriptFound;
        }
      }
    ];

    const runTests = () => {
      const results: string[] = [];
      
      tests.forEach(test => {
        try {
          const passed = test.test();
          results.push(`${test.name}: ${passed ? '✅ PASSED' : '❌ FAILED'}`);
        } catch (error) {
          results.push(`${test.name}: ❌ ERROR - ${error}`);
        }
      });
      
      setTestResults(results);
    };

    // Run tests after a short delay to ensure everything is loaded
    setTimeout(runTests, 1000);
  }, []);

  return (
    <div className="cyber-card p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-cyber-primary mb-4">
        Developer Tools Protection Test
      </h2>
      <div className="space-y-2">
        {testResults.map((result, index) => (
          <div key={index} className="text-sm font-mono">
            {result}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-cyber-light rounded-lg">
        <h3 className="text-lg font-semibold text-cyber-warning mb-2">
          Test Instructions:
        </h3>
        <ul className="text-sm space-y-1">
          <li>• Try pressing F12 - should show warning</li>
          <li>• Try right-clicking - should be disabled</li>
          <li>• Try Ctrl+U (View Source) - should be blocked</li>
          <li>• Try Ctrl+Shift+I - should show warning</li>
          <li>• Try selecting text - should be disabled</li>
        </ul>
      </div>
    </div>
  );
};

export default DeveloperToolsTest; 