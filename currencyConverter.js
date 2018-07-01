
function getCurrencies(){
    fetch('https://free.currencyconverterapi.com/api/v5/currencies')
    .then(response => response.json())
    .then( myJson => {
       let currencies = ' <select name="" >';
        for (let key in myJson.results) {
            //console.log(myJson.results[`${key}`]);
            currencies += `<option value="${myJson.results[`${key}`].id}">${myJson.results[`${key}`].currencyName}(${myJson.results[`${key}`].id})</option>`;
        }
        currencies += '</select>';
        document.getElementById('changeFrom').innerHTML = currencies;
        document.getElementById('changeTo').innerHTML = currencies;
       }).catch(err => console.log(err));
    if ('serviceWorker' in navigator){
        navigator.serviceWorker.register('sw.js', { insecure: true }).then(request=>{
        console.log("sw working. created!");

        }).catch(err => console.log("nop" + err));
    }
}

function convertCurrency(){
    let from = document.getElementById('changeFrom').value;
    console.log(from);
    let to = document.getElementById('changeTo').value;
    console.log(to);
    let amount = document.getElementById('amount').value;
    console.log(amount);
    let result = document.getElementById('result');
    if (amount) {
       
        let query =`${from}_${to}`;
        fetch('https://free.currencyconverterapi.com/api/v5/convert?q='+query+'&compact=ultra')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let currencyResult
            for (let key in data) {
                console.log(data[`${key}`]);
                currencyResult = data[`${key}`];
                console.log(currencyResult);
            }
            let total = currencyResult * amount;
            console.log(total);
            let result = Math.round(total * 100) / 100;
            console.log(result)
            document.getElementById('result').innerHTML = `Result : ${result} ${to}`;
        }).catch(err => console.log(err));
    }else{
            result.innerHTML = 0;
    }
}