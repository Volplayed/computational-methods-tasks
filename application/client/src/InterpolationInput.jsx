import { useState } from 'react';
import { TableInput } from './TableInput';

function getDataLagrange(A, x0, setData, setPlot) {
    //get x and y
    let x = []
    let y = []
    for (let i = 0; i < A[0].length; i++) {
        x.push(A[0][i])
        y.push(A[1][i])
    }
    //format x and y
    let x_string = ""
    let y_string = ""
    for (let i = 0; i < x.length; i++) {
        if (i !== x.length - 1) {
            x_string += x[i] + ","
            y_string += y[i] + ","
        }
        else {
            x_string += x[i]
            y_string += y[i]
        }
    }

    fetch('http://localhost:5000/lagrange-method/?x=' + x_string + '&y=' + y_string + '&x0=' + x0)
    .then(res => res.json()).then(data => {
        setData(data)
        if (data.x_list){
            getPlotLagrange(data.x_list, data.y_list, setPlot)
          }}).catch(err => console.log(err))
    
}

function getPlotLagrange(x, y, setPlot) {
    //format x and y
    let x_string = ""
    let y_string = ""
    for (let i = 0; i < x.length; i++) {
        if (i !== x.length - 1) {
            x_string += x[i] + ","
            y_string += y[i] + ","
        }
        else {
            x_string += x[i]
            y_string += y[i]
        }
    }

    fetch('http://localhost:5000/lagrange-method-plot/?x=' + x_string + '&y=' + y_string)
    .then(res=> res.text())
    .then(data=>{
        setPlot(data)
    })
      .catch(err => console.log(err))
}

function getDataNewtonInterpolation(A, x0, setData, setPlot) {
    //get x and y
    let x = []
    let y = []
    for (let i = 0; i < A[0].length; i++) {
        x.push(A[0][i])
        y.push(A[1][i])
    }
    //format x and y
    let x_string = ""
    let y_string = ""
    for (let i = 0; i < x.length; i++) {
        if (i !== x.length - 1) {
            x_string += x[i] + ","
            y_string += y[i] + ","
        }
        else {
            x_string += x[i]
            y_string += y[i]
        }
    }

    fetch('http://localhost:5000/newton-interpolation-method/?x=' + x_string + '&y=' + y_string + '&x0=' + x0)
    .then(res => res.json()).then(data => {
        setData(data)
        if (data.x_list){
            getPlotNewtonInterpolation(data.x_list, data.y_list, setPlot)
          }}).catch(err => console.log(err))
    
}

function getPlotNewtonInterpolation(x, y, setPlot) {
    //format x and y
    let x_string = ""
    let y_string = ""
    for (let i = 0; i < x.length; i++) {
        if (i !== x.length - 1) {
            x_string += x[i] + ","
            y_string += y[i] + ","
        }
        else {
            x_string += x[i]
            y_string += y[i]
        }
    }

    fetch('http://localhost:5000/newton-interpolation-method-plot/?x=' + x_string + '&y=' + y_string)
    .then(res=> res.text())
    .then(data=>{
        setPlot(data)
    })
      .catch(err => console.log(err))
}

export function InterpolationInputForm({data, setData, setPlot, method, setMethod}) {
    const [A, setA] = useState([[0, 1], [0, 1]]);
    const [x0, setX0] = useState(0);
    const [c, setC] = useState(2);

    if (method === "Lagrange" || method === "Newton Interpolation") {
        return (
            <>
                <div className='InterpolationInput'>

                    <form className='form' onSubmit={(e) => {
                        if (method === "Lagrange") getDataLagrange(A, x0, setData, setPlot)
                        else if (method === "Newton Interpolation") getDataNewtonInterpolation(A, x0, setData, setPlot)
                        e.preventDefault()
                        setMethod("")
                        }}> 
                        <div className='table_container'>
                            <TableInput A={A} setA={setA} c={c}/>
                        </div>
                        <div className='options__container'>
                            <label for="size">Size: </label>
                            <input className="sizeinput numinput" type="number" value={c} min={2} 
                            placeholder="2" name="size" id="size" 
                            onChange={(e) => setC(e.target.value)} required/>
                            <label for="x0">x0: </label>
                            <input className="x0input numinput" type="text" value={x0} onChange={(e) => setX0(e.target.value)} required/>
                            
                        </div>
                        <button className="button submit" type="submit">Submit</button>

                    </form>

                </div>    
            </>
        )
    }
}