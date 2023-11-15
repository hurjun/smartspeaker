import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MenuBar() {
  const navigator = useNavigate();

  const SwitchPage = (e) => {
    const kind = e.target.id;
    switch (kind) {
      case 'schedule':
        console.log('this is 스케줄 페이지');
        navigator('/1');
        break;
      case 'dialogue':
        console.log('this is 대화내역 페이지');
        navigator('/2');
        break;
      case 'info':
        console.log('this is 정보추가 페이지');
        navigator('/3');
        break;
    }
  };
  return (
    <Container>
      <Content id="schedule" onClick={SwitchPage}>
        스케줄 설정
      </Content>
      <Content id="dialogue" onClick={SwitchPage}>
        대화내역
      </Content>
      <Content id="info" onClick={SwitchPage}>
        정보 추가
      </Content>
    </Container>
  );
}

// id를 컨텐츠 별로 다르게 줘서 id값으로 인식해서 switch로 페이지를 라우터한다

const Container = styled.div`
  grid-column: 1;
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  border-right: 2px solid blue;
  padding-top: 30px;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  margin: 20px 20px;
  background-color: white;
  &:active {
    background-color: blue;
    opacity: 0.2;
  }
  border-top: 2px solid blue;
  border-bottom: 2px solid blue;
  font-size: 18px;
`;

export default MenuBar;
