import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { FormHelperText } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '100%',
        padding: theme.spacing(3)
    },
    selectEmpty: {
        marginTop: theme.spacing(1),
    },
}));

function SubscriptionFilter(props) {
    const { subscriptions, selected, setSubscription } = props;
    const classes = useStyles();

    const subOptions = subscriptions.map(sub => {
        return <MenuItem key={sub.id} value={sub.id}>{sub.title}</MenuItem>
    });

    return (
        <form className={classes.root}>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="filter-subscription">Filter by subscription</InputLabel>
                <Select
                    inputProps={{
                        value: selected.id || '',
                        // name:'filter-subscription'
                    }}
                    value={selected ? selected.id : ""}
                    onChange={(e,x)=>{setSubscription(e, x.props.value)}}
                >
                    <MenuItem key={-1} value={0}>
                        <em>None</em>
                    </MenuItem>
                    {subOptions}
                </Select>
                <FormHelperText>You can filter these results by selecting a subscription.</FormHelperText>
            </FormControl>
        </form>
    );
}

export default SubscriptionFilter