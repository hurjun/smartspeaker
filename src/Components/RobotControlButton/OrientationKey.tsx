import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import UpKeyGrey from '../../Assets/button/upkeygrey.png';
import DownKeyGrey from '../../Assets/button/downkeygrey.png';
import LeftKeyGrey from '../../Assets/button/leftkeygrey.png';
import RightKeyGrey from '../../Assets/button/rightkeygrey.png';
import UpKeyBlack from '../../Assets/button/upkeyblack.png';
import LeftKeyBlack from '../../Assets/button/leftkeyblack.png';
import DownKeyBlack from '../../Assets/button/downkeyblack.png';
import RightKeyBlack from '../../Assets/button/rightkeyblack.png';
import BlurUpKeyGrey from '../../Assets/button/blurUpKey.png';
import BlurDownKeyGrey from '../../Assets/button/blurDownKey.png';
import BlurLeftKeyGrey from '../../Assets/button/blurLeftKey.png';
import BlurRightKeyGrey from '../../Assets/button/blurRightKey.png';

import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { IRobotInfo } from '../../Interfaces/auth/robot';

const UpKeyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DownKeyButton = styled.div``;
const RightKeyButton = styled.div``;
const LeftKeyButton = styled.div``;
const Downkey = styled.div`
  margin-top: 3px;
  column-gap: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Key = styled.div`
  vertical-align: middle;
  display: table-cell;
  align-items: center;
  justify-content: center;
`;

function OrientationKey(props: any) {
  const robotInfo = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData,
  );
  const robotUuid = robotInfo.uuid;

  const [isClickedUp, setIsClickedUp] = useState(false);
  const [isClickedLeft, setIsClickedLeft] = useState(false);
  const [isClickedDown, setIsClickedDown] = useState(false);
  const [isClickedRight, setIsClickedRight] = useState(false);

  const handleKeyBoardEvent = (e: KeyboardEvent<HTMLImageElement>) => {
    console.log('keyboard:', e);

    if (e.key == 'ArrowUp') {
      setIsClickedUp(true);
      websocket.current?.send(
        JSON.stringify({
          mode: 'DR',
          direction: 'FRONT',
          rotate: '',
        }),
      );
    }
    if (e.key == 'ArrowLeft') {
      setIsClickedLeft(true);
      websocket.current?.send(
        JSON.stringify({
          mode: 'DR',
          direction: '',
          rotate: 'TURNLEFT',
        }),
      );
    }
    if (e.key == 'ArrowDown') {
      setIsClickedDown(true);
      websocket.current?.send(
        JSON.stringify({
          mode: 'DR',
          direction: 'BACK',
          rotate: '',
        }),
      );
    }
    if (e.key == 'ArrowRight') {
      setIsClickedRight(true);
      websocket.current?.send(
        JSON.stringify({
          mode: 'DR',
          direction: '',
          rotate: 'TURNRIGHT',
        }),
      );
    }
  };
  const cleanClicked = (e: KeyboardEvent<HTMLImageElement>) => {
    console.log('!');
    if (e.key == 'ArrowUp') {
      setIsClickedUp(false);
    }
    if (e.key == 'ArrowLeft') {
      setIsClickedLeft(false);
    }
    if (e.key == 'ArrowDown') {
      setIsClickedDown(false);
    }
    if (e.key == 'ArrowRight') {
      setIsClickedRight(false);
    }
  };
  let websocket = useRef<WebSocket | null>(null);
  const webSocketUrl =
    `wss://bydsr.dogong.xyz/api/command/manual?robot_uuid=` + robotUuid;

  useEffect(() => {
    console.log('propsvalue', props.value);
    if (props.value == true) {
      console.log('newWebsocket');
      if (!websocket.current) {
        websocket.current = new WebSocket(webSocketUrl);
        websocket.current.onopen = () => {
          console.log('Websocket connected to ' + webSocketUrl);
          console.log("websocket.current",websocket.current);
        };
        websocket.current.onclose = (error) => {
          console.error('Websocket disconnect from ', webSocketUrl);
          console.error(error);
        };
        websocket.current.onerror = (error) => {
          console.error('Websocket connection error: ' + webSocketUrl);
          console.error(error);
        };
        websocket.current.onmessage = (event: MessageEvent) => {
          console.log('websocket:data: ', event);
        };
      }
      console.log('websocket:', websocket.current);
      //@ts-ignore
      window.addEventListener('keydown', handleKeyBoardEvent);
      //@ts-ignore
      window.addEventListener('keyup', cleanClicked);
    }
    if (props.value == false) {
      if(websocket.current) {
        console.log('websocketClose');
        websocket.current.onclose = () => {
          console.log("!!websocketClose");
        }
      }
      console.log(websocket.current);
      websocket.current = null;
    }
    return () => {
      // @ts-ignore
      window.removeEventListener('keydown', handleKeyBoardEvent);
      console.log('removeKeyDOwn');
      // @ts-ignore
      window.removeEventListener('keyup', cleanClicked);
      console.log('!!!websocketClose');
    };
  }, [props.value]);

  return (
    <>
      {props.value == true &&
        <Key>
          <UpKeyButton onKeyDown={handleKeyBoardEvent} onKeyUp={cleanClicked}>
            {isClickedUp ? <img src={UpKeyBlack} /> : <img src={UpKeyGrey} />}
          </UpKeyButton>
          <Downkey>
            <LeftKeyButton onKeyDown={handleKeyBoardEvent} onKeyUp={cleanClicked}>
              {isClickedLeft ? (
                <img src={LeftKeyBlack} />
              ) : (
                <img src={LeftKeyGrey} />
              )}
            </LeftKeyButton>
            <DownKeyButton onKeyDown={handleKeyBoardEvent} onKeyUp={cleanClicked}>
              {isClickedDown ? (
                <img src={DownKeyBlack} />
              ) : (
                <img src={DownKeyGrey} />
              )}
            </DownKeyButton>
            <RightKeyButton
              onKeyDown={handleKeyBoardEvent}
              onKeyUp={cleanClicked}
            >
              {isClickedRight ? (
                <img src={RightKeyBlack} />
              ) : (
                <img src={RightKeyGrey} />
              )}
            </RightKeyButton>
          </Downkey>
        </Key>}
      {props.value == false &&
        <Key>
          <UpKeyButton>
            <img src={BlurUpKeyGrey} />
          </UpKeyButton>
          <Downkey>
            <LeftKeyButton>
              <img src={BlurLeftKeyGrey} />
            </LeftKeyButton>
            <DownKeyButton>
              <img src={BlurDownKeyGrey} />
            </DownKeyButton>
            <RightKeyButton>
              <img src={BlurRightKeyGrey} />
            </RightKeyButton>
          </Downkey>
        </Key>
      }
    </>
  );
}

export default OrientationKey;
