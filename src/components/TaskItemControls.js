import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PlayArrow from "@material-ui/icons/PlayArrow";
import IconButton from '@material-ui/core/IconButton';
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import Stop from "@material-ui/icons/Stop";
import { TaskContext } from "../store/TaskContext";
import { DialogContext } from "../store/DialogContext";
import Update from "@material-ui/icons/Update";

const styles = theme => ({
    controls: {
        color: '#b9b8b8',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'space-between'
    },
    icon: {
        fontSize: 20,
        cursor: 'pointer'
    }
})

function TaskItemControls(props) {
    const { task, classes } = props;
    const { deleteTask, startRunningTask, reStartTask } = useContext(TaskContext);
    const { setDialog } = useContext(DialogContext);
    const handleDelete = () => deleteTask(task);
    const handleReStart = () => reStartTask(task)
    const handleEdit = () => setDialog({ open: true, title: 'Edit task', taskId: task.id })
    const handleStart = () => startRunningTask(task)
    const handleStop = () => {};
    const getActionButton = () => {
        switch (task.state) {
            case 'non-started':
                return (
                <IconButton className={classes.button} 
                            onClick={handleStart} 
                            aria-label="Edit">
                    <PlayArrow className={classes.icon}/>
                </IconButton>)
            case 'stopped':
                return (
                <IconButton className={classes.button} 
                            onClick={handleReStart} 
                            aria-label="Re-start">
                    <Update className={classes.icon} />
                </IconButton>)
            default:
                    break;
        }
        return (
            <IconButton className={classes.button} 
                        onClick={handleStop} 
                        aria-label="Re-start">
                <Stop className={classes.icon} />
            </IconButton>)
    }

    return(
        <div className={classes.controls}>
            {getActionButton()}
            <IconButton className={classes.button} 
                        onClick={handleEdit} 
                        aria-label="Edit">
                <Edit className={classes.icon}/>
            </IconButton>
            <IconButton className={classes.button} 
                        onClick={handleDelete} 
                        aria-label="Delete">
                <Delete className={classes.icon}/>
            </IconButton>
        </div>
    ) 
}

export default withStyles(styles)(TaskItemControls);