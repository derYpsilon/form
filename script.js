'use strict';

class FormValidator {
  constructor(formName, submitButton, disabledSubmitClass) {
    this.formName = formName;
    this.submitButton = submitButton;
    this.disabledSubmitClass = disabledSubmitClass;
    document.forms[this.formName].addEventListener('input',this.inputHandler.bind(this));
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
    const errorElement = document.querySelector(`#error-${elementToCheck.name}`)

    if (!elementToCheck.validity.valid) {

      if (elementToCheck.validity.typeMismatch) { errorElement.textContent = 'Здесь должна быть ссылка'; }
      if (elementToCheck.value.length < Number(elementToCheck.getAttribute('minlength'))) {
        if (elementToCheck.validity.valueMissing) { errorElement.textContent = 'Это обязательное поле'; }
        else { errorElement.textContent = 'Длина должна быть от 2 до 30 символов'; }
      }
      return false;
    } else {
      errorElement.textContent = '';
      return true;
    }
  }

  submitForm(event) {
    event.preventDefault();
    const formData=[];
    let form = document.forms[this.formName];
    Array.from(form.elements).forEach(function (item) {
      if (item.nodeName == 'INPUT') {
        formData[item.name] = item.value;
      }
    }.bind(this));
    //this.saveMe(this.formData);
  }

  destroyForm() {
    Array.from(form.elements).forEach(function (item) {
      if (item.nodeName == 'INPUT') {
        item.removeEventListener('input', event => this.inputHandler(event));
      }
    }.bind(this));
    form.removeEventListener('submit', event => this.submitForm(event));
  }
}

const validator = new FormValidator('register',document.querySelector('.form__button'), 'form__button_disabled');

