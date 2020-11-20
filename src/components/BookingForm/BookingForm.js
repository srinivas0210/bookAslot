import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { useStyles } from '../../constants';

import './BookingForm.css';

function BookingForm() {
    const [location, setLocation] = useState(useLocation());
    const searchParams = new URLSearchParams(location.search);
    const [st, setST] = useState(searchParams.get('ST'));
    const [et, setET] = useState(searchParams.get('ET'));
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');

    const classes = useStyles();
    let history = useHistory();
    //methods
    const onClick = () => {
        const details = {
            userName: userName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            startDate: st,
            email: email,
            endDate: et
        }
        let existingData = [];
        if (localStorage.getItem('details')) {
            existingData = JSON.parse(localStorage.getItem('details'));
        }
        existingData.push(details);
        localStorage.setItem('details', JSON.stringify(existingData));
        window.alert('Booked Successfully,Have a nice day');
        history.push('/');
    }

    return (
        <div className="main flex">
            <div className="login flex">
                <div style={{
                    backgroundColor: '#00bea5',
                    borderRadius: '50%',
                    padding: '4px'
                }} >
                    <PersonOutlineOutlinedIcon />
                </div>
                <h1 style={{ color: 'black', margin: '15px' }}>PROVIDE DETAILS</h1>
                <div className="login__form flex">
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="outlined-secondary"
                            label="First Name"
                            variant="outlined"
                            color="secondary"
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            id="outlined-secondary"
                            label="Last Name"
                            variant="outlined"
                            color="secondary"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <br />
                        <TextField
                            id="outlined-secondary"
                            label="Email"
                            variant="outlined"
                            color="secondary"
                            style={{ width: '524px' }}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <br />
                        <TextField
                            id="outlined-secondary"
                            label="Phone Number"
                            variant="outlined"
                            color="secondary"
                            style={{ width: '524px' }}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <br />
                        <TextField
                            disabled
                            id="outlined-disabled"
                            label="Slot"
                            defaultValue={
                                `Timings: ${st}${(st > 8 && st != 12) ? ' A.M' : ' P.M'}- ${et}${(et > 8 && et != 12) ? ' A.M' : ' P.M'}`}
                            variant="outlined"
                            style={{ width: '524px' }}
                        />
                        <div className={classes.root}>
                            <div className="flex submit">
                                <Button
                                    onClick={onClick}
                                    style={{
                                        width: '100px',
                                        backgroundColor: '#00bea5',
                                    }}
                                    variant="contained"
                                    color="primary">
                                    Book
                            </Button>
                                <Button
                                    onClick={() => history.push('/')}
                                    style={{
                                        width: '100px',
                                        backgroundColor: '#00bea5',
                                    }}
                                    variant="contained"
                                    color="primary">
                                    Cancel
                            </Button>
                            </div>

                        </div>

                    </form>
                </div>
            </div>
        </div>

    )
}

export default BookingForm
