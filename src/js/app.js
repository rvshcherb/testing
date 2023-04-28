import CardService from "../components/cardService/Card.service";
import paymentSystemList from "../components/cardService/payment.systems";
import CardWidget from "../components/cardWidget/Card.widget";

const cardService = new CardService(paymentSystemList);

const cardWidget = new CardWidget({
  containerSelector: '.container', 
  inputHandler: cardService.identifyPaymentSystem,
  validateHandler: CardService.validate,
})

cardWidget.bindToDom();
