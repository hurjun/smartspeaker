import React from 'react';
import Router from './Router';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    font-size: 0.57vw;
    font-family: 'Noto Sans KR', sans-serif;
  }

  body{
    margin: 0;
    background-color: #0f0f0f;
  }

  p {
    margin: 0;
  }
`;

function App() {
  return (
    <>
      <React.StrictMode>
        <GlobalStyle />
        <Router />
      </React.StrictMode>
    </>
  );
}

export default App;
