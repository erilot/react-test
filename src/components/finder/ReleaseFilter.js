import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import React, { useState, useEffect } from "react";
import _ from "lodash";
import { withStyles } from "@material-ui/core";

const styles = theme => ({
  root: {}
});

function ReleaseFilter(props) {
  const { classes, releases, upstreamSelectedRelease, setSelectedRelease } = props;
  const [selected, setSelected] = useState({});

 
  // Use the upstream selected release to keep the form in sync, deferring to the upstream value.
  // This effectively forces the initial form state, rather than relying on the form to provide a default.
  useEffect(()=>{
    if(upstreamSelectedRelease !== selected.release) {
      setSelected(upstreamSelectedRelease);
    }
  }, [upstreamSelectedRelease])

  function setRelease(e, id) {
    const selected = _.find(releases.all, ["id", id]);
    setSelected(selected); // local scope, required to update select element (?? this is probably not necessary)
    setSelectedRelease(selected); // parent scope
  }

  return (
    (!!releases.all.length && (
      <form className={classes.root}>
        <FormControl className={classes.formControl}>
          <Select
            // Initialize with either the selected ID or the current release ID for this product
            inputProps={{
              value: selected.id || releases.current.id
            }}
            value={selected.id ? selected.id : ""}
            onChange={(e, item) => {
              setRelease(e, item.props.value);
            }}
          >
            {/* Beta releases */}
            {releases.beta.map(pr => {
              return (
                <MenuItem key={pr.id} value={pr.id}>
                  <Typography variant="body1" color="error">
                    {pr.number} {pr.supportState.title}
                  </Typography>
                </MenuItem>
              );
            })}
            {/* Supported releases */}
            {releases.supported.map(pr => {
              return (
                <MenuItem key={pr.id} value={pr.id}>
                  <Typography variant="h6">{pr.number}</Typography>
                </MenuItem>
              );
            })}
            {/* Unsupported releases */}
            {releases.unsupported.length && (
              <div>
                <Divider />
                <Typography variant="caption" color="textSecondary">
                  Unsupported releases
                </Typography>
              </div>
            )}
            {releases.unsupported.length &&
              releases.unsupported.map(pr => {
                return (
                  <MenuItem key={pr.id} value={pr.id}>
                    <Typography variant="body2" color="textSecondary">
                      {pr.number}
                    </Typography>
                  </MenuItem>
                );
              })}
            )}
          </Select>
          <FormHelperText>Choose a product release </FormHelperText>
        </FormControl>
      </form>
    ))
  );
}

export default withStyles(styles)(ReleaseFilter);
