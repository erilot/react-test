import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import SubscriptionFilter from './finder/subscriptionFilter';
import ProductFilter from './finder/productFilter';

const styles = theme => ({
    root: {
        flexgrow: 1
    },
    row: {
        marginTop: 24
    }
});

function ContentBody(props) {
    const { classes, subscriptions, products } = props;
    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12} className={classes.row}>
                    <SubscriptionFilter 
                        subscriptions={subscriptions} 
                        resolveSubscription={props.resolveSubscription}
                        selectedSubscription={props.selectedSubscription}>
                        </SubscriptionFilter>
                    <ProductFilter products={products}></ProductFilter>
                </Grid>
            </Grid>
        </div>
    );
}


export default withStyles(styles)(ContentBody);