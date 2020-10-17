import React from 'react';
import './App.css';

function App() {
  const date = new Date();
  
  return (
    <div className="App">
      <header className="App-header">
        <div id="date">{date.toLocaleDateString()}</div>
      </header>
    </div>
  );
}

export default App;
