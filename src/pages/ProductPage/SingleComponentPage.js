import React from "react";
import Paper from "@material-ui/core/Paper";
import { Grid, Typography } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ComponentRelease from "../../models/ComponentRelease";
import groupReleases from '../../utilities/GroupReleases';
import * as _ from 'lodash';
import Axios from 'axios';

function SingleProjectPage(props) {
  const { classes, product, productRelease, store } = props;

  console.log('product:',product);
  console.log('productRelease:',productRelease);
    console.log('store:',store);

  const releases = productRelease.componentReleases.all;
    console.log('component release:',releases);

    // Check w/ global store for this product release
    // if not there, load it

    // for now, just load it always
    if (store.componentReleases && store.componentReleases[productRelease.id] === undefined) {
        // incrementLoadingCount();
        async function getComponentReleases() {
          const urlBase = [
            "https://releases.teradici.com/jsonapi/node/teradici_release"
          ];
    
          const urlTerms = [];
          urlTerms.push('filter[a][condition][path]=id');
          urlTerms.push('filter[a][condition][value]=IN');
          _.forEach(releases, cr=>{urlTerms.push('filter[a][condition][value][]=' + cr)});

        //   urlTerms.push("include=field_support_state");

          const url = urlBase + "?" + urlTerms.join("&");

        //   loadingState.incrementLoader();
          const response = await Axios(url);
    
          console.log('response:',response);
          const crs = [];
          _.forEach(response.data.data, cr => {
            return crs.push(new ComponentRelease(cr, { store: store }));
          });
    
          const groupedReleases = groupReleases(crs);
    
          console.log('grouped releases:',groupedReleases);
        //   setProductReleases({ ...productReleases, [product.id]: groupedReleases });
    
        //   loadingState.decrementLoader();
        //   // console.log("=>productReleases:", productReleases);
    
        //   // Set initial state
        //   setProductRelease(
        //     groupedReleases.current || groupedReleases.beta || null
        //   );
        }
        getComponentReleases();
      }
    

  return (
    <Paper className="classes.paper">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box borderBottom={1} borderColor='primary.main'>
            <Typography variant="h6">Documentation</Typography>
          </Box>
            {releases[0].documents.map(d=>{return (<Typography variant="body1">{d}</Typography>)})}
        </Grid>
      </Grid>
    </Paper>
  );
}

export default SingleProjectPage;
