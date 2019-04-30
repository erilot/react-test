import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

const styles = {
    card: {
        display: 'flex',
        background: 'transparent',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundSize: '100%',
        zIndex: -1000,
        opacity: .1,
    },
    button: {
        textAlign: 'left',
        width: '100%',
        height: '100%',
    }
};

function setCurrentProduct(e){
    console.log('clicked',e.currentTarget);
}

function ProductCard(props) {
    const { classes, theme, product, selectedProduct } = props;
    return (
        <Fade in={true}>
            <Card className={classes.card} >
                <Button id={product.id} className={classes.button} disableRipple onClick={(e)=>{props.resolveProduct(e, product.id)}}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {product.title}
                                {product.selectedProduct && product.id === product.selectedProduct.id ? <p>(selected)</p> : ''}
                            </Typography>
                        </CardContent>

                    </div>
                </Button>

            </Card>
        </Fade>
    );
}

ProductCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductCard);