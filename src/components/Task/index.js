import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    content : {
        backgroundColor: '#FFF'
    }
})

function Task({ classes }) {

    return(
        <Grid item xs={3} className={classes.content}>
            taskArea
        </Grid>
    ) 
}

export default withStyles(styles)(Task);