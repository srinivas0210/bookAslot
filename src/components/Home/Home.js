import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// material-ui
import 'date-fns';

import LoopOutlinedIcon from '@material-ui/icons/LoopOutlined';
// js files

import KEY from '../../constants';
import List from '../List/List';
//css
import './Home.css';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const morningTimes = [9, 10, 11, 12];
  const afterNoonTimes = [12, 1, 2, 3, 4, 5];
  const [morningSlots, setMorningSlots] = useState([]);
  const [afterNoonSlots, setAfterNoonSlots] = useState([]);
  const [boolean, setBoolean] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [ morningSlotLeft , setMorningSlotLeft ] = useState(0);
  const [ afterNoonSlotLeft , setafterNoonSlotLeft ] = useState(0);
  let history = useHistory();


  // methods
  useEffect(() => {
    let slotsMorning = [];
    for (let i = 0; i < morningTimes.length - 1; i++) {
      slotsMorning.push([morningTimes[i], morningTimes[i + 1], status]);
    }
    setMorningSlots(slotsMorning);
    const slotsEvening = [];
    for (let i = 0; i < afterNoonTimes.length - 1; i++) {
      slotsEvening.push([afterNoonTimes[i], afterNoonTimes[i + 1], status]);
    }
    setAfterNoonSlots(slotsEvening);
    const slotsAll = slotsMorning + slotsEvening;
    if (!localStorage.getItem('slots')) {
      localStorage.setItem('slots', JSON.stringify(slotsAll));
    }

  }, []);
  useEffect(() => {

    const slotCondition = (morningSlots || []).length && (afterNoonSlots || []).length;
    const bookedDetails = localStorage.getItem('details');
    const slotsAll = [];
    let morningLeft = 3;
    let afterNoonLeft = 5;
    if (slotCondition && bookedDetails) {
      const bookedSlot = JSON.parse(bookedDetails);
      bookedSlot.map((detail) => {
        const start = parseInt(detail.startDate);
        const end = parseInt(detail.endDate);
        console.log(morningSlots);
        if (start != 12 && morningTimes.includes(start)) {
          const slots = morningSlots;
          slots[morningTimes.indexOf(start)] = [start, end, true];
          console.log('slotsasfargagadfgdg', slots);
          slotsAll.push(slots);
          morningLeft -= 1;
        }
        else {
          const slots = afterNoonSlots;
          console.log(afterNoonSlots);
          console.log(slots);
          slots[afterNoonTimes.indexOf(start)] = [start, end, true];
          console.log('slotsasfargagadfgdg', slots);
          slotsAll.push(slots);
          afterNoonLeft -= 1;
        }
      })
    }
    setMorningSlotLeft(morningLeft);
    setafterNoonSlotLeft(afterNoonLeft);
    setBoolean(!boolean);
  }, [morningSlots, afterNoonSlots]);

  return (
    <>
      <div className="home flex">
        
        <div className="home__details flex" >
          <div className='home__list '>
            {loading ?
              <div style={{ flexDirection: 'column' }} className="flex">
                <LoopOutlinedIcon />
                <br />
                <p>Please wait</p>
              </div> : <>
                <h1 style={{color : '#4450a5'}}>Morning -
                <span style={
                    {
                      fontStyle: 'italic',
                      fontSize: '20px',
                      fontWeight: '300',
                      margin: '0 10px',
                      color : 'black'
                    }}>
                    {morningSlotLeft} slots left
                  </span>
                </h1>
                <div className="flex">

                  {morningSlots ? morningSlots.map((slot, index) => {
                    return <List key={`${index}_${boolean}`} slot={slot} />
                  }) : ''}
                </div>
                <h1 style={{color : '#4450a5'}}>Afternoon -
                <span style={
                    {
                      fontStyle: 'italic',
                      fontSize: '20px',
                      fontWeight: '300',
                      margin: '0 10px',
                      color : 'black'
                    }}>
                    {afterNoonSlotLeft} slots left
                  </span>
                  </h1>
                <div className="flex">

                  {afterNoonSlots ? afterNoonSlots.map((slot, index) => {
                    return <List key={`${index}_${boolean}`} slot={slot} />
                  }) : ''}

                </div>
              </>}
          </div>
          <div className="home__listHeading">
            <h1 >
              Hey! 8 slots are available for today
            </h1>
          </div>
        </div>
      </div>

      <div className="visitOverBigScreens">
        <h1 style={{ margin: '20px' }}>NeoWs</h1>
        <h4 >Please visit the application on desktop or on devices with wider display</h4>
      </div>
    </>
  );
}

export default Home;
