import React from 'react';
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App() {

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups(targetPopup) {
   targetPopup(false);
   setSelectedCard(false);
  }

  function handleCardClick(card) {
    setSelectedCard({selectedCard: !selectedCard, link: card.link, name: card.name});
  }

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] =  React.useState(false);

  // В задании написано, что popup должен закрываться по клику на крестик. На всякий случай написал функцию еще и по esc
  React.useEffect(() => {

    function handleEscClose (evt) {
      if(evt.key === 'Escape'){
        if(isEditProfilePopupOpen) {
          setIsEditProfilePopupOpen(false);
        }else if(isEditAvatarPopupOpen) {
          setIsEditAvatarPopupOpen(false);
        }else if(isAddPlacePopupOpen) {
          setIsAddPlacePopupOpen(false);
        }else if(selectedCard) {
          setSelectedCard(false)
        }
      }
    }

    // Нужно вешать слушатель, только при открытии popup
    if(isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard) {
      document.addEventListener('keydown', handleEscClose);
    }

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      console.log(isEditAvatarPopupOpen)
    };

  }, [isEditAvatarPopupOpen, isEditProfilePopupOpen, isAddPlacePopupOpen, selectedCard]);


  return (
    <>
      <div className="page__container">
        <Header />
        <Main
         onEditProfile={handleEditProfileClick}
         onAddPlace={handleAddPlaceClick}
         onEditAvatar={handleEditAvatarClick}
         handleCardClick={handleCardClick}
        />
        <Footer />
      </div>

      <PopupWithForm
       title="Вы уверены?"
       name="submit"
       children={
        <button className="popup__button popup__button_type_submit" type="submit">Да</button>
       }
      />

      <PopupWithForm
        title="Редактировать профиль"
        name="profile"
        children={
          <>
          <fieldset className="form__author">
            <input className="form__item popup__input form__item_el_name" id="profile-name" name="name" type="text" placeholder="Имя" minLength="2"  maxLength="40" required />
            <span id="profile-name-error" className="popup__error">Вы пропустили это поле</span>
            <input className="form__item popup__input form__item_el_about" id="profile-about" name="about" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
            <span id="profile-about-error" className="popup__error"></span>
          </fieldset>
          <button className="form__button popup__button" type="submit">Сохранить</button>
          </>
        }
        isOpen={isEditProfilePopupOpen}
        onClose={() => {closeAllPopups(setIsEditProfilePopupOpen)}}
      />

      <PopupWithForm
        title="Обновить аватар"
        name="profile-img"
        children={
          <>
          <fieldset className="form__author-img">
            <input className="form__item popup__input form__item_el_avatar-link" id="avatar-link" name="avatar" type="url" placeholder="Ссылка на картинку" required />
            <span id="avatar-link-error" className="popup__error"></span>
          </fieldset>
          <button className="form__button popup__button" type="submit">Сохранить</button>
          </>
        }
        isOpen={isEditAvatarPopupOpen}
        onClose={() => {closeAllPopups(setIsEditAvatarPopupOpen)}}
      />

      <PopupWithForm
        title="Новое место"
        name="card"
        children={
          <>
          <fieldset className="form__card">
            <input className="form__item popup__input form__item_el_title" id="card-title" name="name" type="text" placeholder="Название" minLength="2" maxLength="30" required />
            <span id="card-title-error" className="popup__error"></span>
            <input className="form__item popup__input form__item_el_link" id="card-link" name="link" type="url" placeholder="Ссылка на картинку" required />
            <span id="card-link-error" className="popup__error"></span>
          </fieldset>
          <button className="form__button popup__button" type="submit">Создать</button>
          </>
        }
        isOpen={isAddPlacePopupOpen}
        onClose={() => {closeAllPopups(setIsAddPlacePopupOpen)}}
      />

      <ImagePopup
        card={selectedCard}
        onClose={() => {closeAllPopups(setSelectedCard)}}
      />

    </>
  );
}

export default App;
