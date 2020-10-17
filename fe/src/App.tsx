import React from 'react';
import './App.css';

function App() {
  const date = new Date();
  
  return (
    <div className="App">
      <div id="date">{date.toLocaleDateString()}</div>
      <div id="body" contentEditable="true"></div>
      <div id="save">Save</div>
    </div>
  );
}

export default App;
