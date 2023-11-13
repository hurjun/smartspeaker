import React, {useEffect} from 'react';
import styled from 'styled-components';

import ApexCharts from 'react-apexcharts';
import {useSelector} from 'react-redux';
import {RawDataAPI} from "../../Services/RawDataAPI";
import {IRobotInfo, ITeamRobot} from "../../Interfaces/auth/robot";
import {useQuery} from "react-query";

const RadialBar = () => {
    const robotInfo = useSelector(
        (state: {
            robotInfoStore: {
                RobotInfoData: IRobotInfo;
            };
        }) => state.robotInfoStore.RobotInfoData
    );
    const robotUuid = robotInfo.uuid;

    interface responseType {
        NO2: number;
        "PM1.0": number;
        "PM2.5": number;
        PM10: number;
        SO2L: number;
        VOC: number;
    }

    const getSensorData = async () => {
        const {data} = await RawDataAPI.sensorData(robotUuid);
        const transformJson = JSON.parse(data[0]?.payload);
        let obj = {...transformJson.gas, ...transformJson.dust}
        return obj;
    };

    const {data, isLoading, isError,error} = useQuery<responseType>(
        ['robotSensorData'],
        () => {
            return getSensorData();
        },
        {
            staleTime: 20000,
        }
    );

    if (isLoading) {
        return <>로딩중</>;
    }
    if (isError) {
        console.log(error);
        return <>ERROR</>;
    }

    return (
        <Container>
            {data && <>
                {Object.keys(data).map((res, index) => (
                    <ChartContainer key={index}>
                        <ApexCharts
                            series={[Object.values(data)[index]]}
                            options={{
                                chart: {
                                    type: 'radialBar',
                                    toolbar: {
                                        show: true,
                                    },
                                },
                                plotOptions: {
                                    radialBar: {
                                        startAngle: -135,
                                        endAngle: 225,
                                        hollow: {
                                            margin: 0,
                                            size: '70%',
                                            background: '#fff',
                                            image: undefined,
                                            imageOffsetX: 0,
                                            imageOffsetY: 0,
                                            position: 'front',
                                            dropShadow: {
                                                enabled: true,
                                                top: 3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.24,
                                            },
                                        },
                                        track: {
                                            background: '#fff',
                                            strokeWidth: '67%',
                                            margin: 0, // margin is in pixels
                                            dropShadow: {
                                                enabled: true,
                                                top: -3,
                                                left: 0,
                                                blur: 4,
                                                opacity: 0.35,
                                            },
                                        },

                                        dataLabels: {
                                            show: true,
                                            name: {
                                                offsetY: -10,
                                                show: true,
                                                color: '#546723',
                                                fontSize: '20px',
                                            },
                                            value: {
                                                show: true,
                                                color: '#546723',
                                                fontSize: '18px',
                                            },
                                        },
                                    },
                                },
                                colors: ['#546723'],
                                fill: {
                                    opacity: 1,
                                },
                                stroke: {
                                    lineCap: 'round',
                                },
                                labels: [res],
                            }}
                            type="radialBar"
                            height={'110%'}
                        />
                    </ChartContainer>
                ))}</>}

        </Container>
    );
};

export default RadialBar;

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ChartContainer = styled.div`
  width: 10%;
  height: 100%;
`;
