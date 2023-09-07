import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';
import { useOutletContext } from 'react-router-dom';
import { OutletContextProps } from '../types';
import styles from '../css/Login.module.css';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const { user, setUser } = useOutletContext<OutletContextProps>();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  async function signUp() {
    const userData = await createUserWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    ).catch((err) => {
      if (err.constructor !== FirebaseError) {
        alert('fix this');
        throw new Error('this is broke in a special way');
      }
      if (err.code === 'auth/invalid-email') alert('Invalid Email');
      if (err.code === 'auth/email-already-in-use')
        alert('Email Already in Use');
      if (err.code === 'auth/missing-password') alert('Missing Password');
      if (err.code === 'auth/weak-password')
        alert('Password should be at least 6 characters');
      console.log(err);
    });
    console.log(userData);
    setUser(userData);
  }

  async function signIn() {
    const user = await signInWithEmailAndPassword(
      auth,
      loginData.email,
      loginData.password
    ).catch((err) => {
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
    setUser(user);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setLoginData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (user) {
    return <p>Hello {user.user.email}</p>;
  } else {
    return (
      <div className={styles.loginContainer}>
        <h1>The Tulsa Musician Directory</h1>
        <ul>
          How to support:
          <li>Discover local bands by exploring the directory and listening to music previews.</li>
          <li>Use the social links to follow and engage with artist content.</li>
          <li>Use the music links to stream the artists' music.</li>
          <li>Help build a working directory of Tulsa musicians by signing
          up to add bands/musicians!</li>
        </ul>
        <div className={styles.loginForm}>
          <div className={styles.inputContainer}>
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
          </div>
          <div className={styles.buttonBox}>
            <button onClick={signUp}>sign up</button>
            <button onClick={signIn}>login</button>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
