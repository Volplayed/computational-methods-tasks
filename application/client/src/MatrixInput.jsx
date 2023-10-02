export function MatrixInput ({A, setA, size}) {

    //create matrix of size size
    const createMatrix = (size) => {
        let matrix = []
        for (let i = 0; i < size; i++) {
            matrix.push([])
            for (let j = 0; j < size; j++) {
                matrix[i].push(0)
            }
        }
        return matrix
    }
    if (A.length !== size) {
        setA(createMatrix(size))
    }

    //handle change in matrix
    const handleAChange = (e) => {
        let value = e.target.value
        let row = e.target.dataset.row
        let col = e.target.dataset.col
        let newA = A
        newA[row][col] = value
        setA([...newA])
    }
    
    return (
        <div className="matrix-input">
            <table>
                <tbody>
                    {A.map((row, i) => {
                        return (
                            <tr key={i}>
                                {row.map((col, j) => {
                                    return (
                                        <td key={j}>
                                            <input className="input matrix-element" type="text" value={col} data-row={i} data-col={j} onChange={handleAChange}/>
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

export function VectorInput ({B, setB, size}) {
    const createVector= (size) => {
        let vector = []
        for (let i = 0; i < size; i++) {
            vector.push(0)
        }
        return vector
    }
    if (B.length !== size) {
        setB(createVector(size))
    }

    
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
                                <td key={i}>
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