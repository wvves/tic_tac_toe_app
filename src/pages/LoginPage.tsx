import React from 'react';

export const LoginPage = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  console.log(username)
  console.log(password)
  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <label>username</label>
        <input type="text" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}/>
        <label>password</label>
        <input type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
      </div>
    </>
  );
};