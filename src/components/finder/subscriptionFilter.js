import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { FormHelperText, Typography } from "@material-ui/core";
import Divider from '@material-ui/core/Divider';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
    // padding: theme.spacing(1)
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
  card: {
    display: 'flex',
    width: '100%',
    borderRadius: 0,
    // border: 0,
    boxShadow: 'none',
    background: 'transparent',
  },
  details: {
      width: '100%',
    // display: "flex",
    // flexDirection: "column"
  },
  content: {
    // flex: "1 0 auto",
    // padding: 'theme.spacing(2), 0, theme.spacing(2), 0',
  },
  cover: {
    width: '20%',
    height: '50%',
    position: 'absolute',
    top: 0,
    right: theme.spacing(2),
    zIndex: 0
  }
}));

function SubscriptionFilter(props) {
  const { subscriptions, selected, setSubscription } = props;
  const classes = useStyles();

  const subOptions = subscriptions.map(sub => {
    return (
      <MenuItem key={sub.id} value={sub.id}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cover}
            image={"https:releases.teradici.com" + sub.logo.uri}
            title={sub.title}
          />
          <div className={classes.details}>
            <CardContent className={classes.content}>
              <Typography variant="h6">{sub.title}</Typography>
            </CardContent>
          </div>
        </Card>
        <Divider/>
        {/* {sub.title} */}
        {/* <img alt="" src={"https:releases.teradici.com" + sub.logo.uri} /> */}
      </MenuItem>
    );
  });

  return (
    <form className={classes.root}>
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="filter-subscription">
          Filter by subscription
        </InputLabel>
        <Select
          inputProps={{
            value: selected.id || ""
          }}
          value={selected ? selected.id : ""}
          onChange={(e, x) => {
            setSubscription(e, x.props.value);
          }}
        >
          <MenuItem key={-1} value={0}>
            <em>None</em>
          </MenuItem>
          {subOptions}
        </Select>
        <FormHelperText>
          You can filter these results by selecting a subscription.
        </FormHelperText>
      </FormControl>
    </form>
  );
}

export default SubscriptionFilter;
