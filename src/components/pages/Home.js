import React, { useEffect } from 'react';
import { useSession } from '../../context/Auth';
import { SessionCreate } from '../SessionCreate';

const Home = () => {
  const { session, setSession } = useSession();

  const val = localStorage.getItem('session');

  useEffect(() => {
    if (val !== null && session == null) {
      let obj = JSON.parse(val);

      obj = { ...obj, lastLogin: new Date().toLocaleString() };
      setSession(obj);
    }
  });

  return <div>{!session && <SessionCreate />}</div>;
};

export default Home;
