import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  loader: {
    zIndex: theme.zIndex.drawer + 2,
    marginTop: 100,
  },

});

function LinearIndeterminate(props) {
  return (
    <div className={styles.loader}>
      <LinearProgress color="secondary"/>
    </div>
  );
}

LinearIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearIndeterminate);