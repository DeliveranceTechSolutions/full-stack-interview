import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import Robot from "./components/Robot";



function App() {
  const [payload, changePayload] = useState(undefined);
  useEffect(() => {
    axios({
      method: 'get',
      url: 'http://127.0.0.1:3001/api/get_all_robots',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-type': 'application/x-www-urlencoded',
      },
    })
    .then((response) => {
      console.log('success', response);
      changePayload(response);
    })
    .catch((error) => {
      console.log('failure', error);
      changePayload(error)
    });    
  }, [payload])

  return (
    <div className='App'>
      <header className='App-header'>
        <Robot />
      </header>
    </div>
  );
}

export default App;
