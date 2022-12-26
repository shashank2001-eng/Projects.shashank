import { useState } from 'react';
import { Viewer} from '@react-pdf-viewer/core';
import {Worker} from '@react-pdf-viewer/core'
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import '@react-pdf-viewer/core/lib/styles/index.css'
import "./App.css";


function App() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const[pdfFile,setPdfFile] = useState(null)
  const[pdferror,setPdferror] = useState('')
  const allowerfiles =['application/pdf']

  const handleFile =(e)=>{    //Handlefile function 
let selectedfile=e.target.files[0]

if(selectedfile){
  if(selectedfile&&allowerfiles.includes(selectedfile.type)){
    let reader=new FileReader()
    reader.readAsDataURL(selectedfile)
    reader.onloadend=(e)=>{
      setPdferror("")
      setPdfFile(e.target.result)
    }
  }
    else{
      setPdferror("Not a Valid PDF please select a Valid PDF")
      setPdfFile("")
  }
}
else{
  console.log("please select a PDF File")
}
}
  return (
  <div className='container'>
    <form>
      <label>
        <a className='Site'href='https://archive.org/details/cdl'><h4>Click to Visit site</h4></a>  
        <h5 className='hr-ec'>
          Upload Pdf files
        </h5></label>
        <br></br>
        <input  type="file" className="form-control" onChange={handleFile}></input> 
    </form>
    <br></br>
    
    <h5 className='hr-ef'>PDF Reader
    </h5>
    <div className="viewer">
      {pdfFile &&
        (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js">   
          <Viewer fileUrl={pdfFile} plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )
      }
    </div>
   
  </div>
  )
}


export default App;
