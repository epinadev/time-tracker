import React, { useState, useContext } from 'react';
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
import Header from './Header';
import NewTaskArea from './NewTaskArea';
import TaskList from './TaskList';
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
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawerPaperClose: {
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
    marginTop: 40,
    paddingTop: theme.spacing.unit * 3,
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
          <TaskList/>
          <NewTaskArea/>
        </Grid>
      </div>
    </TaskProvider>
  )
}

export default withStyles(styles)(Dashboard);