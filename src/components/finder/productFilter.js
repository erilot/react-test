import React from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import * as _ from 'lodash';
import ProductCard from '../atomic/ProductCard';

const styles = theme => ({
    root: {
        flexgrow: 1
    },
    row: {}
});

function ProductFilter(props) {
    const { classes, products } = props;
    const productList = [];
    // Build subscription list
    _.forEach( products.products, (product, i) => {
        productList.push(
            <Grid maxwidth={10} key={i} item xs={12} sm={3} >
                <ProductCard product={product} resolveProduct={products.resolveProduct}/>
            </Grid>);
    });
    
    // Return JSX
    return (
        <div className={classes.root}>
                <Grid item xs={12} className={classes.row}>
                    <Grid container justify="center" spacing={24}>
                        {productList}

                    </Grid>
                </Grid>
        </div>
    );
}


export default withStyles(styles)(ProductFilter);