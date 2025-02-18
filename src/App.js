import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AnimatedLayout from './components/AnimatedLayout';
import TeamList from './components/TeamList';
import TeamDetails from './components/TeamDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* The AnimatedLayout is our shared layout that animates route transitions */}
        <Route element={<AnimatedLayout />}>
          <Route path="/" element={<TeamList />} />
          <Route path="/teams/:id" element={<TeamDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
