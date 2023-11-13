import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setLoginInfo } from '../../Store/LoginSlice';

import styled from 'styled-components';
import { UserAuthAPI } from '../../Services/UserAuthAPI';

import { useCookies } from 'react-cookie';

import Logo from '../../Assets/logo/logo.png';

import { BydsrLogo } from '../../Assets/logo';
import EditQuestion from '../../Components/AdditionalFuncsComponents/EditQuestion';

function Login() {
  const [, setCookie] = useCookies(['id']);

  const [userId, setUserId] = React.useState('');
  const [userPassword, setUserPassword] = React.useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const setId = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setUserId(value);
  };

  const setPass = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setUserPassword(value);
  };

  const login = async () => {
    return await UserAuthAPI.userLogin({
      username: userId,
      password: userPassword,
    });
  };

  const sendKey = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      login()
        .then(({ data }) => {
          setCookie('id', data['api-key']);
          dispatch(setLoginInfo({ token: data.api_key, id: userId }));
          navigate('/robotselect'); // hdcd 로그인 정보에따라 url을 바꿔주어야함
        })
        .catch((e) => {
          alert('아이디 비밀번호를 확인해주세요.');
        });
    } catch (e) {
      console.error('error', e);
    }
  };

  return (
    <Container>
      <EditQuestion></EditQuestion>
    </Container>
  );
}

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoginIcon = styled.img`
  width: 29rem;
`;

const FormContainer = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 2px solid white;
  background-color: black;
  width: 400px;
  height: 50px;
  border-radius: 10px;
  padding-left: 20px;
  margin-bottom: 30px;
  caret-color: white;
  color: white;
  font-size: 20px;
  &::placeholder {
    font-weight: bold;
    opacity: 0.5;
    color: gray;
  }
`;

const LoginBtn = styled.button`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  background-color: #2446dd;
  color: white;
  width: 150px;
  height: 60px;
  border-radius: 100px;
`;
