import React from "react";

import HomeButton from '../../Assets/button/goHome.png'
import {useSelector} from "react-redux";
import {IRobotInfo} from "../../Interfaces/auth/robot";
import {mqttCommand} from "../../Services/mqtt/command";

function Home(){
    const robotInfo = useSelector(
        (state: {
            robotInfoStore: {
                RobotInfoData: IRobotInfo;
            };
        }) => state.robotInfoStore.RobotInfoData
    );

    const robotUuid = robotInfo.uuid;
    const home =()=>{
        mqttCommand.Home(robotUuid);
        console.log("HOME");
    }
    return (
        <>
            <img src={HomeButton} onClick={home} />
        </>
    )
}

export default Home;