import './index.css';
import { useState } from "react";
import Visualisation from "./Visualisation";
import Form from "./Form";

function App() {

  const [height, setHeight] = useState("");
  const [radius, setRadius] = useState("");
  const [segments, setSegments] = useState("");

  const [isValid, setIsValid] = useState(false);

  function disableButton(heightValue, radiusValue, segmentsValue) {
    if (heightValue === '' || radiusValue === '' || segmentsValue === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }

  function handleHeightChange(e) {
    setHeight(e.target.value);
    disableButton( e.target.value, radius, segments);
  }

  function handleRadiusChange(e) {
    setRadius(e.target.value);
    disableButton(height,  e.target.value, segments);
  }

  function handleSegmentsChange(e) {
    setSegments(e.target.value);
    disableButton(height, radius, e.target.value);
  }
  
  return (
    <div>
      <Visualisation height={height} radius={radius} segments={segments} />
      <Form handleHeightChange={handleHeightChange} handleRadiusChange={handleRadiusChange} handleSegmentsChange={handleSegmentsChange} isValid={isValid} height={height} radius={radius} segments={segments}/>
    </div>
  );
}

export default App;
