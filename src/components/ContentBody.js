import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
// import SubscriptionFilter from './finder/subscriptionFilter';
import ProductFilter from './finder/productFilter';
import { Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexgrow: 1,
        marginTop: 100
    },
    row: {
        marginTop: 24
    }
});

function ContentBody(props) {
    const { classes, store, selected } = props;
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item className={classes.row}>
                <Typography variant="body1">Current subscription: {selected.subscription.title}</Typography>
                <Typography variant="body1">Current product: {selected.product.title}</Typography>
                    {/* <SubscriptionFilter 
                        subscriptions={subscriptions} 
                        resolveSubscription={props.resolveSubscription}
                        selectedSubscription={props.selectedSubscription}>
                        </SubscriptionFilter> */}
                    {/* <ProductFilter products={products}></ProductFilter> */}
                </Grid>
            </Grid>
        </div>
    );
}


export default withStyles(styles)(ContentBody);