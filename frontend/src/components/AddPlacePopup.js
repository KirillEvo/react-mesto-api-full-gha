import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [inputName, setInputName] = useState("");
  const [inputLink, setInputLink] = useState("");

  function handleNameChange(e) {
    setInputName(e.target.value);
  }

  function handleLinkChange(e) {
    setInputLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlacePopup({
      name: inputName,
      link: inputLink,
    });
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? "Сохранение..." : "Создать"}
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="card"
      title="Новое место"
    >
      <input
        onChange={handleNameChange}
        id="mesto-input"
        minLength="2"
        maxLength="30"
        type="text"
        className="popup__input popup__input_text_title"
        placeholder="Название"
        name="name"
        value={inputName}
        required
      />
      <span className="popup__input-error mesto-input-error"></span>
      <input
        onChange={handleLinkChange}
        id="url-input"
        type="url"
        className="popup__input popup__input_link"
        placeholder="Ссылка на картинку"
        name="link"
        value={inputLink}
        required
      />
      <span className="popup__input-error url-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
