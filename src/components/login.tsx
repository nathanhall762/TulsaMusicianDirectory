import {
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { SetStateAction, useState } from 'react';
import { auth } from '../firebase';
import { FirebaseError } from 'firebase/app';

interface LoginProps {
  user: UserCredential | void;
  setUser: React.Dispatch<SetStateAction<UserCredential | void>>;
}

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ user, setUser }) => {
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
      <div>
        <input
          type='email'
          name='email'
          placeholder='email'
          value={loginData.email}
          onChange={handleInputChange}
        />
        <input
          type='text'
          name='password'
          placeholder='password'
          minLength={6}
          value={loginData.password}
          onChange={handleInputChange}
        />
        <div>
          <button onClick={signUp}>sign up</button>
          <button onClick={signIn}>login</button>
        </div>
      </div>
    );
  }
};

export default Login;
