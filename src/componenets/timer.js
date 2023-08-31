import "./timer.css";
import React, { useState, useEffect, useRef } from "react";
import Card from "../card.js";
import "../card.css";


function Timer() {
    
    const [time, setTime] = useState(`00:00`);
    const [isTimeSet, setIsTimeSet] = useState(false);
    const inputRef = useRef(null);

    function setInputValue(event) {
        let min = event.target.value;
        if (min < 10) {
            min = `0${min}`;
        }
        setTime(`${min}:00`);
        setIsTimeSet(true);
    }

    function stopTimer() {
        setIsTimeSet(false);
    }

    function resumeTimer() {
        setIsTimeSet(true);
    }

    function resetTimer() {
        setTime(`00:00`);
        setIsTimeSet(false);
        inputRef.current.value = "";
        
    }

    useEffect(() => {
        if (!isTimeSet) return;
        const changeTime = setTimeout(() => {
            let min = Number(time.split(":")[0]);
            let sec = Number(time.split(":")[1]);
            if (min === 0 && sec === 0) {
                inputRef.current.value = "";
                return;
            } 
            sec = sec - 1;
            if (sec < 0) {
                min = min - 1;
                sec = 59;
                if (min < 0) {
                    clearTimeout(changeTime);
                }
            }
            
            if (min < 10) {
                min = `${min}`.padStart(2, '0');
            }
            if (sec < 10) {
                sec = `0${sec}`;
            }
            setTime(`${min}:${sec}`)
        }, 1000);
        return () => {
            clearTimeout(changeTime);
          };
    }, [time, isTimeSet]);
    
    return (
        <Card  className="card">
            <div className="timer-container">
            <label className="text"> Enter the minutes </label>
            <input className="box" type="number" min={1}  max={10} onChange={setInputValue} />
            <span className="time-show"> {time} </span>
            </div>   
            <div className="button-container">
            <button className="stop-button" onClick={stopTimer}>Stop </button>
            <button className="resume-button" onClick={resumeTimer}>Resume </button>
            <button className="reset-button" onClick={resetTimer}>Reset</button>
            </div>          
        </Card>
    )
}

export default Timer;
