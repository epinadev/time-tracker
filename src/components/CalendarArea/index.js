import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    content : {
        backgroundColor: '#f4f3ff'
    }
})

function CalendarArea({ classes }) {

    return(
        <Grid item xs={8} className={classes.content}>
            calendarArea
        </Grid>
    ) 
}

export default withStyles(styles)(CalendarArea);