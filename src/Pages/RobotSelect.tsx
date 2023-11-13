import React, { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { UserAuthAPI } from '../Services/UserAuthAPI';
import { useQuery } from 'react-query';

import { ITeamRobot } from '../Interfaces/auth/robot';

import { useDispatch, useSelector } from 'react-redux';
import { setRobotInfoData } from '../Store/RobotInfoSlice';

function RobotSelect() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getTeam = async () => {
    return await UserAuthAPI.getTeamRobot();
  };

  const { data, isLoading } = useQuery<ITeamRobot>(
    ['userRobotId'],
    () => {
      return getTeam();
    },
    {
      staleTime: 20000,
    }
  );

  if (isLoading) {
    return <>로딩중</>;
  }

  const selectRobot = (index: number) => {
    dispatch(setRobotInfoData(data?.data[index]));
    navigate(`${data?.data[index].id}`);
  };

  return (
    <Container>
      <RobotContainer>
        {data?.data.map((info, index) => (
          <RobotBox
            key={info.uuid}
            onClick={() => {
              selectRobot(index);
            }}
          >
            <RobotContents>
              <div>{info.nickname}</div>
              <div>{info.supplied}</div>
              <div>상태 </div>
              <div>{info.alive}</div>
            </RobotContents>
          </RobotBox>
        ))}
      </RobotContainer>
    </Container>
  );
}

export default RobotSelect;

const Container = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
`;

const RobotContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const RobotBox = styled.button`
  color: #ffffff;
  position: relative;
  width: 15%;
  padding-bottom: 15%;
  background: #2b2b2b;
  float: left;
  margin: 4% 3% 4% 3%;
  border-radius: 20px;
  cursor: pointer;
  &:active {
    opacity: 0.5;
  }
`;

const RobotContents = styled.div`
  position: absolute;
  padding: 20px;
  text-align: left;
`;
