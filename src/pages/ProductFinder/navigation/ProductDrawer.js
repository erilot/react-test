import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import { withStyles } from "@material-ui/styles";
import React from "react";
import ProductFilter from "../../../components/finder/ProductFilter";
import SubscriptionFilter from "../../../components/finder/SubscriptionFilter";
import { Hidden } from "@material-ui/core";

const drawerWidth = 320;

const styles = theme => ({
  root: {
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: 64,
  },
});

function ProductDrawer(props) {
  const { store, selected, setters, container, mobile, classes } = props;
  const drawerContent = (
    <div>
      {store.subscriptions && (
        <SubscriptionFilter
          subscriptions={store.subscriptions}
          selected={selected.subscription}
          setSubscription={setters.resolveSubscription}
        />
      )}

      <Divider />

      {store.products && (
        <ProductFilter
          products={store.products}
          selected={selected}
          setProduct={setters.resolveProduct}
        />
      )}
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          className={classes.drawer}
          open={mobile.mobileOpen}
          onClose={mobile.toggleDrawer}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{ paper: classes.drawerPaper }}
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>
    </nav>
  );
}

export default withStyles(styles)(ProductDrawer);
