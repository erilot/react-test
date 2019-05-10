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
    display: "flex"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  }
});

function ProductDrawer(props) {
  const { classes, store, selected, setters, container } = props;

  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

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
          className={classes.drawer}
          variant="fixed"
          classes={{
            paper: classes.drawerPaper
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
