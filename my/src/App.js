import React from 'react';
import './App.css';
import { ContentProvider } from './context/ContentContext';
import CoverBlock from './Component/Banner/CoverBlock';
import DetailsBlock from './Component/Banner/DetailsBlock';

function App() {
  return (
    <ContentProvider>
      <div className="App">
        <CoverBlock />
        <DetailsBlock />
      </div>
    </ContentProvider>
  );
}

export default App;
