import React, { useState } from 'react';

import styled from 'styled-components';
import { deleteIcon } from '../../Assets/icon';
import { AdditionalFuncsAPI } from '../../Services/AdditionalFuncsAPI';

type TPropsData = {
  pointData?: {
    pointIds: string[];
    pointNames: string[];
  };
  questionData?: string[];
};

function DataOption({
                      dataTopic,
                      data,
                      setTopic,
                      patients,
                      isSetPoint,
                      isLoading,
                      refetchQuestion,
                    }: {
  dataTopic: string;
  data: TPropsData | undefined;
  setTopic: (innerHTML: string) => void;
  patients: string[] | undefined;
  isSetPoint: string;
  isLoading: boolean;
  refetchQuestion: () => void;
}) {
  const setHeaderText = (event: React.MouseEvent<HTMLDivElement>) => {
    const {
      currentTarget: { innerHTML },
    } = event;
    setTopic(innerHTML);
  };
  const setHeaderQuestion = (content: string) => {
    setTopic(content);
  };

  const deleteQuestion = async (context: string) => {

    await AdditionalFuncsAPI.deleteContent(context).then((response) => {
      console.log('response', response);
    }).catch((error) => {
      console.log('error: ', error);
    });
    console.log('deleteContent:', context);
    await refetchQuestion();
  };

  if (dataTopic === 'point') {
    return (
      <DataContainer>
        {data?.pointData?.pointNames.map((pointName, index) => (
          <TableBody onClick={setHeaderText} key={index}>
            {pointName}
          </TableBody>
        ))}
      </DataContainer>
    );
  }

  if (dataTopic === 'patient') {
    if (isLoading) {
      return (
        <DataContainer>
          <TableBody>로딩중 ...</TableBody>
        </DataContainer>
      );
    }

    if (patients?.length === 0) {
      return (
        <DataContainer>
          <TableBody>등록된 환자가 없습니다.</TableBody>
        </DataContainer>
      );
    } else if (isSetPoint === '병실') {
      return (
        <DataContainer>
          <TableBody>병실을 선택해주세요.</TableBody>
        </DataContainer>
      );
    } else {
      return (
        <DataContainer>
          {patients?.map((patient, index) => (
            <TableBody onClick={setHeaderText} key={index}>
              {patient}
            </TableBody>
          ))}
        </DataContainer>
      );
    }
  }

  if (dataTopic === 'questionList') {
    return (
      <DataContainer>
        {data?.questionData?.map((content, index) => (
          <TableBody onClick={() => {
            setTopic(content);
          }} key={index}>
            {content}
            <DeleteQuestion
              onClick={() => deleteQuestion(content)}
              src={deleteIcon} alt='delete'></DeleteQuestion>
          </TableBody>
        ))}
      </DataContainer>
    );
  }

  return <>로딩중</>;
}

export default DataOption;

const DataContainer = styled.div`
  margin-top: 12px;
  background-color: #1a1a1a;
  border-radius: 5px;
  position: relative;
  max-height: 80%;
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

const TableBody = styled.div`
  cursor: pointer;
  word-break: keep-all;
  padding: 1rem 3rem;

  :hover {
    background-color: #2446dd;
    border-radius: 5px;
  }
`;

const DeleteQuestion = styled.img`
  float: right;
  margin-right: -1.5rem;
`;
