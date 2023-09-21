import { useState } from "react";
import { api } from "./utils/Api";

function Register() {
  const [height, setHeight] = useState("");
  const [radius, setRadius] = useState("");
  const [segments, setSegments] = useState("");
  const [isValid, setIsValid] = useState(false);

  function handleHeightChange(e) {
    setHeight(e.target.value);
    disableButton(height, radius, e.target.value);
  }

  function handleRadiusChange(e) {
    setRadius(e.target.value);
    disableButton(height, radius, e.target.value);
  }

  function handleSegmentsChange(e) {
    setSegments(e.target.value);
    disableButton(height, radius, e.target.value);
  }
  
  function disableButton(heightValue, radiusValue, segmentsValue) {
    if (heightValue === '' || radiusValue === '' || segmentsValue === '') {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }


  function handleSubmit(evt) {
    evt.preventDefault();
    
    api.editCone(height, radius, segments)
      .then((res) => {
        console.log("Успешно");
      })
      .catch((error) => {
        console.error("Ошибка:", error);
      });
  }
  



  return (
    <div className="login">
      <p className="login__welcome">Сделай на свой вкус</p>
      <form
        id="login__form"
        onSubmit={handleSubmit}
        className="login__form"
        noValidate
      >
        <input
          value={height}
          onChange={handleHeightChange}
          type="text"
          className="login__info login__info_form_title"
          id="title-input"
          placeholder="Высота"
          minLength="1"
          maxLength="10"
          required
        />
        <span className="span title-input-error"></span>
        <input
          type="text"
          onChange={handleRadiusChange}
          value={radius}
          className="login__info login__info_form_subtitle"
          id="subtitle-input"
          placeholder="Радиус"
          minLength="1"
          maxLength="10"
          required
        />
        <span className="span subtitle-input-error"></span>
        <input
          type="text"
          onChange={handleSegmentsChange}
          value={segments}
          className="login__info login__info_form_subtitle"
          id="subtitle-input"
          placeholder="Кол-во сегментов"
          minLength="1"
          maxLength="10"
          required
        />
        <span className="span subtitle-input-error"></span>
        <button
          type="submit"
          disabled={!isValid}
          className={`login__button-save ${isValid ? '' : 'login__button-save_disabled'}`}
        >
          Задизайнить
        </button>
      </form>
    </div>
  );
}

export default Register;
