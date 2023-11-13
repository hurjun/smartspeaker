import React, { useCallback, useState } from 'react';

import { deleteIcon, questionIcon, viewMoreIcon } from '../../Assets/icon';

import styled from 'styled-components';

import { useQuery } from 'react-query';
import { AdditionalFuncsAPI } from '../../Services/AdditionalFuncsAPI';
import { PointAPI } from '../../Services/PointAPI';

import { useSelector } from 'react-redux';

import { IRobotInfo } from '../../Interfaces/auth/robot';
import { ContentObjectType } from '../../Interfaces/data/additionalFuncs';
import { IPoint } from '../../Interfaces/point';

import DataOption from './DataOption';
import RunModal from './RunModal';

import useModal from '../../Hooks/useModel';

type TQuestion = {
  point: string;
  patient: string;
  questionList: string;
};

function NewEditQuestion() {
  const { map_id } = useSelector(
    (state: {
      robotInfoStore: {
        RobotInfoData: IRobotInfo;
      };
    }) => state.robotInfoStore.RobotInfoData,
  );

  const [clickHeader, setClickHeader] = useState(-1);

  const [openInput, setOpenInput] = useState(false);
  const [disabledPost, setDisabledPost] = useState(false);

  const [questionList, setQuestionList] = useState<TQuestion[]>(() => {
    const questions = localStorage.getItem(map_id);
    if (questions) {
      return JSON.parse(questions);
    } else {
      return [];
    }
  });
  const [clickIndex, setClickIndex] = useState(0);
  const [formValue, setFormValue] = useState('');

  const [tableHeaders, setTableHeaders] = useState([
    {
      text: '병실',
      dataTopic: 'point',
    },
    {
      text: '환자',
      dataTopic: 'patient',
    },
    {
      text: '질문 목록',
      dataTopic: 'questionList',
    },
  ]);

  const { isShowing, onToggle } = useModal();

  const getPointData = async () => {
    const { data: pointData }: { data: IPoint[] } = await PointAPI.getPointId({
      map_id,
    });

    const pointIds = pointData.map((res) => res.id);

    const pointNames = pointData.map((res) => res.name);

    return {
      pointIds,
      pointNames,
    };
  };

  const getQuestionContents = async () => {
    const { data: questionData }: { data: ContentObjectType[] } =
      await AdditionalFuncsAPI.getContent('questionnaire');

    const questionContents = questionData.map((res) => {
      return res.source;
    });

    return questionContents;
  };

  const postQuestionContents = async () => {
    const { data: questionData }: { data: ContentObjectType[] } =
      await AdditionalFuncsAPI.postContent({
        name: '',
        kind: '',
        priority: 0,
        source: '',
      });

    const questionContents = questionData.map((res) => {
      return res.source;
    });

    return questionContents;
  };
  const handleChange = (e: any) => {
    setFormValue(e.target.value);
    console.log('change', e.target.value);
  };

  const handleSubmit = async (event: any) => {
    setDisabledPost(true);
    event.preventDefault();
    await AdditionalFuncsAPI.postContent({
      name: formValue,
      kind: 'questionnaire',
      priority: 0,
      source: formValue,
    }).then((response) => {
      console.log('response: ', response);
    })
      .catch((error) => {
        console.log('error: ', error);
      });
    setDisabledPost(false);
    setFormValue('');
    await refetchQuestion();
  };

  const { data, isLoading, refetch:refetchQuestion } = useQuery(
    ['questionContents'],
    async () => {
      return {
        pointData: await getPointData(),
        questionData: await getQuestionContents(),
      };
    },
    {
      staleTime: 20000,
      // refetchInterval: 2000
    },
  );

  const getPatientData = async () => {
    if (!data) return;

    const { data: patientInfo }: { data: IPoint[] } =
      await PointAPI.getPatientId({
        map_id,
        waypoint_id:
          data?.pointData.pointIds[
            data?.pointData.pointNames.indexOf(tableHeaders[0].text)
            ],
      });
    if (patientInfo[0].attribute.patient_name) {
      return patientInfo[0].attribute.patient_name;
    }
    return [];
  };

  const { data: patientData, isLoading: loadingpatientData } = useQuery(
    ['getPatientData', tableHeaders[0].text],
    async () => {
      setTableHeaders((ele) => {
        return ele.map((res, index) => {
          if (index === 1) {
            return { ...res, text: '환자' };
          }
          return res;
        });
      });

      if (tableHeaders[0].text === '병실') {
        return;
      }
      return await getPatientData();
    },
  );

  const openOption = (index: number) => {
    if (index === clickHeader) {
      setClickHeader(-1);
    } else {
      setClickHeader(index);
    }
  };

  const selectOption = (innerHTML: string) => {
    setTableHeaders((ele) => {
      return ele.map((res, index) => {
        if (clickHeader === index) {
          return { ...res, text: innerHTML };
        }
        return res;
      });
    });
    setClickHeader(-1);
  };

  const saveQuestion = () => {
    if (
      tableHeaders[0].text === '병실' ||
      tableHeaders[1].text === '환자' ||
      tableHeaders[2].text === '질문 목록'
    ) {
      return alert('정보를 입력해주세요.');
    }
    const questionOption = {
      point: tableHeaders[0].text,
      patient: tableHeaders[1].text,
      questionList: tableHeaders[2].text,
    };

    const questions = localStorage.getItem(map_id);
    if (questions) {
      localStorage.setItem(
        map_id,
        JSON.stringify([questionOption, ...JSON.parse(questions)]),
      );
      setQuestionList([questionOption, ...JSON.parse(questions)]);
    } else {
      localStorage.setItem(map_id, JSON.stringify([questionOption]));
      setQuestionList([questionOption]);
    }
  };

  const deleteQuestionLog = (index: number) => {
    setQuestionList((question) => {
      const deleteArr = question.filter((_, questionIndex) => {
        return questionIndex !== index;
      });

      localStorage.setItem(map_id, JSON.stringify(deleteArr));
      return deleteArr;
    });
  };

  if (isLoading) {
    return <>로딩중 ...</>;
  }

  return (
    <Container>
      <TitleContainer>
        <img width={24} height={22} src={questionIcon} alt='questionIcon' />
        <Title>질의응답 편집</Title>
      </TitleContainer>
      <SaveContainer>
        <SaveQuestionBtn onClick={saveQuestion}>+</SaveQuestionBtn>

        {tableHeaders.map((headerOption, headerIndex) => (
          <ContentsContainer key={headerIndex}>
            <SelectOption onClick={() => openOption(headerIndex)}>
              {headerOption.text}
              <img src={viewMoreIcon} alt='viewMoreIcon' />
            </SelectOption>

            {clickHeader === headerIndex && (
              <DataOption
                setTopic={selectOption}
                dataTopic={headerOption.dataTopic}
                patients={patientData}
                isSetPoint={tableHeaders[0].text}
                data={data}
                isLoading={loadingpatientData}
                refetchQuestion={refetchQuestion}
              />
            )}
          </ContentsContainer>
        ))}
      </SaveContainer>

      <QuestionListContainer>
        <QuestionList>
          {questionList.map((res, index) => (
            <QuestionLog key={index}>
              <SendQuestion
                onClick={() => {
                  onToggle();
                  setClickIndex(index);
                }}
              >
                수행
              </SendQuestion>
              <span>{res.patient}</span>
              <span>{res.point}</span>
              <span>{res.questionList}</span>
              <img
                onClick={() => deleteQuestionLog(index)}
                src={deleteIcon}
                alt='delete'
              />
            </QuestionLog>
          ))}
        </QuestionList>

        <NewQuestionContainer>
          <NewQuestionBtn onClick={() => setOpenInput((ele) => !ele)}>
            + 질문 추가하기
          </NewQuestionBtn>
          {openInput && (
            <>
              <Form onSubmit={handleSubmit}>
                <NewQuestionInput onChange={handleChange} value={formValue} />
                <AddQuestion disabled={disabledPost}> 추가하기</AddQuestion>
              </Form>
            </>
          )}
        </NewQuestionContainer>
      </QuestionListContainer>
      {isShowing && (
        <RunModal
          onClose={onToggle}
          title='질의 응답을 수행하시겠습니까?'
          location={questionList[clickIndex].point}
          contents={questionList[clickIndex].questionList}
          patientName={questionList[clickIndex].patient}
        />
        // 하드코딩  hdcd
      )}
    </Container>
  );
}

