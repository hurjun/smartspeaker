import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { alarmIcon } from '../../Assets/icon';
import { IRobotInfo } from '../../Interfaces/auth/robot';
import { feverContentType, HistoryType } from '../../Interfaces/eventAI';
import { EventAlarmAPI } from '../../Services/EventAlarmAPI';

interface NewEventModalPropsType {
  eventString: string;
  occuredDate: string;
  occuredTime: string;
  eventIcon: string;
  onToggle: (index: number) => void;
  feverContent?: feverContentType;
  transactionId: string;
  modalPos: number;
}

function EmergencyModal({
  eventIcon,
  eventString,
  occuredDate,
  occuredTime,
  onToggle,
  feverContent,
  transactionId,
  modalPos,
}: NewEventModalPropsType) {
  const { uuid } = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const onClickCheck = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { value },
    } = event;
    onToggle(modalPos);
  };

  return (
    <NewEventModalLayout modalPos={modalPos}>
      <Outer>
        <img src={eventIcon} width={50} />
        <AlarmIcon src={alarmIcon} />
        <TimeLine>
          {occuredDate} {occuredTime}
        </TimeLine>
        <EventMessage>{eventString}</EventMessage>
        <CheckBtn value={modalPos} onClick={onClickCheck}>
          확인
        </CheckBtn>
      </Outer>
    </NewEventModalLayout>
  );
}

export default EmergencyModal;

const NewEventModalLayout = styled.div<{ modalPos: number }>`
  position: absolute;
  top: ${(props) => (props.modalPos % 15) * 30 + 'px'};
  left: ${(props) => props.modalPos * 10 + 'px'};
  z-index: 7;
  width: 15vw;
  height: 40vh;
  background-color: #2c2c2c;
  border-radius: 15px;
  border: solid 1px #c4c4c4;
`;

const AlarmIcon = styled.img`
  width: 20px;
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Outer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  row-gap: 3%;
`;

const TimeLine = styled.p`
  font-size: 20px;
  color: #ffc31f;
  font-weight: 100;
  height: 31px;
`;

const EventMessage = styled.p`
  font-size: 40px;
  color: #ffc31f;
`;

const CheckBtn = styled.button`
  outline: none;
  border: none;
  padding: 0.5rem 3rem;
  background-color: #2c2c2c;
  color: #fff;
  font-size: 12px;
  border-radius: 15px;
  border: solid 1px #c4c4c4;

  cursor: pointer;

  &:active {
    background-color: #595959;
  }
`;
