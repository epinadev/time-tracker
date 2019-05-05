import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StopWatch from './StopWatch';
import { TaskContext } from '../store/TaskContext';
import NewTaskForm from './NewTaskForm';

const styles = theme => ({
    content : {
        backgroundColor: '#FFF'
    },
})

function NewTaskArea({ classes }) {

    return(
        <TaskContext.Consumer>
            {({ addTask })=> (
                <Grid item xs={4} className={classes.content}>
                    <StopWatch addTask={addTask}/>
                    <NewTaskForm/>
                </Grid>
            )}
        </TaskContext.Consumer>

    ) 
}

export default withStyles(styles)(NewTaskArea);