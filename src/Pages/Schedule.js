import styled from 'styled-components';
import Patient from './Patient.jsx';

function Schedule() {
  return (
    <Container>
      <SelectBar>
        <Patient />
        <Patient />
        <Patient />
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

const AddBtn = styled.button`
  width: 40px;
  font-size: 14px;
  border: solid 1px black;
`;

export default Schedule;
