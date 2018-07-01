import {Database} from './idb' ;

function getCurrencies(){
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response => response.json())
    .then( myJson => {
       let currencies = ' <select name="" >';
        for (let key in myJson.results) {
            //console.log(myJson.results[`${key}`]);
            currencies += `<option value="${myJson.results[`${key}`].id}">${myJson.results[`${key}`].currencyName}(${myJson.results[`${key}`].id})</option>`;
        }
        
        //save to database
        const arrayOfCurrencies = Object.keys(data.results).sort();
        Database.saveCurrencyArray('allCurrencies', arrayOfCurrencies);
        
        currencies += '</select>';
        document.getElementById('changeFrom').innerHTML = currencies;
        document.getElementById('changeTo').innerHTML = currencies;
       }).catch(err => {
        console.error(
          `The following error occured while trying to get the list of currencies. ${err}`,
        );
        // Get currency exchange rate when the user is offline
        Database.getCurrencies('allCurrencies').then(arrayOfCurrencies => {
          if (typeof arrayOfCurrencies === 'undefined') return;
          const nodeTypeToCreate = 'option';

        arrayOfCurrencies.map(currency => {
        document.getElementById('changeFrom').appendChild(createNode(nodeTypeToCreate, currency));
        document.getElementById('changeTo').appendChild(createNode(nodeTypeToCreate, currency));
    });
        });
      });
  }

    
function convertCurrency(){
    let from = document.getElementById('changeFrom').value;
    console.log(from);
    let to = document.getElementById('changeTo').value;
    console.log(to);
    let amount = document.getElementById('amount').value;
    console.log(amount);
    let query =`${from}_${to}`;
    if (amount) {
       
        
        fetch('https://free.currencyconverterapi.com/api/v5/convert?q='+query+'&compact=ultra')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let currencyResult
            for (let key in data) {
                console.log(data[`${key}`]);
                currencyResult = data[`${key}`];
                Database.saveCurrencies(query, currencyResult);
                console.log(currencyResult);
            }
            let total = currencyResult * amount;
            console.log(total);
            let result = Math.round(total * 100) / 100;
            console.log(result)
            document.getElementById('result').innerHTML = `Result : ${result} ${to}`;
        }) .catch(err => {
        console.error(
          `The following error occured while trying to get the conversion rate. ${err}`,
        );
        // Get currency exchange rate when the user is offline
        Database.getCurrencies(query).then(data => {
          if (typeof data === 'undefined') return;
          const convertedResult = data * amount;
          const convertedRes = Math.round(convertedResult * 100) / 100;
          document.getElementById('result').innerHTML = `Result : ${convertedRes} ${to}`;
        });
      });
    }else{
            document.getElementById('result').innerHTML = `Result : ${0} ${to}`;
    }
}
