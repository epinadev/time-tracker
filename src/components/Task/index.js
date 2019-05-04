import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import StopWatch from './StopWatch';

const styles = theme => {
    console.log(theme) 
    return {
    content : {
        backgroundColor: '#FFF'
    },
}}

function Task({ classes }) {

    return(
        <Grid item xs={4} className={classes.content}>
            <StopWatch/>
        </Grid>
    ) 
}

export default withStyles(styles)(Task);