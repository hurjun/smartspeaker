import styled from 'styled-components';
import Patient from './Patient.js';

function Schedule() {
  return (
    <Container>
      <SelectBar>
        <Select></Select>
        <Select>
          <option>환자 선택</option>
          <Patient />
        </Select>
        <Select></Select>
        <AddBtn>추가</AddBtn>
      </SelectBar>
    </Container>
  );
}

// <input type={'datetime-local'}></input>

const Container = styled.div`
  grid-row: span 1;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectBar = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  justify-content: space-between;
  background-color: lightgray;
  margin: 10px;
`;

const Select = styled.select`
  background-color: white;
  border: solid 1px blue;
  margin-left: 10px;
  width: 100px;
  font-size: 14px;
`;

const AddBtn = styled.button`
  width: 60px;
  border: solid 1px black;
`;

export default Schedule;
