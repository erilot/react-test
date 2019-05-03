import { makeStyles, Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import * as _ from "lodash";
import React, { useState, useEffect } from "react";
import { ProductRelease } from "../../models/ProductRelease";
import groupReleases from "../../utilities/GroupReleases";
import ReleaseFilter from "../../components/finder/ReleaseFilter";
import SingleComponentPage from './SingleComponentPage';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 64,
    paddingTop: theme.spacing(3)
  },
  paper: {
    borderRadius: 0,
    padding: theme.spacing(2)
  },
  row: {
    paddingTop: theme.spacing(2)
  }
}));

function ProductPage(props) {
  const classes = useStyles();
  const { loadingState, selected, store } = props;

  const [productReleases, setProductReleases] = useState({});
  const [selectedProductRelease, setSelectedProductRelease] = useState({});

  const product = selected.product;

  // Set initial state
  useEffect(() => {
    console.log('product changed:',selected.product);
    setSelectedProductRelease({});
  }, [selected.product.id]);

  if (product.id && productReleases[product.id] === undefined) {
    // incrementLoadingCount();
    async function getProductReleases() {
      const urlBase = [
        "https://releases.teradici.com/jsonapi/node/teradici_product_release"
      ];

      const urlTerms = [];
      urlTerms.push("filter[a][condition][path]=field_in_product.id");
      urlTerms.push("filter[a][condition][value]=" + product.id);
      urlTerms.push("include=field_support_state");

      const url = urlBase + "?" + urlTerms.join("&");
      loadingState.incrementLoader();
      const response = await Axios(url);

      const prs = [];
      _.forEach(response.data.data, pr => {
        return prs.push(new ProductRelease(pr, { store: store }));
      });

      const groupedReleases = groupReleases(prs);

      setProductReleases({ ...productReleases, [product.id]: groupedReleases });

      loadingState.decrementLoader();
      // console.log("=>productReleases:", productReleases);

      // Set initial state
      setProductRelease(
        groupedReleases.current || groupedReleases.beta || null
      );
    }
    getProductReleases();
  }

  const setProductRelease = selected => {
    setSelectedProductRelease(selected);
  };

  return (
    <React.Fragment>
      <CssBaseline>
        <Container className={classes.root}>
          {product.id && (
            <Fade in={true}>
              <Paper className={classes.paper}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h2">{product.title}</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={9}>
                    <Typography
                      variant="body2"
                      dangerouslySetInnerHTML={{
                        __html: product.description
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} md={2}>
                    {productReleases[product.id] && (
                      <ReleaseFilter
                        classes={classes}
                        parentEntity={product}
                        releases={productReleases[product.id]}
                        setSelectedRelease={setSelectedProductRelease}
                      />
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Fade>
          )}

          {/* Display a status message for releases outside of GA or Technical Support */}
          {selectedProductRelease.id &&
            (selectedProductRelease.supportState.isPreRelease ||
              !selectedProductRelease.supportState.isSupported) && (
              <Fade in={true}>
                <Grid container spacing={2} className={classes.row}>
                  <Grid item xs={12}>
                    <Paper className={classes.paper}>
                      <Typography variant="body1" color="error">
                        {selectedProductRelease.supportState.shortDescription}
                      </Typography>
                    </Paper>
                  </Grid>
                </Grid>
              </Fade>
            )}

          {/* Products with a single component directly display that component info */}
          {selectedProductRelease.id &&
            selectedProductRelease.componentReleases.all.length === 1 && (
              <SingleComponentPage productRelease={selectedProductRelease} product={selected.product} store={store}/>
            )}
        </Container>
      </CssBaseline>
    </React.Fragment>
  );
}

export default ProductPage;
