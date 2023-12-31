import { useState } from 'react';
import { MatrixInput, VectorInput } from './MatrixInput';

function getDataGauss(A, B, setData) {
    //format A
    let A_string = ""
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (j !== A[0].length - 1) {
                A_string += A[i][j] + ","
            }
            else {
                A_string += A[i][j]
            }
            
        }
        if (i !== A.length - 1) {
            A_string += ";"
        }
    }
    //format B
    let B_string = ""
    for (let i = 0; i < B.length; i++) {
        if (i !== B.length - 1) {
            B_string += B[i] + ","
        }
        else {
            B_string += B[i]
        }
    }

    fetch('http://localhost:5000/gauss-method/?A=' + A_string + '&b=' + B_string)
    .then(res => res.json()).then(data => {
        setData(data)
    })
}

function getDataLeastSqueres(A, B, setData) {
    //format A
    let A_string = ""
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < A[0].length; j++) {
            if (j !== A[0].length - 1) {
                A_string += A[i][j] + ","
            }
            else {
                A_string += A[i][j]
            }
            
        }
        if (i !== A.length - 1) {
            A_string += ";"
        }
    }
    //format B
    let B_string = ""
    for (let i = 0; i < B.length; i++) {
        if (i !== B.length - 1) {
            B_string += B[i] + ","
        }
        else {
            B_string += B[i]
        }
    }

    fetch('http://localhost:5000/least-squeres-method/?A=' + A_string + '&b=' + B_string)
    .then(res => res.json()).then(data => {
        setData(data)
    })
}

export function SystemLinearInput({data, setData, method, setMethod}) {
    const [A, setA] = useState([[0, 0], [0, 0]]);
    const [B, setB] = useState([0, 0]);
    const [r, setR] = useState(2);
    const [c, setC] = useState(2);

    if (method === "Gauss") {
        return (
            <>
                <div className='SystemLinearInput'>

                    <form className='form' onSubmit={(e) => {
                        getDataGauss(A, B, setData)
                        e.preventDefault()
                        setMethod("")
                        }}> 
                        <div className='matrix__container'>
                            <MatrixInput r={r} A={A} setA={setA} />
                            <p className='equals-text'> = </p>
                            <VectorInput r={r} B={B} setB={setB} />
                        </div>
                        <div className='options__container'>
                            <label for="size">Size: </label>
                            <input className="sizeinput numinput" type="number" value={r} min={2} 
                            placeholder="2" name="size" id="size" 
                            onChange={(e) => setR(e.target.value)} required/>
                            
                        </div>
                        <button className="button submit" type="submit">Submit</button>

                    </form>

                </div>    
            </>
        )
    }
    else if (method === "Least Squeres") {
        return (
            <>
                <div className='SystemLinearInput'>

                    <form className='form' onSubmit={(e) => {
                        getDataLeastSqueres(A, B, setData)
                        e.preventDefault()
                        setMethod("")
                        }}> 
                        <div className='matrix__container'>
                            <MatrixInput r={r} c={c} A={A} setA={setA} />
                            <p className='equals-text'> = </p>
                            <VectorInput r={r} B={B} setB={setB} />
                        </div>
                        <div className='options__container'>
                            <label for="rows">Rows: </label>
                            <input className="sizeinput numinput" type="number" value={r} min={2} 
                            placeholder="2" name="rows" id="rows" 
                            onChange={(e) => setR(e.target.value)} required/>

                            <label for="cols">Cols: </label>
                            <input className="sizeinput numinput" type="number" value={c} min={2} max={r} 
                            placeholder="2" name="cols" id="cols" 
                            onChange={(e) => setC(e.target.value)} required/>
                            
                        </div>
                        <button className="button submit" type="submit">Submit</button>

                    </form>

                </div>   
            </>
        )
    }
}