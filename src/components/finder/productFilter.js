import React from 'react';
import { withStyles } from '@material-ui/styles';
import * as _ from 'lodash';
import { List, ListItem, ListItemText, Fade } from '@material-ui/core';

const styles = theme => ({
    root: {
        flexgrow: 1
    },
    row: {}
});

function ProductFilter(props) {
    const { products, selected, setProduct } = props;
    const selectedSubscription = selected.subscription ? selected.subscription.id : null;


    const filteredProducts = selectedSubscription ? _.filter(products, product => {
        return _.find(product.subscriptions, s => { return s === selectedSubscription });
    }) : products;


    return (filteredProducts && <List>
        {filteredProducts.map((product, index) => (
            <Fade in={true} key={product.id}>
                <ListItem button disableRipple 
                    key={product.id} 
                    onClick={(e, x) => { setProduct(e, product.id) }}
                >
                    <ListItemText primary={product.title} />
                </ListItem>
            </Fade>
        ))}
    </List>
    )
}

export default withStyles(styles)(ProductFilter);