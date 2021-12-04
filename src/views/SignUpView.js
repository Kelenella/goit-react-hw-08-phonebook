import { getIsLoggedIn } from '../redux/auth/auth-selectors';
import { useSelector } from 'react-redux';

import { useState } from 'react';
import { register } from '../redux/auth/auth-operations';
import { useDispatch } from 'react-redux';

export default function SignUpView() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isLoggedIn = useSelector(getIsLoggedIn);

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        return setName(value);

      case 'email':
        return setEmail(value);

      case 'password':
        return setPassword(value);

      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    dispatch(register({ name, email, password }));

    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    !isLoggedIn && (
      <div>
        <h1>SignUp please!</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label>
            <span>Name</span>
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={handleChange}
            />
            <span>Email</span>
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={handleChange}
            />
            <span>Password</span>
            <input
              type="password"
              name="password"
              required
              value={password}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Signup</button>
        </form>
      </div>
    )
  );
}
