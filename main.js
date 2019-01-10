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

  moment.locale('it');

  $.get(baseUrl, function (apiResponse) {

    updatePanelFrom(apiResponse);

  });//chiusura callback success della chiamata GET + chiusura chiamata

  $('#addSaleBtn').click(function () {

    var randomDateInMonth = randomDateIn($('#monthSelect').val(), '2017');
    var amount = parseInt($('#amountInput').val());

    var newSaleObj =  {
                      salesman: $('#salesmanSelect').val(),
                      amount: amount,
                      date: randomDateInMonth,
                    };

    $.post(baseUrl, newSaleObj, function (response) {
      toggle(['d-none', 'd-block'], $('.add_sale'));
      $.get(baseUrl, function(apiData) {
        updatePanelFrom(apiData);
      });//chiusura callback success della chiamata GET + chiusura chiamata
    });
  });
  /**********************************/
  /*************FUNZIONI*************/
  /**********************************/

  function updatePanelFrom(apiResponse) {
    var totalEarnings = getTotalEarningsFrom(apiResponse);
    var earningsPerMonth = getEarningsPerMonthFrom(apiResponse);

    var salesmans = getEarningsPerSellerFrom(apiResponse);

    var salesmanWithPercentage = getEarningsPercentageFor(salesmans, totalEarnings);

    //creazione Selects con Handlebars

    fill('#monthSelect', '#monthTemplate', 'monthOptions', earningsPerMonth.map(function (monthObj) {
      return monthObj.name;
    }));

    fill('#salesmanSelect', '#salesmanTemplate', 'salesmanOptions', salesmans.map(function (salesmanObj) {
      return salesmanObj.name;
    }));

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

    toggle(['d-none', 'd-block'], $('.add_sale'));

  }

  // vendite totali della nostra azienda

  function getTotalEarningsFrom(sales) {
    return sales.reduce(function(totalAmount, sale) {
      var saleAmount = parseInt(sale.amount);
        totalAmount += saleAmount;
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
      { name: 'Dicembre', nr: '12', earnings: 0 },
    ];

    //sarà l'accumulatore di reduce..
    //la funzione restituirà un array mesi
    //aggiornato per ogni vendita
    //nella sua proprietà earnings
    return sales.reduce(function (months, sale) {
      var monthForThisSale = (sale.date.split('/'))[1] + '';
      var monthIndex = getIndexOf(monthForThisSale, 'nr', months);
      var saleAmount = parseInt(sale.amount);
      months[monthIndex].earnings += saleAmount;
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
      var saleAmount = parseInt(sale.amount);
      //Caso A: venditore NON TROVATO in array risultato 'salesmans'
      if (salesmanIndex === undefined) {
          //creo nuovo venditore in arrayRisultato 'salesmans'
          salesmans.push({ name: sale.salesman, earnings: saleAmount });
        } else {
          //Caso B: venditore TROVATO in array risultato 'salesmans'
          salesmans[salesmanIndex].earnings += saleAmount;
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

  //GESTIONE INTERFACCIA

  function toggle(classes, element) {
    classes.forEach(function (thisClass) {
      element.toggleClass(thisClass);
    });
  }

  function fill(selectSelector, templateSelector, templateKey, dataArray) {
    $(selectSelector).html('');
    var htmlTemplate = $(templateSelector).html();
    var template = Handlebars.compile(htmlTemplate);
    var data = {};
    data[templateKey] = '';
    dataArray.forEach(function (value) {
      data[templateKey] += '<option value="' + value +'">' + value + '</option>' ;
    });

    var htmlRisultato = template(data);

    $(selectSelector).append(htmlRisultato);
  }

  //GESTIONE DATE

  function randomDateIn(monthName, year) {

    var selectedMonth = moment().set({'year': parseInt(year), 'month': monthName});
    var daysInMonth = selectedMonth.daysInMonth();
    var monthNumber = selectedMonth.format('MM');
    var randomDay = function randomDay(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }(1, daysInMonth);

    var randomDateInMonth = randomDay + '/' + monthNumber + '/' + year;

    return randomDateInMonth;
  }

});
