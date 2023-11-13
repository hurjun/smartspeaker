import styled from 'styled-components';
import { MissionAPI } from '../../Services/MissionAPI';

import { ISOTimestamp } from '../../Utils/TimeStamp';

import { useSelector } from 'react-redux';
import { IRobotInfo } from '../../Interfaces/auth/robot';
import { useQuery } from 'react-query';
import { MapAPI } from '../../Services/MapAPI';
import { PointAPI } from '../../Services/PointAPI';

interface RunModalPropsType {
  onClose: () => void;
  title: string;
  location: string;
  contents: string;
  patientName: string;
}

function RunModal(props: RunModalPropsType) {
  const { onClose, title, location, contents, patientName } = props;

  const { uuid, map_id } = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const getPointId = async () => {
    let pointId = '';

    try {
      const pointIds = await (await PointAPI.getPointId({ map_id })).data;

      pointIds.forEach((res: any) => {
        if (res.name === location) {
          pointId = res.id;
        }
      });
    } catch (error) {
      console.error(error);
    }
    return pointId;
  };

  const { data: pointId } = useQuery(
    ['mapData'],
    async () => await getPointId()
  );

  const postMissionToDP = async () => {
    MissionAPI.postMission({
      map_id,
      point_id: pointId ? pointId : '',
      contents: [contents],
      activate_at: ISOTimestamp().ISOPresentTime,
      attribute: {
        patient_name: patientName,
      },
      uuid,
    });
  };

  const onClickOk = async () => {
    postMissionToDP();
    onClose();
  };

  const onClickCancel = () => {
    onClose();
  };

  return (
    <RunModalLayout>
      <RunModalCol>
        <p className="run">{title}</p>
        <p>{contents}</p>
        <p>{location}</p>
        <div className="buttonWrapper">
          <button onClick={onClickOk}>확인</button>
          <button onClick={onClickCancel}>취소</button>
        </div>
      </RunModalCol>
    </RunModalLayout>
  );
}

export default RunModal;

const RunModalLayout = styled.div`
  position: fixed;
  z-index: 3;

  width: 544px;
  height: 456px;
  background-color: #2c2c2c;
  border: 2px solid #707070;
`;

const RunModalCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  & .run {
    font-size: 30px;
    font-weight: bold;
    color: #c4c4c4;
  }

  p {
    font-size: 20px;
    font-weight: bold;
    color: #c4c4c4;
    margin: 9px 0 0 0;
  }

  & .buttonWrapper {
    display: flex;
    column-gap: 40px;
    margin-top: 40px;

    button {
      background-color: inherit;
      border: 1px solid white;
      border-radius: 16px;
      padding: 5px 52px;
      color: #c4c4c4;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;
