import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Paper, Typography, Button } from '@mui/material';
import './DataDisplay.css';

const DataDisplay = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/users`)
      .then(response => setData(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`)
      .then(response => {
        console.log('User deleted:', response.data);
        setData(data.filter(user => user._id !== id)); // Mise à jour de l'état
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <Paper style={{ padding: 20, marginTop: 20 }}>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>
      <ul>
        {data.map(user => (
          <li key={user._id}>
            {user.name} ({user.email})
            <Button
              onClick={() => handleDelete(user._id)}
              variant="contained"
              color="secondary"
              style={{ marginLeft: 10 }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </Paper>
  );
};

export default DataDisplay;
