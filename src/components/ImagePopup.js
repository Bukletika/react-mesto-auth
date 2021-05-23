import React from 'react';
import closePopup from '../images/close.svg';

function ImagePopup(props) {

    const className = `switch ${props.card.selectedCard  ? 'popup_opened' : ''}`;

    return (
      <div className={`popup popup_type_image ${className}`} onClick={props.onClose}>
        <div className="popup__container popup__container_width_full" onClick={(evt)=> {evt.stopPropagation()}}>
          <button className="popup__close" type="button" onClick={props.onClose}><img className="popup__close-img" src={closePopup} alt="Закрыть окно" /></button>
          <figure className="popup__figure">
            <img className="popup__image" src={props.card.link} alt={props.card.name} />
            <figcaption className="popup__figcaption">{props.card.name}</figcaption>
          </figure>
        </div>
      </div>
    );
  }

export default ImagePopup;
