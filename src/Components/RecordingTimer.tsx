import React, { useState } from 'react';
import styled from 'styled-components';

function RecordingTimer() {
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const [time, setTime] = useState(0);

  const [isStart, setIsStart] = useState('#c4c4c4');

  React.useEffect(() => {
    let interval: any = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    if (isStart === '#c4c4c4') {
      setIsActive(true);
      setIsPaused(false);
      setIsStart('#ca0000');
    } else if (isStart === '#ca0000') {
      setIsActive(false);
      setTime(0);
      setIsStart('#c4c4c4');
    }
  };

  return (
    <Container>
      <RecordingBtn onClick={handleStart} recording={isStart} />
      <TimerContainer>
        <span>{('0' + Math.floor((time / 3600000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
        <span>{('0' + Math.floor((time / 1000) % 60)).slice(-2)}.</span>
        <span>{('0' + ((time / 10) % 100)).slice(-2)}</span>
      </TimerContainer>
    </Container>
  );
}

export default RecordingTimer;

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TimerContainer = styled.div`
  margin-left: 20px;
`;

const RecordingBtn = styled.button<{ recording: string }>`
  width: 4vh;
  height: 4vh;
  background-color: ${(props) => props.recording};
  transition: all 0.5s;
  border-radius: 50%;
  cursor: pointer;
`;
