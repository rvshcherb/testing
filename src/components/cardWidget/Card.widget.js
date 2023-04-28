import './Card.widget.css';

export default class CardWidget {
  constructor({ containerSelector, inputHandler, validateHandler }) {
    this.inputHandler = inputHandler;
    this.validateHandler = validateHandler;
    this.container = document.querySelector(containerSelector);
    this.paymentSystem = undefined;
    this.isValid = false;
  }

  bindToDom() {
    this.container.innerHTML = this.markup;
    this.input = this.container.querySelector('#card-widget__input');
    this.button = this.container.querySelector('#submit');

    this.input.addEventListener('input', this.onInput.bind(this));
    this.button.addEventListener('click', this.onValidate.bind(this));
  }

  get markup() {
    return `
      <div class="card-widget">
        <div class="card-widget__info">
          <div class="card-widget__payment-system-wrapper">
            <p>Платежная система:</p>
            <div class="card-widget__payment-system-icon ${this.paymentSystem}"></div>
          </div>
          <div class="card-widget__validation-wrapper">
            <p>Валидация пройдена: <span class="is-valid"></span></p>          
          </div>
        </div>
        <form class="card-widget__form">
          <label for="card-widget__input"></label>
          <input type="text" placeholder="Номер карты" id="card-widget__input">
          <button id="submit" type="submit">Проверить</button>
        </form>
      </div>
    `;
  }

  onInput() {
    this.paymentSystem = this.inputHandler(this.input.value);
    const icon = this.container.querySelector('.card-widget__payment-system-icon');
    icon.className = 'card-widget__payment-system-icon';
    icon.classList.add(this.paymentSystem);
  }

  onValidate(evt) {
    evt.preventDefault();
    this.isValid = this.validateHandler(this.input.value);
    const validationStatus = this.container.querySelector('.is-valid');
    if (this.isValid) {
      validationStatus.innerText = 'Да';
    } else {
      validationStatus.innerText = 'Нет';
    }
  }
}
