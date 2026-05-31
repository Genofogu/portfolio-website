import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { okaidia } from '@uiw/codemirror-theme-okaidia';

// --- Data for our different languages ---
const languageSnippets = {
  javascript: {
    name: 'JavaScript',
    snippet: `// You can run this code!\nfunction greet(name) {\n  console.log("Hello, " + name + "!");\n}\n\ngreet("World");\nconsole.log("2 + 2 =", 2 + 2);`
  },
  python: {
    name: 'Python',
    snippet: `# This is a static example and cannot be run.\ndef greet(name):\n    print(f"Hello, {name}!")\n\ngreet("World")`
  },
  java: {
    name: 'Java',
    snippet: `// This is a static example and cannot be run.\nclass HelloWorld {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!"); \n    }\n}`
  },
  cpp: {
    name: 'C++',
    snippet: `// This is a static example and cannot be run.\n#include <iostream>\n\nint main() {\n    std::cout << "Hello World!";\n    return 0;\n}`
  }
};

function CodePlayground() {
  const [activeLang, setActiveLang] = useState('javascript');
  const [code, setCode] = useState(languageSnippets.javascript.snippet);
  const [output, setOutput] = useState([]);

  // This function handles switching between language tabs
  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
    setCode(languageSnippets[lang].snippet);
    setOutput([]); // Clear output when changing languages
  };

  // This is the magic function that executes the JS code
  const handleRunCode = () => {
    const newOutput = [];
    // Temporarily override console.log to capture its output
    const oldLog = console.log;
    console.log = (...args) => {
      newOutput.push({ type: 'log', message: args.join(' ') });
    };

    try {
      // Use the Function constructor for safer execution than eval()
      new Function(code)();
    } catch (error) {
      newOutput.push({ type: 'error', message: error.message });
    } finally {
      // Restore the original console.log and update our output state
      console.log = oldLog;
      setOutput(newOutput);
    }
  };

  return (
    <section className="playground-section">
      <div className="playground-wrapper">
        <div className="playground-header">
          <div className="playground-tabs">
            {Object.keys(languageSnippets).map(lang => (
              <button 
                key={lang} 
                className={`tab ${activeLang === lang ? 'active' : ''}`}
                onClick={() => handleLanguageChange(lang)}
              >
                {languageSnippets[lang].name}
              </button>
            ))}
          </div>
          <div className="playground-controls">
            <button 
              className="run-button" 
              onClick={handleRunCode}
              disabled={activeLang !== 'javascript'} // Disable button for non-JS languages
            >
              Run
            </button>
          </div>
        </div>
        <CodeMirror
          value={code}
          height="400px"
          theme={okaidia}
          extensions={[javascript({ jsx: true })]}
          onChange={(value) => setCode(value)}
          editable={activeLang === 'javascript'} // Make editor read-only for other languages
        />
        <div className="playground-output">
          <pre>
            {output.length > 0 ? (
              output.map((line, index) => (
                <div key={index} className={`output-line--${line.type}`}>
                  {line.message}
                </div>
              ))
            ) : (
              <div className="output-line--system">Click "Run" to see the output here.</div>
            )}
          </pre>
        </div>
      </div>
    </section>
  );
}

export default CodePlayground;