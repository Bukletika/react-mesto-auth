import React from 'react';
import api from '../utils/api';
import Card from './Card';

function Main(props) {

    const handleCardClick = props.handleCardClick;
    const [userAvatar, setUserAvatar] = React.useState();
    const [userDescription, setUserDescription] = React.useState();
    const [userName, setUserName] = React.useState();
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
      Promise.all([api.getInitialProfile(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setUserAvatar(userData.avatar);
        setUserName(userData.name);
        setUserDescription(userData.about);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`)
      })

    }, []);

    return (
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <img className="profile__img" src={userAvatar} alt="Аватар пользователя" />
            <button className="profile__button" onClick={props.onEditAvatar}></button>
          </div>
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <p className="profile__subtitle">{userDescription}</p>
            <button className="profile__edit-button" id="profile-edit" type="button" title="Редактировать профиль" onClick={props.onEditProfile}></button>
          </div>
          <button className="profile__add-button" id="card-add" type="button" title="Добавить карточку" onClick={props.onAddPlace}></button>
        </section>

        <section className="elements">
          <ul className="elements__list">
            {
              cards.map((props)=> {
                return(
                  <Card
                  key={props._id}
                  card={props}
                  onCardClick={handleCardClick}
                  />
                )
              })
            }
          </ul>
        </section>

      </main>
    );
  }

export default Main;


