import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    itemGroup: {
        display: 'flex',
        backgroundColor: '#FFF',
        margin: 25,
        justifyContent: 'space-between',
        marginTop: 40,
        fontSize: 12,
        textTransform: 'uppercase',
        padding:7,
        color: '#9c9c9c',
        borderBottom: '0.5px solid #eaeaea',
        '&:before': {
            content: 'unset !important'
        }
    },
})

function TaskItemGroup(props) {
    const { classes, group, state } = props;
    const date = group ? group.split('-')[1] : '' ;
    let hour = group ? group.split('-')[0] : 'to do';
    
    if (state === 'running') hour = "I'm working on:";

    return(
        <div className={classes.itemGroup}> 
            <div>{ hour }</div>
            <div>{ date }</div>
        </div>
    ) 
}

export default withStyles(styles)(TaskItemGroup);


