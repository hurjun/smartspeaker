import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Container } from '../../Styles/Container';

import { IMonitoringData } from '../../Interfaces/data/monitoring';

import { useDispatch } from 'react-redux';
import { setMonitData } from '../../Store/DataSlice';

import BatteryStatus from './BatteryStatus';
import SpeedStatus from './SpeedStatus';
import RobotLive from './RobotLive';

import { iroi } from '../../Assets/icon/index';
import Patrover from '../../Assets/robot/patrover.png';
import { IRobotInfo } from '../../Interfaces/auth/robot';
import { RawDataAPI } from '../../Services/RawDataAPI';
import { useQuery } from 'react-query';
import styled from 'styled-components';

function RobotMonit() {
  const dispatch = useDispatch();

  const robotInfo = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const robotUuid = robotInfo.uuid;

  const getMonitData = async () => {
    const { data } = await RawDataAPI.monitData(robotUuid);
    let transformJson = JSON.parse(data[0].payload);
    transformJson = { ...transformJson, createdAt: data[0].created_at };
    dispatch(setMonitData(transformJson));
    return transformJson;
  };

  const { data, error, isLoading, isError } = useQuery(
    [robotUuid, 'robotStatus'],
    () => {
      return getMonitData();
    },
    {
      staleTime: 10000,
      refetchInterval: 10000,
    }
  );

  if (isLoading) {
    return <>로딩중</>;
  }

  if (isError) {
    console.log('getMonitdata:error', error);
    return <>로딩중</>;
  }

  return (
    <Container>
      <RobotLive />
      <RobotId>{data.robotId}</RobotId>
      {robotInfo.type == 'pa2s' ? (
        <img src={Patrover} alt="Patrover" />
      ) : (
        <img src={iroi} alt="Iroi" width={164} />
      )}
      <SpeedStatus speed={data.speed} />
      <BatteryStatus batteryStatus={data.batteryStatus} />
    </Container>
  );
}

export default RobotMonit;

const RobotId = styled.span`
  font-size: 20px;
`;
