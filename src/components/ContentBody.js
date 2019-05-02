import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles, Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Fade from "@material-ui/core/Fade";
import TeradiciLogoSpray from "./atomic/images/TeradiciLogoSpray";

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

function ContentBody(props) {
  const classes = useStyles();

  const { store, selected } = props;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root}>
        {selected.product.id && (
          <Fade in={true}>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={9}>
                  <Typography variant="h2">{selected.product.title}</Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{
                      __html: selected.product.description
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TeradiciLogoSpray />
                </Grid>
              </Grid>
            </Paper>
          </Fade>
        )}

        <Grid container spacing={2} className={classes.row}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <Typography variant="h5">Current Release: 2019.05</Typography>
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

export default ContentBody;
