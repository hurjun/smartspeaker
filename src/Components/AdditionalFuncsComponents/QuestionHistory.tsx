import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import QuestionHis from '../../Assets/image/question_history.png';

import { IRobotInfo } from '../../Interfaces/auth/robot';
import { MissionAPI } from '../../Services/MissionAPI';
import { RawDataAPI } from '../../Services/RawDataAPI';

const wards = [
  '101호',
  '102호',
  '103호',
  '104호',
  '105호',
  '106호',
  '107호',
  '108호',
  '109호',
  '110호',
];

const patients = ['홍길동', '홍동길', '길홍동'];

const pub = [
  {
    id: 1,
    ward: '101호 병상2',
    content: '수술 전 준비사항 안내',
  },
  {
    id: 2,
    ward: '103호 병상5',
    content: '수술 후 준비사항 안내',
  },
  {
    id: 3,
    ward: '106호 병상1',
    content: '위장 내시경 검사 안내',
  },
];

function QuestionHistory() {
  const [checkedTaskIdx, setCheckedTaskIdx] = useState<boolean[]>(
    pub.map(() => false)
  );

  const { uuid } = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const onCheck = (index: number) => {
    setCheckedTaskIdx((checkedTaskIdx) =>
      checkedTaskIdx.map((ele, idx) =>
        idx === index || ele === true ? !ele : ele
      )
    );
  };

  const getMissionLog = async () => {
    try {
      const { data } = await MissionAPI.getMissionHistory({ uuid });
      return data.map((res: any) => {
        const time = res.activate_at.split('T');
        return {
          activate_at: time[0] + ' ' + time[1],
          contents: res.data[0].content_name,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getQuestionReply = async () => {
    try {
      const { data } = await RawDataAPI.getQuestionReply({
        robot_uuid: uuid,
        topic_type: 'questionReply',
      });
      return data.map((res: any) => {
        const time = res.created_at.split('T');
        return {
          created_at: time[0] + ' ' + time[1].split('.')[0],
          contents: JSON.parse(res.payload).result.replyText,
        };
      });
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading } = useQuery(['missionHistory'], async () => ({
    missionLog: await getMissionLog(),
    reply: await getQuestionReply(),
  }));

  if (isLoading) <div>로딩중</div>;

  return (
    <EditWrapper>
      <p>질의응답 내역</p>
      {/* <SelectWrapper>
        <AddButton>🔍</AddButton>
        <Select name="ward">
          {wards.map((ele) => (
            <Option key={ele} value={ele}>
              {ele}
            </Option>
          ))}
        </Select>
        <Select name="contents">
          {patients.map((ele) => (
            <Option key={ele} value={ele}>
              {ele}
            </Option>
          ))}
        </Select>
      </SelectWrapper> */}
      <JobWrapper>
        <LogContainer>
          {data?.missionLog.map((res: any, index: any) => (
            <LogContents key={index}>
              <MissionLogContainer>
                <div>{res.contents}</div>
                <span>{res.activate_at}</span>
              </MissionLogContainer>
              <ReplyLogContainer>
                <div>{data?.reply[index].contents}</div>
                <span>{data?.reply[index].created_at}</span>
              </ReplyLogContainer>
            </LogContents>
          ))}
        </LogContainer>

        {/* {pub.map((ele, index) => (
          <JobElement key={ele.id}>
            <CheckBox
              checked={checkedTaskIdx[index]}
              onChange={() => onCheck(index)}
            />
            <p>{ele.ward}</p>
            <p>{ele.content}</p>
          </JobElement>
        ))} */}
      </JobWrapper>
    </EditWrapper>
  );
}

export default QuestionHistory;

const EditWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SelectWrapper = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  border-top: 2px solid #c4c4c4;
  padding-top: 10px;
`;

const AddButton = styled.button`
  background-color: inherit;
  border: none;
  color: white;
  font-size: 23px;
  cursor: pointer;

  &:active {
    transform: scale(1.1);
  }
`;

const Select = styled.select`
  background-color: inherit;
  color: white;
  border: none;
  outline: none;
  font-size: 14px;
`;

const Option = styled.option`
  background-color: #1a1a1a;
  color: white;
`;

const JobWrapper = styled.div`
  width: 80%;
  height: 300px;
  border-top: 1px solid #c4c4c4;
  margin-top: 100px;
  overflow-y: scroll;

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

const JobElement = styled.div`
  border-bottom: 1px solid #c4c4c4;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CheckBox = styled.input.attrs({ type: 'checkbox' })`
  width: 18px;
  height: 18px;
`;

const RunButton = styled.button<{ checkedIdx: boolean }>`
  margin-top: 100px;
  background-color: inherit;
  border-radius: 30px;
  border: 1px solid white;
  cursor: pointer;
  width: 150px;
  height: 40px;
  color: white;

  ${({ checkedIdx }) =>
    checkedIdx &&
    `
      background-color: #2446dd;
      border: none;

      &:active {
        border: 1px solid white;
      }
  `}
`;

const Blur = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
`;

const LogContainer = styled.div`
  width: 100%;
`;

const LogContents = styled.div`
  display: flex;
  border-bottom: 0.5px solid #c4c4c4;
`;

const MissionLogContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 50%;
  span {
    color: #707070;
    font-size: 12px;
    font-weight: 500;
  }
`;

const ReplyLogContainer = styled.div`
  width: 50%;
  span {
    float: right;
    color: #707070;
    font-size: 12px;
    font-weight: 500;
  }
`;
