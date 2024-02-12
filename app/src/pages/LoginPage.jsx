import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Upload from './Upload';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirected, setRedirected] = useState(false);
  const [user, setUser] = useState(null);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();
    try {
      const { data } = await axios.post('/login', {
        email,
        password,
      });
      setUser(data);
      alert('Login Successful');
      setRedirected(true);
    } catch (e) {
      alert('Login Failed');
    }
  }

  if (redirected) {
    return  <Upload/>;
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-32'>
        <h1 className='text-4xl text-center mb-4'>Login</h1>
        <form className='max-w-md mx-auto ' onSubmit={handleLoginSubmit}>
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type='password'
            placeholder='password'
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <button className='primary my-2'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don't have an account yet? <Link to={'/register'}>Register Now</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
