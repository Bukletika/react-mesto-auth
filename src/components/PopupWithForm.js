import React from 'react';
import closePopup from '../images/close.svg';

function PopupWithForm(props) {

    const className = `switch ${props.isOpen  ? 'popup_opened' : ''}`;

    return (
      <div className={`popup popup_type_${props.name} ${className}`} onClick={props.onClose}>
        <div className="popup__container" onClick={(evt)=> {evt.stopPropagation()}}>
            <button className="popup__close" type="button" onClick={props.onClose}><img className="popup__close-img" src={closePopup} alt="Закрыть окно" /></button>
            <form className={`form form-${props.name} popup__form`} name={`edit-${props.name}`} noValidate>
            <h2 className="form__heading">{props.title}</h2>
            {props.children}
          </form>
        </div>
      </div>
    );
  }

export default PopupWithForm;
