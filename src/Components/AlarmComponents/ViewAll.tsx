import styled from 'styled-components';
import ViewAllImage from '../../Assets/image/viewal.png';

function ViewAll() {
  return (
    <ViewAllLayout>
      <img src={ViewAllImage} alt="" width={1100} height={650} />
    </ViewAllLayout>
  );
}

export default ViewAll;

const ViewAllLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
