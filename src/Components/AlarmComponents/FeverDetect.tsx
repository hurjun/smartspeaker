import styled from 'styled-components';
import { feverContentType } from '../../Interfaces/eventAI';
import FeverDetectImg from '../../Assets/image/fever_detect.png';
import FeverPatient from '../../Assets/image/fever_patient.png';
import { EventAlarmAPI } from '../../Services/EventAlarmAPI';
import { useQuery } from 'react-query';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { IRobotInfo } from '../../Interfaces/auth/robot';

interface FeverDetectPropsType {
  occuredDate: string;
  occuredTime: string;
  feverContent: feverContentType;
  eventID: string;
}

function FeverDetect({
  feverContent,
  occuredDate,
  occuredTime,
  eventID,
}: FeverDetectPropsType) {
  const robotInfo = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const url = feverContent.url === null ? [1, 2] : JSON.parse(feverContent.url);
  const [normalUrl, infraredUrl] = Object.values(url) as string[];
  const [normal, infrared] = Object.keys(url) as string[];

  const res1 = useQuery(
    ['image-src1'],
    () => EventAlarmAPI.getImage(robotInfo.uuid, eventID, normal),
    {
      staleTime: 20000,
    }
  );

  const res2 = useQuery(
    ['image-src2'],
    () => EventAlarmAPI.getImage(robotInfo.uuid, eventID, infrared),
    {
      staleTime: 20000,
    }
  );

  // var b64Response = btoa(data);

  return (
    <FeverDetectLayout>
      <FeverDetectRow>
        <CardCol>
          <img
            src={infraredUrl}
            alt="열감지 센서 화면"
            width={352}
            height={264}
          />
          <p className="p1">발열감지</p>
          <p className="p2">{feverContent.temperature}</p>
        </CardCol>
        <CardCol>
          <img
            src={normalUrl}
            alt="발열 당시 환자 모습"
            width={352}
            height={264}
          />
          <p className="p3">환자이름</p>
          <p className="p4">
            {feverContent.person_name === 'Unknown'
              ? '알 수 없음'
              : feverContent.person_name}
          </p>
        </CardCol>
      </FeverDetectRow>
      <p className="date">
        {occuredDate} / {occuredTime}
      </p>
    </FeverDetectLayout>
  );
}

export default FeverDetect;

const FeverDetectLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
    margin-top: 1rem;
  }
`;

const FeverDetectRow = styled.div`
  width: 100%;
  display: flex;
  column-gap: 7px;
`;

const CardCol = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    border-radius: 17px;
  }

  & .p1 {
    font-size: 20px;
    font-weight: bold;
    color: #e63223;
  }

  & .p2 {
    font-size: 30px;
    font-weight: bold;
    color: #e63223;
  }

  & .p3 {
    font-size: 18px;
    font-weight: 500;
    color: #c4c4c4;
  }

  & .p4 {
    font-size: 30px;
    font-weight: 500;
    color: #c4c4c4;
  }
`;
