import React from 'react';
import Input from '@material-ui/core/Input';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({

})

function NewTaskForm({classes}) {

    return(
        <React.Fragment>
            <Input
                placeholder="Add a decription"
                className={classes.input}
                inputProps={{
                'aria-label': 'Add a description',
                }}
            />
            
        </React.Fragment>
    )
}



export default withStyles(styles)(NewTaskForm)