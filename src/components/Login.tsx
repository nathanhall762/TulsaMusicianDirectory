import { app } from '../firebase';
import { useEffect, useState } from 'react';
import { FirebaseError } from 'firebase/app';
import { isAdmin } from '../cloudFunctions';
import useBearStore from '../bearStore';
import styled from 'styled-components';

interface LoginData {
  email: string;
  password: string;
}

interface LoginProps {
  message?: string;
}

const Login: React.FC<LoginProps> = ({ message }) => {
  const user = useBearStore((state) => state.user);
  const setUser = useBearStore((state) => state.setUser);
  const [signingIn, setSigningIn] = useState(false);
  const [dots, setDots] = useState('');
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  async function signUp() {
    setSigningIn(true);
    const { createUserWithEmailAndPassword, getAuth } = await import(
      'firebase/auth'
    );
    const auth = getAuth(app);

    const userData = await createUserWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    ).catch((err) => {
      setSigningIn(false);
      if (err.constructor !== FirebaseError) {
        alert('fix this');
        throw new Error('this is broke in a special way');
      }
      if (err.code === 'auth/invalid-email') alert('Invalid Email');
      if (err.code === 'auth/missing-password') alert('Missing Password');
      if (err.code === 'auth/email-already-in-use') {
        alert('Email Already in Use');
      }
      if (err.code === 'auth/weak-password') {
        alert('Password should be at least 6 characters');
      }
      console.log(err);
      return;
    });
    console.log(userData);

    if (!userData) {
      return;
    }

    setUser({
      userCredential: userData,
      isAdmin: false,
    });
  }

  async function signIn() {
    setSigningIn(true);
    const { signInWithEmailAndPassword, getAuth } = await import(
      'firebase/auth'
    );
    const auth = getAuth(app);

    const user = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    ).catch((err) => {
      setSigningIn(false);
      if (err.constructor !== FirebaseError) {
        alert('fix this');
        throw new Error('this is broke in a special way');
      }
      if (err.code === 'auth/invalid-email') alert('Invalid Email');
      if (err.code === 'auth/missing-password') alert('Missing Password');
      if (err.code === 'auth/wrong-password') alert('Incorrect Password');
      if (err.code === 'auth/too-many-requests') {
        alert(
          'Access to this account has been temporarily disabled due to many failed login attempts.'
        );
      }
      console.log(err);
    });

    if (!user?.user.uid) {
      return;
    }
    const isAdminBool = await isAdmin({ uid: user.user?.uid }).then(
      (res) => res.data.isAdmin
    );
    setUser({
      userCredential: user,
      isAdmin: isAdminBool,
    });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogOut = async () => {
    const { getAuth } = await import('firebase/auth');
    const auth = getAuth(app);

    auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    if (signingIn) {
      const intervalId = setInterval(() => {
        setDots((prevDots) => (prevDots.length >= 3 ? '' : prevDots + '.'));
      }, 500);

      // Clear the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  });

  if (user?.userCredential) {
    return (
      <LoginForm>
        <LogoutContainer>
          <h3>Logged in as {user.userCredential.user.email}</h3>
          <button onClick={handleLogOut} style={{ marginLeft: '1rem' }}>
            logout
          </button>
        </LogoutContainer>
      </LoginForm>
    );
  } else if (signingIn) {
    return (
      <WaitWrapper>
        <SigningInText>Signing You In{dots}</SigningInText>
      </WaitWrapper>
    );
  } else {
    return (
      <LoginForm>
        <LoginMessage>{message}</LoginMessage>
        <InputContainer>
          <input
            type='email'
            name='email'
            placeholder='email'
            value={loginData.email}
            onChange={handleInputChange}
          />
          <input
            type='password'
            name='password'
            placeholder='password'
            minLength={6}
            value={loginData.password}
            onChange={handleInputChange}
          />
          <ButtonBox>
            <button onClick={signUp}>sign up</button>
            <button onClick={signIn}>login</button>
          </ButtonBox>
        </InputContainer>
      </LoginForm>
    );
  }
};

export const LoginForm = styled.div`
  // centered on screen
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const WaitWrapper = styled.div`
  display: flex;
  height: 400px;
  justify-content: center;
  align-items: center;
`;

const SigningInText = styled.h2``;

const LoginMessage = styled.h3`
  // sexy looking message
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-align: center;
`;

export const InputContainer = styled.div`
  // sexy looking container
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: var(--color-background-alt);
  box-shadow: var(--shadow);
  width: 50vw;
  height: 10rem;
  @media (max-width: 1000px) {
    width: 15rem;
  }
  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    background-color: var(--color-background);
    color: var(--color-text);
    font-size: 1rem;
    border: 1px solid var(--color-text-primary);
    &:focus {
      outline: none;
    }
  }
  input::placeholder {
    color: var(--color-text-alt);
  }
`;

const ButtonBox = styled.div`
  // a sexy button box
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  button {
    background-color: var(--color-accent);
    color: var(--color-text-inverse);
    font-size: 1rem;
    font-weight: 700;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    transition: all var(--animation-speed-fast) ease;
    &:hover {
      cursor: pointer;
      background-color: var(--color-background-main);
    }
  }
`;

const LogoutContainer = styled.div`
`;

export default Login;
