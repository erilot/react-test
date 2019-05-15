import React, { useEffect, useState } from "react";
import { withStyles } from "@material-ui/core";
import _ from "lodash";
import axios from "axios";
import ProductComponent from "../../../../models/ProductComponent";
import ComponentRelease from "../../../../models/ComponentRelease";
import groupReleases from "../../../../utilities/GroupReleases";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Chip from "@material-ui/core/Chip";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import ComponentReleaseView2 from "./ComponentReleaseView2";

const styles = theme => ({
  row: {
    marginTop: theme.spacing(2),
  },
  card: {
    borderRadius: 0,
    marginBottom: theme.spacing(1)
  },
  cardActionArea: {},
  cardContent: {
    padding: theme.spacing(1)
  },
  button: {
    borderRadius: 0,
    marginBottom: theme.spacing(1),
    textTransform: "none"
  },

});

function ProductReleaseView(props) {
  const { classes, store, loaderManager, productRelease } = props;

  const [components, setComponents] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState({});
  const [selectedComponentRelease, setSelectedComponentRelease] = useState({});

  useEffect(() => {
    // Get subscription list
    loaderManager.incrementMain();
    async function fetchComponentReleases() {
      console.log("=========getting component releases");
      const urlBase = [
        "https://releases.teradici.com/jsonapi/node/teradici_release"
      ];

      const include = [];
      include.push("field_teradici_product");
      include.push("field_teradici_product.field_platform");

      include.push("field_teradici_document");
      include.push("field_teradici_document.field_doctype");
      include.push("field_teradici_document.field_resource_variant");

      include.push("field_teradici_download");
      include.push("field_teradici_download.field_resource_variant");

      include.push("field_eula");
      include.push("field_eula.field_local_file_public_");

      const filter = [];
      filter.push("filter[a][condition][path]=id");
      filter.push("filter[a][condition][operator]=IN");

      _.forEach(productRelease.componentReleases.all, cr => {
        filter.push("filter[a][condition][value][]=" + cr);
      });

      const url =
        urlBase + "?include=" + include.join(",") + "&" + filter.join("&");

      const response = await axios(url);

      // console.log('response:',response);

      const components = _.map(
        _.filter(response.data.included, [
          "type",
          "taxonomy_term--teradici_products"
        ]),
        c => {
          return new ProductComponent(c, { store: store });
        }
      );

      const crs = [];
      _.forEach(response.data.data, cr => {
        return crs.push(
          new ComponentRelease(cr, {
            store: store,
            included: response.data.included
          })
        );
      });

      _.forEach(components, c => {
        const myReleases = _.filter(crs, cr => {
          return cr.component === c.id;
        });
        c.componentReleases = groupReleases(myReleases);
      });

      setComponents(components);
      if (components.length === 1) {
        setSelectedComponent(components[0]);
        setSelectedComponentRelease(components[0].componentReleases.current);
      } else {
        setSelectedComponent({});
      }

      console.log("components:", components);
      loaderManager.decrementMain();
    }
    fetchComponentReleases();
  }, []);

  function setComponent(e, x) {
    const chosen = _.find(components, ["id", x]);
    setSelectedComponent(chosen);
    setSelectedComponentRelease(chosen.componentReleases.current);
  }

  return (
    // <Paper className={classes.paper}>
    <div className={classes.row}>
      <Grid container spacing={2}>
        {/* {components.length > 1 && (
          <Grid item xs={12} md={3}>
            {components.map(c => {
              return (
                <Card key={c.id} className={classes.card}>
                  <CardActionArea
                    className={classes.cardActionArea}
                    onClick={(e, x) => {
                      setComponent(e, c.id);
                    }}
                  >
                    <CardContent className={classes.cardContent}>
                      <Typography variant="body2">{c.title}</Typography>
                      
                    </CardContent>
                  </CardActionArea>
                </Card>
              );
            })}
          </Grid>
        )} */}
        <Grid item xs={12}>
          <ComponentReleaseView2
            components={components}
            selectedComponent={selectedComponent}
            selectedComponentRelease={selectedComponentRelease}
          />
        </Grid>

        {/* <Grid item xs={12} md={components.length === 1 ? 12 : 9}>
          {components.length > 1 && (
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="h4">{selectedComponent.title}</Typography>
                {!selectedComponent.saasComponent && (
                  <Chip label={selectedComponentRelease.number} />
                )}
              </Grid>
            </Grid>
          )}
          <Grid container spacing={2} className={classes.row}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Documentation</Typography>
              {selectedComponentRelease.id &&
                selectedComponentRelease.documents.map(d => {
                  return (
                    <Button
                      key={d.id}
                      variant="outlined"
                      size="large"
                      fullWidth={true}
                      href={d.externalLink}
                      target="_blank"
                      rel="noopener"
                      className={classes.button}
                    >
                      <Typography variant="body2">{d.docType.title}</Typography>
                    </Button>
                  );
                })}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Downloads</Typography>
              {selectedComponentRelease.id &&
                selectedComponentRelease.downloads.map(d => {
                  return (
                    <Button
                      key={d.id}
                      variant="outlined"
                      size="large"
                      fullWidth={true}
                      href={d.externalLink}
                      target="_blank"
                      rel="noopener"
                      className={classes.button}
                    >
                      <Typography variant="body2">{d.title}</Typography>
                    </Button>
                  );
                })}
            </Grid>

          </Grid>
        </Grid> */}
      </Grid>
    </div>
    // </Paper>
  );
}

export default withStyles(styles)(ProductReleaseView);
