import React, { useState } from 'react'

function getDataNewton(f, df, x, a, b, epsilon, setData) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')
    df = df.replaceAll('+', '%2B')

    fetch('http://localhost:5000/newtons-method/?f=' + f + '&df=' + df + '&x=' + x + '&a=' + a + '&b=' + b + '&epsilon=' + epsilon)
    .then(res => res.json()).then(data => {
      console.log(data)
        setData(data)})
      .catch(err => console.log(err))
  }

export const IterationInputForm = ({data, setData, method}) => {
    const [f, setF] = useState('')
    const [df, setDf] = useState('')
    const [x, setX] = useState('')
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [epsilon, setEpsilon] = useState('')


    if (method === "Newtons") {
        return (
            <>
                <div className="IterationInputForm">
                
                <form className='form'>
                    <label for="f">f(x): </label>
                    <input className="textinput" type="text" placeholder="x**3 - 2*x + 1" name="f" id="f" onChange={(e) => setF(e.target.value)} />
                    <label for="df">f'(x): </label>
                    <input className="textinput" type="text" placeholder="3*x**2 - 2" name="df" id="df" onChange={(e) => setDf(e.target.value)}/>
                    <label for="x">x0: </label>
                    <input className="textinput" type="text" placeholder="2" name="x" id="x" onChange={(e) => setX(e.target.value)}/>
                    <label for="a">a: </label>
                    <input className="textinput" type="text" placeholder="-3" name="a" id="a" onChange={(e) => setA(e.target.value)}/>
                    <label for="b">b: </label>
                    <input className="textinput" type="text" placeholder="6" name="b" id="b" onChange={(e) => setB(e.target.value)}/>
                    <label for="epsilon">epsilon: </label>
                    <input className="textinput" type="text" placeholder="1e-7" name="epsilon" id="epsilon" onChange={(e) => setEpsilon(e.target.value)}/>
                    <button className="button submit" type="button" onClick={() => getDataNewton(f, df, x, a, b, epsilon, setData)}>Submit</button>
                </form> 

                </div>
            </>
        )
        } else if (method === "Konashuk") {
            return (
                <>
                    <div className="IterationInputForm">
                    
                    <form className='form'>
                        <label for="f">f(x): </label>
                        <input className="textinput" type="text" placeholder="x**3 - 2*x + 1" name="f" id="f" onChange={(e) => setF(e.target.value)} />
                        <label for="x">x0: </label>
                        <input className="textinput" type="text" placeholder="2" name="x" id="x" onChange={(e) => setX(e.target.value)}/>
                        <label for="a">a: </label>
                        <input className="textinput" type="text" placeholder="-3" name="a" id="a" onChange={(e) => setA(e.target.value)}/>
                        <label for="b">b: </label>
                        <input className="textinput" type="text" placeholder="6" name="b" id="b" onChange={(e) => setB(e.target.value)}/>
                        <label for="epsilon">epsilon: </label>
                        <input className="textinput" type="text" placeholder="1e-7" name="epsilon" id="epsilon" onChange={(e) => setEpsilon(e.target.value)}/>
                        <button className="button submit" type="button" onClick={() => null}>Submit</button>
                    </form> 
    
                    </div>
                </>
            )
            } else if (method === "Simple Iteration") {
                return (
                    <>
                        <div className="IterationInputForm">
                        
                        <form className='form'>
                            <label for="f">f(x): </label>
                            <input className="textinput" type="text" placeholder="x**3 - 2*x + 1" name="f" id="f" onChange={(e) => setF(e.target.value)} />
                            <label for="x">x0: </label>
                            <input className="textinput" type="text" placeholder="2" name="x" id="x" onChange={(e) => setX(e.target.value)}/>
                            <label for="a">a: </label>
                            <input className="textinput" type="text" placeholder="-3" name="a" id="a" onChange={(e) => setA(e.target.value)}/>
                            <label for="b">b: </label>
                            <input className="textinput" type="text" placeholder="6" name="b" id="b" onChange={(e) => setB(e.target.value)}/>
                            <label for="epsilon">epsilon: </label>
                            <input className="textinput" type="text" placeholder="1e-7" name="epsilon" id="epsilon" onChange={(e) => setEpsilon(e.target.value)}/>
                            <button className="button submit" type="button" onClick={() => null}>Submit</button>
                        </form> 
        
                        </div>
                    </>
                )
            } else {
                return (
                    <>
                        <p className="text big-text">Choose method</p>
                    </>
                )
            }
}