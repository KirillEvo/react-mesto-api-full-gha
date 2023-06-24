import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeleteCardPopup(props) {

  return(
    <PopupWithForm buttonText={props.isLoading? 'Сохранение...' : 'Да'} onClose={props.onClose} isOpen={props.isOpen} name="delete" title="Вы уверены?"/>
  )
}

export default DeleteCardPopup;