export default NewEditQuestion;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 30px;
`;

const Title = styled.span`
  font-size: 15px;
  font-weight: bold;
`;

const SaveContainer = styled.div`
  width: 100%;
  border-top: 1px solid #c4c4c4;
  height: 1px;
  display: flex;
  height: 39%;
  position: relative;
`;

const ContentsContainer = styled.div`
  text-align: center;
  position: relative;
  width: 100%;
`;

const SelectOption = styled.div`
  cursor: pointer;
  font-size: 13px;

  img {
    position: relative;
    top: -3px;
    left: 10px;
  }
`;

const SaveQuestionBtn = styled.button`
  background-color: #2c2c2c;
  border-style: none;
  cursor: pointer;
  height: 0px;
  font-size: 13px;
  color: #c4c4c4;
`;

const QuestionListContainer = styled.div`
  width: 100%;
  height: 50%;
  border-top: #fff 1px solid;
`;

const QuestionLog = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-bottom: 1px solid #c4c4c4;

  span {
    padding: 5px;
    width: 20%;
  }

  img {
    cursor: pointer;
  }
`;

const SendQuestion = styled.button`
  width: 124px;
  height: 22px;
  border-radius: 16px;
  border: solid 1px #707070;
  background-color: transparent;
  cursor: pointer;
  color: #c4c4c4;

  &:active {
    background-color: #2446dd;
  }
`;

const NewQuestionBtn = styled.button`
  background-color: transparent;
  border-style: none;
  cursor: pointer;
  font-size: 11px;
  color: #c4c4c4;
  padding-left: 0;
`;

const AddQuestion = styled.button`
  background-color: transparent;
  border-style: none;
  cursor: pointer;
  font-size: 11px;
  color: #c4c4c4;
`;

const QuestionList = styled.div`
  height: 95%;
  overflow: auto;

  &::-webkit-scrollbar-thumb {
    background-color: #707070;
    border-radius: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: #1a1a1a;
    border-radius: 5px;
  }

  &::-webkit-scrollbar {
    width: 8px;
  }
`;

const NewQuestionContainer = styled.div`
  display: flex;
  height: 10%;
  overflow: auto;
`;

const NewQuestionInput = styled.input.attrs({
  type: 'text',
  name: 'newQuestion',
})`
  background-color: transparent;
  width: 80%;
  border-style: none;
  border-bottom: 1px #c4c4c4 solid;
  color: #c4c4c4;
  font-size: 14px;

  &:focus {
    outline-style: none;
  }
`;

const Form = styled.form.attrs({ type: 'submit' })`
  display: flex;
  width: 85%;
`;
