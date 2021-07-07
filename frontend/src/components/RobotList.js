import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Robot from './Robot'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    page: {
        display: 'inline-block',
        marginTop: theme.spacing(4),
    },
}));

const RobotList = ({ robots, onAdd }) => {
    const classes = useStyles();
    const [materialTypes, setMaterialTypes] = useState([]);
    const [filterValue, setFilterValue] = useState('All');
    const [filterRobots, setFilterRobots] = useState([]);

    const [open, setOpen] = useState(false);
    const handleClose = () => { setOpen(false); };
    const handleOpen = () => { setOpen(true); };
    // Filter Robots by Material Type
    const filterHandler = () => {
        if (filterValue !== 'All') {
            setFilterRobots(robots.filter(r => (r.material === filterValue)))
        } else {
            setFilterRobots(robots)
        }
    }

    useEffect(() => {
        filterHandler();
    }, [filterValue])

    // Get Material Types To Filter
    useEffect(() => {
        if (robots.length) {
            const mTypes = robots.map(robot => robot.material).filter((currentValue, index, arr) => (
                arr.indexOf(currentValue) === index
            ))
            setMaterialTypes(mTypes);
        }
        filterHandler();
    }, [robots])





    //pagination
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 12;
    const count = Math.ceil(filterRobots.length / postsPerPage);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filterRobots.slice(indexOfFirstPost, indexOfLastPost)
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };



    return (
        <Container>
            <Box justifyContent="flex-end" display="flex">
                <Box pt={5}> <Pagination onChange={handleChange} count={count} color="primary" className={classes.page} /></Box>
                <Box>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <Button className={classes.button} onClick={handleOpen}>
                            Filter by Material Type
                        </Button>

                        <Select
                            labelId="demo-controlled-open-select-label"
                            id="demo-controlled-open-select"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                        >
                            <MenuItem value="All">All</MenuItem>
                            {materialTypes.map(type => <MenuItem value={type} key={type}>{type}</MenuItem>)}

                        </Select>
                    </FormControl>
                </Box>
            </Box>

            <Grid container spacing={3}>
                {
                    currentPosts.map((robot, index) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                            <Robot robot={robot} onAdd={onAdd} />
                        </Grid>
                    ))
                }
            </Grid>

        </Container>
    )
}

export default RobotList
