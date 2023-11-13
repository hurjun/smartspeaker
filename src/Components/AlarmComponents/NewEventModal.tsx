import { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IRobotInfo } from '../../Interfaces/auth/robot';
import { HistoryType, feverContentType } from '../../Interfaces/eventAI';
import { EventAlarmAPI } from '../../Services/EventAlarmAPI';
import FeverDetect from './FeverDetect';

interface NewEventModalPropsType {
  img: string;
  eventString: string;
  occuredDate: string;
  occuredTime: string;
  clickedAlarmIdx: number;
  setHistory: React.Dispatch<React.SetStateAction<HistoryType[]>>;
  onToggle: () => void;
  feverContent?: feverContentType;
  eventID: string;
  transactionId: string;
  redundantData: number;
  redundantDataUnit: string;
}

function NewEventModal({
  img,
  eventString,
  occuredDate,
  occuredTime,
  clickedAlarmIdx,
  setHistory,
  onToggle,
  feverContent,
  eventID,
  transactionId,
  redundantData,
  redundantDataUnit,
}: NewEventModalPropsType) {
  const { uuid } = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const newEventModalProps = useRef({
    img,
    eventString,
    occuredDate,
    occuredTime,
    clickedAlarmIdx,
    feverContent,
    eventID,
    transactionId,
    redundantData,
    redundantDataUnit,
  });

  const onClickCheck = () => {
    setHistory((history) =>
      history.map((ele, idx) => {
        if (idx === clickedAlarmIdx) {
          return { ...ele, checked: true };
        }
        return ele;
      })
    );

    onToggle();
    EventAlarmAPI.putEventAI({ uuid, transactionId });
  };

  return (
    <NewEventModalLayout>
      <CloseButton onClick={onToggle}>x</CloseButton>
      <Outer>
        {newEventModalProps.current.eventString === '발열 감지' ? (
          <FeverDetect
            eventID={newEventModalProps.current.eventID}
            feverContent={
              newEventModalProps.current.feverContent || {
                person_name: 'some',
                temperature: 'some',
                url: '',
              }
            }
            occuredDate={newEventModalProps.current.occuredDate}
            occuredTime={newEventModalProps.current.occuredTime}
          />
        ) : (
          <Inner>
            <img
              src={newEventModalProps.current.img}
              alt="event img"
              width={50}
              height={50}
            />
            <p>{newEventModalProps.current.eventString}</p>
            <div>
              <p>{newEventModalProps.current.occuredDate}</p>
              <p>/</p>
              <p>{newEventModalProps.current.occuredTime}</p>
              <p>
                {newEventModalProps.current.redundantData}{' '}
                {newEventModalProps.current.redundantDataUnit}
              </p>
            </div>
          </Inner>
        )}
        <CheckBtn onClick={onClickCheck}>확인</CheckBtn>
      </Outer>
    </NewEventModalLayout>
  );
}

export default NewEventModal;

const NewEventModalLayout = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  padding: 4rem 7rem;
  background-color: #2c2c2c;
  border-radius: 15px;
  border: 2px solid #707070;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: inherit;
  color: #c4c4c4;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;

const Outer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 18px;
    margin-top: 1rem;
  }

  div {
    display: flex;
    column-gap: 1rem;
  }
`;

const CheckBtn = styled.button`
  outline: none;
  border: none;
  padding: 1rem 3rem;
  margin-top: 3rem;
  background-color: #2446dd;
  color: #fff;
  font-size: 12px;
  border-radius: 15px;
  cursor: pointer;

  &:active {
    background-color: #1f3cbb;
  }
`;
