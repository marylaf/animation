import './index.css';
import { useState } from "react";
import { useState } from "react";
import Visualisation from "./Visualisation";
import Form from "./Form";
import { api } from "./utils/Api";

function App() {

  const [height, setHeight] = useState("");
  const [radius, setRadius] = useState("");
  const [segments, setSegments] = useState("");
  const [triangulation, setTriangulation] = useState([]);

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
    disableButton(height, e.target.value, segments);
  }

  function handleSegmentsChange(e) {
    setSegments(e.target.value);
    disableButton(height, radius, e.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    const parsedHeight = parseInt(height, 10);
    const parsedRadius = parseInt(radius, 10);
    const parsedSegments = parseInt(segments, 10);
    
    api.editCone(parsedHeight, parsedRadius, parsedSegments)
      .then((data) => {
        console.log("DATA", data);
        setTriangulation(data.triangulation);
        console.log("Успешно");
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }
  
  return (
    <div>
      <Visualisation triangulation={triangulation} />
      <Form handleSubmit={handleSubmit} handleHeightChange={handleHeightChange} handleRadiusChange={handleRadiusChange} handleSegmentsChange={handleSegmentsChange} isValid={isValid} height={height} radius={radius} segments={segments}/>
    </div>
  );
}

export default App;
