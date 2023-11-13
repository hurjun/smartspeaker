import { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IRobotInfo } from '../../Interfaces/auth/robot';
import { EventAlarmAPI } from '../../Services/EventAlarmAPI';
import {
  Fall,
  Fever,
  Fire,
  Human,
  StrangeSound,
  fireAlarm,
  humanAlarm,
  securityAlarm,
  strangeAlarm,
  alarmIcon,
} from '../../Assets/icon';
import useMoal from '../../Hooks/useModel';
import NewEventModal from './NewEventModal';

import { HistoryType } from '../../Interfaces/eventAI';
import { EventAIObjectType } from '../../Interfaces/data/eventAlarm';

import { ISOtimeFromTostamp } from '../../Utils/TimeStamp';
import EmergencyModal from './EmergencyModal';

interface IDangerEvents {
  [eventType: string]: {
    img: string;
    eventString: string;
    message: string;
  };
}

function EventAIAlarm() {
  const robotInfo = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const { isShowing, onToggle } = useMoal();

  const [fromDate, setFromDate] = useState<string>(
    ISOtimeFromTostamp().timeFrom
  );

  const [toDate, setToDate] = useState<string>(ISOtimeFromTostamp().timeTo);

  const [eventCountArr, setEventCountArr] = useState<number[]>([]);

  const [newEvent, setNewEvent] = useState(0);

  const [isEmergency, setIsEmergency] = useState(false);

  const [emergencyAlarm, setEmergencyAlarm] = useState([] as HistoryType[]);

  let isFirst = useRef(true);
  let oldTransactionId = useRef('');

  const { data, isLoading, isError, dataUpdatedAt } = useQuery(
    ['event-ai'],
    async () => {
      let count = 1;

      let arr: number[] = [];

      const data = await EventAlarmAPI.getEventAI(
        robotInfo.uuid,
        fromDate,
        toDate
      );

      let dubData = [...data];

      let stack = 0;

      if (isFirst.current === false) {
        for (const event of dubData) {
          if (oldTransactionId.current === event.transaction_id) {
            count += 1;
            dubData = dubData.slice(0, 1);
          } else {
            stack += 1;
            if (stack >= 2) {
              arr.push(count);
            }
            count = 1;
            oldTransactionId.current = event.transaction_id;
          }
        }
        setNewEvent((ele) => {
          return ele + arr.length;
        });
        arr.push(count);
      } else {
        data.forEach((event) => {
          if (isFirst.current) {
            oldTransactionId.current = event.transaction_id;
            isFirst.current = false;
            return;
          }

          if (oldTransactionId.current === event.transaction_id) {
            count += 1;
          } else {
            arr.push(count);
            count = 1;
            oldTransactionId.current = event.transaction_id;
          }
        });
      }

      setEventCountArr((eventCount) => {
        return arr.concat(eventCount);
      });

      return data;
    },
    {
      staleTime: 11000,
      refetchInterval: 11000,
    }
  );

  const [history, setHistory] = useState<HistoryType[]>([]);

  const [clickedAlarmIdx, setClickedAlarmIdx] = useState<number>(0);
  const [clickedCategoryIdx, setClickedCategoryIdx] = useState<number>(-1);

  const dangerEvents: IDangerEvents = {
    FEVER: {
      img: Fever,
      eventString: '발열 감지',
      message: '도 이상의 발열 감지',
    },
    FALL: {
      img: humanAlarm,
      eventString: '낙상 감지',
      message: '명의 낙상 감지',
    },
    FIRE: {
      img: fireAlarm,
      eventString: '화재 감지',
      message: '곳의 화재 감지',
    },
    SCREAM: {
      img: strangeAlarm,
      eventString: '이상음 감지',
      message: '개의 이상음 감지',
    },
    HUMAN: {
      img: securityAlarm,
      eventString: '사람 감지',
      message: '명의 사람 감지',
    },
  };
  type dangerEventKey = keyof typeof dangerEvents;

  const filteringEvents = {
    FEVER: {
      img: Fever,
      eventString: '발열 감지',
      message: '도 이상의 발열 감지',
    },
    FALL: {
      img: Fall,
      eventString: '낙상 감지',
      message: '명의 낙상 감지',
    },
    FIRE: {
      img: Fire,
      eventString: '화재 감지',
      message: '곳의 화재 감지',
    },
    SCREAM: {
      img: StrangeSound,
      eventString: '이상음 감지',
      message: '개의 이상음 감지',
    },
    HUMAN: {
      img: Human,
      eventString: '사람 감지',
      message: '명의 사람 감지',
    },
  };
  type filteringEventsKey = keyof typeof filteringEvents;

  useEffect(() => {
    setToDate(ISOtimeFromTostamp().timeTo);
  }, [dataUpdatedAt]);

  const [firstHCount, setFirstHCount] = useState(0);
  const [firstECount, setFirstECount] = useState(0);

  const sliceHistory = (newHistory: HistoryType[]) => {
    if (newHistory.length >= 100) {
      newHistory = newHistory.slice(0, 100);
    } else {
      return;
    }
  };

  const confirmTime = (hms: string) => {
    const hour = Number(hms.split(':')[0]);

    if (hour >= 6 && hour <= 21) {
      return true;
      // false 여야하고
      // 기능구현 할땐 true hdcd 하드코딩
    } else {
      return true;
      // true 여야함
      // 기능구현할땐 false hdcd 하드코딩
    }
  };

  const setHistoryLog = (
    event: EventAIObjectType,
    ymd: string,
    hms: string
  ) => {
    setHistory((history) => {
      if (firstHCount === 0) {
        setFirstHCount(1);

        let newHistory = [
          ...history,
          {
            eventType: event.type,
            occuredDate: ymd,
            occuredTime: hms,
            target: '-',
            checked: event.check,
            transactionId: event.transaction_id,
            eventId: event.id,
          },
        ];

        if (newHistory.length >= 100) {
          newHistory = newHistory.slice(0, 100);
        }

        return newHistory;
      } else {
        let newHistory = [
          {
            eventType: event.type,
            occuredDate: ymd,
            occuredTime: hms,
            target: '-',
            checked: event.check,
            transactionId: event.transaction_id,
            eventId: event.id,
          },
          ...history,
        ];

        if (newHistory.length >= 100) {
          newHistory = newHistory.slice(0, 100);
        }

        return newHistory;
      }
    });

    // sliceHistory(newHistory);
  };

  // 긴급상황 기능 시작

  const [blink, setBlink] = useState(true);

  let flipInterval = useRef<NodeJS.Timeout>();

  const delAlarm = (indexs: number) => {
    setEmergencyAlarm((ele) => ele.filter((_, index) => index !== indexs));
  };

  useEffect(() => {
    if (emergencyAlarm.length === 0) {
      clearInterval(flipInterval.current);
      setIsEmergency(false);
    }
  }, [emergencyAlarm]);

  useEffect(() => {
    if (isEmergency) {
      flipInterval.current = setInterval(() => {
        setBlink((ele) => !ele);
      }, 1000);
    }

    return () => {
      clearInterval(flipInterval.current);
    };
  }, [isEmergency]);

  const saveEmergencyAlarm = (
    event: EventAIObjectType,
    ymd: string,
    hms: string
  ) => {
    // setFirstECount
    // firstECount
    setEmergencyAlarm((ele) => {
      if (firstECount === 0) {
        setFirstECount(1);
        return [
          {
            eventType: event.type,
            occuredDate: ymd,
            occuredTime: hms,
            target: '-',
            checked: event.check,
            transactionId: event.transaction_id,
            eventId: event.id,
          },
          ...ele,
        ];
      } else {
        return [
          ...ele,
          {
            eventType: event.type,
            occuredDate: ymd,
            occuredTime: hms,
            target: '-',
            checked: event.check,
            transactionId: event.transaction_id,
            eventId: event.id,
          },
        ];
      }
    });
    setIsEmergency(true);
  };
  // 긴급상황 기능 끝

  const saveAIAlarm = useCallback(() => {
    if (!data || data.length === 0) {
      return;
    }

    let oldTransactionId = '';
    let newTransactionId = '';

    data.forEach((event) => {
      const { ymd, hms } = timestampToDate(event.timestamp);
      newTransactionId = event.transaction_id;
      if (oldTransactionId === newTransactionId) {
        return;
      } else {
        oldTransactionId = newTransactionId;
      }

      if (Object.keys(dangerEvents).includes(event.type)) {
        if (event.type === 'HUMAN') {
          if (confirmTime(hms) === false) {
            return;
          } else {
            setHistoryLog(event, ymd, hms);
            // saveEmergencyAlarm(event, ymd, hms);
          }
        } else {
          if (event.type === 'FEVER') {
            if (firstHCount === 0) {
              setHistory((history) => {
                let newHistory = [
                  ...history,
                  {
                    eventType: event.type,
                    occuredDate: ymd,
                    occuredTime: hms,
                    target: event.content.person_name,
                    checked: event.check,
                    transactionId: event.transaction_id,
                    eventId: event.id,
                    feverContent: {
                      person_name: event.content.person_name,
                      temperature: event.content.temperature,
                      url: event.url,
                    },
                  },
                ];

                sliceHistory(newHistory);

                return newHistory;
              });
            } else {
              setHistory((history) => {
                let newHistory = [
                  {
                    eventType: event.type,
                    occuredDate: ymd,
                    occuredTime: hms,
                    target: event.content.person_name,
                    checked: event.check,
                    transactionId: event.transaction_id,
                    eventId: event.id,
                    feverContent: {
                      person_name: event.content.person_name,
                      temperature: event.content.temperature,
                      url: event.url,
                    },
                  },
                  ...history,
                ];

                sliceHistory(newHistory);

                return newHistory;
              });
            }
          } else {
            setHistoryLog(event, ymd, hms);
          }
        }
      }
    });
  }, [data]);

  useEffect(() => {
    setFromDate(toDate);
    saveAIAlarm();
  }, [data]);

  const timestampToDate = (timestamp: string) => {
    return {
      ymd: `${timestamp.slice(0, 4)}.${timestamp.slice(4, 6)}.${timestamp.slice(
        6,
        8
      )}`,
      hms: `${timestamp.slice(8, 10)}:${timestamp.slice(
        10,
        12
      )}:${timestamp.slice(12, 14)}`,
    };
  };

  const onClickAlarm = (idx: number) => {
    if (history[idx].checked) {
      return;
    }

    setClickedAlarmIdx(idx);
    onToggle();
    setNewEvent(0);
  };

  const onClickCategory = (idx: number) => {
    if (idx === clickedCategoryIdx) {
      setClickedCategoryIdx(-1);
    } else {
      setClickedCategoryIdx(idx);
    }
  };

  const isCategorySame = (eventType: string) => {
    if (eventType === Object.keys(dangerEvents)[clickedCategoryIdx]) {
      return true;
    } else if (clickedCategoryIdx === -1) {
      return true;
    }
  };

  if (isLoading) <div>loading...</div>;
  if (isError) <div>error!!</div>;

  return (
    <>
      {/* 긴급상황 기능 시작 */}
      {isEmergency && (
        <>
          <Container blink={blink} />
          <ModalContainer>
            {emergencyAlarm.map((emergency, index) => (
              <Fragment key={index}>
                <EmergencyModal
                  eventIcon={dangerEvents[emergency.eventType].img}
                  eventString={dangerEvents[emergency.eventType].eventString}
                  occuredDate={emergency.occuredDate}
                  occuredTime={emergency.occuredTime}
                  onToggle={delAlarm}
                  transactionId={emergency.transactionId}
                  modalPos={index}
                />
              </Fragment>
            ))}
          </ModalContainer>
        </>
      )}
      {/* 긴급상황 기능 끝 */}

      <EventAlarmLayout>
        <FilterWrapper>
          <p>알림</p>
          <IconsWrapper>
            {Object.keys(filteringEvents).map((ele, idx) => (
              <FilterImageWrapper
                key={idx}
                onClick={() => onClickCategory(idx)}
                isActive={clickedCategoryIdx === idx}
              >
                <img
                  src={filteringEvents[ele as filteringEventsKey]?.img}
                  alt={`${ele} 사진`}
                  width={24}
                  height={24}
                />
              </FilterImageWrapper>
            ))}
          </IconsWrapper>
          <div />
        </FilterWrapper>

        {/* <FilterWrapper>
        <p>필터</p>
        <div className="filter-inner">
        </div>
    */}
        <EventAlarmCol>
          {history.map((ele, idx) => {
            if (isCategorySame(ele.eventType)) {
              return (
                <AlarmWrpper
                  key={idx}
                  checked={ele.checked}
                  onClick={() => onClickAlarm(idx)}
                >
                  <ImageWrapper>
                    <img
                      src={dangerEvents[ele.eventType as dangerEventKey]?.img}
                      alt="event icon"
                      width={52}
                      height={53}
                    />
                  </ImageWrapper>
                  <TextWrapper>
                    <p className="eventType">
                      {
                        dangerEvents[ele.eventType as dangerEventKey]
                          ?.eventString
                      }
                    </p>
                    <p className="target">
                      {ele.eventType === 'FEVER' ? (
                        <>
                          {(ele.feverContent?.person_name === 'Unknown'
                            ? '알 수 없음'
                            : ele.feverContent?.person_name) +
                            '님 ' +
                            ele.feverContent?.temperature +
                            dangerEvents['FEVER'].message}
                        </>
                      ) : (
                        <>
                          {eventCountArr[idx] +
                            dangerEvents[ele.eventType as dangerEventKey]
                              .message}
                        </>
                      )}
                    </p>
                    <div>
                      <p className="date">{ele.occuredDate}</p>
                      <p className="date">{ele.occuredTime}</p>
                    </div>
                  </TextWrapper>
                  {!ele.checked && <AlarmIcon src={alarmIcon} />}
                </AlarmWrpper>
              );
            } else {
              return <div key={idx} />;
            }
          })}
        </EventAlarmCol>
        {isShowing && (
          <NewEventModal
            img={
              dangerEvents[
                history[clickedAlarmIdx + newEvent]?.eventType as dangerEventKey
              ]?.img
            }
            eventString={
              dangerEvents[
                history[clickedAlarmIdx + newEvent]?.eventType as dangerEventKey
              ]?.eventString || ''
            }
            occuredDate={history[clickedAlarmIdx + newEvent]?.occuredDate}
            occuredTime={history[clickedAlarmIdx + newEvent]?.occuredTime}
            clickedAlarmIdx={clickedAlarmIdx + newEvent}
            setHistory={setHistory}
            onToggle={onToggle}
            feverContent={history[clickedAlarmIdx + newEvent]?.feverContent}
            eventID={history[clickedAlarmIdx + newEvent]?.eventId}
            transactionId={history[clickedAlarmIdx + newEvent]?.transactionId}
            redundantData={eventCountArr[clickedAlarmIdx + newEvent]}
            redundantDataUnit={
              dangerEvents[
                history[clickedAlarmIdx + newEvent]?.eventType as dangerEventKey
              ]?.message
            }
          />
        )}
      </EventAlarmLayout>
    </>
  );
}

