import styled from 'styled-components';
import { useState, useEffect } from 'react';
import localStorage from 'redux-persist/es/storage';

function PatientData({ dataArr }) {
  const [infoArr, setInfoArr] = useState([]);
  useEffect(() => {
    if (dataArr.length > 0) {
      setInfoArr((infoArr) => [...infoArr, dataArr]);
    }
  }, [dataArr]);

  useEffect(() => {
    console.log(infoArr);
    let saveData = JSON.stringify(infoArr);
    localStorage.setItem('data', saveData);
  }, [infoArr]);

  const deleteData = (e) => {
    const targetIndex = e.target.parentElement.id;
    setInfoArr((infoArr) => {
      const newArr = [...infoArr];
      newArr.splice(targetIndex, 1);
      return newArr;
    });
  };

  return (
    <ListSection>
      <Section>
        <Header key="날짜">날짜</Header>
        <Header key="환자명">환자명</Header>
        <Header key="질문">질문</Header>
      </Section>
      {infoArr.map((eachArr, index) => (
        <Mylist id={index} key={index}>
          <Data key={eachArr[0]}>{eachArr[0]}</Data>
          <Data key={eachArr[1]}>{eachArr[1]}</Data>
          <Data key={eachArr[2]}>{eachArr[2]}</Data>
          <Btn onClick={deleteData}>삭제</Btn>
        </Mylist>
      ))}
    </ListSection>
  );
}

const ListSection = styled.section`
  grid-row: span 1;
  /* background-color: whitesmoke; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Mylist = styled.div`
  white-space: nowrap;
  width: 90%;
  height: 10%;
  display: grid;
  grid-template-columns: 4fr 3fr 4fr 1fr;
  border-bottom: 1px solid blue;
`;

const Section = styled(Mylist)`
  border-bottom: 3px solid blue;
`;

const Data = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-size: 16px;
`;

const Header = styled(Data)`
  font-size: 24px;
`;

const Btn = styled.button`
  width: 40px;
  height: 70%;
  font-size: 10px;
  border: solid 1px blue;
  background-color: white;
  align-self: center;
`;

export default PatientData;
