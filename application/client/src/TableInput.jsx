import { useEffect } from "react"


export function TableInput({A, setA, c}){
    const createTable= (c) => {
        let table = [[], []]
        for (let i = 0; i < c; i++) {
            table[0].push(i)
            table[1].push(i)
        }
        return table
    }

    const handleAChange = (e) => {
        let newA = [...A]
        newA[e.target.dataset.row][e.target.dataset.col] = e.target.value
        setA(newA)
    }

    useEffect(() => {setA(createTable(c))}, [c])

    return (
        <div className="table-input">
            <table>
                <tbody>
                    {A.map((row, i) => {
                        return (
                            <tr className="table-row" key={i}>
                                {(i === 0) ? (<p className="text">X:</p>) : (<p className="text">Y:</p>)}
                                {row.map((col, j) => {
                                    return (
                                        <td className="table-cell"key={j}>
                                            <input className="table-element input " type="text" placeholder="1" data-row={i} data-col={j} onChange={handleAChange} required/>
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