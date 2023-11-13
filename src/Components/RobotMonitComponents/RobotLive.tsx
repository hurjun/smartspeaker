import React, { useCallback, useEffect, useState } from 'react';

import styled from 'styled-components';

import { useSelector } from 'react-redux';
import { IMonitoringData } from '../../Interfaces/data/monitoring';

import { compareISOTimestamp } from '../../Utils/TimeStamp';

function RobotLive() {
  const [light, setLight] = useState(false);

  const robotStatus = useSelector(
    (state: {
      dataStore: {
        MonitData: IMonitoringData;
      };
    }) => state.dataStore.MonitData
  );

  const robotAlive = useCallback(() => {
    setLight(compareISOTimestamp(robotStatus.createdAt));
  }, [robotStatus]);

  useEffect(() => {
    robotAlive();
  }, [robotStatus]);

  return (
    <Container>
      <LiveToggle isLive={light} />
    </Container>
  );
}

export default RobotLive;

const Container = styled.div`
  position: relative;
  top: 0px;
  right: 40%;
  height: 0px;
`;

const LiveToggle = styled.div<{ isLive: boolean }>`
  border-radius: 10px;
  width: 8px;
  height: 8px;
  margin: 0 0 33px;
  object-fit: contain;

  background-image: ${(props) =>
    props.isLive
      ? 'radial-gradient(circle at 50% 50%, #f1fd73, #126f16 112%)'
      : 'radial-gradient(circle at 50% 50%, #fd7373, #6f1212 112%)'};
`;
