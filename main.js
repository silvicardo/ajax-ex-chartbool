/**********************************************/
/**********************************************/
/******** PROGETTO: ChartBool - main.js *******/
/**********************************************/
/**********************************************/

$(document).ready(function () {

  /*****************************/
  /**********PROGRAMMA**********/
  /*****************************/

  console.log('Hello from ChartBool app');

  var baseUrl = 'http://157.230.17.132:4016/sales';

  $.get(baseUrl, function(apiData) {

    // rimuovo ultima istanza errore
    var apiResponse = apiData.slice(0, -1);

    var totalEarnings = getTotalEarningsFrom(apiResponse);

    var earningsPerMonth = getEarningsPerMonthFrom(apiResponse);

    var salesmans = getEarningsPerSellerFrom(apiResponse);

    var salesmanWithPercentage = getEarningsPercentageFor(salesmans, totalEarnings);

    //CREAZIONE CHARTS
    var monthCanvas = $('#byMonth');
    var salesmanCanvas = $('#bySalesman');

    //CHARTS --> MESE

    var earns =  earningsPerMonth.map(function (month) {
      return month.earnings;
    });

    var monthsLabels = earningsPerMonth.map(function (month) {
      return month.name;
    });

    var myLineChart = new Chart(monthCanvas, {  type:'line',
                                                data:{
                                                labels: monthsLabels,
                                                datasets:[{
                                                  label: 'Sales per month',
                                                  data: earns,
                                                  fill: true,
                                                  borderColor: 'rgb(0,128,128)',
                                                  backgroundColor: 'rgb(0,255,255)',
                                                  lineTension: 0.5}]},
                                                options:{ }
                                              });

    //CHARTS --> VENDITORE

    var salesmanLabels = salesmanWithPercentage.map(function (salesman) {
      return salesman.name;
    });

    var salesmanPercentage = salesmanWithPercentage.map(function (salesman) {
      return salesman.percentage;
    });

    var myDoughnutChart = new Chart(salesmanCanvas, { type: 'doughnut',
                                                      data: {
                                                        datasets: [{
                                                          label: 'Sales per Salesman',
                                                          data: salesmanPercentage,
                                                          backgroundColor:['rgb(0,128,0)','rgb(255,0,0)','rgb(255,255,0)','rgb(238,130,238']
                                                        }],
                                                        labels: salesmanLabels
                                                      }
                                                    });

  });//chiusura callback success della chiamata GET + chiusura chiamata

  /**********************************/
  /*************FUNZIONI*************/
  /**********************************/

  // vendite totali della nostra azienda

  function getTotalEarningsFrom(sales) {
    return sales.reduce(function(totalAmount, sale) {
        totalAmount += sale.amount;
        return totalAmount;
    },0);
  }

  // vendite totali della nostra azienda per mese

  function getEarningsPerMonthFrom(sales) {
    //prepariamo un array di oggetti mesi...
    var months = [
      { name: 'Gennaio', nr: '01', earnings: 0 },
      { name: 'Febbraio', nr: '02', earnings: 0 },
      { name: 'Marzo', nr: '03', earnings: 0 },
      { name: 'Aprile', nr: '04', earnings: 0 },
      { name: 'Maggio', nr: '05', earnings: 0 },
      { name: 'Giugno', nr: '06', earnings: 0 },
      { name: 'Luglio', nr: '07', earnings: 0 },
      { name: 'Agosto', nr: '08', earnings: 0 },
      { name: 'Settembre', nr: '09', earnings: 0 },
      { name: 'Ottobre', nr: '10', earnings: 0 },
      { name: 'Novembre', nr: '11', earnings: 0 },
      { name: 'Dicembre', nr: '12', earnings: 0 }
    ];

    //sarà l'accumulatore di reduce..
    //la funzione restituirà un array mesi
    //aggiornato per ogni vendita
    //nella sua proprietà earnings
    return sales.reduce(function (months, sale) {
      var monthForThisSale = (sale.date.split('/'))[1] + '';
      var monthIndex = getIndexOf(monthForThisSale, 'nr',months);
      months[monthIndex].earnings += sale.amount;
      return months;
    }, months);
  }

  // il contributo di ogni venditore per l’anno 2017.
  // Il valore dovrà essere la percentuale di vendite
  // effettuate da quel venditore (fatturato_del venditore / fatturato_totale)

  function getEarningsPercentageFor(sellersArray, totalEarnings) {

    var salesmansCopy = [];

    sellersArray.forEach(function (seller, sellerIndex, sellers) {

      var percentage = parseInt((seller.earnings / totalEarnings) * 100);
      salesmansCopy.push({name: seller.name, earnings: seller.earnings, percentage: percentage }) ;
    });

    return salesmansCopy;
  }

  function getEarningsPerSellerFrom(sales) {
    //ritorno il risultato di...
    return sales.reduce(function (salesmans, sale) {
      //per ogni vendita
      //se abbiamo un venditore nell'arrayRisultato 'salesmans'
      //otterremo l'indice altrimenti undefined
      var salesmanIndex = getIndexOf(sale.salesman,'name',salesmans);

      //Caso A: venditore NON TROVATO in array risultato 'salesmans'
      if (salesmanIndex === undefined) {
          //creo nuovo venditore in arrayRisultato 'salesmans'
          salesmans.push({ name: sale.salesman, earnings: sale.amount });
        } else {
          //Caso B: venditore TROVATO in array risultato 'salesmans'
          salesmans[salesmanIndex].earnings += sale.amount;
        }
        //restituisco l'array risultato che entra nella prossima iterazione
        //di reduce e diventa il valore finale restuito da reduce (quindi dell'intera
        //funzione) arrivati all'ultima vendita
        return salesmans;
    },[]);

  }

  //FUNZIONI GENERICA RICERCA E CONTROLLO IN OGGETTO

  function getIndexOf(value, key, arrOfObjects) {
      for (var i = 0; i < arrOfObjects.length; i++) {
        if (arrOfObjects[i][key] === value) {
          return i;
        }
      }
    return undefined;
  }

  function contains(value, key, arr) {
    return arr.some(function (object, index, array) {
      return object[key] === value;
    });
  }

});
