import React from 'react';
import './App.css';
import Calculator from './components/Calculator';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>⚛️ React Calculator</h1>
        <p>Phase 2: Modern Frontend Development</p>
      </header>
      <main>
        <Calculator />
      </main>
    </div>
  );
}

export default App;
