import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import TeradiciLogoSpray from "./atomic/images/TeradiciLogoSpray";
import Axios from "axios";
import { ProductRelease } from '../models/ProductRelease';
import semanticSort from '../utilities/SemanticSort';

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText } from "@material-ui/core";

import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';

import * as _ from 'lodash';


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

  const { loadingState, selected } = props;

  const [productReleases, setProductReleases] = useState({});

  const product = selected.product;

  if (product.id && productReleases[product.id] === undefined) {
    console.log('gotta get it');

    // incrementLoadingCount();    
    async function getProductReleases() {
      const urlTerms = ['https://releases.teradici.com/jsonapi/node/teradici_product_release?'];

      urlTerms.push('filter[a][condition][path]=field_in_product.id&filter[a][condition][value]=' + product.id);

      const url = urlTerms.join('');
      loadingState.incrementLoader();
      const response = await Axios(url);

      const prs = [];
      _.forEach(response.data.data, pr => { return prs.push(new ProductRelease(pr)); });

      const sorted = semanticSort(prs);

      setProductReleases({ ...productReleases, [product.id]: sorted })

      loadingState.decrementLoader();
      console.log('=>productReleases:', productReleases);
    }
    getProductReleases();

    console.log('productReleases:', productReleases);

    const prOptions = '';

    console.log('prOptions:', prOptions);

  }

  const setProductRelease = (e, id) => {
    console.log('e:', e);
    console.log('id:', id);
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root}>
        {product.id && (
          <Fade in={true}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <Typography variant="h2">{product.title}</Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: product.description
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TeradiciLogoSpray />
                  {productReleases[product.id] &&
                    <form className={classes.root}>
                      <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="filter-productRelease">
                          Choose product release
                      </InputLabel>
                        <Select
                          inputProps={{
                            value: selected.id || -1
                          }}
                          value={selected ? selected.id : ""}
                          onChange={(e, x) => {
                            setProductRelease(e, x.props.value);
                          }}
                        >
                          {productReleases[product.id] ? productReleases[product.id].map(pr => {
                            return (
                              <MenuItem key={pr.id} value={pr.id}>
                                <Card className={classes.card}>
                                  <div className={classes.details}>
                                    <CardContent className={classes.content}>
                                      <Typography variant="h6">{pr.number}</Typography>
                                    </CardContent>
                                  </div>
                                </Card>
                                <Divider />
                              </MenuItem>

                            )
                          }) : []}
                        </Select>
                        <FormHelperText>Choose a product release </FormHelperText>
                      </FormControl>
                    </form>
                  }
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}

        <Grid container spacing={2} className={classes.row}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Current Release: 2019.05</Typography>
              {/* {releases} */}
              {productReleases[product.id] ? productReleases[product.id].map(pr => {
                return (<Typography variant="body1">{pr.number}</Typography>)
              }) : null}
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={2} className={classes.row}>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Documentation</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Downloads</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Knowledge Base</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default ProductPage;
