import React from 'react';

import styled from 'styled-components';

function SpeedStatus({ speed }: { speed: number }) {
  return (
    <Container>
      SPEED
      <StyledSpeed>{speed}</StyledSpeed>
      m/s
    </Container>
  );
}

export default SpeedStatus;

const Container = styled.div`
  width: 75%;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  color: white;
  font-size: 10px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
`;

const StyledSpeed = styled.span`
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;
  color: #24dd2b;
`;
