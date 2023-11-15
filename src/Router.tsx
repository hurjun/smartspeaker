import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Login from './Pages/Login/Login';

import RobotSelect from './Pages/RobotSelect';
import MainPage from './Pages/MainPage';
import MenuBar from './Components/MenuBar/MenuBar';
import RouteTest from './RouteTest';
import Schedule from './Pages/Schedule';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const Container = styled.div`
  display: grid;
  grid-template-columns: 150px 900px;
  color: #707070;
  height: 100vh;
`;

const Main = styled.div`
  display: grid;
  grid-column: span 1;
  grid-template-rows: 4fr 7fr;
  padding: 20px;
`;

type TLoginStore = {
  token: string;
  id: string;
};

function Router() {
  const queryClient = new QueryClient();

  const userType = useSelector(
    (state: {
      loginStore: {
        loginInfo: TLoginStore;
      };
    }) => state.loginStore.loginInfo
  );

  return (
    <BrowserRouter>
      <Container>
        <MenuBar></MenuBar>
        {/* <QueryClientProvider client={queryClient}> */}
        {/* <ReactQueryDevtools /> */}
        <Main>
          <Routes>
            <Route path="/" element={<Schedule />} />
            <Route path="/2" element={<RouteTest />} />
            <Route path="/3" element={<RouteTest />} />
          </Routes>
        </Main>
        {/* </QueryClientProvider> */}
      </Container>
    </BrowserRouter>
  );
}

export default Router;
