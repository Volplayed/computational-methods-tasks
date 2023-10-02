import { useState } from 'react';
import { MatrixInput, VectorInput } from './MatrixInput';

function getDataGauss(A, B, setData, data) {
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

export function SystemLinearInput({data, setData, method, setMethod}) {
    const [size, setSize] = useState(2);
    const [A, setA] = useState([[0, 0], [0, 0]]);
    const [B, setB] = useState([0, 0]);

    if (method === "Gauss") {
        return (
            <>
                <div className='SystemLinearInput'>

                    <form className='form' onSubmit={(e) => {
                        getDataGauss(A, B, setData, data)
                        e.preventDefault()
                        setMethod("")
                        }}> 
                        <div className='matrix__container'>
                            <MatrixInput size={size} A={A} setA={setA} />
                            <p className='equals-text'> = </p>
                            <VectorInput size={size} B={B} setB={setB} />
                        </div>
                        <div className='options__container'>
                            <label for="size">Size: </label>
                            <input className="sizeinput numinput" type="number" value={size} min={2} 
                            placeholder="2" name="size" id="size" 
                            onChange={(e) => setSize(e.target.value)} required/>
                            
                        </div>
                        <button className="button submit" type="submit">Submit</button>

                    </form>

                </div>    
            </>
        )
    }
    else if (method === "Least Squeres") {
        return (
            <></>
        )
    }
}