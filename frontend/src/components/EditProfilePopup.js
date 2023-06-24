import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleAboutChange(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: about,
    });
  }

  useEffect(() => {
    if (props.isOpen) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      buttonText={props.isLoading ? "Сохранение..." : "Сохранить"}
      onClose={props.onClose}
      isOpen={props.isOpen}
      name="profile"
      title="Редактировать профиль"
    >
      <input
        id="name-input"
        minLength="2"
        maxLength="40"
        type="text"
        className="popup__input popup__input_text_title"
        placeholder="Имя"
        name="name"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        id="description-input"
        value={about || ""}
        onChange={handleAboutChange}
        minLength="2"
        maxLength="200"
        type="text"
        className="popup__input popup__input_text_description"
        placeholder="О себе"
        name="about"
        required
      />
      <span className="popup__input-error description-input-error"></span>
    </PopupWithForm>
  );
}
export default EditProfilePopup;
