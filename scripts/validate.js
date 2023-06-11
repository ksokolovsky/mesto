
import { config } from "./constants.js";
export { changeButtonState };

// Включаем валидацию и навешиваем колбеки
function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    formElement.addEventListener('reset', function () {
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        disableButton(buttonElement);
    });

    setEventListeners(formElement, config);
})}

// Добавляем / убираем дизаблед на кнопке
function changeButtonState (inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        disableButton(buttonElement);
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

// Дизаблим кнопку
function disableButton(buttonElement) {
    buttonElement.setAttribute('disabled', true);
    
}

// Функция для раздачи ивентлистнеров всем желающим
function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const formButton = formElement.querySelector(config.submitButtonSelector);
    
    changeButtonState(inputList, formButton);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function() {
            validateInput(inputElement);
            changeButtonState(inputList, formButton);
        })
    })
}

enableValidation(config);