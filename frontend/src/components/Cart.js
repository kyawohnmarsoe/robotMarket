import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddBoxIcon from '@material-ui/icons/AddBox';
import IndeterminateCheckBox from '@material-ui/icons/IndeterminateCheckBox';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

const Cart = ({ toggleDrawer, cartItems, onAdd, onRemove }) => {
    const classes = useStyles();
    const totalPrice = cartItems ? cartItems.reduce((a, c) => a + c.qty * c.price, 0) : 0;
    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    }

    const renderCartItems = () => {
        if (cartItems) {
            return (
                <>
                    {
                        cartItems.length === 0 && <List>
                            <ListItem>
                                <ListItemText>
                                    Cart is Empty
                                </ListItemText>
                            </ListItem> </List>
                    }

                    <List>
                        {
                            cartItems.map((item) => (
                                <ListItem button key={item.name}>
                                    <ListItemAvatar>
                                        <Avatar alt={item.name} src={item.image} />
                                    </ListItemAvatar>
                                    <ListItemText primary={item.name} secondary={
                                        <React.Fragment>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                className={classes.inline}
                                                color="textPrimary"
                                            >
                                                ฿{formatPrice(item.price)}
                                                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => onRemove(item)}>
                                                    <IndeterminateCheckBox onClick={() => onRemove(item)} />
                                                </IconButton>
                                                {item.qty}
                                                <IconButton color="primary" aria-label="add to shopping cart" onClick={() => onAdd(item)}>
                                                    <AddBoxIcon onClick={() => onAdd(item)} />
                                                </IconButton>
                                            </Typography>
                                        </React.Fragment>} />
                                </ListItem>
                            ))}
                    </List>
                    <Divider />
                    <List>
                        <ListItem>
                            <ListItemText>
                                Total : ฿{formatPrice(totalPrice)}
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <Button variant="contained" color="primary" onClick={() => alert('Implement Checkout!')}>CheckOut</Button>
                        </ListItem>
                    </List>
                </>
            )
        }
    }

    return (
        <Container>
            {renderCartItems()}
        </Container>
    );
}
export default Cart