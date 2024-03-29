import React, { useState, useEffect } from "react";
import "./app.css";

const Timer = () => {

  const timerPresets = {
    seconds: "00",
    minutes: "01",
    active: false,
    counter: 60
  }

  const [second, setSecond] = useState(timerPresets.seconds);
  const [minute, setMinute] = useState(timerPresets.minutes);

  const [isActive, setIsActive] = useState(timerPresets.active);
  const [counter, setCounter] = useState(timerPresets.counter);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter - 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(timerPresets.active);
    setCounter(timerPresets.counter);
    setSecond(timerPresets.seconds);
    setMinute(timerPresets.minutes);
  }

  if (counter === -1) {
    stopTimer()
  }

  return (
    <div className="clock-container">
      <div className="time">
        <span className="minute">{minute}</span>
        <span>:</span>
        <span className="second">{second}</span>
      </div>
      <div className="buttons">
        <button onClick={() => setIsActive(!isActive)} className="start">
          {isActive ? "Pause" : "Start"}
        </button>
        <button onClick={stopTimer} className="reset">
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

