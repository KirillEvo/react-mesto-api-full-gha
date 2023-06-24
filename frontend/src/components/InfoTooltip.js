import React from "react";
import union from "../images/union.svg";
import error from "../images/error.svg";

function InfoTooltip(props) {
  return(
    <div className={`popup popup_${props.name} ${!props.isOpen ? '' : 'popup_opened'}`} aria-label="Модальное окно">
      <div className="popup__container">
          <button onClick={props.onClose} type="button" className="popup__close"/>
          <div className="popup__body-info">
          {props.isSuccess ? <img src={union} alt=""/> : <img src={error} alt=""/>}
          <h2 className="popup__info-title">{props.isSuccess ? `Вы успешно зарегистрировались!` : `Что-то пошло не так!
Попробуйте ещё раз.`}
          </h2>
          </div>
      </div>
    </div>
  )
}

export default InfoTooltip;
