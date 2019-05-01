import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import SubscriptionCard from '../atomic/SubscriptionCard';
import * as _ from 'lodash';

const styles = theme => ({
    root: {
        flexgrow: 1,
        borderBottom: '1px solid #ccc',
        marginBottom: 25,
    },
    row: {

    }
});

function SubscriptionFilter(props) {
    const { classes, subscriptions } = props;
    console.log('subscriptions in filter:',subscriptions.subscriptions);
    const subscriptionList = [];
    // Build subscription list
    _.forEach( subscriptions.subscriptions, (sub, i) => {
        subscriptionList.push(
            <Grid maxwidth={10} key={i} item xs={12} sm={3} >
                <SubscriptionCard 
                    subscription={sub} 
                    resolveSubscription={subscriptions.resolveSubscription} 
                    selectedSubscription={subscriptions.selectedSubscription}
                    />
            </Grid>);
    });
    
    // Return JSX
    return (
        <div className={classes.root}>
                <Grid item xs={12} className={classes.row}>
                    <Grid container justify="center" spacing={24}>
                        {subscriptionList}

                    </Grid>
                </Grid>
        </div>
    );
}


export default withStyles(styles)(SubscriptionFilter);