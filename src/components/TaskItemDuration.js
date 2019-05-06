import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    duration: {
        color: '#b9b8b8',
        display: 'flex',
        alignItems: 'center',
        fontSize: 13
    },
})

function TaskItemDuration(props) {
    const { hours, mins, secs, classes } = props;
    const formatDuration = () => {
        if (hours !== '00') {
            return `${hours}h ${mins}m ${secs}s`
        }
        if (mins !== '00') {
            return `${mins}m ${secs}s`
        }
        return `${secs} s`;
    }


    return(
        <div className={classes.duration}>
            {formatDuration()}            
        </div>
    ) 
}

export default withStyles(styles)(TaskItemDuration);