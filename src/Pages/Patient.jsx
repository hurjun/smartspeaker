import styled from 'styled-components';

function Patient() {
  const patientArr = [
    { name: '허 준', place: 101 },
    { name: '최효재', place: 102 },
    { name: '김 율', place: 103 },
  ];

  return (
    <Select>
      <Options>환자 선택</Options>
      {patientArr.map((patient) => (
        <Options>
          {patient.place} {patient.name}
        </Options>
      ))}
    </Select>
  );
}

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

export default Patient;
