import { useEffect, useState } from 'react';

import styled from 'styled-components';

import RunModal from './RunModal';
import useModal from '../../Hooks/useModel';

import { useQuery } from 'react-query';
import { getContent } from '../../Services/AdditionalFuncsAPI';
import { MapAPI } from '../../Services/MapAPI';
import { PointAPI } from '../../Services/PointAPI';

import { useSelector } from 'react-redux';

import { IRobotInfo } from '../../Interfaces/auth/robot';

function EditQuestion() {
  const { isShowing, onToggle } = useModal();

  const [waypointId, setWaypointId] = useState<string[]>([]);
  const [wards, setWards] = useState<string[]>([]);
  const [ward, setWard] = useState<string>('');

  const [content, setContent] = useState<string>('');

  const [patientNames, setPatientNames] = useState<string[]>([]);
  const [patient, setPatient] = useState<string>('');

  const { data, isLoading, isError } = useQuery(
    ['video-content', patient],
    async () => {
      return getContent('questionnaire');
    }
  );

  const { uuid, map_id } = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData
  );

  const [questionList, setQuestionList] = useState<
    { id: number; ward: string; content: string; patient: string }[]
  >(() => {
    const questions = localStorage.getItem(map_id);
    return questions !== null ? JSON.parse(questions) : [];
  });

  const [checkedTaskIdx, setCheckedTaskIdx] = useState<boolean[]>(
    questionList.map(() => false)
  );

  const getPointId = async () => {
    let pointName = [];
    let waypoint = [];
    try {
      const pointIds = await (await PointAPI.getPointId({ map_id })).data;
      pointName = pointIds.map((res: any) => res.name);
      waypoint = pointIds.map((res: any) => res.id);
      setWards(pointName);
      setWard(pointName[0]);
      setWaypointId(waypoint);
      getInitPatient(waypoint);
    } catch (error) {
      console.error(error);
    }
  };

  const getInitPatient = async (waypoint: string[]) => {
    try {
      const res = await PointAPI.getPatientId({
        map_id,
        waypoint_id: waypoint[0],
      });

      if (Object.values(res?.data[0]?.attribute).length > 0) {
        setPatientNames(() => res?.data[0]?.attribute.patient_name);
        setPatient(() => res?.data[0]?.attribute.patient_name[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getPointId();
  }, []);

  useEffect(() => {
    setContent(() => (data ? data[0]?.source : ''));
  }, [data]);

  useEffect(() => {
    setCheckedTaskIdx(questionList.map(() => false));
    localStorage.setItem(map_id, JSON.stringify(questionList));
  }, [questionList]);

  const isAtLeastOneTrue = () => {
    return checkedTaskIdx.some((isTrue) => isTrue);
  };

  const findCheckedIdx = () => {
    return checkedTaskIdx.findIndex((isTrue) => isTrue);
  };

  const onCheck = (index: number) => {
    setCheckedTaskIdx((checkedTaskIdx) =>
      checkedTaskIdx.map((ele, idx) =>
        idx === index || ele === true ? !ele : ele
      )
    );
  };

  const getPatient = async (waypoint: string) => {
    try {
      const res = await PointAPI.getPatientId({
        map_id,
        waypoint_id: waypointId[wards.indexOf(waypoint)],
      });

      if (Object.values(res?.data[0]?.attribute).length > 0) {
        setPatientNames(() => res?.data[0]?.attribute.patient_name);
        setPatient(() => res?.data[0]?.attribute.patient_name[0]);
      } else {
        setPatientNames([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeWard = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setWard(event.target.value);
    getPatient(event.target.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const onChangePatient = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setPatient(event.target.value);
  };

  const onClickAdd = () => {
    setQuestionList((questionList) => [
      ...questionList,
      {
        id: questionList.length,
        ward: ward,
        content: content,
        patient: patient,
      },
    ]);
  };

  if (isLoading) <div>loading...</div>;
  if (isError) <div>something wrong</div>;

  return (
    <EditWrapper>
      <p>질의응답 편집</p>
      <SelectWrapper>
        <AddButton onClick={onClickAdd}>+</AddButton>
        <input type={'datetime-local'}></input>
        <Select name="ward">
          {/*{wards.map((ele, index) => (*/}
          {/*  <Option key={index} value={ele}>*/}
          {/*    {ele}*/}
          {/*  </Option>*/}
          {/*))}*/}
          <Option key={"1"} value="1">101호 허준</Option>
          <Option key={"2"} value="2">102호 최효재</Option>
        </Select>

        <Select
          name="contents"
          defaultValue={content}
          onChange={onChangeContent}
        >
          {data?.map((ele, index) => (
            <Option key={index} value={ele.source}>
              {ele.source}
            </Option>
          ))}
        </Select>
      </SelectWrapper>
      <JobWrapper>
        {questionList.map((ele, index) => (
          <JobElement key={ele.id}>
            <CheckBox
              checked={checkedTaskIdx[index] || false}
              onChange={() => onCheck(index)}
            />
            <p>{ele.ward}</p>
            <p>{ele.patient}</p>
            <p>{ele.content}</p>
          </JobElement>
        ))}
      </JobWrapper>
      <RunButton
        disabled={!isAtLeastOneTrue()}
        checkedIdx={isAtLeastOneTrue()}
        onClick={onToggle}
      >
        선택항목 수행
      </RunButton>
      {isShowing && (
        <RunModal
          onClose={onToggle}
          title="질의 응답을 수행하시겠습니까?"
          location={questionList[findCheckedIdx()].ward}
          contents={questionList[findCheckedIdx()].content}
          patientName={questionList[findCheckedIdx()].patient}
        />
        // 하드코딩  hdcd
      )}
      {isShowing && <Blur />}
    </EditWrapper>
  );
}

export default EditQuestion;

const EditWrapper = styled.div`
  height: 100%;
  width: 1000px;
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
    color: #2446dd;
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
  padding: 10px 50px;
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
