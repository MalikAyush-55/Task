import React from 'react';
import Flashcard from './components/Flashcard';
import AdminDashboard from './components/Admindashboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Flashcard App</h1>
      <Flashcard />
      <AdminDashboard />
    </div>
  );
}

export default App
