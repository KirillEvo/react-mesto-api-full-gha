import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {
  const inputRef = useRef();
  // const [inputUrl, setInputUrl] = React.useState("");


  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

    return(
    <PopupWithForm onSubmit={handleSubmit} buttonText={props.isLoading? 'Сохранение...' : 'Сохранить'} onClose={props.onClose} isOpen={props.isOpen} name="avatar" title="Обновить аватар">
        <input ref={inputRef} id="url-avatar" type="url" className="popup__input popup__input_link" placeholder="Ссылка на картинку" name="avatar" required />
        <span className="popup__input-error url-avatar-error"></span>
    </PopupWithForm>
    )
}

export default EditProfilePopup;
