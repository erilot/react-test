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

function setCurrentSubscription(e){
    console.log('clicked',e.currentTarget);
}

function SubscriptionCard(props) {
    const { classes, theme, subscription } = props;
    return (
        <Fade in={true}>
            <Card className={classes.card} image={'https://releases.teradici.com' + subscription.logo.uri}>
                <Button id={subscription.id} className={classes.button} disableRipple onClick={(e)=>{props.resolveSubscription(e, subscription.id)}}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                                {subscription.title}
                                {subscription.selectedSubscription && subscription.id === subscription.selectedSubscription.id ? <p>(selected)</p> : ''}
                            </Typography>
                        </CardContent>

                    </div>
                    <CardMedia
                        className={classes.cover}
                        image={'https://releases.teradici.com' + subscription.logo.uri}
                        title="Live from space album cover"
                    />
                </Button>

            </Card>
        </Fade>
    );
}

SubscriptionCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SubscriptionCard);