import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';

import { useStyles } from '../../constants';

import './SlotDetails.css';

function BookingForm() {
    const [location, setLocation] = useState(useLocation());
    const searchParams = new URLSearchParams(location.search);
    const [st, setST] = useState(searchParams.get('ST'));
    const [et, setET] = useState(searchParams.get('ET'));
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [slotIndex, setSlotIndex] = useState(0);
    const [editForm, setEditForm] = useState(true);
    const [ details ,setDetails] = useState(false);

    const classes = useStyles();
    let history = useHistory();
    //methods
    useEffect(() => {
        console.log('asdf');
        const bookedDetails = JSON.parse(localStorage.getItem('details'));
        let i = 0
        bookedDetails.map((slotDetail, index) => {
            i = index;
            if (slotDetail.startDate == st) {
                setUserName(slotDetail.userName);
                setLastName(slotDetail.lastName);
                setPhoneNumber(slotDetail.phoneNumber);
                setEmail(slotDetail.email);
                setSlotIndex(i);
                setDetails(true);
            }
        })

    }, [editForm,details]);
    const onCancel = () => {
        const bookedDetails = JSON.parse(localStorage.getItem('details'));
        bookedDetails.splice(slotIndex, 1);
        console.log(JSON.parse(JSON.stringify(bookedDetails)));
        localStorage.setItem('details', JSON.stringify(bookedDetails));
    }
    const onEdit = () => {
        setEditForm(!editForm);


        if (!editForm) {
            onCancel();
            const details = {
                userName: userName,
                lastName: lastName,
                phoneNumber: phoneNumber,
                email: email,
                startDate: st,
                endDate: et
            }
            let existingData = [];
            if (localStorage.getItem('details')) {
                existingData = JSON.parse(localStorage.getItem('details'));
            }
            existingData.push(details);
            console.log(existingData);
            localStorage.setItem('details', JSON.stringify(existingData));
            history.push('/');
        }
    }
    function RedditTextField(props) {
        const classes = useStylesReddit();

        return <TextField InputProps={{ classes, disableUnderline: true }} {...props} />;
    }
    const CssTextField = withStyles({
        root: {
            '& label.Mui-focused': {
                color: 'green',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: 'green',
            },
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor: 'red',
                },
                '&:hover fieldset': {
                    borderColor: 'yellow',
                },
                '&.Mui-focused fieldset': {
                    borderColor: 'green',
                },
            },
        },
    })(TextField);

    const BootstrapInput = withStyles((theme) => ({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ced4da',
            fontSize: 16,
            width: 'auto',
            padding: '10px 12px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            '&:focus': {
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main,
            },
        },
    }))(InputBase);

    const useStylesReddit = makeStyles((theme) => ({
        root: {
            border: '1px solid #e2e2e1',
            overflow: 'hidden',
            borderRadius: 4,
            backgroundColor: '#fcfcfb',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:hover': {
                backgroundColor: '#fff',
            },
            '&$focused': {
                backgroundColor: '#fff',
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
                borderColor: theme.palette.primary.main,
            },
        },
        focused: {},
    }));

    const ValidationTextField = withStyles({
        root: {
            '& input:valid + fieldset': {
                borderColor: 'green',
                borderWidth: 2,
            },
            '& input:invalid + fieldset': {
                borderColor: 'red',
                borderWidth: 2,
            },
            '& input:valid:focus + fieldset': {
                borderLeftWidth: 6,
                padding: '4px !important', // override inline-style
            },
        },
    })(TextField);
    return (
        <div className="main flex">
        <div className="login flex">
            {details ?
                       <>
                       <div style={{
                           backgroundColor: '#4450a5',
                           borderRadius: '50%',
                           padding: '4px'
                       }} >
                           <PersonOutlineOutlinedIcon />
                       </div>
                       <h1 style={{ color: 'black', margin: '15px' }}>SLOT DETAILS</h1>
                       <div className="login__form flex">
                           <form className={classes.root} noValidate autoComplete="off">
                               <TextField
                                   disabled={editForm}
                                   id="outlined-disabled"
                                   label="User Name"
                                   defaultValue={userName}
                                   variant="outlined"
                                   onChange={(e) => setUserName(e.target.value)}
                               />
                              
                               <TextField
                                   disabled={editForm}
                                   id="outlined-disabled"
                                   label="Last Name"
                                   defaultValue={lastName}
                                   variant="outlined"
                                   onChange={(e) => setLastName(e.target.value)}
                               />
                               <br />
                               <TextField
                                   disabled={editForm}
                                   id="outlined-disabled"
                                   label="Email"
                                   defaultValue={email}
                                   variant="outlined"
                                   style={{ width: '524px' }}
                                   onChange={(e) => setEmail(e.target.value)}
                               />
                               <br />
           
                               <TextField
                                   disabled={editForm}
                                   id="outlined-disabled"
                                   label="Slot"
                                   label="PhoneNumber"
                                   defaultValue={phoneNumber}
                                   variant="outlined"
                                   
                                   onChange={(e) => setPhoneNumber(e.target.value)}
                                   style={{ width: '524px' }}
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
                                           onClick={() => {
                                               onEdit();
           
                                           }}
                                           style={{
                                               width: '150px',
                                               backgroundColor: '#4450a5',
                                           }}
                                           variant="contained"
                                           color="primary">
                                           {editForm ? 'EDIT DETAILS' : 'SAVE'}
                                       </Button>
                                       <Button
                                           onClick={()=>history.push('/')}
                                           style={{
                                               width: '150px',
                                               backgroundColor: '#4450a5',
                                           }}
                                           variant="contained"
                                           color="primary">
                                           BACK
                                       </Button>
                                       <Button
                                           onClick={() => {
                                               if (editForm) {
                                                   const confirmation = window.confirm('Do you really cancel the slot?');
                                                   if (confirmation) {
                                                    onCancel();
                                                   }  
                                               }
                                               history.push('/')
                                           }
                                           }
                                           style={{
                                               width: '150px',
                                               backgroundColor: '#4450a5',
                                           }}
                                           variant="contained"
                                           color="primary">
                                           {editForm ? 'CANCEL BOOKING' : 'CANCEL'}
           
                                       </Button>
                                   </div>
                               </div>
                           </form>
                       </div>
                       </> 
             : ''}
   
        </div>

        </div>
        )
}

export default BookingForm
