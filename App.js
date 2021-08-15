import React, { useRef, useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as cocossd from "@tensorflow-models/coco-ssd";
import Webcam from "react-webcam";
import "./App.css";
import { drawRect } from "./utilities";
import 'reactjs-popup/dist/index.css';
import Card from './Card'; 
import Button from '@material-ui/core/Button';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const arr=["person","tv","fan","geyser","ac"]
  const[detected,setDetected]=useState(null);
  const [obj,setobj]=useState({
    objects: [
      {name:"fan",value:true},
      {name:"person",value:false},
      {name:"tv",value:true},
      {name:"ac",value:false},
     ]
  });
  const[toggle,settoggle]=useState(false);
  const runCoco = async () => {
    const net = await cocossd.load();
    !detected && setInterval(() => {
     detect(net);
    }, 10);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      const obj = await net.detect(video);
      obj && obj[0] && obj[0].class && setDetected(obj[0].class);
      const ctx = canvasRef.current.getContext("2d");
      drawRect(obj, ctx); 
    }
  };

  useEffect(()=>{
    detected==null && runCoco()
  },[]);
  console.log(toggle)

  const captureobject=()=>{
    var index=arr.indexOf(detected);
    if(index==-1)
    {
      alert("object not in the database.Please select a valid object");
    }else
    {
      alert(`${detected} is now been captured.You can use the control buttol to contol the object functionalities`);
    }
  }
  const tog=()=>{
    settoggle(false);
  }
  const update=(detected)=>
  {
    const elementsIndex = obj.objects.findIndex(element => element.name == detected )
    let newArray = [...obj.objects];
    newArray[elementsIndex] = {...newArray[elementsIndex], value: !newArray[elementsIndex].value}
    setobj(newArray);
  }
  console.log(detected);
  return (
    <div className="App">
      <header className="App-header">
        <Webcam
          ref={webcamRef}
          muted={true} 
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 8,
            width: 640,
            height: 480,
          }}
        />
        <Button style={{position:'absolute',bottom:'50px',left:'400px'}}
        variant="contained" color="secondary"
        onClick={()=>setDetected(null)}
        >Free Object</Button>
        <Button style={{position:'absolute',bottom:'50px',left:'600px'}}
        variant="contained" color="secondary"
        onClick={()=>settoggle(true)}
        >Object Control</Button>
        <Button style={{position:'absolute',bottom:'50px',left:'800px'}}
        variant="contained" color="secondary"
          onClick={captureobject}
        >Capture Object</Button>
      </header>
      <div style={{position:'absolute',bottom:'250px',left:'550px',zIndex:1000}}>
      {toggle && <Card tog={tog} obj={obj} detected={detected} update={update} />}
      </div>
    </div>
  );
}

export default App;
