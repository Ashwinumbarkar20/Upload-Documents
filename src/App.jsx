import React, { useState, useRef, useEffect, Children } from "react";
import "./App.css";


export default function App() {
const[fileList,setFileList]=useState([])

const handlefilechange=(e)=>{
const files=e.target.files
console.log([...files])

  setFileList([...fileList,...files])

  }
const handleDelete=(filename)=>{
const updatedData=fileList.filter((file)=>file.name!==filename)
console.log("updatedData",updatedData)
setFileList(updatedData)
}

const handleOverDrag=(e)=>{

}

const handleDrop=(e)=>{
  e.preventDefault();

setFileList([...fileList,...e.dataTransfer.files])
}
  return (
   <>
<h1 style={{textAlign:"center",marginBottom:"20px"}}>React File Uploader</h1>

<div onDrop={handleDrop} onDragOver={(e)=>{e.preventDefault()}} className="MainDiv">
<div  className="UploadDiv" >
<h2 style={{color:"#aba9a9"}}>Drag and Drop file here</h2>
<div  ><label style={{fontWeight:"700",fontSize:"18px",cursor:"pointer"}} htmlFor="UploadDocument">Upload Document</label>
<input onChange={handlefilechange} style={{display:"none"}} type="file" multiple id="UploadDocument" />
</div>
</div>
</div>
<div className="ListofDocumentsUpload"><h3 style={{textAlign:"center"}}>List of Documents</h3>
<div>
{
  fileList.length>0 ? (<div className="Doclist">
{
  fileList.map((file,i)=>
  <div key={i} className="FileDetails">
  <img style={{width:"75px",height:"75px",border:"2px solid black",borderRadius:"5px"}}src={URL.createObjectURL(file)} alt={file.name} />
  <span>{file.name.substring(0,15)+"..."}</span>
  <span>{(file.size/1025).toFixed(2)}Kb</span>
  <span style={{padding:"2px",textAlign:"center",color:"white",cursor:"Pointer",background:"red",width:"20px",height:"20px",borderRadius:"5px"}} onClick={()=>handleDelete(file.name)}>{"X"}</span>

  </div>)
}

  </div>):"No Data"
}


</div>

</div>
   </>
  );
}
