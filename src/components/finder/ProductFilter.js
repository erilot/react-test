import React, { useState } from 'react';
import { withStyles } from '@material-ui/styles';
import * as _ from 'lodash';
import { List, ListItem, ListItemText, Divider } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
    root: {
        flexgrow: 1
    },
    row: {}
});


function ProductFilter(props) {
    const { products, selected, setProduct } = props;
    const selectedSubscription = selected.subscription ? selected.subscription.id : null;

    const [showEol, setShowEol] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState({});
    const eolSwitchChange = name => event => {
        setShowEol(event.target.checked);
    }

    const filteredProducts = selectedSubscription ? _.filter(products, product => {
        return _.find(product.subscriptions, s => { return s === selectedSubscription });
    }) : products;

    const liveProducts = _.filter(filteredProducts, ['isEol', false]);
    const eolProducts = _.filter(filteredProducts, ['isEol', true]);

    function updateProductChange(e, id) {
        const product = _.find(products,['id', id])
        setSelectedProduct(product);
        setProduct(product);
    }

    return (filteredProducts &&
        <List>
            <Typography variant="overline">Products</Typography>

            {liveProducts.map((product, index) => (
                <Grow in={true} key={product.id}>
                    <ListItem button
                        key={product.id}
                        onClick={(e, x) => { updateProductChange(e, product.id) }}
                        selected={selectedProduct.id === product.id}
                    >
                        <ListItemText primary={product.title} />
                    </ListItem>
                </Grow>
            ))}
            {!!eolProducts.length &&
                <div>
                    <List>
                        <Divider />
                        {showEol &&
                            <div>
                                <Typography variant="overline" color="textSecondary">Discontinued Products</Typography>
                                {eolProducts.map((product, index) => (
                                    <Grow in={true} key={product.id}>
                                        <ListItem button disableRipple
                                            key={product.id}
                                            onClick={(e, x) => { setProduct(e, product.id) }}
                                            color="textSecondary"
                                        >
                                            <ListItemText primary={product.title} color="textSecondary"/>
                                        </ListItem>
                                    </Grow>
                                ))}
                            </div>}
                    </List>
                    <Divider />
                    <FormGroup row>
                        <FormControlLabel
                            control={
                                <Switch checked={showEol} onChange={eolSwitchChange()} value="showEol" />
                            }
                            label="Show Discontinued"
                            color="textSecondary"
                        />
                    </FormGroup>
                </div>

            }
        </List>
    )
}

export default withStyles(styles)(ProductFilter);