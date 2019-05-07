import React, { useState, useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import PlayArrow from "@material-ui/icons/PlayArrow";
import IconButton from '@material-ui/core/IconButton';
import Redo from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Stop from "@material-ui/icons/Stop";
import { TaskContext } from "../store/TaskContext";

const styles = theme => ({
    controls: {
        color: '#b9b8b8',
        display: 'flex',
        alignItems: 'center',
        justifyItems: 'space-between',
        width: 200
    },
    duration: {
        color: '#b9b8b8',
        display: 'flex',
        alignItems: 'center',
        fontSize: 16
    },
})

function TaskItemControls(props) {
    const { task, classes } = props;
    const { 
        deleteTask, 
        duplicateTask, 
        startRunningTask, 
        stopRunningTask } = useContext(TaskContext);
    const [ menuAnchor, setMenu ] = useState(null);
    const handleMenu = e => setMenu(e.currentTarget);
    const handleClose  = () => setMenu(null);
    const handleReStart = () => duplicateTask(task.id);
    const handleStart = () => startRunningTask(task);
    const handleStop = () => stopRunningTask();
    const handleDelete = () => {
        deleteTask(task);
        setMenu(null);
    } 
    const formatDuration = () => {
        return task.hours === '00' && task.mins === '00' && task.secs === '00' 
                ? 'Pending' 
                : `${task.hours}:${task.mins}:${task.secs}`;
    }
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
                    <Redo className={classes.icon} />
                </IconButton>)
            default:
                    break;
        }
        return (
            <IconButton className={classes.button} 
                        onClick={handleStop} 
                        aria-label="Stop">
                <Stop className={classes.icon} />
            </IconButton>)
    }

    return(
        <div className={classes.controls}>
            <div className={classes.duration}>
                {formatDuration()}
            </div>
            {getActionButton()}
            <IconButton className={classes.button} 
                        aria-owns={menuAnchor ? 'task-menu' : undefined}
                        aria-haspopup="true"
                        onClick={handleMenu} 
                        aria-label="Delete">
                <MoreVertIcon className={classes.icon}/>
            </IconButton>
            <Menu
                id="task-menu"
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
            </Menu>
        </div>
    ) 
}

export default withStyles(styles)(TaskItemControls);