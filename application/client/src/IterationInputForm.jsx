import React, { useState } from 'react'

function getDataNewton(f, df, x, a, b, epsilon, setData, setPlot, data) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')
    df = df.replaceAll('+', '%2B')

    fetch('http://localhost:5000/newtons-method/?f=' + f + '&df=' + df + '&x=' + x + '&a=' + a + '&b=' + b + '&epsilon=' + epsilon)
    .then(res => res.json()).then(data => {
      console.log(data)
        setData(data)
        if (data.x_list){
            getPlotNewton(f, df, data.x_list.join(','), a, b, setPlot)
          }})
      .catch(err => console.log(err))

      
  }
function getDataKonashuk(f, x0, x1, a, b, epsilon, setData, setPlot, data) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')

    fetch('http://localhost:5000/konashuk-method/?f='+f +'&x0='+ x0+ '&x1=' + x1 + '&a=' + a+ '&b=' + b+ '&epsilon=' + epsilon)
    .then(res => res.json()).then(data => {
      console.log(data)
        setData(data)
        if (data.x_list){
            getPlotKonashuk(f, data.x_list.join(','), a, b, setPlot)
          }})
      .catch(err => console.log(err))

      
  }
function getDataSimpleIteration(f, psi, x, epsilon, setData, setPlot, data) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')

    

    fetch('http://localhost:5000/simple-iteration-method/?f='+f + "&psi=" + psi + '&x='+ x + '&epsilon=' + epsilon)
    .then(res => res.json()).then(data => {
      console.log(data)
        setData(data)
        if (data.x_list){
            getPlotSimpleIteration(f, data.x_list.join(','), setPlot)
          }})
      .catch(err => console.log(err))

      
  }


//plot functions
function getPlotNewton(f, df, x, a, b, setPlot) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')
    df = df.replaceAll('+', '%2B')

    fetch('http://localhost:5000/newtons-method-plot/?f=' + f + '&df=' + df + '&a=' + a + '&b=' + b + '&x_list=' + x)
    .then(res=> res.text())
    .then(data=>{
        setPlot(data)
    })
      .catch(err => console.log(err))
  }

function getPlotKonashuk(f, x, a, b, setPlot) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')

    fetch('http://localhost:5000/konashuk-method-plot/?f='+f+ '&a=' + a+ '&b=' + b +'&x_list='+ x )
    .then(res=> res.text())
    .then(data=>{
        setPlot(data)
    })
      .catch(err => console.log(err))
  }
function getPlotSimpleIteration(f, x, setPlot) {
    // change all + sings to %2B
    f = f.replaceAll('+', '%2B')

    fetch('http://localhost:5000/simple-iteration-method-plot/?f='+f + '&x_list='+ x )
    .then(res=> res.text())
    .then(data=>{
        setPlot(data)
    })
      .catch(err => console.log(err))
  }


export const IterationInputForm = ({data, setData, method, setPlot, setMethod}) => {
    const [f, setF] = useState('')
    const [df, setDf] = useState('')
    const [x, setX] = useState('')
    const [x1, setX1] = useState('')
    const [a, setA] = useState('')
    const [b, setB] = useState('')
    const [psi, setPsi] = useState('')
    const [epsilon, setEpsilon] = useState('')


    if (method === "Newtons") {
        return (
            <>
                <div className="IterationInputForm">
                
                <form className='form' onSubmit={(e) => {
                        getDataNewton(f, df, x, a, b, epsilon, setData, setPlot, data)
                        e.preventDefault()
                        setMethod("")
                        }}>
                    <label for="f">f(x): </label>
                    <input className="textinput" type="text" placeholder="x**3 - 2*x + 1" name="f" id="f" onChange={(e) => setF(e.target.value)} required/>
                    <label for="df">f'(x): </label>
                    <input className="textinput" type="text" placeholder="3*x**2 - 2" name="df" id="df" onChange={(e) => setDf(e.target.value)} required/>
                    <label for="x">x0: </label>
                    <input className="textinput" type="text" placeholder="2" name="x" id="x" onChange={(e) => setX(e.target.value)} required/>
                    <label for="a">a: </label>
                    <input className="textinput" type="text" placeholder="-3" name="a" id="a" onChange={(e) => setA(e.target.value)} required/>
                    <label for="b">b: </label>
                    <input className="textinput" type="text" placeholder="6" name="b" id="b" onChange={(e) => setB(e.target.value)} required/>
                    <label for="epsilon">epsilon: </label>
                    <input className="textinput" type="text" placeholder="1e-7" name="epsilon" id="epsilon" onChange={(e) => setEpsilon(e.target.value)} required/>
                    <button className="button submit" type="submit">Submit</button>
                </form> 

                </div>
            </>
        )
        } else if (method === "Konashuk") {
            return (
                <>
                    <div className="IterationInputForm">
                    
                    <form className='form'onSubmit={(e) => {
                        getDataKonashuk(f, x, x1, a, b, epsilon, setData, setPlot, data)
                        e.preventDefault()
                        setMethod("")
                        }}>
                        <label for="f">f(x): </label>
                        <input className="textinput" type="text" placeholder="x**3 - 2*x + 1" name="f" id="f" onChange={(e) => setF(e.target.value)} required/>
                        <label for="x0">x0: </label>
                        <input className="textinput" type="text" placeholder="0" name="x0" id="x0" onChange={(e) => setX(e.target.value)} required/>
                        <label for="x1">x1: </label>
                        <input className="textinput" type="text" placeholder="4" name="x1" id="x1" onChange={(e) => setX1(e.target.value)} required/>               
                        <label for="a">a: </label>
                        <input className="textinput" type="text" placeholder="-3" name="a" id="a" onChange={(e) => setA(e.target.value)} required/>
                        <label for="b">b: </label>
                        <input className="textinput" type="text" placeholder="6" name="b" id="b" onChange={(e) => setB(e.target.value)} required/>
                        <label for="epsilon">epsilon: </label>
                        <input className="textinput" type="text" placeholder="1e-7" name="epsilon" id="epsilon" onChange={(e) => setEpsilon(e.target.value)} required/>
                        <button className="button submit" type="submit">Submit</button>
                    </form> 
    
                    </div>
                </>
            )
            } else if (method === "Simple Iteration") {
                return (
                    <>
                        <div className="IterationInputForm">
                        
                        <form className='form' onSubmit={(e) => {
                                getDataSimpleIteration(f, psi, x, epsilon, setData, setPlot, data)
                                e.preventDefault()
                                setMethod("")
                                }}>
                            <label for="f">f(x): </label>
                            <input className="textinput" type="text" placeholder="x**3 - 2*x + 1" name="f" id="f" onChange={(e) => setF(e.target.value)} required/>
                            <label for="psi">Ψ(x): </label>
                            <input className="textinput" type="text" placeholder="0.5" name="psi" id="psi" onChange={(e) => setPsi(e.target.value)} required/>
                            <label for="x">x0: </label>
                            <input className="textinput" type="text" placeholder="2" name="x" id="x" onChange={(e) => setX(e.target.value)} required/>
                            <label for="epsilon">epsilon: </label>
                            <input className="textinput" type="text" placeholder="1e-7" name="epsilon" id="epsilon" onChange={(e) => setEpsilon(e.target.value)} required/>
                            <button className="button submit" type="submit">Submit</button>
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