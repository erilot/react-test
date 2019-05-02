import React, { useState, useEffect } from 'react';
import NavBar from './components/navs/NavBar';
import ProductPage from './components/ProductPage';
import axios from 'axios';
import * as _ from 'lodash';
import { Subscription } from './models/subscription';
import LinearIndeterminate from './components/loaders/LinearIndeterminate';
import { CssBaseline } from '@material-ui/core';
import { Product } from './models/product';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import SubscriptionFilter from './components/finder/SubscriptionFilter';
import ProductFilter from './components/finder/ProductFilter';

const drawerWidth = 320;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    position: 'fixed',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});


function App(props) {

  const { classes } = props;
  const [loadingCount, setLoadingCount] = useState(0);

  const [store, setStore] = useState(
    {
      subscriptions: [],
      products: [],
    }
  );

  const [selected, setSelected] = useState(
    {
      subscription: { id: null },
      product: { id: null }
    });

  let loaders = 0;

  function incrementLoadingCount() {
    loaders++;
    setLoadingCount(loaders);
  }

  function decrementLoadingCount() {
    loaders--;
    setLoadingCount(loaders);
  }



  useEffect(() => {

    incrementLoadingCount();
    async function getSubscriptions() {
      const subscriptionUrl = 'https://releases.teradici.com/jsonapi/taxonomy_term/teradici_subscriptions?include=field_logo';
      const response = await axios(subscriptionUrl);

      const subscriptions = [];
      _.forEach(response.data.data, s => { return subscriptions.push(new Subscription(s, response.data.included)) })
      setStore(store => ({ ...store, subscriptions: subscriptions }));
      decrementLoadingCount();
    }
    getSubscriptions();

    incrementLoadingCount();
    async function getProducts() {
      const productUrl = 'http://releases.teradici.com/jsonapi/taxonomy_term/teradici_toplevel_products';
      const response = await axios(productUrl);
      const products = [];

      _.forEach(response.data.data, p => { return products.push(new Product(p, response.data.included)) })

      setStore(store => ({ ...store, products: products }));
      decrementLoadingCount()
    }
    getProducts();
  }, []);

  function resolveSubscription(e, id) {
    setSelected({ ...selected, subscription: _.find(store.subscriptions, ['id', id]) || {} });
  };

  function resolveProduct(e, id) {
    setSelected({ ...selected, product: _.find(store.products, ['id', id]) || {} });
  };

  return (

    <div className={classes.root}>
      <CssBaseline >
        <NavBar classes={classes} title={'Teradici Documents and Downloads'} loadingCount={loadingCount}></NavBar>

        {loadingCount > 0 &&
          <LinearIndeterminate color="secondary" />
        }

        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          {/* <Typography variant="h3">{loadingCount}</Typography> */}

          {store.subscriptions && <SubscriptionFilter
            subscriptions={store.subscriptions}
            selected={selected.subscription}
            setSubscription={resolveSubscription}
          />}

          <Divider />

          {store.products && <ProductFilter
            products={store.products}
            selected={selected}
            setProduct={resolveProduct}
          />}


        </Drawer>
        <ProductPage store={store} selected={selected} loadingState={
          { loadingCount: loadingCount, incrementLoader: incrementLoadingCount, decrementLoader: decrementLoadingCount }} />
      </CssBaseline>
    </div>
  );
}

export default withStyles(styles)(App);
