import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

//material-ui 
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import StarsSharpIcon from '@material-ui/icons/StarsSharp';
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import BookmarkBorderOutlinedIcon from '@material-ui/icons/BookmarkBorderOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
// css file 
import './List.css';

function List({slot}) {
    let history = useHistory();
    const useStyles = makeStyles((theme) => ({
        root: {
            minWidth: 275,
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        fab: {
            margin: theme.spacing(2),
        },
        absolute: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(3),
        },
    })
    );
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    
    const bookOrDetails = () => {
        if (!slot[2]){
            history.push(`/slot/book?ST=${slot[0]}&ET=${slot[1]}`)
        }
        else {
            history.push(`/slot/details?ST=${slot[0]}&ET=${slot[1]}`);
        }
    }
    return (
        <Tooltip title={`${!slot[2] ? 'Available' : 'Booked'}`}>
            <div className={classes.root && `list flex ${slot[2] && 'booked'} `} onClick={bookOrDetails} >
                <Card className={classes.root} variant="outlined">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Movie Name:
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Scam 1992
                        </Typography>
                    </CardContent>
                </Card>
                <div className="list__id">
                    <p>{slot[0]}
                        {(slot[0] > 8 && slot[0] != 12) ? ' A.M ' : ' P.M '}
                        - {slot[1]}
                        {(slot[1] > 8 && slot[1] != 12) ? ' A.M ' : ' P.M '}</p>
                </div>
                <div className='list__fav'>
                        <WatchLaterIcon /> 
                </div>
            </div>
        </Tooltip>

    )
}

export default List
