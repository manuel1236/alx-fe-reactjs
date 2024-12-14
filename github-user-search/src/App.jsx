// src/App.jsx
import React from 'react';
import Search from './components/Search';

const App = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>GitHub User Search</h1>
      <Search />
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    padding: '20px',
  },
  heading: {
    color: '#333',
  },
};

export default App;