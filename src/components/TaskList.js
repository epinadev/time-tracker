import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TaskItem from './TaskItem';
import { TaskContext } from "../store/TaskContext";

const styles = theme => ({
    content : {
        backgroundColor: '#f4f3ff'
    }
})

function CalendarArea({ classes }) {

    return(
        <TaskContext.Consumer >
            {({tasks}) => (
                <Grid item xs={8} className={classes.content}>
                    { tasks.map(task => <TaskItem task={task} key={task.id}/>) }
                </Grid>
            )}
        </TaskContext.Consumer>
    ) 
}

export default withStyles(styles)(CalendarArea);