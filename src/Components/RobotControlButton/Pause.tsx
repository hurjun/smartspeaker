import React, {useState} from "react";

import PauseButton from '../../Assets/button/pause.png'
import ResumeButton from '../../Assets/button/resume.png'
import {useSelector} from "react-redux";
import {IRobotInfo} from "../../Interfaces/auth/robot";
import {mqttCommand} from "../../Services/mqtt/command";

function Pause(){
    const robotInfo = useSelector(
        (state: {
            robotInfoStore: {
                RobotInfoData: IRobotInfo;
            };
        }) => state.robotInfoStore.RobotInfoData
    );
    const [pause,setPause] =useState(false);
    const robotUuid = robotInfo.uuid;
    const doPause =()=>{
        setPause(true);
        mqttCommand.PauseX(robotUuid);
        console.log("PAUSE_X");
    }
    const doResume =()=>{
        setPause(false);
        mqttCommand.PauseY(robotUuid);
        console.log("PAUSE_Y");
    }
    return (
        <>
            {pause==false&&
                <img src={PauseButton} onClick={doPause} />}
            {pause==true&&
            <img src={ResumeButton} onClick={doResume} />}
        </>
    )
}

export default Pause;