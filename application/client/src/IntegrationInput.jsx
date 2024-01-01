import React, { useState } from 'react'
function getDataIntegration(f, a, b, n, rule, setData, data) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')

    fetch('http://localhost:5000/numerical-integration/?method=' + rule + '&f='+ f + '&n='+ n +'&a=' + a + '&b=' + b)
    .then(res => res.json()).then(data => {
      console.log(data)
        setData(data)
        })
      .catch(err => console.log(err))

      
  }

export const IntergrationInputForm = ({data, setData, method, setMethod}) => {
    const [f, setF] = useState('')
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [n, setN] = useState('')
    const [rule, setRule] = useState('rectangle')


    return (
        <>
            <div className="IterationInputForm">
            
            <form className='form' onSubmit={(e) => {
                    getDataIntegration(f, a, b, n, rule, setData, data)
                    e.preventDefault()
                    setMethod("")
                    }}>
                <label for="f">f(x): </label>
                <input className="textinput" type="text" placeholder="x**3 - 2*x + 1" name="f" id="f" onChange={(e) => setF(e.target.value)} required/>
                <label for="a">a: </label>
                <input className="textinput" type="text" placeholder="-3" name="a" id="a" onChange={(e) => setA(e.target.value)} required/>
                <label for="b">b: </label>
                <input className="textinput" type="text" placeholder="6" name="b" id="b" onChange={(e) => setB(e.target.value)} required/>
                <label for="n">n: </label>
                <input className="textinput" type="text" placeholder="100000" name="n" id="n" onChange={(e) => setN(e.target.value)} required/>
                <select name="rules" id="rules" className="selectioniput" onChange={(e) => setRule(e.target.value)}>
                    <optgroup label="rules">
                        <option value="rectangle">Rectangle</option>
                        <option value="trapezoid">Trapezoid</option>
                        <option value="simpson">Simpson</option>
                    </optgroup>
                </select>
                <button className="button submit" type="submit">Submit</button>
                
            </form> 

            </div>
        </>
    )}