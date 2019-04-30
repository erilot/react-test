import React, { useState, useEffect } from 'react';
import NavBar from './components/navs/NavBar';
import ContentBody from './components/ContentBody';
import axios from 'axios';
import * as _ from 'lodash';
import { Subscription } from './models/subscription';
import LinearIndeterminate from './components/loaders/linear-indeterminate';
import { CssBaseline, Toolbar } from '@material-ui/core';
import { Product } from './models/product';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    padding: theme.spacing.unit * 3,
  },
  toolbar: theme.mixins.toolbar,
});


function App(props) {
  const { classes } = props;

  const [loadingCount, setLoadingCount] = useState(0);

  const [subscriptions, setSubscriptions] = useState([]);
  const [selectedSubscription, selectSubscription] = useState(null);

  const [products, setProducts] = useState([]);
  const [selectedProduct, selectProduct] = useState(null);

  /////

  const [store, setStore] = useState(
    {
      subscriptions: [],
      products: [],
    }
  );

  // const [activeStore, setActiveStore]



  useEffect(() => {
    setLoadingCount(loadingCount + 1);
    async function getSubscriptions() {
      const subscriptionUrl = 'https://releases.teradici.com/jsonapi/taxonomy_term/teradici_subscriptions?include=field_logo';
      const response = await axios(subscriptionUrl);

      _.forEach(response.data.data, s => { return subscriptions.push(new Subscription(s, response.data.included)) })
      setStore(store => ({ ...store, subscriptions: subscriptions }));
      setLoadingCount(loadingCount - 1);
    }
    getSubscriptions();

    setLoadingCount(loadingCount + 1);

    async function getProducts() {
      const productUrl = 'http://releases.teradici.com/jsonapi/taxonomy_term/teradici_toplevel_products';
      const response = await axios(productUrl);
      _.forEach(response.data.data, p => { return products.push(new Product(p, response.data.included)) })

      setStore(store => ({ ...store, products: products }));
      setLoadingCount(loadingCount - 1);

    }
    getProducts();
  }, []);

  function resolveSubscription(e, id) {
    selectSubscription(_.find(subscriptions, ['id', id]));
  };

  function resolveProduct(e, id) {
    selectProduct(_.find(products, ['id', id]));
    console.log('product selected:', selectedProduct);
  }

  return (

    <div className={classes.root}>
      <CssBaseline >
        <NavBar classes={classes} title={'Teradici McGee'}></NavBar>

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
          <Typography variant="h3">{loadingCount}</Typography>

          {store.subscriptions && <List>
            {store.subscriptions.map((sub, index) => (
              <ListItem button key={sub.id}>
                {/* <ListItemIcon>&nbsp;</ListItemIcon> */}
                <ListItemText primary={sub.title} />
              </ListItem>
            ))}
          </List>
          }
          <Divider />
          {store.products && <List>
            {store.products.map((product, index) => (
              <ListItem button key={product.id}>
                {/* <ListItemIcon>&nbsp;</ListItemIcon> */}
                <ListItemText primary={product.title} />
              </ListItem>
            ))}
          </List>
          }

        </Drawer>
        <ContentBody
          subscriptions={{ subscriptions: subscriptions, resolveSubscription: resolveSubscription, selectedSubscription: selectedSubscription }}
          products={{ products: products, resolveProduct: resolveProduct, selectedProduct: selectedProduct }}>
        </ContentBody>
      </CssBaseline>
    </div>
  );
}

export default withStyles(styles)(App);

//   return (
//     <React.Fragment>
//       <CssBaseline>
//         <NavBar title="Teradici" />
//         {loadingCount > 0 &&
//           <LinearIndeterminate color="secondary" />
//         }
//         <ContentBody
//           subscriptions={{ subscriptions: subscriptions, resolveSubscription: resolveSubscription, selectedSubscription: selectedSubscription }}
//           products={{ products: products, resolveProduct: resolveProduct, selectedProduct: selectedProduct }}>
//         </ContentBody>
//       </CssBaseline>
//     </React.Fragment>
//   );

// }

// export default App;
