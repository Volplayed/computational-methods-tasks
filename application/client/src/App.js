
import './App.css';
import { useState, useEffect } from 'react';
import {HUD} from './HUD'
import { IterationInputForm } from './IterationInputForm';

function App() {

  const [method, setMethod] = useState('newtons-method')

  const [data, setData] = useState([])

  return (
    <div className="App">

      <div className='container'>
        <HUD onClick={(x) => setMethod(x)} state={method} />
        <div className='form-container'>
          {(method === 'Newtons' || method === "Konashuk" || method === "Simple Iteration") ? (
            <IterationInputForm data={data} setData={setData} method={method} />) : (<></>)
          }
        </div>
        
        <div className="data">
        {
        data.length === 0 ? (
            <></>
          ) : (
            Object.values(data).map((x, i) => <p key={i}>{x}</p>)
          )}
        </div>
      </div>

    </div>   
  );
}


export default App;