export default EventAIAlarm;

const ModalContainer = styled.div`
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 80vw;
  height: 80vh;
  z-index: 6;
`;

const Container = styled.div<{ blink: boolean }>`
  position: absolute;
  mix-blend-mode: color;
  background-image: ${(props) =>
    props.blink
      ? 'linear-gradient(to bottom, #e63223, #e63223)'
      : 'linear-gradient(to bottom)'};
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 5;
`;

const EventAlarmLayout = styled.div`
  p {
    margin: 0;
    font-size: 20px;
    font-weight: bold;
    color: #c4c4c4;
    color: #c4c4c4;
  }
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FilterWrapper = styled.div`
  position: relative;
  top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & .filter-inner {
    display: flex;
    column-gap: 0.5rem;
  }
`;

const FilterImageWrapper = styled.div<{ isActive: boolean }>`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  img {
    opacity: 0.5;
    background-color: #2c2c2c;
    ${({ isActive }) =>
      isActive &&
      `
      opacity:1;
  `}
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  column-gap: 1.5rem;
  padding: 1rem 7%;
  border-radius: 17px;
  background-color: #2c2c2c;
`;

const EventAlarmCol = styled.div`
  display: flex;
  flex-direction: column;

  overflow: auto;

  &::-webkit-scrollbar-thumb {
    background-color: #707070;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1a1a1a;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

const AlarmWrpper = styled.div<{ checked: boolean }>`
  display: flex;
  position: relative;
  background-color: ${({ checked }) => (checked ? '#1a1a1a' : '#2c2c2c')};
  padding: 0.8rem 1.5rem;
  border-radius: 17px;
  margin: 0.3rem 0.5rem;
  ${({ checked }) => (checked ? `` : `cursor: pointer;`)}
`;

const ImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const AlarmIcon = styled.img`
  width: 20px;
  position: absolute;
  top: 0px;
  right: -0.5rem;
`;

const TextWrapper = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  div {
    display: flex;
    column-gap: 2rem;
    margin-top: 0.4px;
  }

  & .eventType {
    font-size: 15px;
    font-weight: bold;
    color: #fff;
  }

  & .target {
    margin-top: 0.2rem;
    font-size: 13px;
    font-weight: 500;
    color: #c4c4c4;
  }

  & .date {
    margin-top: 0.4rem;
    font-size: 12px;
    font-weight: bold;
    color: #c4c4c4;
  }
`;
