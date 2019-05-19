import React, { useState, useContext, useReducer } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DialogContext } from "../store/DialogContext";
import { TaskContext } from "../store/TaskContext";
import { withStyles } from '@material-ui/core/styles';

const styles =theme => ({
    input: {
      minWidth: 400
    }
})


function TaskDialog(props) {
    const { classes } = props;
    const { dialog, setDialog } = useContext(DialogContext);
    const { addFutureTask, getTask, editTask } = useContext(TaskContext);
    const editingTask = dialog.taskId && getTask(dialog.taskId) || {};
    const [ state, setState ] = useState({ description: editingTask.description || '' });
    const handleClose = () => {
      setState({ description: ''});
      setDialog({ open:false, title: 'Edit task', taskId: false});
    } 
    const handleDescriptionChange = e => {
      const { value } = e.target;
      setState(prevState => ({...prevState, description: value}));
    } 
    const saveTask = e => {
      e.preventDefault();
      const { value } = e.target.elements.description;
      const description = Boolean(value) ? value : 'Empty task';
      dialog.taskId 
          ? editTask({ ...editingTask, description: description})
          : addFutureTask(description);
      handleClose();
    } 

    return (
          <Dialog open={dialog.open} onClose={handleClose} aria-labelledby="Edit task" >
            <form onSubmit={saveTask}>
            <DialogTitle id="form-dialog-title">{dialog.title}</DialogTitle>
            <DialogContent>
              <Input
                className={classes.input}
                placeholder="Enter a task description"
                autoFocus
                margin="dense"
                id="description"
                label="Provide a task description"
                type="text"
                onChange={handleDescriptionChange}
                value={state.description}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Save
              </Button>
              <Button color="primary" onClick={handleClose}>
                Cancel
              </Button>
            </DialogActions>
            </form>
          </Dialog>
    );
}

export default withStyles(styles)(TaskDialog);