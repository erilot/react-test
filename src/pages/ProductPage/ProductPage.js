import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Fade from "@material-ui/core/Fade";
import Axios from "axios";
import { ProductRelease } from "../../models/ProductRelease";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";

import Divider from "@material-ui/core/Divider";

import * as _ from "lodash";
import groupReleases from "../../utilities/GroupReleases";

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

  if (product.id && productReleases[product.id] === undefined) {
    console.log("gotta get it");

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
      console.log("=>productReleases:", productReleases);
    }
    getProductReleases();
  }

  const setProductRelease = (e, id) => {
    const selected = _.find(productReleases[product.id].all, pr => {
      return pr.id === id;
    });
    console.log("selected:", selected);
    setSelectedProductRelease(selected);
  };

  return (
    <React.Fragment>
      <CssBaseline />
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
                  Selected: {selected.id}
                  {productReleases[product.id] && (
                    <form className={classes.root}>
                      <FormControl className={classes.formControl}>
                        <Select
                          // Initialize with either the selected ID or the current release ID for this product
                          inputProps={{
                            value:
                              selectedProductRelease.id ||
                              productReleases[product.id].current.id
                          }}
                          value={
                            selectedProductRelease.id
                              ? selectedProductRelease.id
                              : ""
                          }
                          onChange={(e, item) => {
                            setProductRelease(e, item.props.value);
                          }}
                        >
                          {/* Beta releases */}
                          {productReleases[product.id].beta.map(pr => {
                            return (
                              <MenuItem key={pr.id} value={pr.id}>
                                <Typography variant="body1" color="secondary">
                                  {pr.number} (beta)
                                </Typography>
                                <Divider />
                              </MenuItem>
                            );
                          })}

                          {/* Supported releases */}
                          {productReleases[product.id].supported.map(pr => {
                            return (
                              <MenuItem key={pr.id} value={pr.id}>
                                <Typography variant="body1">
                                  {pr.number}
                                </Typography>
                                <Divider />
                              </MenuItem>
                            );
                          })}

                          {/* Unsupported releases */}
                          {productReleases[product.id].unsupported.length && (
                            <div>
                              <Divider />
                              <Typography
                                variant="caption"
                                color="textSecondary"
                              >
                                Unsupported releases
                              </Typography>
                              {productReleases[product.id].unsupported.map(
                                pr => {
                                  return (
                                    <MenuItem key={pr.id} value={pr.id}>
                                      <Typography variant="body1">
                                        {pr.number}
                                      </Typography>
                                      <Divider />
                                    </MenuItem>
                                  );
                                }
                              )}
                            </div>
                          )}
                        </Select>
                        <FormHelperText>
                          Choose a product release{" "}
                        </FormHelperText>
                      </FormControl>
                    </form>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}

        {selectedProductRelease.id &&
          (selectedProductRelease.supportState.isPreRelease ||
            !selectedProductRelease.supportState.isSupported) && (
            <Fade in={true}>
              <Grid container spacing={2} className={classes.row}>
                <Grid item xs={12}>
                  <Paper className={classes.paper}>
                    <Typography variant="body1" color="textSecondary">
                      {selectedProductRelease.supportState.shortDescription}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Fade>
          )}
      </Container>
    </React.Fragment>
  );
}

export default ProductPage;
