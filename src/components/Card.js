import React from 'react';

function Card({card, onCardClick}) {

  function handleClick() {
    onCardClick(card);
  }

    return (
      <li className="elements__item element">
        <button className="element__trash" aria-label="Удалить" title="Удалить"></button>
        <img className="element__image" src={card.link} onClick={handleClick} alt={card.name} />
        <div className="element__info">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__like-container">
            <button className="element__like" type="button" aria-label="Нравится" title="Нравится"></button>
            <p className="element__like-counter">{card.likes.length}</p>
          </div>
        </div>
      </li>
    );
  }

export default Card;
