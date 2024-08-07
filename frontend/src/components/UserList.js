import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Typography, List, ListItem, ListItemText, Alert, Container, Box } from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to fetch users');
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
      setSuccess('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
      setError('Failed to delete user');
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, p: 3, borderRadius: 2, boxShadow: 1, backgroundColor: 'background.paper' }}>
        <Typography variant="h4" gutterBottom>
          User List
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <List>
          {users.map(user => (
            <ListItem
              key={user._id}
              secondaryAction={
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </Button>
              }
              sx={{ mb: 1, borderRadius: 1, boxShadow: 1, backgroundColor: 'background.default' }}
            >
              <ListItemText primary={`${user.name} (${user.email})`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
};

export default UserList;
