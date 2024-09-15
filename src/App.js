import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Movie from './Movie';
import MovieDetail from './MovieDetail';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/movies" element={<Movie />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="*" element={<Navigate to="/movies" />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
