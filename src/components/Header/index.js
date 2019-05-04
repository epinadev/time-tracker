import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles';

function Header(props) {
    const { classes, open, handleDrawerOpen } = props;
    const {
        appBar, 
        appBarShift, 
        menuButton, 
        menuButtonHidden, 
        title, 
        toolbar
    } = classes;

    return (
        <AppBar position="absolute" className={classNames(appBar, open && appBarShift)} >
          <Toolbar disableGutters={!open} className={toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerOpen}
              className={classNames(menuButton, open && menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={title}>
              Dashboard
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
    )
}

export default withStyles(styles)(Header);