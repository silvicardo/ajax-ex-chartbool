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

  //Predispongo dei dummy data per test del programma
  var dummySales = [
    {
        "id": 1,
        "salesman": "Marco",
        "amount": 9000,
        "date": "12/02/2017"
    },
    {
        "id": 2,
        "salesman": "Giuseppe",
        "amount": 1000,
        "date": "12/04/2017"
    },
    {
        "id": 3,
        "salesman": "Riccardo",
        "amount": 1000,
        "date": "01/04/2017"
    },
    {
        "id": 4,
        "salesman": "Riccardo",
        "amount": 1000,
        "date": "30/04/2017"
    },
    {
        "salesman": "Riccardo",
        "amount": 3200,
        "date": "25/01/2017",
        "id": 5
    },
    {
        "salesman": "Riccardo",
        "amount": 2300,
        "date": "15/02/2017",
        "id": 6
    },
    {
        "salesman": "Riccardo",
        "amount": 4200,
        "date": "30/03/2017",
        "id": 7
    },
    {
        "salesman": "Riccardo",
        "amount": 2000,
        "date": "20/04/2017",
        "id": 8
    },
    {
        "salesman": "Riccardo",
        "amount": 1300,
        "date": "02/05/2017",
        "id": 9
    },
    {
        "salesman": "Riccardo",
        "amount": 1340,
        "date": "12/06/2017",
        "id": 10
    },
    {
        "salesman": "Riccardo",
        "amount": 4350,
        "date": "12/07/2017",
        "id": 11
    },
    {
        "salesman": "Riccardo",
        "amount": 4350,
        "date": "23/09/2017",
        "id": 12
    },
    {
        "salesman": "Riccardo",
        "amount": 8250,
        "date": "03/10/2017",
        "id": 13
    },
    {
        "salesman": "Riccardo",
        "amount": 2010,
        "date": "03/12/2017",
        "id": 14
    },
    {
        "salesman": "Roberto",
        "amount": 2010,
        "date": "03/01/2017",
        "id": 15
    },
    {
        "salesman": "Roberto",
        "amount": 3010,
        "date": "28/02/2017",
        "id": 16
    },
    {
        "salesman": "Roberto",
        "amount": 7010,
        "date": "10/03/2017",
        "id": 17
    },
    {
        "salesman": "Roberto",
        "amount": 1350,
        "date": "10/04/2017",
        "id": 18
    },
    {
        "salesman": "Roberto",
        "amount": 7850,
        "date": "10/05/2017",
        "id": 19
    },
    {
        "salesman": "Roberto",
        "amount": 2850,
        "date": "11/06/2017",
        "id": 20
    },
    {
        "salesman": "Roberto",
        "amount": 550,
        "date": "11/09/2017",
        "id": 21
    },
    {
        "salesman": "Roberto",
        "amount": 1550,
        "date": "21/10/2017",
        "id": 22
    },
    {
        "salesman": "Roberto",
        "amount": 6550,
        "date": "21/11/2017",
        "id": 23
    },
    {
        "salesman": "Marco",
        "amount": 1550,
        "date": "21/12/2017",
        "id": 24
    },
    {
        "salesman": "Marco",
        "amount": 4550,
        "date": "01/11/2017",
        "id": 25
    },
    {
        "salesman": "Marco",
        "amount": 1150,
        "date": "02/10/2017",
        "id": 26
    },
    {
        "salesman": "Marco",
        "amount": 3450,
        "date": "12/09/2017",
        "id": 27
    },
    {
        "salesman": "Marco",
        "amount": 2250,
        "date": "10/07/2017",
        "id": 28
    },
    {
        "salesman": "Marco",
        "amount": 3250,
        "date": "16/06/2017",
        "id": 29
    },
    {
        "salesman": "Marco",
        "amount": 1250,
        "date": "09/04/2017",
        "id": 30
    },
    {
        "salesman": "Marco",
        "amount": 750,
        "date": "12/02/2017",
        "id": 31
    },
    {
        "salesman": "Giuseppe",
        "amount": 750,
        "date": "12/01/2017",
        "id": 32
    },
    {
        "salesman": "Giuseppe",
        "amount": 2480,
        "date": "12/02/2017",
        "id": 33
    },
    {
        "salesman": "Giuseppe",
        "amount": 2580,
        "date": "04/03/2017",
        "id": 34
    },
    {
        "salesman": "Giuseppe",
        "amount": 5800,
        "date": "04/08/2017",
        "id": 35
    },
    {
        "salesman": "Giuseppe",
        "amount": 5800,
        "date": "04/05/2017",
        "id": 36
    },
    {
        "salesman": "Giuseppe",
        "amount": 2800,
        "date": "30/08/2017",
        "id": 37
    },
    {
        "salesman": "Giuseppe",
        "amount": 4800,
        "date": "30/10/2017",
        "id": 38
    },
    {
        "salesman": "Giuseppe",
        "amount": 4900,
        "date": "12/12/2017",
        "id": 39
    }
];

  //Test controllo funzioni

  var totalEarnings = getTotalEarningsFrom(dummySales);
  console.log(totalEarnings);

  var earningsPerMonth = getEarningsPerMonthFrom(dummySales);
  console.log(earningsPerMonth);

  var salesmans = getEarningsPerSellerFrom(dummySales);
  console.log(salesmans);

  var salesmanWithPercentage = getEarningsPercentageFor(salesmans, totalEarnings);
  console.log(salesmanWithPercentage);

  //creazione charts

  var monthCanvas = $('#byMonth');

  var earns =  earningsPerMonth.map(function (month) {
    return month.earnings;
  });

  var monthsLabels = earningsPerMonth.map(function (month) {
    return month.name;
  });

  var myLineChart = new Chart(monthCanvas,{type:'line',
                                            data:{
                                              labels: monthsLabels,
                                              datasets:[{
                                                label: 'Sales per month',
                                                data: earns,
                                                fill: true,
                                                borderColor: 'rgb(0,128,128)',
                                                backgroundColor: 'rgb(0,255,255)',
                                                lineTension: 0.5}]
                                                },
                                              options:{ }
                                          });


  var salesmanCanvas = $('#bySalesman');

  var salesmanLabels = salesmanWithPercentage.map(function (salesman) {
    return salesman.name;
  });

  var salesmanPercentage = salesmanWithPercentage.map(function (salesman) {
    return salesman.percentage;
  });

  var myDoughnutChart = new Chart(salesmanCanvas, {
        type: 'doughnut',
        data: {
            datasets: [{
                label: 'Sales per Salesman',
                data: salesmanPercentage,
                backgroundColor:['rgb(0,128,0)','rgb(255,0,0)','rgb(255,255,0)','rgb(238,130,238']
            }],
            labels: salesmanLabels
        }
    });

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
