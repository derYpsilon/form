'use strict';

class FormValidator {
  constructor(formName, submitButton, disabledSubmitClass) {
    this.formName = formName;
    this.submitButton = submitButton;
    this.disabledSubmitClass = disabledSubmitClass;
    document.forms[this.formName].addEventListener('input', this.inputHandler.bind(this));
    this.disableSubmitButton();
  }

  inputHandler() {
    let validator = true;
    let form = document.forms[this.formName];
    Array.from(form.elements).forEach(function (item) {
      if (item.nodeName == 'INPUT') {
        if (!this.isValid(item)) { validator = false; }
      }
    }.bind(this));
    if (validator) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    }
  }

  disableSubmitButton() {
    this.submitButton.setAttribute('disabled', true);
    this.submitButton.classList.add(this.disabledSubmitClass);
    console.log('disabled');
  }

  enableSubmitButton() {
    this.submitButton.removeAttribute('disabled', true);
    this.submitButton.classList.remove(this.disabledSubmitClass);
  }

  isValid(elementToCheck) {
    /*
    ! Получаем элемент для вывода сообщения об ошибке, в данном случае нет необходимости

    const errorElement = document.querySelector(`#error-${elementToCheck.name}`)
    */
    if (!elementToCheck.validity.valid) {
      /*
      ! Здесь при желании можно обрабатывать тип ошибок и выводить сообщения 
      
      if (elementToCheck.validity.typeMismatch) { errorElement.textContent = 'Здесь должна быть ссылка'; }
      if (elementToCheck.value.length < Number(elementToCheck.getAttribute('minlength'))) {
        if (elementToCheck.validity.valueMissing) { errorElement.textContent = 'Это обязательное поле'; }
        else { errorElement.textContent = 'Длина должна быть от 2 до 30 символов'; }
      }
      */
      return false;
    } else {
      /*
      ! Здесь убирается сообщение об ошибке, в данном случае оставляем этот функционал в HTML файле

      errorElement.textContent = '';
      */
      return true;
    }
  }

  cleanUp() {
    document.forms[this.formName].removeEventListener('input', this.inputHandler.bind(this));
  }
}

const validator = new FormValidator('register', document.querySelector('.form__button'), 'form__button_disabled');

