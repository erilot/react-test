import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import linearIndeterminate from '../loaders/linear-indeterminate';

const NavBar = (props) => {
    const { classes } = props;
    console.log('classes:', classes);
    console.log('props:', props);
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>

                <IconButton
                    color="inherit"
                    aria-label="Open drawer"
                    //   onClick={this.handleDrawerToggle}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" noWrap>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;