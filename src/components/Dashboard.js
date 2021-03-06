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
import SideBar from './SideBar';
import NewTaskArea from './NewTaskArea';
import Agenda from './Agenda';
import { TaskProvider } from '../store/TaskContext';

const drawerWidth = 240;
const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '8px',
    ...theme.mixins.toolbar,
  },
  drawerPaperClose: {
    backgroundColor: '#333358',
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  content: {
    display: 'flex',
    width: '100%',
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
});


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
    <TaskProvider>
      <div className={classes.root}>
        <CssBaseline />
        {/* <Header open={open} handleDrawerOpen={handleDrawerOpen} /> */}
        <Drawer
          variant="permanent"
          open={open}
          classes={{
            paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
        >
          <div className={classes.toolbarIcon}>
            <img src="/logo.png" width={50} height={50} alt="Stopwatch icon"/>
          </div>

          <Divider />
            <List>
                <SideBar/> 
            </List>
          <Divider />
        </Drawer>
        <Grid container className={classes.content}>
          <Agenda/>
          <NewTaskArea/>
        </Grid>
      </div>
    </TaskProvider>
  )
}

export default withStyles(styles)(Dashboard);