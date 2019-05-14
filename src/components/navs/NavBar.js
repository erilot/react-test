import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton, Hidden } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import LinearLoader from "../loaders/LinearLoader";
// import TeradiciLogoLarge from '../atomic/images/TeradiciLogoLarge';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "fixed"
  },
  toolbar: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
});

const NavBar = props => {
  const { classes, loaderManager, mobile } = props;
  // console.log("==>Navbar rendering", props);
  return (
    <AppBar position="sticky" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Hidden smUp>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={mobile.toggleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant="h6" color="inherit" noWrap>
          {props.title}
        </Typography>
      </Toolbar>
      {loaderManager.loadingState.main > 0 && (
        <LinearLoader color={"primary"} />
      )}
      {loaderManager.loadingState.background > 0 && (
        <LinearLoader color={"secondary"} />
      )}
    </AppBar>
  );
};

export default withStyles(styles)(NavBar);
