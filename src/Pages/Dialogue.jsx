import styled from 'styled-components';
import { useState, useEffect } from 'react';
import PatientData from './PatientData.jsx';

function Dialogue() {
  const patientArr = [
    { name: '허 준', place: 101 },
    { name: '최효재', place: 102 },
    { name: '김 율', place: 103 },
  ];

  const [target, setTarget] = useState('');
  const [patient, setPatient] = useState('환자 선택');

  const patientChange = (e) => {
    setPatient(e.target.value);
  };

  // useEffect(()=> {
  //   patientChange
  // },[patient]);

  const searchBtnClick = () => {
    console.log(`${patient} search!`);
    setTarget(patient);
  };

  // useEffect(()=> {
  //   searchBtnClick;
  // }, [target]);

  return (
    <>
      <Container>
        <SelectBar id="selectBar">
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
          <SearchBtn onClick={searchBtnClick}>검색</SearchBtn>
        </SelectBar>
      </Container>
      <PatientData searchTarget={target}></PatientData>
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

const SearchBtn = styled.button`
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

const Options = styled.option`
  font-size: 14px;
`;

export default Dialogue;
