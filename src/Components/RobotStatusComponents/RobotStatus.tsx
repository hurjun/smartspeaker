import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IRobotInfo } from '../../Interfaces/auth/robot';
import { RawDataAPI } from '../../Services/RawDataAPI';
import { useQuery } from 'react-query';

function RobotStatus() {
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
    const transformJson = JSON.parse(data[0].payload);
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
      <RobotStatusContainer>
        상태
        <br />
        <RobotStatusVal>{data?.robotStatus}</RobotStatusVal>
      </RobotStatusContainer>
      <RobotStatusContainer>
        목적
        <br />
        <RobotStatusVal>{data?.moveStatus}</RobotStatusVal>
      </RobotStatusContainer>
    </Container>
  );
}

export default RobotStatus;

const Container = styled.div`
  background-color: #1a1a1a;
  padding: 24px 0 0 24px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const RobotStatusContainer = styled.div``;

const RobotStatusVal = styled.span`
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  font-size: 13px;
`;
