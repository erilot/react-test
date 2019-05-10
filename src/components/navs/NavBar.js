import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/styles";
import LinearLoader from "../loaders/LinearLoader";
// import TeradiciLogoLarge from '../atomic/images/TeradiciLogoLarge';

const styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: "fixed"
  },
  toolbar: theme.mixins.toolbar
});

const NavBar = props => {
  const { classes, loaderManager } = props;
  console.log("==>Navbar rendering", props);
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
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
      {console.log(
        "ls/navbar:",
        loaderManager.loadingState.main,
        loaderManager.loadingState.background
      )}
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
