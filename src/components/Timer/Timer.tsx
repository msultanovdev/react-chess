import React, { FC, useEffect, useRef, useState } from 'react';
import { Colors } from '../models/Colors';
import { Player } from '../models/Player';
import './Timer.css';

interface TimerProps {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<TimerProps> = ({currentPlayer, restart}) => {
    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null);

    useEffect(() => {
        startTimer();
    }, [currentPlayer])

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current);
        }
        const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(callback, 1000);
    }
    
    function decrementBlackTimer() {
        setBlackTime((prev: number) => prev - 1);
    }

    function decrementWhiteTimer() {
        setWhiteTime((prev: number) => prev - 1);
    }

    const handleRestart = () => {
        setBlackTime(300);
        setWhiteTime(300);
        restart();
    }

  return (
    <div>
        <div className="timer">
            <h2>Black - {blackTime}</h2>
            <h2>White - {whiteTime}</h2>
            <button className="timer_btn" onClick={handleRestart}>
                Restart game
            </button>
        </div>
    </div>
  )
}

export default Timer;