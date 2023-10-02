function TextData ({data}) {
  if (data.method === 'Newtons' || data.method === "Konashuk" || data.method === "Simple Iteration") {
    return (
    <>
      <p className="text result-text">Method: {data.method}</p>
      <p className="text result-text">Function: {data.func}</p>
      <p className="text result-text">Approximated root: {data.x_approx}</p>

    </>
    )
  }
  else {
    return (<></>)
  }
}

function Plot ({data, plot}) {
  if (data.method === 'Newtons' || data.method === 'Konashuk' || data.method === 'Simple Iteration') {
    return (
    <>
      {plot && <div dangerouslySetInnerHTML={{ __html: plot }} className='plot' />}
      
    </>
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
          <div className='plot_container'>
          {<Plot data={data} plot={plot}/>}
            
          </div>
        </div>
    )
}