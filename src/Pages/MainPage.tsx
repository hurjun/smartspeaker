import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

import { BydsrLogo } from '../Assets/logo';
import { logoutIcon, homeIcon } from '../Assets/icon/index';

import blurStop from '../Assets/button/blurStop.png';
import blurGoHome from '../Assets/button/blurGoHome.png';
import call from '../Assets/button/call.png';
import blurCall from '../Assets/button/blurCall.png';
import searchLight from '../Assets/button/searchLight.png';
import blurSearchLight from '../Assets/button/blurSearchLight.png';
import blurPause from '../Assets/button/blurPause.png';
import soundBar from '../Assets/button/soundBar.png';
import LightBar from '../Assets/button/lightBar.png';
import blurSoundBar from '../Assets/button/blurBar.png';

import RobotMonit from '../Components/RobotMonitComponents/RobotMonit';
import RobotMap from '../Components/RobotLocationComponents/RobotMap';
import RobotStatus from '../Components/RobotStatusComponents/RobotStatus';
import RobotMapModal from '../Components/RobotLocationComponents/RobotMapModal';
import EventAIAlarm from '../Components/AlarmComponents/EventAIAlarm';
import MemoContents from '../Components/MemoComponents/MemoContents';
import RobotVideo from '../Components/RobotVideoComponents/RobotVideo';
import OrientationKey from '../Components/RobotControlButton/OrientationKey';
import BlurOrientationKey from '../Components/RobotControlButton/BlurOrientationKey';
import EStop from '../Components/RobotControlButton/EStop';
import Pause from '../Components/RobotControlButton/Pause';
import Home from '../Components/RobotControlButton/Home';
import { useDispatch, useSelector } from 'react-redux';

import { setMapOpen } from '../Store/OpenSlice';
import { setLoginInfo } from '../Store/LoginSlice';
import ModalButtons from '../Components/AdditionalFuncsComponents/ModalButtons';
import GuageChart from '../Components/GuageCharts/GuageChart';
import { useCookies } from 'react-cookie';
import { IRobotInfo } from '../Interfaces/auth/robot';
import Switch from 'react-switch';
import useWebsocket from '../Hooks/useWS';

function MainPage() {
  const { isWebsocket, onToggleWS } = useWebsocket();
  const [, , removeCookie] = useCookies(['id']); // 쿠키 훅

  const robotInfo = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const robotId = robotInfo.id;
  const robotType = robotInfo.type;

  const dispatch = useDispatch();

  const navigator = useNavigate();

  const isOpen = useSelector(
    (state: {
      openStore: {
        isOpen: boolean;
      };
    }) => state.openStore.isOpen
  );

  const openMapModal = () => {
    dispatch(setMapOpen());
  };

  const logout = () => {
    dispatch(setLoginInfo({ token: '', id: '' }));
    removeCookie('id', { path: '/' });
    removeCookie('id', { path: '/robotselect' });
    window.location.href = '/';
  };

  const goToRobotSelect = () => {
    navigator('/robotselect');
  };

  return (
    <>
      {isOpen && <RobotMapModal />}
      <GridContainer>
        <Header>
          <HeaderInner>
            <img src={BydsrLogo} alt="hanlimLogos" width={226} height={56} />
            <div>
              <LogoutButton onClick={goToRobotSelect}>
                <img src={homeIcon} />
                메인화면
              </LogoutButton>

              <LogoutButton onClick={logout}>
                <img src={logoutIcon} />
                로그아웃
              </LogoutButton>
            </div>
          </HeaderInner>
        </Header>
        <RobotStatusContainer>
          <RobotMonitContents>
            <RobotMonit />
          </RobotMonitContents>
          <RobotStatusContents>
            <RobotStatus />
          </RobotStatusContents>
          <RobotMapContents onClick={openMapModal}>
            <RobotMap />
          </RobotMapContents>
        </RobotStatusContainer>
        <RobotVideoContainer>
          <RobotVideo robotId={robotId} />
        </RobotVideoContainer>
        <RobotEventContainer>
          <ModalContents>
            <ModalButtons />
          </ModalContents>
          <EventAlarmsContents>
            <EventAIAlarm />
          </EventAlarmsContents>
        </RobotEventContainer>
        <Footer1>
          {/* {robotType == 'pa2s' && <GuageChart />} 게이지 차트 주석*/}
          {robotType != 'pa2s' && <MemoContents />}
        </Footer1>
        <Footer2>
          <FooterInner1>
            <div>
              <h1>로봇 제어</h1>
              <Switch checked={isWebsocket} onChange={onToggleWS} height={16} width={32} />
            </div>
            {isWebsocket && <EStop />}
            {!isWebsocket && <img src={blurStop} />}
          </FooterInner1>
          <FooterInner2>
            <OrientationKey value={isWebsocket} />
            {/*{!isWebsocket && <BlurOrientationKey />}*/}
          </FooterInner2>
          <Line />
          <FooterInner3>
            <FooterInner3Up>
              {isWebsocket && <img src={call} />}
              {!isWebsocket && <img src={blurCall} />}
              {isWebsocket && <Pause />}
              {!isWebsocket && <img src={blurPause} />}
            </FooterInner3Up>
            <FooterInner3Down>
              {isWebsocket && <img src={searchLight} />}
              {!isWebsocket && <img src={blurSearchLight} />}
              {isWebsocket && <Home />}
              {!isWebsocket && <img src={blurGoHome} />}
            </FooterInner3Down>
          </FooterInner3>
          <FooterInner4>
            <h1 style={{ marginBottom: '-1.5rem' }}>음량</h1>
            {isWebsocket && <img src={soundBar} />}
            {!isWebsocket && <img src={blurSoundBar} />}
            <h1 style={{ marginBottom: '-1.5rem', marginTop: '-0.1rem' }}>
              전면 디스플레이 밝기
            </h1>
            {isWebsocket && <img src={LightBar} />}
            {!isWebsocket && <img src={blurSoundBar} />}
          </FooterInner4>
          {/*START YOUR HEALTHY AND HAPPY LIFE WITH US*/}
        </Footer2>
      </GridContainer>
    </>
  );
}

