import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';

const styles = theme => ({
    content : {
        backgroundColor: '#f4f3ff'
    }
})

function TaskItem(props) {
    const { task } = props;
    const formatDuration = duration => {
        duration = duration.split(':');
        let secs = `${duration[2]} secs`;
        let mins = duration[1] === '00' ? '' : `${duration[1]} min and `
        let hours = duration[0] === '00' ? '' : `${duration[0]} hours, `

        return hours + mins + secs;
    }
    const display = task => {
        const start = moment(task.start).format('HH:mm:ss');
        const duration = formatDuration(task.duration)
        return `${start} ${task.description} ${duration}`;
    }

    return(
        <React.Fragment>
            <div>{ display(task) } </div>
        </React.Fragment>
    ) 
}

export default withStyles(styles)(TaskItem);