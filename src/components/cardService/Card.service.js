export default class CardService {
  constructor(paymentSystems) {
    this.paymentSystems = paymentSystems;

    this.identifyPaymentSystem = this.identifyPaymentSystem.bind(this);
  }

  identifyPaymentSystem(input) {
    const paymentSystem = this.paymentSystems.find((item) => item.regexp.test(input));
    if (paymentSystem) {
      return paymentSystem.name;
    }
    return undefined;
  }

  static validate(cardNumber) {
    const cardNumberArr = [...cardNumber];
    let sum = 0;
    const parity = cardNumberArr.length % 2;

    cardNumberArr.forEach((item, index) => {
      const number = parseInt(item, 10);

      if (index % 2 !== parity) {
        sum += number;
      } else if (number > 4) {
        sum += number * 2 - 9;
      } else {
        sum += number * 2;
      }
    });
    return sum % 10 === 0;
  }
}
