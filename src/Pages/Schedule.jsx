import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PatientData from './PatientData.jsx';

function Schedule() {
  const patientArr = [
    { name: '허 준', place: 101 },
    { name: '최효재', place: 102 },
    { name: '김 율', place: 103 },
  ];

  const questionArr = [
    '식사 후 약 복용하셨나요?',
    '화장실 다녀오셨나요?',
    '몸에 통증이 있으신가요?',
  ];

  const padTime = (time) => {
    return String(time).padStart(2, '0');
  };

  const getCurrTime = () => {
    const date = new Date();
    const year = padTime(date.getFullYear());
    const month = padTime(date.getMonth());
    const day = padTime(date.getDay());
    const hour = padTime(date.getHours());
    const minute = padTime(date.getMinutes());
    const currTime = `${year}-${month}-${day}T${hour}:${minute}`;
    return currTime;
  };

  const currentTime = getCurrTime();

  const [dataArr, setData] = useState([]);
  const [time, setTime] = useState(currentTime);
  const [patient, setPatient] = useState('환자 선택');
  const [question, setQuestion] = useState('질문 선택');

  const timeChange = (e) => {
    setTime(e.target.value);
  };

  const patientChange = (e) => {
    setPatient(e.target.value);
  };

  const questionChange = (e) => {
    setQuestion(e.target.value);
  };

  const addBtnClick = () => {
    setData([time, patient, question]);
    setPatient('환자 선택');
    setQuestion('질문 선택');
    setTime(currentTime);
  };

  return (
    <>
      <Container>
        <SelectBar id="selectBar">
          <WideSelect
            as="input"
            type={'datetime-local'}
            value={time}
            onChange={timeChange}
            min={currentTime}
          ></WideSelect>
          <Select value={patient} onChange={patientChange}>
            <Options value="환자 선택" key="default-patient">
              환자 선택
            </Options>
            {patientArr.map((patient) => (
              <Options key={patient.name}>
                {patient.place} {patient.name}
              </Options>
            ))}
          </Select>
          <WideSelect value={question} onChange={questionChange}>
            <Options value="질문 선택" key="default-question">
              질문 선택
            </Options>
            {questionArr.map((question) => (
              <Options key={question}>{question}</Options>
            ))}
          </WideSelect>
          <AddBtn onClick={addBtnClick}>추가</AddBtn>
        </SelectBar>
      </Container>
      <PatientData dataArr={dataArr}></PatientData>
    </>
  );
}

const Container = styled.div`
  grid-row: span 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectBar = styled.div`
  border: 1px solid black;
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;

const AddBtn = styled.button`
  width: 40px;
  height: 70%;
  font-size: 14px;
  border: solid 1px blue;
  background-color: white;
  margin-right: 10px;
`;

const Select = styled.select`
  background-color: white;
  border: solid 1px blue;
  margin-left: 10px;
  width: 100px;
  font-size: 14px;
`;

const WideSelect = styled(Select)`
  width: 200px;
`;

const Options = styled.option`
  font-size: 14px;
`;

export default Schedule;
