import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import UpKeyGrey from '../../Assets/button/blurUpKey.png';
import DownKeyGrey from '../../Assets/button/blurDownKey.png';
import LeftKeyGrey from '../../Assets/button/blurLeftKey.png';
import RightKeyGrey from '../../Assets/button/blurRightKey.png';
import styled from 'styled-components';

const UpKeyButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const DownKeyButton = styled.div`
;
`;
const RightKeyButton = styled.div`
;
`;
const LeftKeyButton = styled.div`
;
`;
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

function BlurOrientationKey() {

    return (
      <>
          <Key>
              <UpKeyButton>
                  <img src={UpKeyGrey} />
              </UpKeyButton>
              <Downkey>
                  <LeftKeyButton>
                      <img src={LeftKeyGrey} />
                  </LeftKeyButton>
                  <DownKeyButton>
                      <img src={DownKeyGrey} />
                  </DownKeyButton>
                  <RightKeyButton>
                      <img src={RightKeyGrey} />
                  </RightKeyButton>
              </Downkey>
          </Key>
      </>
    );
}

export default BlurOrientationKey;


