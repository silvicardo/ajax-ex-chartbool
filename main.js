/**********************************************/
/**********************************************/
/******** PROGETTO: ChartBool - main.css *********/
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

    var months = [
      { nome: 'Gennaio', nr: '01', amount: 0 },
      { nome: 'Febbraio', nr: '02', amount: 0 },
      { nome: 'Gennaio', nr: '03', amount: 0 },
      { nome: 'Gennaio', nr: '04', amount: 0 },
      { nome: 'Gennaio', nr: '05', amount: 0 },
      { nome: 'Gennaio', nr: '06', amount: 0 },
      { nome: 'Gennaio', nr: '07', amount: 0 },
      { nome: 'Gennaio', nr: '08', amount: 0 },
      { nome: 'Gennaio', nr: '09', amount: 0 },
      { nome: 'Gennaio', nr: '10', amount: 0 },
      { nome: 'Gennaio', nr: '11', amount: 0 },
      { nome: 'Gennaio', nr: '12', amount: 0 }
    ];

    var earningsPerMonth = [];
    //Per ogni mese
    for (var index = 0; index < months.length; index++) {
      //Genero il guadagno mensile
      var singleMonthEarning = sales.filter(function (sale) {
        //ottenendo un array delle vendite effettuate in quel mese
        return (sale.date.split('/'))[1] === months[index].nr;
      }).reduce(function (salesTotal, sale) {
          //e sommando gli amount
          salesTotal += sale.amount;
          return salesTotal;
      }, 0);

      earningsPerMonth.push(singleMonthEarning);
    }
    return earningsPerMonth;
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
