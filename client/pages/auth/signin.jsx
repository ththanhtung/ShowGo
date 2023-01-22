import React, { useState } from 'react';
import { useRequest } from '../../hooks/use-request';
import Router from 'next/router'

const signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: ()=> Router.push('/')
  });

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
    
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>sign in</h1>
      <div className="form-group">
        <label>email address</label>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {errors}
      <button className="btn btn-primary">sign in</button>
    </form>
  );
};

export default signup;
