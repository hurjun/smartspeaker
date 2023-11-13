import React, { useState } from 'react';

import styled, { css } from 'styled-components';

function Memo() {
  const [memos, setMemos] = useState([
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
  ]);

  const [memos2, setMemos2] = useState([
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
  ]);

  const setText = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const {
      target: { value },
    } = event;

    if (index < 4) {
      setMemos((state) =>
        state.map((res, stateIndex) => {
          if (index === stateIndex) {
            return { text: value };
          } else {
            return res;
          }
        })
      );
    } else {
      setMemos2((state) =>
        state.map((res, stateIndex) => {
          if (index === stateIndex + 4) {
            return { text: value };
          } else {
            return res;
          }
        })
      );
    }
  };

  return (
    <>
      <Container>
        <Title>MEMO</Title>
        <ContentsContainer>
          <InputContainer>
            {memos.map((res, index) => (
              <InputContents key={index}>
                {res.text !== '' && <CheckBoxs type="checkbox" />}
                <MemoInput
                  inputIndex={index}
                  onChange={(event) => {
                    setText(event, index);
                  }}
                />
              </InputContents>
            ))}
          </InputContainer>
          <InputContainer>
            {memos2.map((res, index) => (
              <InputContents key={index}>
                {res.text !== '' && <CheckBoxs type="checkbox" />}
                <MemoInput
                  inputIndex={index + 4}
                  onChange={(event) => {
                    setText(event, index + 4);
                  }}
                />
              </InputContents>
            ))}
          </InputContainer>
        </ContentsContainer>
      </Container>
    </>
  );
}

export default Memo;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ContentsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: relative;
  left: -3.5%;
`;

const InputContainer = styled.div`
  width: 42%;
`;

const InputContents = styled.div`
  display: flex;
  border-bottom: 1px solid #707070;
  transition: all 0.5s;
`;

const CheckBoxs = styled.input.attrs({ type: 'checkbox' })`
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.35rem;
  border: none;
  background-color: #ffffff;
  transition: 0.5s all;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-color: #707070;
  }
  &:focus {
    outline: 0.2px solid black;
  }
`;

const Title = styled.p`
  margin: 13px 0 0 16px;
  font-size: 15px;
  font-weight: bold;
  position: relative;
  top: 0px;
  left: 0px;
`;

const MemoInput = styled.input<{ inputIndex: number }>`
  background-color: transparent;
  border: none;
  width: 100%;
  color: #707070;
  font-size: 14px;
  &:focus {
    outline: none;
  }
  ${(props) => {
    switch (props.inputIndex) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return css`
          ${CheckBoxs}:checked + && {
            text-decoration: line-through;
            text-decoration-thickness: 2px;
          }
        `;
    }
  }}
`;
