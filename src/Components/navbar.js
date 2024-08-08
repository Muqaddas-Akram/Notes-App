import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import NoteCard from './NoteCard'; 
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function NavScrollExample() {
  const navigate = useNavigate();
  const [storedData, setStoredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newNote, setNewNote] = useState(null);

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('notes')) || [];
    setStoredData(localStorageData);
  }, []);

  const handleClick = () => {
    navigate('/addnotes');
  };

  const handleAddNote = (note) => {
    setStoredData((prevData) => {
      const updatedData = [...prevData, note];
      localStorage.setItem('notes', JSON.stringify(updatedData));
      return updatedData;
    });
    setNewNote(note);
  };

  const handleDeleteNoteCard = (title) => {
    const updatedData = storedData.filter((note) => note.title !== title);
    localStorage.setItem('notes', JSON.stringify(updatedData));
    setStoredData(updatedData);
  };
  
  const groupNotesByTitle = (notes) => {
    const groupedNotes = {};
    notes.forEach((note) => {
      const title = note.title;
      if (groupedNotes[title]) {
        groupedNotes[title].push(note);
      } else {
        groupedNotes[title] = [note];
      }
    });
    return groupedNotes;
  };

  const filteredNotes = storedData.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.note.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedNotes = groupNotesByTitle(filteredNotes);

  return (
    <div style={{ backgroundColor: '#FFDAB9', position: 'relative', minHeight: '100vh' }}>
      <Navbar expand="lg" className="bg-warning">
        <Container fluid>
          <Navbar.Brand href="#">Notes</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {/* Add any navigation links here if needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Form className="d-flex justify-content-center mt-3">
        <Form.Control
          type="search"
          placeholder="Search Notes"
          style={{ width: '30%' }}
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form>

      <Button
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '50%',
          backgroundColor: '#FF8C00',
          color: 'white',
          width: '60px',
          height: '60px',
          fontSize: '24px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
          border: 'none',
        }}
        onClick={handleClick}
      >
        +
      </Button>

      <Container className="mt-3">
        {Object.entries(groupedNotes).map(([title, notes], index) => (
          <NoteCard
            key={index}
            title={title}
            notes={notes}
            onDelete={() => handleDeleteNoteCard(title)}
          />
        ))}
        {newNote && (
          <NoteCard title={newNote.title} notes={[newNote]} onDelete={() => handleDeleteNoteCard(newNote.title)} />
        )}
      </Container>
    </div>
  );
}

export default NavScrollExample;
