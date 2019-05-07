import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {  withStyles } from "@material-ui/core/styles";

const styles = theme => ({
    icon: {
        color: '#CCC'
    }
})

function SideBar (props) {
    const { classes } = props;
    return(
        <div>
            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <AssignmentIcon/>
                </ListItemIcon>
                <ListItemText primary="Orders" />
            </ListItem>

            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItem>

            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItem>

            <ListItem button>
                <ListItemIcon className={classes.icon}>
                    <LayersIcon />
                </ListItemIcon>
                <ListItemText primary="Integrations" />
            </ListItem>
        </div>
    )
}

export default withStyles(styles)(SideBar);