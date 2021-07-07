import React, { useState } from 'react'
import { format } from 'date-fns';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    media: {
        height: 140,
    },
});

const Robot = ({ robot, onAdd }) => {
    const classes = useStyles();
    const renderButton = (robot) => {
        if (robot.stock > 0) {
            return <Button variant="contained" size="small" color="primary" onClick={() => onAdd(robot)}>Add to cart</Button>
        } else {
            return <Button variant="contained" size="small" color="primary" disabled >Out Of Stock</Button>
        }
    }
    const formatPrice = (price) => {
        return new Intl.NumberFormat().format(price);
    }
    const formatDate = (date) => {
        return format(new Date(date), "dd-MM-yyyy");
    }
    return (
        <div>
            <Card >
                <CardMedia
                    className={classes.media}
                    image={robot.image}
                    title={robot.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {robot.name}
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h2">
                        ฿{formatPrice(robot.price)}
                    </Typography>

                    <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                        Available Stock : {robot.stock}<br />
                        Created Date : {formatDate(robot.createdAt)} <br />
                        Material : {robot.material} <br />
                    </Typography>
                    {renderButton(robot)}
                </CardContent>
            </Card>
        </div>
    )
}

export default Robot
