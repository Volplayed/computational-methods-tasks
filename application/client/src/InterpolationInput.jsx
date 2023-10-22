import { useState } from 'react';
import { TableInput } from './TableInput';

function getDataLagrange(A, x0, setData, setPlot) {
    //get x and y
    let x = []
    let y = []
    for (let i = 0; i < A.length; i++) {
        x.push(A[i][0])
        y.push(A[i][1])
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

    fetch('http://localhost:5000/lagrange-method-plot/?x=' + x + '&y=' + y)
    .then(res=> res.text())
    .then(data=>{
        setPlot(data)
    })
      .catch(err => console.log(err))
}

export function InterpolationInputForm({data, setData, setPlot, method, setMethod}) {
    const [A, setA] = useState([[0, 0], [0, 0]]);
    const [x0, setX0] = useState(0);
    const [c, setC] = useState(2);

    if (method === "Lagrange") {
        return (
            <>
                <div className='InterpolationInput'>

                    <form className='form' onSubmit={(e) => {
                        getDataLagrange(A, x0, setData, setPlot)
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