import React,{ useEffect , useRef } from 'react';
import Home from './Home/Home';
import './assets/css/night/app.css';
import { CircleLoader } from 'react-spinners';

const App = ()=> {
  const loadingRef = useRef(null);
  useEffect( ()=>{
    setTimeout(()=>{
      loadingRef.current.style.display = 'none';
    },500)
  }, [] );
    return (
      <>
          <div ref={ loadingRef } id="spinner" >
            <CircleLoader 
            size={ 300 }
            color = { "#00a79d" }
            loading
            />
          </div>
            <Home>
            <div className="glowing">
              <span style={{ "--i": "1" }}></span>
              <span style={{ "--i": "2" }}></span>
              <span style={{ "--i": "3" }}></span>
            </div>
            <div className="glowing">
              <span style={{ "--i": "1" }}></span>
              <span style={{ "--i": "2" }}></span>
              <span style={{ "--i": "3" }}></span>
            </div>
            <div className="glowing">
              <span style={{ "--i": "1" }}></span>
              <span style={{ "--i": "2" }}></span>
              <span style={{ "--i": "3" }}></span>
            </div>
            <div className="glowing">
              <span style={{ "--i": "1" }}></span>
              <span style={{ "--i": "2" }}></span>
              <span style={{ "--i": "3" }}></span>
            </div>
            <div className="glowing">
              <span style={{ "--i": "1" }}></span>
              <span style={{ "--i": "2" }}></span>
              <span style={{ "--i": "3" }}></span>
            </div>
            </Home>
      </>
  );
}

export default App
