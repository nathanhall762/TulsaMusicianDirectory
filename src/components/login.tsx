import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';
import styles from '../css/Login.module.css';
import { isAdmin } from '../cloudFunctions';
import useBearStore from '../bearStore';
import { UserData } from '../types';

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const user = useBearStore((state) => state.user);
  const setUser = useBearStore((state) => state.setUser);
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
      alert('Error Creating User');
      return;
    }

    setUser({
      userCredential: userData,
      isAdmin: false,
    });
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

    // check for if is admin

    if (!user?.user.uid) {
      alert('error creating creating user');
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

  const handleLogOut = () => {
    auth.signOut();
    setUser({} as UserData);
  };

  if (user.userCredential) {
    return (
      <div className={styles.loginForm}>
        <div className={styles.logoutContainer}>
          <h3>Logged in as {user.userCredential.user.email}</h3>
          <button onClick={handleLogOut} style={{ marginLeft: '1rem' }}>
            logout
          </button>
        </div>
      </div>
    );
  } else {
    return (
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
    );
  }
};

export default Login;
