import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import api from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {CurrentCardsContext} from '../contexts/CurrentCardsContext';

function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] =  React.useState({});
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardDelete(id) {
    api.deleteCard(id)
    .then(() => {
      setCards((cards) => cards.filter(card => card._id !== id));
    })
    .catch((err) => {
      console.log(`Ошибка удаления карточки: ${err}`)
    })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) => console.log(err));
  }

  function handleUpdateUser(data) {
    setIsSubmitted(true);
    api.editProfile(data).then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsSubmitted(false);
    })
  }

  function handleUpdateAvatar(data) {
    setIsSubmitted(true);
    api.editProfileAvatar(data).then((result) => {
      setCurrentUser(result);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsSubmitted(false);
    })
  }

  function handleAddPlaceSubmit(data) {
    setIsSubmitted(true);
    api.addCard(data).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      setIsSubmitted(false);
    })
  }

  React.useEffect(() => {
    Promise.all([api.getInitialProfile(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
      setCurrentUser(userData);
      setCards(cardsData);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`)
    })

  }, []);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
      <div className="page__container">
        <Header />
        <CurrentCardsContext.Provider value={cards}>
          <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardDelete={handleCardDelete}
          handleCardClick={handleCardClick}
          handleCardLike={handleCardLike}
          />
        </CurrentCardsContext.Provider>
        <Footer />
      </div>

      <PopupWithForm
       title="Вы уверены?"
       name="submit"
       children={
        <button className="form__button popup__button" type="submit">Да</button>
       }
       submitBtnText="Да"
      />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isSubmitted={isSubmitted}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isSubmitted={isSubmitted}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isSubmitted={isSubmitted}/>

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups}
      />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
