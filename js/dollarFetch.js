const dollarNow = document.querySelector("#dollarNow"),
  dollarBlueNow = document.querySelector("#dollarBlueNow"),
  formDollar = document.querySelector("#formDollar"),
  inputPrice = document.querySelector("#inputPrice"),
  currency = document.querySelector('#currency'),
  writingInput = document.querySelector("#writingInput"),
  iva25Span = document.querySelector("#iva25Span"),
  iva30Span = document.querySelector("#iva30Span"),
  iva45Span = document.querySelector("#iva45Span"),
  arsValue = document.querySelector("#arsValue"),
  totalIva = document.querySelector("#totalIva"),
  total = document.querySelector("#total"),
  printButton = document.querySelector('#printButton');

let dollarPrice, dollarBluePrice, euroPrice, btcPrice, ethPrice, bnbPrice, btcData, ethData, bnbData, newPrice, typeCurrency, iva25Value, iva30Value, iva45Value, totalIvaValue, totalValue;

let variableDollar;

async function dollarFetch() {
  let responseBlue = await fetch('https://dolarapi.com/v1/dolares/blue');
  let dataBlue = await responseBlue.json();
  let dollarBlueData = dataBlue.venta; // Reemplaza por el valor del dólar blue

  let responseOficial = await fetch('https://dolarapi.com/v1/dolares/oficial');
  let dataOficial = await responseOficial.json();
  let dollarOficialData = dataOficial.venta; // Reemplaza por el valor del dólar oficial

  dollarNow.innerHTML = `${dollarOficialData}`; // Actualiza el elemento HTML con el valor del dólar oficial
  dollarBlueNow.innerHTML = `${dollarBlueData}`; // Actualiza el elemento HTML con el valor del dólar blue

  dollarPrice = parseFloat(dollarOficialData); // Valor del dólar oficial
  dollarBluePrice = parseFloat(dollarBlueData); // Valor del dólar blue
}

dollarFetch();

async function eurFetch() {
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=EURUSDT');
  let data = await response.json();
  euroData = data.price;
  euroPrice = parseFloat(euroData);
}
eurFetch();

async function btcFetch() {
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=BTCUSDT');
  let data = await response.json();
  btcData = data.price;
  btcPrice = parseFloat(btcData);
}
btcFetch();

async function ethFetch() {
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=ETHUSDT');
  let data = await response.json();
  ethData = data.price;
  ethPrice = parseFloat(ethData);
}
ethFetch();

async function bnbFetch() {
  let response = await fetch('https://api.binance.com/api/v1/ticker/price?symbol=BNBUSDT');
  let data = await response.json();
  bnbData = data.price;
  bnbPrice = parseFloat(bnbData);
}
bnbFetch();

setInterval(() => {
  dollarFetch();
}, 100000);

formDollar.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (isNaN(inputPrice.value) || inputPrice.value === '') {
    // Manejo del caso en el que el valor ingresado no es un número válido.
    return;
  }

  switch (currency.value) {
    case 'USD':
      newPrice = inputPrice.value * dollarPrice;
      typeCurrency = 'fiat';
      break;
    case 'USD Blue':
      newPrice = inputPrice.value * dollarBluePrice;
      typeCurrency = 'blue';
      break;
    case 'EUR':
      newPrice = inputPrice.value * euroPrice * dollarPrice;
      typeCurrency = 'fiat';
      break;
    case 'ARS':
      newPrice = inputPrice.value * 1;
      typeCurrency = 'fiat';
      break;
    case 'BTC':
      newPrice = inputPrice.value * btcPrice * dollarBluePrice;
      typeCurrency = 'crypto';
      break;
    case 'ETH':
      newPrice = inputPrice.value * ethPrice * dollarBluePrice;
      typeCurrency = 'crypto';
      break;
    case 'BNB':
      newPrice = inputPrice.value * bnbPrice * dollarBluePrice;
      typeCurrency = 'crypto';
  }

  arsValue.innerHTML = `ARS ${newPrice.toLocaleString('es-AR')}`;

  iva25Value = Number((newPrice * 0.25))
  iva30Value = Number((newPrice * 0.3));
  iva45Value = Number((newPrice * 0.45));

  if (typeCurrency === 'fiat') {
    iva25Span.innerHTML = `ARS ${iva25Value.toLocaleString('es-AR')}`;
    iva30Span.innerHTML = `ARS ${iva30Value.toLocaleString('es-AR')}`;
    iva45Span.innerHTML = `ARS ${iva45Value.toLocaleString('es-AR')}`;
    totalIvaValue = Number((iva25Value + iva30Value + iva45Value).toFixed(2));
  } else if (typeCurrency === 'crypto' || typeCurrency === 'blue') {
    iva25Span.innerHTML = 'ARS 0';
    iva30Span.innerHTML = 'ARS 0';
    iva45Span.innerHTML = 'ARS 0';
    totalIvaValue = 0;
  }
  totalIva.innerHTML = `ARS ${totalIvaValue.toLocaleString('es-AR')}`;
  totalValue = (newPrice + totalIvaValue);
  total.innerHTML = `ARS ${totalValue.toLocaleString('es-AR')}`;

});

inputPrice.addEventListener('input', () => {
  if (inputPrice.value === '') {
    arsValue.innerHTML = '';
    iva25Span.innerHTML = ''
    iva30Span.innerHTML = ''
    iva45Span.innerHTML = ''
    totalIva.innerHTML = '';
    total.innerHTML = `ARS 0`;
  }
});

printButton.addEventListener('click', () => {
  print();
});
