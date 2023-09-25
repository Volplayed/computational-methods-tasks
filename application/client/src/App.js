
import './App.css';
import { useState, useEffect } from 'react';



function App() {

  const [data, setData] = useState([])

  function getData() {
    fetch('http://localhost:5000/newtons-method/?f=x**3-4%20-3&df=3*(x**2)&x=1&a=0&b=2&epsilon=1e-7')
    .then(res => res.json()).then(data => {
      console.log(data)
        setData(data)})
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <button className="newton" onClick={getData}>
      Newton
    </button>
      <div className="data">
      {
      data.length === 0 ? (
          <></>
        ) : (
          Object.values(data).map((x, i) => <p key={i}>{x}</p>)
        )}
      </div>
    </div>   
  );
}


export default App;
