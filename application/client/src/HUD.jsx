export const HUD = ({state, onClick}) => {

    const methods = ["Newtons", "Konashuk", "Simple Iteration"]
    return (

        <div className="HUD">
            <div className="HUD__container">
                {methods.map((method, i) => {
                    return (
                        <div key={i} className="HUD__item">
                            <button className={(state === method) ? "HUD__button active" : "HUD__button"} onClick={() => onClick(method)}>{method}</button>
                        </div>    
                    )
                })}
            </div>    
        </div>    

    )

}