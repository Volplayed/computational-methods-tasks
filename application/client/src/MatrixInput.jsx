import { useEffect } from "react"

export function MatrixInput ({A, setA, r, c=undefined}) {

    //create matrix of size r x r or  r x c
    const createMatrix = (r, c) => {
        let matrix = []
        if (c) {
            for (let i = 0; i < r; i++) {
                matrix.push([])
                for (let j = 0; j < c; j++) {
                    matrix[i].push(0)
                }
            }
        }
        else {
            for (let i = 0; i < r; i++) {
                matrix.push([])
                for (let j = 0; j < r; j++) {
                    matrix[i].push(0)
                }
            }
        }
        return matrix
    }
    useEffect(() => {setA(createMatrix(r, c))}, [r, c])

    //handle change in matrix
    const handleAChange = (e) => {
        let value = e.target.value
        let row = e.target.dataset.row
        let col = e.target.dataset.col
        let newA = A
        newA[row][col] = value
        setA([...newA])
    }
    if (c) {
        return (
            <div className="matrix-input">
                <table>
                    <tbody>
                        {A.map((row, i) => {
                            return (
                                <tr className="matrix-row" key={i}>
                                    {row.map((col, j) => {
                                        return (
                                            <td className="matrix-cell"key={j}>
                                                <input className="matrix-element input " type="text" placeholder="1" data-row={i} data-col={j} onChange={handleAChange} required/>
                                                <p className="vector-element matrix-element matrix-text">x<sub>{j+1}</sub></p>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
    else {
        return (
            <div className="matrix-input">
                <table>
                    <tbody>
                        {A.map((row, i) => {
                            return (
                                <tr className="matrix-row" key={i}>
                                    {row.map((col, j) => {
                                        return (
                                            <td className="matrix-cell"key={j}>
                                                <input className="matrix-element input " type="text" placeholder="1" data-row={i} data-col={j} onChange={handleAChange} required/>
                                                <p className="vector-element matrix-element matrix-text">x<sub>{j+1}</sub></p>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
}

export function VectorInput ({B, setB, r}) {
    const createVector= (r) => {
        let vector = []
        for (let i = 0; i < r; i++) {
            vector.push(0)
        }
        return vector
    }
    
    useEffect(() => {setB(createVector(r))}, [r])
    
    //handle change in vector
    const handleBChange = (e) => {
        let value = e.target.value
        let index = e.target.dataset.index
        let newB = B
        newB[index] = value
        setB([...newB])
    }
    
    return (
        <div className="vector-input">
            <table>
                <tbody>
                    <tr>
                        {B.map((col, i) => {
                            return (
                                <td className="vector-col" key={i}>
                                    <input className="input vector-element matrix-element" type="text" value={col} data-index={i} onChange={handleBChange}/>
                                    
                                </td>
                            )
                        })}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}