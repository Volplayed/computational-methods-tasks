import { useState } from 'react';
import { MatrixInput, VectorInput } from './MatrixInput';

export function SystemLinearInput({data, setData, method, setMethod}) {
    const [size, setSize] = useState(2);
    const [A, setA] = useState([[0, 0], [0, 0]]);
    const [B, setB] = useState([0, 0]);

    if (method === "Gauss") {
        return (
            <>
                <div className='SystemLinearInput'>

                    <form className='form' onSubmit={(e) => {
                        //getDataGauss(A, B, setData, data)
                        e.preventDefault()
                        setMethod("")
                        }}> 
                        <div className='matrix-input'>
                            <MatrixInput size={size} A={A} setA={setA} />
                            <p className='equals-text'> = </p>
                            <VectorInput size={size} B={B} setB={setB} />
                            <label for="size">Size: </label>
                            <input className="sizeinput numinput" type="number" value={size} min={2} 
                            max={12} placeholder="2" name="size" id="size" 
                            onChange={(e) => setSize(e.target.value)} required/>
                        </div>

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