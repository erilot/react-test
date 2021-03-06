import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core";
import NavBar from "../../components/navs/NavBar";
import ProductDrawer from "./navigation/ProductDrawer";
import { Subscription } from "../../models/Subscription";
import axios from "axios";
import { Notice } from "../../models/Notice";
import { Product } from "../../models/Product";
import { SupportState } from "../../models/SupportState";
import _ from "lodash";
import ProductPage from "./content/ProductPage/ProductPage";

const styles = theme => ({});

function ProductFinderLayout(props) {
  const { loaderManager } = props;

  // UI sizes
  const uiSizes = {
    drawerWidth: 330,
    appBarHeight: 64
  };

  // Mobile state
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  // Global store
  const [store, setStore] = useState({
    subscriptions: [],
    products: [],
    supportStates: []
  });

  // Selected state items. These represent entities that have been selected or chosen by the user via the UI.
  const [selected, setSelected] = useState({
    subscription: { id: null },
    product: { id: null }
  });

  // const product = selected.product;

  // Initial data load. Uses the useEffect hook, and only executes once.
  useEffect(() => {
    console.log("useEffect firing in app.js, should only happen once");

    // Get subscription list
    loaderManager.incrementMain();
    async function getSubscriptions() {
      const subscriptionUrl =
        "https://releases.teradici.com/jsonapi/taxonomy_term/teradici_subscriptions?include=field_logo";
      const response = await axios(subscriptionUrl);

      const subscriptions = [];
      _.forEach(response.data.data, s => {
        return subscriptions.push(new Subscription(s, response.data.included));
      });
      setStore(store => ({ ...store, subscriptions: subscriptions }));
      loaderManager.decrementMain();
    }
    getSubscriptions();

    // Get product list
    loaderManager.incrementMain();
    async function getProducts() {
      const productUrl =
        "http://releases.teradici.com/jsonapi/taxonomy_term/teradici_toplevel_products";

      const include = [];
      include.push("field_related_notices");
      const response = await axios(
        productUrl + "?include=" + include.join(",")
      );
      const products = [];

      const notices = _.map(
        _.filter(response.data.included, ["type", "node--notice"]),
        n => {
          return new Notice(n);
        }
      );

      setStore(store => ({ ...store, notices: notices }));

      _.forEach(response.data.data, p => {
        return products.push(new Product(p));
      });

      setStore(store => ({ ...store, products: products }));
      loaderManager.decrementMain();
    }
    getProducts();

    // Get support states
    loaderManager.incrementMain();
    async function getSupportStates() {
      const productUrl =
        "http://releases.teradici.com/jsonapi/taxonomy_term/teradici_support_states";
      const response = await axios(productUrl);
      const supportStates = [];

      _.forEach(response.data.data, ss => {
        return supportStates.push(new SupportState(ss, response.data.included));
      });

      setStore(store => ({ ...store, supportStates: supportStates }));
      loaderManager.decrementMain();
    }
    getSupportStates();
  }, []);

  // Subscription selection setter. Pass this as props to child components as needed.
  const setters = {
    resolveSubscription: (e, id) => {
      setSelected({
        ...selected,
        subscription: _.find(store.subscriptions, ["id", id]) || {}
      });
      // console.log('Set subscription:', _.find(store.subscriptions, ["id", id]))
    },
    resolveProduct: (product) => {
      setSelected({
        ...selected,
        product: product || {}
      });
    }
  };

  const mobileHandler = {
    mobileOpen: mobileOpen,
    toggleDrawer: handleDrawerToggle
  };

  return (
    <React.Fragment>
      <NavBar
        title={"Teradici Documents and Downloads"}
        loaderManager={loaderManager}
        mobile={mobileHandler}
      />
      <ProductDrawer
        loaderManager={loaderManager}
        setters={setters}
        store={store}
        selected={selected}
        mobile={mobileHandler}
        uiSizes={uiSizes}
      />
      <ProductPage
        loaderManager={loaderManager}
        setters={setters}
        store={store}
        selected={selected}
        mobile={mobileHandler}
        uiSizes={uiSizes}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(ProductFinderLayout);
