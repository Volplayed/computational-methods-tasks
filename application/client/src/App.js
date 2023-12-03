
import './App.css';
import { useState, useEffect } from 'react';
import {HUD} from './HUD'
import { IterationInputForm } from './IterationInputForm';
import { DataContainer } from './DataContainer';
import { SystemLinearInput } from './SystemLinearInput';
import { InterpolationInputForm } from './InterpolationInput'
import { IntergrationInputForm } from './IntegrationInput';

function App() {

  const [method, setMethod] = useState('newtons-method')

  const [data, setData] = useState([])
  const [plot, setPlot] = useState('')

  useEffect(() => {
    if (plot !== '') {
      const svgImage = document.getElementById("svgImage").firstElementChild;
      const svgContainer = document.getElementById("svgContainer");
    
      var viewBox = {x:0,y:0,w:svgImage.clientWidth/1.3,h:svgImage.clientHeight/1.3};
      svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
      const svgSize = {w:svgImage.clientWidth,h:svgImage.clientHeight};
      var isPanning = false;
      var startPoint = {x:0,y:0};
      var endPoint = {x:0,y:0};;
      var scale = 1;
    
      svgContainer.onmousewheel = function(e) {
        e.preventDefault();
        var w = viewBox.w;
        var h = viewBox.h;
        var mx = e.offsetX;//mouse x  
        var my = e.offsetY;    
        var dw = w*Math.sign(e.deltaY)*0.05;
        var dh = h*Math.sign(e.deltaY)*0.05;
        var dx = dw*mx/svgSize.w;
        var dy = dh*my/svgSize.h;
        viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w-dw,h:viewBox.h-dh};
        scale = svgSize.w/viewBox.w;
        svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
      }
    
    
      svgContainer.onmousedown = function(e){
        isPanning = true;
        startPoint = {x:e.x,y:e.y};   
      }
    
      svgContainer.onmousemove = function(e){
        if (isPanning){
        endPoint = {x:e.x,y:e.y};
        var dx = (startPoint.x - endPoint.x)/scale;
        var dy = (startPoint.y - endPoint.y)/scale;
        var movedViewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
        svgImage.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
        }
      }
    
      svgContainer.onmouseup = function(e){
        if (isPanning){ 
        endPoint = {x:e.x,y:e.y};
        var dx = (startPoint.x - endPoint.x)/scale;
        var dy = (startPoint.y - endPoint.y)/scale;
        viewBox = {x:viewBox.x+dx,y:viewBox.y+dy,w:viewBox.w,h:viewBox.h};
        svgImage.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        isPanning = false;
        }
      }
    
      svgContainer.onmouseleave = function(e){
      isPanning = false;
      }
    
    }  
  }, [plot])
 
  return (
    <div className="App">

      <div className='container'>
        <HUD onClick={(x) => {setMethod(x)
        setData([])
        setPlot('')}
        } state={method} />
        {<div className='form-container'>
          {(method === 'Newtons' || method === "Konashuk" || method === "Simple Iteration") ? (
            <IterationInputForm data={data} setPlot={setPlot} setData={setData} method={method} setMethod={setMethod} />) : (<></>)
          }
          {(method === 'Gauss' || method === 'Least Squeres') ? (
            <SystemLinearInput data={data} setData={setData} method={method} setMethod={setMethod} />) : (<></>)
          }
          {(method === 'Lagrange' || method === 'Newton Interpolation') ? (
            <InterpolationInputForm data={data} setPlot={setPlot} setData={setData} method={method} setMethod={setMethod} />) : (<></>
          )

          }
          {(method === 'Numerical integration') ? (
            <IntergrationInputForm data={data} setPlot={setPlot} setData={setData} method={method} setMethod={setMethod} />) : (<></>
          )

          }
        </div>}  
          <DataContainer data={data} plot={plot} />
      </div>

    </div>   
  );
}


export default App;
