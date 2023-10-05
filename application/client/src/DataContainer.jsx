function TextData ({data}) {
  if (data.method === 'Newtons' || data.method === "Konashuk" || data.method === "Simple Iteration") {
    return (
    <>
      <p className="text result-text"><b>Method</b>: {data.method}</p>
      <p className="text result-text"><b>Function</b>: {data.func}</p>
      <p className="text result-text"><b>Approximated root</b>: {data.x_approx}</p>

    </>
    )
  }
  else if (data.method === 'Gauss' || data.method === "Least Squeres") {

    var X_string = ""
    for (let i = 0; i < data.x_list.length; i++) {
      X_string += "x" + i + "=" + data.x_list[i] + (i !== data.x_list.length - 1 ? "," : "")

    }

    return (
    <>
      <p className="text result-text"><b>Method</b>: {data.method}</p>
      <p className="text result-text"><b>Vector X</b>: {X_string}</p>
    </>
    )

  }
  else if (data.method === 'error') {
    return (<>
      <div className="text error-text"><b>Error</b>: {data.error}</div>
    </>)
  }
}

function Plot ({data, plot}) {
  if (data.method === 'Newtons' || data.method === 'Konashuk' || data.method === 'Simple Iteration') {
    return (
    <div className='plot_container' id="svgContainer">
      {plot && <div dangerouslySetInnerHTML={{ __html: plot }} className='plot' id="svgImage"/>}
      
    </div>
    )
  }
  else {
    return (<></>)
  }
}

export function DataContainer ({data, plot}) {
    return (
        <div className="data_container">
          <div className='text-data'>
          {<TextData data={data}/>}
          </div> 
          {<Plot data={data} plot={plot}/>}
        </div>
    )
}