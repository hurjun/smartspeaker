import React from "react";

import StopButton from '../../Assets/button/stop.png'
import {useSelector} from "react-redux";
import {IRobotInfo} from "../../Interfaces/auth/robot";
import {mqttCommand} from "../../Services/mqtt/command";
import styled from 'styled-components';

function EStop(){
    const robotInfo = useSelector(
        (state: {
            robotInfoStore: {
                RobotInfoData: IRobotInfo;
            };
        }) => state.robotInfoStore.RobotInfoData
    );

    const robotUuid = robotInfo.uuid;
    const stop =()=>{
        mqttCommand.Stop(robotUuid);
        console.log("STOP");
    }
    return (
        <>
            <EstopImage src={StopButton} onClick={stop} />
        </>
    )
}

export default EStop;
const EstopImage = styled.img`
  width:40px;
`;
