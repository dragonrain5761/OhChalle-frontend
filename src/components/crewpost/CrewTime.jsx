import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function CrewTime({setCrewTime}) {
    let hours = Array.from({length: 18}, (_, i) => (i + 6) % 24);  
    let minutes = Array.from({length: 6}, (_, i) => i*10);

    let timeOptions = [];
   
    useEffect(() => {
        setCrewTime(timeOptions[0]); 
    }, []);

    const handleTimeChange = (e) => {
        setCrewTime(e.target.value);
      }
    hours.forEach(hour => {
        if (hour === 23) {  
            timeOptions.push('오후 11:00');
            return;
        }
       

        minutes.forEach(minute => {
            let period = hour < 12 ? '오전' : '오후';
            let formattedHour = hour <= 12 ? hour : hour - 12;
            let timeFormat = `${period} ${String(formattedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
            timeOptions.push(timeFormat);
        });
    });

    return (
        <CrewTimes className="times">
            <select onChange={handleTimeChange}>
                {timeOptions.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
        </CrewTimes>
    );
}

export default CrewTime;

const CrewTimes = styled.div`
    .times>select{border:none;}
`