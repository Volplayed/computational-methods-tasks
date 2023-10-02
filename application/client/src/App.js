
import './App.css';
import { useState, useEffect } from 'react';
import {HUD} from './HUD'
import { IterationInputForm } from './IterationInputForm';
import { DataContainer } from './DataContainer';

function App() {

  const [method, setMethod] = useState('newtons-method')

  const [data, setData] = useState([])
  const [plot, setPlot] = useState('')

  return (
    <div className="App">

      <div className='container'>
        <HUD onClick={(x) => {setMethod(x)
        setData([])
        setPlot('')}
        } state={method} />
        <div className='form-container'>
          {(method === 'Newtons' || method === "Konashuk" || method === "Simple Iteration") ? (
            <IterationInputForm data={data} setPlot={setPlot} setData={setData} method={method} />) : (<></>)
          }
        </div>  
          <DataContainer data={data} plot={plot} />
      </div>

    </div>   
  );
}


export default App;
