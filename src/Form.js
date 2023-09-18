import { Link } from "react-router-dom";
import { useState } from "react";

function Register({ }) {
  const [height, setHeight] = useState("");
  const [radius, setRadius] = useState("");
  const [segments, setSegments] = useState("");

  function handleHeightChange(e) {
    setHeight(e.target.value);
  }

  function handleRadiusChange(e) {
    setRadius(e.target.value);
  }

  function handleSegmentsChange(e) {
    setSegments(e.target.value);
  }


  function handleSubmit(evt) {
    evt.preventDefault();
    // handleRegister(userEmail, userPassword);
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
          minLength="6"
          maxLength="40"
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
          minLength="6"
          maxLength="40"
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
          minLength="6"
          maxLength="40"
          required
        />
        <span className="span subtitle-input-error"></span>
        <button
          type="submit"
          className="login__button-save"
        >
          Задизайнить
        </button>
      </form>
    </div>
  );
}

export default Register;
