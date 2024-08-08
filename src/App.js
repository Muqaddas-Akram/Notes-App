import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavScrollExample from './Components/navbar';
import AddNotes from './Components/addnotes';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NavScrollExample />} />
        <Route path="/navbar" element={<NavScrollExample />} />
        <Route path="/addnotes" element={<AddNotes />} />
      </Routes>
    </Router>
  );
}

export default App;
