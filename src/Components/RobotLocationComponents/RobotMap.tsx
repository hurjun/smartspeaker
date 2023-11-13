import React, { useCallback, useEffect, useRef, useState } from 'react';

import styled from 'styled-components';
import { Container } from '../../Styles/Container';

import { useSelector } from 'react-redux';

import { IMonitoringData } from '../../Interfaces/data/monitoring';
import { IRobotInfo } from '../../Interfaces/auth/robot';
import { useQuery } from 'react-query';
import { MapAPI } from '../../Services/MapAPI';

function RobotMap() {
  const [robotPoselPixelX, setRobotPoselPixelX] = useState(0);
  const [robotPoselPixelY, setRobotPoselPixelY] = useState(0);

  const [windowHeight, setWindowHeight] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);

  const offsetXY = useRef<HTMLImageElement | null>(null);

  const robotStatus = useSelector(
    (state: {
      dataStore: {
        MonitData: IMonitoringData;
      };
    }) => state.dataStore.MonitData
  );

  const { map_id } = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const proxyAboutMapImage = async () => {
    await MapAPI.getMapImg({ map_id });
  };

  const getMapData = async () => {
    const { data } = await MapAPI.getMapData({ map_id });
    return data[0];
  };

  const { isLoading, data } = useQuery(['getMapImgData'], async () => {
    proxyAboutMapImage();
    return getMapData();
  });

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };

  const robotLivePos = useCallback(() => {
    const convertOriginPosX = -data?.origin_position?.x;
    const convertOriginPosY = -data?.origin_position?.y;

    const mapRobotPoseX =
      (robotStatus?.position?.x + convertOriginPosX) / data?.resolution;

    const mapRobotPoseY =
      (data?.height * data?.resolution -
        (convertOriginPosY + robotStatus?.position?.y)) /
      data?.resolution;

    const transformAboutWebX =
      Number(offsetXY?.current?.offsetWidth) * (mapRobotPoseX / data?.width) +
      Number(offsetXY?.current?.offsetLeft);

    const transformAboutWebY =
      Number(offsetXY?.current?.offsetHeight) * (mapRobotPoseY / data?.height) +
      Number(offsetXY?.current?.offsetTop);

    setRobotPoselPixelX(transformAboutWebX);
    setRobotPoselPixelY(transformAboutWebY);
  }, [robotStatus]);

  useEffect(() => {
    robotLivePos();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowHeight, windowWidth, robotStatus]);

  if (isLoading) <div>로딩중</div>;

  return (
    <>
      <Container>
        <MapContainer>
          <MapImg
            ref={offsetXY}
            src={`https://bydsr.dogong.xyz/api/map/image/${map_id}`}
          />
        </MapContainer>
      </Container>
      <Toggle
        robotPoselPixelX={robotPoselPixelX}
        robotPoselPixelY={robotPoselPixelY}
      />
    </>
  );
}

export default RobotMap;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MapImg = styled.img`
  height: 100%;
  width: 100%;
`;

const Toggle = styled.div<{
  robotPoselPixelX: number;
  robotPoselPixelY: number;
}>`
  position: absolute;
  background-color: red;
  width: 7px;
  height: 7px;
  left: ${(props) => props.robotPoselPixelX + 'px'};
  top: ${(props) => props.robotPoselPixelY + 'px'};
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;
