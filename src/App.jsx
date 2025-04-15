import React, { useState, useRef, useEffect, Children } from "react";
import "./App.css";


export default function App() {
const[fileList,setFileList]=useState([])
const handlefilechange=(e)=>{
const files=e.target.files
console.log([...files])

  setFileList(files)

  }


  return (
   <>
<h1 style={{textAlign:"center",marginBottom:"20px"}}>React File Uploader</h1>

<div className="MainDiv">
<div className="UploadDiv">
<h2 style={{color:"#aba9a9"}}>Drag and Drop file here</h2>
<div><label style={{fontWeight:"700",fontSize:"18px",cursor:"pointer"}} htmlFor="UploadDocument">Upload Document</label>
<input onChange={handlefilechange} style={{display:"none"}} type="file" multiple id="UploadDocument" /></div>
</div>

</div>
<div className="ListofDocumentsUpload"><h3 style={{textAlign:"center"}}>List of Documents</h3>
<div>
{
  fileList.length>0 ? (<>
{
  fileList.map((file)=><>
  <img src={URL.createObjectURL(file)} alt={file.name} />
  <span>{file.name}</span>
  <span>{file.size/1025}Kb</span>
  <span>{file.name}</span>

  </>)
}

  </>):"No Data"
}


</div>

</div>
   </>
  );
}
