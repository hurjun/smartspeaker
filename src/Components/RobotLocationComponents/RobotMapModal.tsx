import React, { useEffect, useRef, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setMapClose } from '../../Store/OpenSlice';

import styled from 'styled-components';

import Map from '../../Assets/map/edited_area_map.png';
import { IMonitoringData } from '../../Interfaces/data/monitoring';

function RobotMapModal() {
  const dispatch = useDispatch();
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

  const closeMapModal = () => {
    dispatch(setMapClose());
  };

  const handleResize = () => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    setRobotPoselPixelX(
      ((Number(robotStatus?.position?.x) + -1 * -574) / 0.1 / 6720) *
        Number(offsetXY.current?.offsetWidth) +
        Number(offsetXY.current?.offsetLeft)
    );
    setRobotPoselPixelY(
      ((7174 * 0.1 - -1 * Number(robotStatus?.position?.y) * -96.6) /
        0.1 /
        7174) *
        Number(offsetXY.current?.offsetHeight) +
        Number(offsetXY.current?.offsetTop)
    );

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [
    windowHeight,
    windowWidth,
    robotStatus,
    robotPoselPixelX,
    robotPoselPixelY,
  ]);

  return (
    <Container onClick={closeMapModal}>
      <img ref={offsetXY} src={Map} alt="mep" />
      <Toggle
        robotPoselPixelX={robotPoselPixelX}
        robotPoselPixelY={robotPoselPixelY}
      />
    </Container>
  );
}

export default RobotMapModal;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff40;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 12;
  cursor: pointer;
  img {
    width: 40%;
  }
`;

const Toggle = styled.div<{
  robotPoselPixelX: number;
  robotPoselPixelY: number;
}>`
  position: absolute;
  background-color: red;
  width: 10px;
  height: 10px;
  transform: translate(-50%, -50%);
  left: ${(props) => props.robotPoselPixelX + 'px'};
  top: ${(props) => props.robotPoselPixelY + 'px'};
  border-radius: 50%;
`;
