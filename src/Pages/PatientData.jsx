import styled from 'styled-components';
import { useState, useEffect } from 'react';

function PatientData({ dataArr, searchTarget }) {
  const [mode, SetMode] = useState(false);
  const [infoArr, setInfoArr] = useState([]);
  const [matchedArr, setMatchedArr] = useState([]);

  /*
  데이터를 하드코딩해서 테스트함
  그래서 삭제를 해도 select option 값을 바꾸면 다시 돌아와짐
  이건 어쩔수 없는듯
  */
  const sampleArr = [
    ['12시', '101 허 준', '밥 먹음?'],
    ['13시', '101 허 준', '약 먹음?'],
    ['14시', '101 허 준', '화장실 감?'],
    ['12시', '102 최효재', '밥 먹음?'],
    ['13시', '102 최효재', '약 먹음?'],
    ['14시', '102 최효재', '화장실 감?'],
    ['12시', '103 김 율', '밥 먹음?'],
    ['13시', '103 김 율', '약 먹음?'],
    ['14시', '103 김 율', '화장실 감?'],
  ];

  // 대화내역에서 동작하는 함수
  useEffect(() => {
    if (searchTarget && searchTarget.length > 0) {
      SetMode(true);
      const arr = sampleArr.filter((eachArr) => eachArr[1] == searchTarget);
      setMatchedArr(() => arr);
    }
  }, [searchTarget]);

  // 스케줄 페이지에서 동작하는 함수
  useEffect(() => {
    if (dataArr && dataArr.length > 0) {
      SetMode(false);
      setInfoArr((infoArr) => [...infoArr, dataArr]);
    }
  }, [dataArr]);

  // 질문 지우는 함수인데, 대화내역에선 실제로 지워지진 않음
  const deleteData = (e) => {
    const targetIndex = e.target.parentElement.id;
    if (mode === true) {
      // 검색일 경우
      setMatchedArr((matchedArr) => {
        const newArr = [...matchedArr];
        newArr.splice(targetIndex, 1);
        return newArr;
      });
    } else {
      // 추가일 경우
      setInfoArr((infoArr) => {
        const newArr = [...infoArr];
        newArr.splice(targetIndex, 1);
        return newArr;
      });
    }
  };

  // 데이터 보여주는 함수
  // 모드가 true일땐 대화내역, false일땐 스케줄페이지로 동작
  function displayList(array) {
    console.log(array);
    return array.map((eachArr, index) => (
      <Mylist id={index} key={index}>
        <Data key={eachArr[0]}>{eachArr[0]}</Data>
        <Data key={eachArr[1]}>{eachArr[1]}</Data>
        <Data key={eachArr[2]}>{eachArr[2]}</Data>
        <Btn onClick={deleteData}>삭제</Btn>
      </Mylist>
    ));
  }

  return (
    <ListSection>
      <Section>
        <Header key="날짜">날짜</Header>
        <Header key="환자명">환자명</Header>
        <Header key="질문">질문</Header>
      </Section>
      {mode === true ? displayList(matchedArr) : displayList(infoArr)}
    </ListSection>
  );
}

const ListSection = styled.section`
  grid-row: span 1;
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
