import React from 'react';

import styled from 'styled-components';

function BatteryStatus({ batteryStatus }: { batteryStatus: string }) {
  return (
    <>
      <Container>
        <BatteryGuage batteryPersentage={batteryStatus}>
          <p>{batteryStatus}%</p>
        </BatteryGuage>
      </Container>
    </>
  );
}

export default BatteryStatus;

const Container = styled.div`
  width: 75%;
  height: 5%;
  border: solid #ffffff 1px;
  border-radius: 12px;
  color: #fff;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
`;

const BatteryGuage = styled.div<{ batteryPersentage: string }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #24dd2b;
  height: 100%;
  border-radius: 12px;
  width: ${(props) => props.batteryPersentage + '%'};
  min-width: 20%;
  p {
    margin-right: 3px;
    font-size: 8px;
  }
`;
