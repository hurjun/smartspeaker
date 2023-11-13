import { useEffect, useState } from 'react';
import RunModal from './RunModal';
import styled from 'styled-components';
import useModal from '../../Hooks/useModel';
import { useQuery } from 'react-query';
import { getContent } from '../../Services/AdditionalFuncsAPI';

const wards = [
  '101호 병상2',
  '103호 병상5',
  '106호 병상1',
  '104호',
  '105호',
  '106호',
  '107호',
  '108호',
  '109호',
  '110호',
];

function EditTaskContent() {
  const { data, isLoading, isError } = useQuery(
    ['video-content'],
    () => getContent('show_video'),
    {
      staleTime: 20000,
    }
  );

  const { isShowing, onToggle } = useModal();
  const [taskList, setTaskList] = useState<
    { id: number; ward: string; content: string }[]
  >(() => {
    const tasks = localStorage.getItem('taskList');
    return tasks !== null ? JSON.parse(tasks) : [];
  });
  const [checkedTaskIdx, setCheckedTaskIdx] = useState<boolean[]>(
    taskList.map(() => false)
  );
  const [ward, setWard] = useState<string>('');
  const [content, setContent] = useState<string>(() => {
    return data ? data[0].source : '';
  });

  useEffect(() => {
    setCheckedTaskIdx(taskList.map(() => false));
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

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

  const onChangeWard = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setWard(event.target.value);
  };

  const onChangeContent = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    setContent(event.target.value);
  };

  const onClickAdd = () => {
    setTaskList((taskList) => [
      ...taskList,
      { id: taskList.length, ward: ward, content: content },
    ]);
  };

  if (isLoading) <div>loading...</div>;
  if (isError) <div>something wrong</div>;

  return (
    <EditWrapper>
      <p>수행편집</p>
      <SelectWrapper>
        <AddButton onClick={onClickAdd}>+</AddButton>
        <Select name="ward" defaultValue={ward} onChange={onChangeWard}>
          {wards.map((ele) => (
            <Option key={ele} value={ele}>
              {ele}
            </Option>
          ))}
        </Select>
        <Select
          name="contents"
          defaultValue={content}
          onChange={onChangeContent}
        >
          {data?.map((ele) => (
            <Option key={ele.name} value={ele.source}>
              {ele.source}
            </Option>
          ))}
        </Select>
      </SelectWrapper>
      <JobWrapper>
        {taskList.map((ele, index) => (
          <JobElement key={ele.id}>
            <CheckBox
              checked={checkedTaskIdx[index] || false}
              onChange={() => onCheck(index)}
            />
            <p>{ele.ward}</p>
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
          title="출동"
          location={taskList[findCheckedIdx()].ward}
          contents={taskList[findCheckedIdx()].content}
          patientName="홍길동"
        />
        // 하드코딩  hdcd
      )}
      {isShowing && <Blur />}
    </EditWrapper>
  );
}

export default EditTaskContent;

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
