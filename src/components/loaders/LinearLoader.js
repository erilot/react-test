import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  loader: {
    zIndex: theme.zIndex.drawer + 2,
    marginTop: 100,
  },
});

function LinearLoader(props) {
  const { color } = props;

  return (
    <div className={styles.loader}>
      <LinearProgress color={color}/>
    </div>
  );
}


export default withStyles(styles)(LinearLoader);