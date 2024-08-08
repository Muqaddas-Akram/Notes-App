import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

function AddNotes() {
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0.0);
  const [checkedNotes, setCheckedNotes] = useState([]);
  const [showCheckedNotes, setShowCheckedNotes] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem('notes')) || [];
    if (localStorageData.length > 0) {
      setNotes(localStorageData);
    }
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAddNote = () => {
    if (title.trim() === '' || notes.some((note) => note.note.trim() === '' || note.amount === '')) {
      alert('Please fill in all fields before adding a note.');
      return;
    }

    const newNote = { title, checked: false, note: '', amount: '' };

    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes, newNote];
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };

  const handleNoteChange = (index, newNote) => {
    const updatedNotes = [...notes];
    updatedNotes[index].note = newNote;
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const handleDeleteNote = (index) => {
    const deletedNote = notes[index];
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));

    const updatedCheckedNotes = checkedNotes.filter((note) => note !== deletedNote);
    setCheckedNotes(updatedCheckedNotes);
    const newArchivedAmount = calculateTotalAmount(updatedCheckedNotes);
    setTotalAmount(newArchivedAmount);
  };

  const handleAmountChange = (index, newAmount) => {
    const updatedNotes = [...notes];
    updatedNotes[index].amount = parseFloat(newAmount) || 0.0;
    setNotes(updatedNotes);
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  
    const newTotalAmount = updatedNotes.reduce((sum, note) => sum + note.amount, 0);
    setTotalAmount(parseFloat(newTotalAmount.toFixed(1)));
  };

  const handleCheckboxChange = (index) => {
    const updatedNotes = [...notes];
    updatedNotes[index].checked = !updatedNotes[index].checked;
    setNotes(updatedNotes);
    setCheckedNotes(updatedNotes.filter((note) => note.checked));
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  };

  const toggleCheckedNotes = () => {
    setShowCheckedNotes(!showCheckedNotes);
  };

  const calculateTotalAmount = (notesArray) => {
    return notesArray.reduce((sum, note) => sum + (note.checked ? note.amount : 0), 0);
  };

  const archivedAmount = calculateTotalAmount(checkedNotes);

  return (
    <div style={{ backgroundColor: '#FFDAB9', position: 'relative', minHeight: '100vh' }}>
      <Navbar expand="lg" className="bg-warning">
        <Container fluid>
          <Navbar.Brand as={Link} to="/navbar">
            <FontAwesomeIcon onClick={handleAddNote} icon={faArrowLeft} style={{ marginRight: '20px' }} />
            Add Notes
          </Navbar.Brand>
        </Container>
      </Navbar>

      <Container className="mt-3">
        <Form className="d-flex justify-content-center align-items-center flex-wrap">
          <Form.Control
            type="search"
            placeholder="Title"
            style={{ width: '100%', maxWidth: '300px', marginBottom: '15px' }}
            aria-label="Search"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Button
            style={{
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
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              zIndex: 1000,
            }}
            onClick={handleAddNote}
          >
            +
          </Button>
        </Form>

        <div className="mt-3">
          <h5>Sum: {totalAmount.toFixed(1)}</h5>
        </div>

        <div className="mt-3">
          {notes.map((note, index) => (
            <div key={index} className="card mt-3" style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto'}}>
              <div className="card-body d-flex align-items-center flex-wrap">
                <input
                  type="checkbox"
                  checked={note.checked}
                  onChange={() => handleCheckboxChange(index)}
                />
                <input
                  type="text"
                  placeholder="Note"
                  style={{ marginLeft: '10px', flex: 1, marginBottom: '10px' }}
                  value={note.note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Amount"
                  style={{ marginLeft: '10px', flex: 1, marginBottom: '10px' }}
                  value={note.amount}
                  onChange={(e) => handleAmountChange(index, e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  style={{ cursor: 'pointer', marginLeft: '10px' }}
                  onClick={() => handleDeleteNote(index)}
                />
              </div>
              <p style={{ color: 'grey', fontSize: 'small', marginLeft: '30px' }}>
                {currentDateTime.toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        <Button
          style={{
            backgroundColor: '#FF8C00',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
            border: 'none',
            marginTop: '20px',
            width: '100%',
            maxWidth: '300px',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          onClick={toggleCheckedNotes}
        >
          {showCheckedNotes ? 'Hide Archive' : 'Show Archive'}
        </Button>

        {showCheckedNotes && checkedNotes.length > 0 && (
          <div className="mt-3">
            <h5>Sum: {archivedAmount.toFixed(1)}</h5>
            {checkedNotes.map((note, index) => (
              <div key={index} className="card mt-3" style={{ maxWidth: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                <div className="card-body d-flex align-items-center flex-wrap">
                  <input
                    type="checkbox"
                    checked={note.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <input
                    type="text"
                    placeholder="Note"
                    style={{ marginLeft: '10px', flex: 1, marginBottom: '10px' }}
                    value={note.note}
                    onChange={(e) => handleNoteChange(index, e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Amount"
                    style={{ marginLeft: '10px', flex: 1, marginBottom: '10px' }}
                    value={note.amount}
                    onChange={(e) => handleAmountChange(index, e.target.value)}
                  />
                  <FontAwesomeIcon
                    icon={faTimes}
                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                    onClick={() => handleDeleteNote(index)}
                  />
                </div>
                <p style={{ color: 'grey', fontSize: 'small', marginLeft: '30px' }}>
                  {currentDateTime.toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AddNotes;
