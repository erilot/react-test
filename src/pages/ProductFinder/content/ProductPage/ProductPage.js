import { Typography } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import _ from "lodash";
import React, { useState, useEffect } from "react";
import { ProductRelease } from "../../../../models/ProductRelease";
import groupReleases from "../../../../utilities/GroupReleases";
import ReleaseFilter from "../../../../components/finder/ReleaseFilter";
import { withStyles } from "@material-ui/styles";
import axios from "axios";
import NoticeCard from "../../../../components/atomic/cards/NoticeCard";
import ProductReleaseView from "./ProductReleaseView";

const styles = theme => ({
  root: {
    marginTop: 64,
    paddingTop: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      marginLeft: 320,
      flexShrink: 1
    }
  },
  paper: {
    borderRadius: 0,
    padding: theme.spacing(2)
  },
  row: {
    marginTop: theme.spacing(2)
  },
  contentWithOpenDrawer: {
    marginTop: 64,
    marginLeft: 330,
    padding: theme.spacing(2)
  },
  contentWithClosedDrawer: {
    marginTop: 64,
    padding: theme.spacing(2)
  },
  card: {
    borderRadius: 0
  }
});

function ProductPage(props) {
  const { classes, loaderManager, selected, store } = props;
  const [productReleases, setProductReleases] = useState({});
  const [selectedProductRelease, setSelectedProductRelease] = useState({});

  const product = selected.product;

  // Set initial state
  useEffect(() => {
    setSelectedProductRelease({});

    // If the product ID is defined (via "selected" prop), check to see if we've already
    // loaded it by looking in productReleases[product.id]. If we don't have it, go get it.
    if (product.id && productReleases[product.id] === undefined) {
      async function getProductReleases() {
        const urlBase = [
          "https://releases.teradici.com/jsonapi/node/teradici_product_release"
        ];

        const urlTerms = [];
        urlTerms.push("filter[a][condition][path]=field_in_product.id");
        urlTerms.push("filter[a][condition][value]=" + product.id);

        const includeTerms = [];
        // includeTerms.push("field_support_state");
        // includeTerms.push("field_component_releases");
        // includeTerms.push("field_component_releases.field_eula");
        // includeTerms.push("field_component_releases.field_eula.field_local_file_public_");
        // includeTerms.push("field_component_releases.field_teradici_download");
        // includeTerms.push("field_component_releases.field_teradici_document");
        // includeTerms.push("field_component_releases.field_teradici_document.field_doctype");
        // includeTerms.push("field_component_releases.field_teradici_document.field_resource_variant");
        // includeTerms.push("field_component_releases.field_teradici_document.field_local_file_public");

        const url =
          urlBase +
          "?" +
          urlTerms.join("&") +
          "&include=" +
          includeTerms.join(",");
        loaderManager.incrementMain();
        const response = await axios(url);

        console.log("response:", response.data);

        // const included = {
        //   docs: _.filter(response.data.included, ['type', 'node--teradici_document']),
        //   downloads: _.filter(response.data.included, ['type', 'node--teradici_download']),
        //   componentReleases: _.filter(response.data.included, ['type', 'node--teradici_release']),
        //   eulas: _.filter(response.data.included, ['type', 'node--teradici_eula']),
        //   files: _.filter(response.data.included, ['type', 'file--file']),
        // }
        //
        // console.log('included:::',included);

        const prs = [];
        _.forEach(response.data.data, pr => {
          return prs.push(new ProductRelease(pr, { store: store }));
        });

        const groupedReleases = groupReleases(prs);

        setProductReleases({
          ...productReleases,
          [product.id]: groupedReleases
        });

        loaderManager.decrementMain();
        // console.log("=>productReleases:", productReleases);

        // Set initial state
        setProductRelease(
          groupedReleases.current || groupedReleases.beta || null
        );
      }
      getProductReleases();
    } else if (product.id) {
      console.log(
        "already have it",
        productReleases[product.id].current ||
          productReleases[product.id].beta ||
          null
      );
      setSelectedProductRelease(
        productReleases[product.id].current ||
          productReleases[product.id].beta ||
          null
      );
    }

    const setProductRelease = selected => {
      setSelectedProductRelease(selected);
    };
  }, [selected.product.id]);

  // if (product.id && productReleases[product.id] === undefined) {
  //   // incrementLoadingCount();

  return (
    <div className={classes.root}>
      <Container className={classes.content}>
        {product.id && (
          <Fade in={true}>
            <div>
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
                        parentEntity={product}
                        releases={productReleases[product.id]}
                        upstreamSelectedRelease={selectedProductRelease || null}
                        setSelectedRelease={setSelectedProductRelease}
                      />
                    )}
                  </Grid>
                </Grid>
              </Paper>

              {/* Show product-level notices */}
              {!!product.notices.length && (
                <Grid container>
                  <Grid item xs={12} className={classes.row}>
                    {product.notices.map(n => {
                      const note = _.find(store.notices, sn => {
                        return sn.id === n;
                      });
                      return <NoticeCard note={note} />;
                    })}
                  </Grid>
                </Grid>
              )}
            </div>
          </Fade>
        )}
        {/* {selectedProductRelease.id && (<div>{selectedProductRelease.number}: {selectedProductRelease.id}</div>)} */}

        {/* Display a status message for releases outside of GA or Technical Support */}
        {selectedProductRelease.id &&
          (selectedProductRelease.supportState.isPreRelease ||
            !selectedProductRelease.supportState.isSupported) && (
            <Fade in={true}>
              <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="body1" color="error">
                      This release is in{" "}
                      {selectedProductRelease.supportState.title}.{" "}
                      {selectedProductRelease.supportState.shortDescription}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          )}

        {/* Development display of CR IDs */}
        {/* {selectedProductRelease &&
          selectedProductRelease.componentReleases &&
          selectedProductRelease.componentReleases.all.map(cr => {
            return <Typography variant="body1">{cr}</Typography>;
          })} */}

        {/* Pass on to product release view */}
        {selectedProductRelease && selectedProductRelease.componentReleases && (
          <ProductReleaseView
            productRelease={selectedProductRelease}
            product={selected.product}
            store={store}
            loaderManager={loaderManager}
          />
        )}
      </Container>
    </div>
  );
}

export default withStyles(styles)(ProductPage);
