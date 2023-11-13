import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import styled from 'styled-components';

import { useSelector } from 'react-redux';

import Login from './Pages/Login/Login';

import RobotSelect from './Pages/RobotSelect';
import MainPage from './Pages/MainPage';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const Contianer = styled.div`
  display: flex;
  color: #707070;
  align-items: center;
  justify-content: center;
  height: 100vh;
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
    }) => state.loginStore.loginInfo,
  );

  return (
    <BrowserRouter>
      <Contianer>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <Routes>
            <Route path='*' element={<Login />} />
          </Routes>
        </QueryClientProvider>
      </Contianer>
    </BrowserRouter>
  );
}

export default Router;