export default MainPage;

const GridContainer = styled.div`
  width: 98vw;
  height: 95vh;
  display: grid;
  /* padding: 1rem; */

  grid-template-columns: 1fr 2.4fr 1.4fr;
  grid-template-rows: 8% 75% 15%;
  grid-row-gap: 16px;
  grid-column-gap: 8px;
  grid-template-areas:
    'f f f'
    'a b c'
    'd d e';
`;

const RobotStatusContainer = styled.div`
  display: grid;
  grid-gap: 0.4%;
  grid-column-gap: 8px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1.4fr;
  grid-template-areas:
    'a b'
    'c c';
`;

const RobotMonitContents = styled.div`
  background-color: #2c2c2c;
  border-radius: 30px;
  grid-area: a;
  padding: 15px;
`;

const RobotStatusContents = styled.div`
  grid-area: b;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-areas: 'a';
`;

const RobotMapContents = styled.div`
  border-radius: 30px;
  border: solid 1px #707070;
  background-color: #fff;
  grid-area: c;
  min-height: 60%;
  overflow: hidden;
`;

const RobotVideoContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 5fr 0.1fr;
  grid-template-areas:
    'a a'
    'b b';
`;

const RobotEventContainer = styled.div`
  display: grid;
  grid-gap: 16px;
  grid-template-columns: 1fr 1.5fr;
  grid-template-rows: 1fr;
`;

const ModalContents = styled.div`
  background-color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  padding: 24px;
`;

const EventAlarmsContents = styled.div`
  border-radius: 30px;
  height: 70vh;
`;

const Header = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 15px;
  grid-area: f;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  column-gap: 70%;
  div {
    display: flex;
    column-gap: 26px;
  }
`;
const LogoutButton = styled.button`
  background-color: inherit;
  color: #c4c4c4;
  border: none;
  /* height: 100%; */
  width: 100%;
  cursor: pointer;

  display: flex;
  justify-content: space-between;
  align-items: center;

  column-gap: 8px;

  &:active {
    opacity: 0.5;
  }
`;

const Footer1 = styled.div`
  background-color: #c4c4c4;
  display: flex;
  color: #707070;
  padding-left: 10px;
  border-radius: 17px;
  margin-right: 2px;
  height: 100%;
  grid-area: d;
`;

const Footer2 = styled.div`
  border-radius: 15px;
  margin-left: 2px;
  height: 100%;
  grid-area: e;
  color: #707070;
  background-color: #1a1a1a;
  display: flex;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: center;
`;

const FooterInner1 = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  grid-gap: 1rem;
  justify-content: flex-start;
  align-items:center;
`;
const FooterInner2 = styled.div`
  display: grid;
`;
const Line = styled.div`
  height: 80%;
  width: 2px;
  background-color: #2c2c2c;
`;

const FooterInner3 = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;
const FooterInner3Up = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
`;
const FooterInner3Down = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 1rem;
`;
const FooterInner4 = styled.div`
  display: grid;
  row-gap: 2rem;
  text-align: left;
`;
