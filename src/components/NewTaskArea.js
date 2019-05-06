import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StopWatch from './StopWatch';
import NewTaskForm from './NewTaskForm';

const styles = theme => ({
    content : {
        backgroundColor: '#FFF'
    },
})

function NewTaskArea({ classes }) {

    return(
        <Grid item xs={3} className={classes.content}>
            <StopWatch/>
            <NewTaskForm/>
        </Grid>
    ) 
}

export default withStyles(styles)(NewTaskArea);