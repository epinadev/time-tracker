import React, { useState } from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SideBar from '../SideBar';
import Header from '../Header';
import styles from './styles';
import Task from '../Task';
import CalendarArea from '../CalendarArea';



function Dashboard(props) {
    const { classes } = props;
    const [ open, setOpen ] = useState(false);
    const handleDrawerClose = () => {
        setOpen(false);
    }
    const handleDrawerOpen = () => {
        setOpen(true);
    }

    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
        <Header open={open} handleDrawerOpen={handleDrawerOpen} />
        <Drawer
          variant="permanent"
          open={open}
          classes={{
            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>

          <Divider />
            <List>
                <SideBar/> 
            </List>
          <Divider />
        </Drawer>
        <Grid container className={classes.content}>
          <CalendarArea/>
          <Task/>
        </Grid>
      </div>

    )
}

export default withStyles(styles)(Dashboard);