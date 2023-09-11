import { ChangeEvent, useEffect, useState } from 'react';
import { CrewTimes } from './CrewForm.style';


interface CrewTimeProps{
  setCrewTime: (crewTimes: string) => void;
}
const CrewTime: React.FC<CrewTimeProps> = ({ setCrewTime })=> {
  const [timeOptions, setTimeOptions] = useState<string[]>([]);

  useEffect(() => {
    let hours:number[] = Array.from({length: 18}, (_, i) => (i + 6) % 24);  
    let minutes:number[] = Array.from({length: 6}, (_, i) => i * 10);
    let options:string[] = [];

    hours.forEach(hour => {
      if (hour === 23) {  
        options.push('오후 11:00');
        return;
      }
  
      minutes.forEach(minute => {
        let period = hour < 12 ? '오전' : '오후';
        let formattedHour = hour <= 12 ? hour : hour - 12;
        let timeFormat = `${period} ${String(formattedHour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        options.push(timeFormat);
      });
    });

    setTimeOptions(options);
    if (options.length > 0) {
      setCrewTime(options[0]);
    }
  }, [setCrewTime]);

  const handleTimeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      e.target.style.color = "#111111"; 
    } else {
      e.target.style.color = "#b7b7b7";  
    }
  
    setCrewTime(selectedValue);
  };

  return (
    <CrewTimes className="times">
      <select onChange={handleTimeChange}>
        {timeOptions.map((time, idx) => <option key={idx} value={time}>{time}</option>)}
      </select>
    </CrewTimes>
  );
}

export default CrewTime;

