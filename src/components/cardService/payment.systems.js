const paymentSystemList = [
  {
    name: 'mir',
    regexp: /^2[0-9]{0,}$/,
  },
  {
    name: 'visa',
    regexp: /^4[0-9]{0,}$/,
  },
  {
    name: 'amex',
    regexp: /^3[47][0-9]{0,}$/,
  },
  {
    name: 'master',
    regexp: /^(5[1-5][0-9]{0,}|2(22[1-9][0-9]2[3-9][0-9]{0,}|[3-6][0-9]{0,}|7[0-1][0-9]{0,}|720[0-9]{0,}))$/,
  },
  {
    name: 'jcb',
    regexp: /^(?:2131|1800|35\d{3})\d{11}$/,
  },
  {
    name: 'diners',
    regexp: /^3(?:0[0-5]|[68][0-9])[0-9]{0,}$/,
  },
];

export default paymentSystemList;
