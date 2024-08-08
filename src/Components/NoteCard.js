import React from 'react';
import Card from 'react-bootstrap/Card';
import { AiOutlineDelete } from 'react-icons/ai';

function NoteCard({ title, notes, onDelete }) {
  const handleDelete = () => {
    onDelete();
  };

  return (
    <div className="mt-3">
      <Card
        className="mt-3"
        style={{
          width: '100%',
          maxWidth: '500px', // Set a maximum width for larger screens
          marginLeft: 'auto',
          marginRight: 'auto',
          position: 'relative',
          display: 'inline-block',
        }}
      >
        <Card.Body>
          <h3>{title}</h3>
          {notes.map((note, index) => (
            <div
              key={index}
              className="d-flex align-items-center justify-content-between flex-wrap mb-2"
              style={{ fontSize: '1rem' }}
            >
              <div className="d-flex align-items-center">
                <input type="checkbox" checked={note.checked} />
                <span style={{ marginLeft: '0.5rem' }}><strong>Note:</strong> {note.note}</span>
              </div>
              <div>
                <strong>Amount:</strong> {note.amount}
              </div>
            </div>
          ))}
          <div
            className="mt-2 d-flex justify-content-center"
            style={{ cursor: 'pointer' }}
            onClick={handleDelete}
          >
            <AiOutlineDelete size={24} color="red" />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default NoteCard;
