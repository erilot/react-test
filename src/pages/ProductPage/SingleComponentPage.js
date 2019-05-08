import { Grid, Typography, List, withStyles, makeStyles, ListItemText, Card, CardContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Axios from 'axios';
import * as _ from 'lodash';
import React, { useEffect } from "react";
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import BookIcon from '@material-ui/icons/Book';


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
  },
  card: {
    borderRadius: 0,
    marginBottom: theme.spacing(2),

  }
}));

function SingleComponentPage(props) {

  const classes = useStyles();

  // const classes = useStyles;

  const { release } = props;

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box borderBottom={1} borderColor='primary.main'>
            <Typography variant="h6">Documentation</Typography>
          </Box>
          <List className={classes.list}>
            {release.documents.map(doc => {
              return (
                <Card className={classes.card} key={doc.id}>
                  <CardContent className="cardContent">
                    <Typography variant="body1">{doc.docType.title}</Typography>
                  </CardContent>
                </Card>
              )
            })}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box borderBottom={1} borderColor='primary.main'>
            <Typography variant="h6">Downloads</Typography>
          </Box>
          <List className={classes.list}>
            {release.downloads.map(dl => {
              return (
                <Card className="card" key={dl.id}>
                  <CardContent className="cardContent">
                    <Typography variant="body1">{dl.title}</Typography>
                  </CardContent>
                </Card>
              )
            })}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}


export default SingleComponentPage;;
