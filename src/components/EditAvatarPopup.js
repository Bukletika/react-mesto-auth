import React from 'react';
import PopupWithForm from './PopupWithForm';
function EditAvatarPopup(props) {

  const inputData = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: inputData.current.value,
    });
    inputData.current.value = '';
  }


  return (
    <PopupWithForm
        title="Обновить аватар"
        name="profile-img"
        children={
          <fieldset className="form__author-img">
            <input className="form__item popup__input form__item_el_avatar-link" ref={inputData} id="avatar-link" name="avatar" type="url" placeholder="Ссылка на картинку" required />
            <span id="avatar-link-error" className="popup__error"></span>
          </fieldset>
        }
        isSubmitted={props.isSubmitted}
        submitBtnText="Сохранить"
        submitBtnLoadText="Сохранение"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      />
  );
}

export default EditAvatarPopup;
