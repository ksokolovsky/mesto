
import { config } from "./constants.js"

// Включаем валидацию и навешиваем колбеки
function enableValidation() {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement);
})}

// Добавляем / убираем дизаблед на кнопке
function buttonChangeState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute('disabled', true);
    } else {
        buttonElement.removeAttribute('disabled');
}};

// Проверка полей с ошибкой
function hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  }

// Получение айди элемента с ошибкой
function getErrorElement(input) {
    return document.querySelector(`#${input.id}-error`);
}

// Включить красное
function showError(input) {
    const errorElement = getErrorElement(input);
    errorElement.textContent = input.validationMessage;
}

// Выключить красное
function hideError(input) {
    const errorElement = getErrorElement(input);
    errorElement.textContent = '';
}

function validateInput(input) {
    if (!input.validity.valid) {
        showError(input);
    } else {
        hideError(input);
    }
}

// Функция для раздачи ивентлистнеров всем желающим
function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const formButton = formElement.querySelector('.popup__save-button');
    
    buttonChangeState(inputList, formButton);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            validateInput(inputElement);
            buttonChangeState(inputList, formButton);
        })
    })
}

enableValidation(config);