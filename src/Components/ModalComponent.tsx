import styled from 'styled-components';
import EditTaskContent from './AdditionalFuncsComponents/EditTaskContent';
import EditQuestion from './AdditionalFuncsComponents/EditQuestion';
import QuestionHistory from './AdditionalFuncsComponents/QuestionHistory';
import ViewAll from './AlarmComponents/ViewAll';
import NewEditQuestion from './AdditionalFuncsComponents/NewEditQuestion';

interface ModalComponentPropsType {
  clickedBtn: string;
  onClose: () => void;
}

export const pixelToRem = (px: number) => `${px / 16}rem`;

const modalTypeObj = {
  '질의응답 편집': {
    size: { width: pixelToRem(1008), height: pixelToRem(760) },
    comp: <NewEditQuestion />,
  },
  '질의응답 내역': {
    size: { width: pixelToRem(1280), height: pixelToRem(760) },
    comp: <QuestionHistory />,
  },
  // '질의응답 편집': {
  //   size: { width: pixelToRem(1280), height: pixelToRem(760) },
  //   comp: <NewEditQuestion />,
  // },
  전체보기: {
    size: { width: pixelToRem(1300), height: pixelToRem(760) },
    comp: <ViewAll />,
  },
  수행편집: {
    size: { width: pixelToRem(676), height: pixelToRem(760) },
    comp: <EditTaskContent />,
  },
};

function ModalComponent(props: ModalComponentPropsType) {
  const { clickedBtn, onClose } = props;

  return (
    <ModalComponentLayout
      modalWidth={modalTypeObj[clickedBtn as keyof typeof modalTypeObj].size}
    >
      <CloseButton onClick={onClose}>x</CloseButton>
      {modalTypeObj[clickedBtn as keyof typeof modalTypeObj].comp}
    </ModalComponentLayout>
  );
}

export default ModalComponent;

const ModalComponentLayout = styled.div<{
  modalWidth: { width: string; height: string };
}>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;

  width: ${({ modalWidth }) => modalWidth.width};
  height: ${({ modalWidth }) => modalWidth.height};
  padding: 2rem 3rem;
  background-color: #2c2c2c;
  border-radius: 15px;
  border: 2px solid #707070;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: inherit;
  color: #c4c4c4;
  font-size: 18px;
  border: none;
  cursor: pointer;
`;
