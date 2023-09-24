import React from 'react';

function Form({isValid, height, radius, segments, handleHeightChange, handleRadiusChange, handleSegmentsChange, handleSubmit}) {
  
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

export default Form;