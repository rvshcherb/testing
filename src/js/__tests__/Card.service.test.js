import CardService from "../../components/cardService/Card.service";
import paymentSystemList from "../../components/cardService/payment.systems";

const testCards = [
  ['371449635398431', 'amex'],
  ['2202200223948454', 'mir'],
  ['4211039223820833', 'visa'],
  ['5126636817593766', 'master'],
  ['3538593210305107', 'jcb'],
  ['30169675700956', 'diners'],
]

const cardService = new CardService(paymentSystemList);

describe.each(testCards)('Card number %s belongs to payment system %s', (number, paymentSystem) => {
 test('Card number identification', () => {
  expect(cardService.identifyPaymentSystem(number)).toBe(paymentSystem);
 })
});

describe('Card number', () => {
  test('is correct', () => {
    expect(CardService.validate('4211039223820833')).toBe(true)
  })

  test('is incorrect', () => {
    expect(CardService.validate('4211039223820834')).toBe(false)
  })
});