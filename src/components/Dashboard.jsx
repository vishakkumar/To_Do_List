import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const statuses = ['Pending', 'In Progress', 'Completed'];

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const addTask = () => {
    if (!input.trim()) return;
    const now = new Date();
    const dateTime = now.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
    setTasks([{ id: Date.now(), text: input, status: 'Pending', dateTime }, ...tasks]);
    setInput('');
  };

  const handleDelete = () => {
    setTasks(tasks.filter(task => task.id !== taskToDelete));
    setConfirmDialogOpen(false);
    setTaskToDelete(null);
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const openEditDialog = (id, text) => {
    setEditingId(id);
    setEditingText(text);
    setEditDialogOpen(true);
  };

  const saveEditing = () => {
    if (!editingText.trim()) return;
    setTasks(tasks.map(task =>
      task.id === editingId ? { ...task, text: editingText } : task
    ));
    setEditDialogOpen(false);
    setEditingId(null);
    setEditingText('');
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'All') return true;
    return task.status === filter;
  });

  return (
    <Box sx={{
      flexGrow: 1,
      p: { xs: 1, md: 4 },
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      // bgcolor: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)',
      background: 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)'
    }}>
      <Paper elevation={6} sx={{
        width: { xs: '100%', sm: '95%', md: '90%' },
        p: { xs: 2, md: 4 },
        borderRadius: 4,
        bgcolor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        background: 'linear-gradient(90deg,rgba(42, 123, 155, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)'
      }}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'center',
            fontWeight: 600,
            color: '#333',
            fontSize: { xs: '1.5rem', sm: '2rem' },
          }}
        >
          📝 Task Dashboard
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
          alignItems: 'stretch',
        }}>
          <TextField
            label="Add a new task..."
            variant="filled"
            value={input}
            fullWidth
            onChange={(e) => setInput(e.target.value)}
            size="medium"
            sx={{bgcolor:'white'}}
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: '30px',
              bgcolor: '#4caf50',
              fontWeight: 600,
              minWidth: { xs: '100%', sm: '120px' },
              '&:hover': { bgcolor: '#43a047' },
            }}
            onClick={addTask}
          >
            Add
          </Button>
        </Box>

        <FormControl size="small" fullWidth>
          <InputLabel>Status Filter</InputLabel>
          <Select
            value={filter}
            label="Status Filter"
            onChange={(e) => setFilter(e.target.value)}
            sx={{color:'white'}}
          >
            <MenuItem value="All">All</MenuItem>
            {statuses.map(status => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{
          flexGrow: 1,
          mt: 2,
          pr: 1,
        }}>
          {filteredTasks.length === 0 ? (
            <Typography sx={{ textAlign: 'center', color: 'black', mt: 4 }}>
              No tasks match the selected filter.
            </Typography>
          ) : (
            <Grid container spacing={2} alignItems="stretch" justifyContent="center">
              {filteredTasks.map(task => {
                let cardBg;
                switch (task.status) {
                  case 'Completed': cardBg = 'rgb(142, 238, 125)'; break;
                  case 'In Progress': cardBg = '#fffde7'; break;
                  case 'Pending': default: cardBg = '#ffebee'; break;
                }

                return (
                  <Grid item xs={12} sm={6} md={4} key={task.id} display="flex" justifyContent="center">
                    <Card sx={{
                      flex: '1 1 auto',
                      maxWidth: 400,  
                      bgcolor: cardBg,
                      borderRadius: 3,
                      boxShadow: 3,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                      transition: 'transform 0.2s ease',
                      '&:hover': { transform: 'scale(1.02)' },
                    }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          sx={{
                            fontSize: { xs: '0.9rem', sm: '1rem' },
                            fontWeight: 500,
                            color: '#333',
                            textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                          }}
                        >
                          {task.text}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#555' }}>
                          Status: {task.status}
                        </Typography>
                        <Typography variant="caption" sx={{ color: '#999' }}>
                          Created: {task.dateTime}
                        </Typography>
                      </CardContent>

                      <CardActions sx={{
                        mt: 'auto',
                        justifyContent: { xs: 'center', sm: 'space-between' },
                        flexWrap: 'wrap',
                        gap: 1,
                      }}>
                        <Box>
                          <IconButton onClick={() => openEditDialog(task.id, task.text)} color="primary">
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setTaskToDelete(task.id);
                              setConfirmDialogOpen(true);
                            }}
                            color="error"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                        <FormControl size="small" sx={{ minWidth: { xs: '100px', sm: '120px' } }}>
                          <Select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                          >
                            {statuses.map(status => (
                              <MenuItem key={status} value={status}>{status}</MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>

        {/* Edit Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle sx={{ bgcolor: '#f5f5f5', fontWeight: 600 }}>
            ✏️ Edit Task
          </DialogTitle>
          <DialogContent dividers>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                label="Task Description"
                type="text"
                fullWidth
                variant="outlined"
                value={editingText}
                onChange={(e) => setEditingText(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={tasks.find(task => task.id === editingId)?.status || ''}
                  label="Status"
                  onChange={(e) =>
                    setTasks(tasks.map(task =>
                      task.id === editingId ? { ...task, status: e.target.value } : task
                    ))
                  }
                >
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between' }}>
            <Button
              onClick={() => {
                setEditDialogOpen(false);
                setTaskToDelete(editingId);
                setConfirmDialogOpen(true);
              }}
              color="error"
              variant="outlined"
            >
              Delete
            </Button>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button onClick={() => setEditDialogOpen(false)} color="primary">
                Cancel
              </Button>
              <Button onClick={saveEditing} color="primary" variant="contained">
                Save
              </Button>
            </Box>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={confirmDialogOpen}
          onClose={() => setConfirmDialogOpen(false)}
        >
          <DialogTitle sx={{ bgcolor: '#f5f5f5', fontWeight: 600 }}>
            🗑️ Confirm Delete
          </DialogTitle>
          <DialogContent>
            <DialogContentText sx={{ mt: 1 }}>
              Are you sure you want to delete this task? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => {
                handleDelete();
                setEditDialogOpen(false);
              }}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export default Dashboard;



