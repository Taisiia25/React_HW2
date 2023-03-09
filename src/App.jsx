import './App.css';
import React, { useState, useRef } from 'react';

const App = () => {
  const countRef = useRef(null);
  const [time, setTime] = useState(0);
  const [isStarted, setStarted] = useState(false);
  const [savedTime, setSavedTime] = useState([]);
  const [isStoped, setStoped] = useState(false);

 
  function toTimeString(totalSeconds) {
    const totalMs = totalSeconds * 1000;
    const result = new Date(totalMs).toISOString().slice(11, 19);
  
    return result;
  }

  const hansdleStart = () => {
    setStarted(true);
    countRef.current = setInterval (() => {setTime(time => time + 1)}, 1000);
  };
  const hansdleStop = () => {
    setStoped(true);
    clearInterval(countRef.current);
    setSavedTime([...savedTime, toTimeString(time)]);
  };

  const hansdleReset = () => {
    setSavedTime([...savedTime, toTimeString(time)]);
    clearInterval(countRef.current);
    setTime(0);
    setStarted(false);
    setStoped(false);
  };

  return (
    <div className="app">
      <div className="timer">
        {toTimeString(time)}
      </div>
      <div className="buttons">
        {isStarted && isStoped ? 
        <button className='continue' onClick={hansdleStart}>Continue</button> 
        : 
        <button className='start' onClick={hansdleStart}>Start</button>}

        <button className='stop' onClick={hansdleStop}>Stop</button>
        <button className='reset' onClick={hansdleReset}>Reset</button>
      </div>
      <div className="resultTime">
        {savedTime.map((elem, index) => (
          <div key={index}>{elem}</div>
        ))}
      </div>
    </div>
  )
}

export default App;
