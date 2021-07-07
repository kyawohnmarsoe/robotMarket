import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Drawer from '@material-ui/core/Drawer';
import Cart from './Cart';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
}));

const Nav = ({ cartItems, onAdd, onRemove }) => {
    const classes = useStyles();
    const [state, setState] = useState({ right: false, });
    const totalItems = cartItems ? cartItems.reduce((a, c) => a + c.qty, 0) : 0;
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    return (
        <>
            <Drawer anchor='right' open={state['right']} onClose={toggleDrawer('right', false)}>
                <Cart
                    toggleDrawer={toggleDrawer}
                    cartItems={cartItems}
                    onAdd={onAdd}
                    onRemove={onRemove}
                />
            </Drawer>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Robot Market
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton aria-label="4 items in cart" color="inherit" onClick={toggleDrawer('right', true)}>
                        <Badge badgeContent={totalItems} color="secondary">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar >
        </>
    )
}

export default Nav
