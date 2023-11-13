import React, { useState } from 'react';

import styled from 'styled-components';
import useModal from '../../Hooks/useModel';
import ModalComponent from '../ModalComponent';

import { questionLog, questionEdit } from '../../Assets/icon/index';

const assistantFuncs = [
  { title: '질의응답 편집', img: questionEdit },
  { title: '질의응답 내역', img: questionLog },
  // '화상통화',
  // '수행편집',
  // '발열 감지',
  // '알림',
  // '방역',
  // '메뉴',
  // 'Untitled2',
  ,
];

function ModalButtons() {
  const { isShowing, onToggle } = useModal();
  const [clickedBtn, setClickedBtn] = useState<string>('');

  return (
    <Container>
      <span>보조기능</span>
      <ModalButtonsContainer>
        <>
          {assistantFuncs.map((ele, index) => (
            <ModalContents key={index}>
              <ModalButton
                src={ele?.img}
                onClick={() => {
                  onToggle();
                  setClickedBtn(`${ele?.title}`);
                }}
              />
              <p>{ele?.title}</p>
            </ModalContents>
          ))}
          {isShowing && (
            <ModalComponent clickedBtn={clickedBtn} onClose={onToggle} />
          )}
        </>
      </ModalButtonsContainer>
    </Container>
  );
}

export default ModalButtons;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  font-size: 15px;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: left;
  color: #c4c4c4;

  row-gap: 21px;

  span {
    font-size: 15px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: normal;
    text-align: left;
    color: #c4c4c4;
  }
`;

const ModalButtonsContainer = styled.div`
  width: 100%;
  /* height: 100%; */
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  justify-content: space-evenly;
`;

const ModalContents = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalButton = styled.img`
  cursor: pointer;
  padding: 0;
  margin: 7.5%;
  border: none;
  background-image: radial-gradient(circle at 50% 37%, #5f5d5d, #404040 75%);
  padding: 20%;
  border-radius: 20%;
  &:active {
    opacity: 0.5;
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
  p {
    color: #c4c4c4;
    text-align: center;
    padding-top: 100%;
    font-size: 10px;
  }
`;
