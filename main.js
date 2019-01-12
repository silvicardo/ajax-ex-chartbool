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


  $.get(baseUrl, function (apiSales) {

   updatePanelWith(apiSales);

  });

  $('#addSaleBtn').click(function () {

    var randomDateInMonth = randomDateIn($('#monthSelect').val(), '2017');
    var amount = parseInt($('#amountInput').val());

    var newSaleObj =  {
                      salesman: $('#salesmenSelect').val(),
                      amount: amount,
                      date: randomDateInMonth,
                    };

    $.post(baseUrl, newSaleObj, function (response) {
      toggle(['d-none', 'd-block'], $('.add_sale'));
      $.get(baseUrl, function(apiSales) {
        updatePanelWith(apiSales);
      });
    });
  });

  /**********************************/
  /*************FUNZIONI*************/
  /**********************************/

  function updatePanelWith(apiResponse) {

    apiResponse.forEach(function (sale) {
      sale.amount = parseInt(sale.amount);
    });

    var totalEarnings = getTotalEarningsFrom(apiResponse);

    var salesmen = createNewArrayOfObjectsSortingInputArrayForDifferentValuesOf('salesman', apiResponse, undefined, function(obj, inputArrayObj, fullInputArray, isNewObj) {
      //Per ogni istanza dell'array origine(apiResponse) in base che sia un nuovo Oggetto per l'array finel eseguo
      obj.earnings = (isNewObj) ? inputArrayObj.amount : (inputArrayObj.amount + obj.earnings);
      return obj;
    });

    var salesmanWithPercentage = getEarningsPercentageFor(salesmen, totalEarnings);
    console.log(salesmanWithPercentage);

    var earningsPerMonth = createNewArrayOfObjectsSortingInputArrayForDifferentValuesOf('date', apiResponse, function (dateValue) {
      // eseguo su ogni valore alla chiave 'date' questa modifica
      return dateValue.split('/')[1] + '';
    }, function (obj, inputArrayObj, fullInputArray, isNewObj) {//poi
      //Per ogni istanza dell'array origine(apiResponse) in base che sia un nuovo Oggetto per l'array finel eseguo
      obj.earnings = (isNewObj) ? inputArrayObj.amount : (inputArrayObj.amount + obj.earnings);
      obj.name = (isNewObj) ? moment.months(parseInt(obj.date) - 1) :  obj.name;
      obj.id = parseInt(obj.date);
      return obj;
    }).sort(function (a, b) {//I mesi sarebbero sparsi a questo punto, uso sort per ordinarli per il numero di mese
      return a.date - b.date;
    });

    console.log(earningsPerMonth);


    var earningsPerQuarter = splitToQuarters(earningsPerMonth);
    console.log(earningsPerQuarter);

    //creazione Selects con Handlebars

    fill('#monthSelect', '#monthTemplate', 'monthOptions', earningsPerMonth.map(function (monthObj) {
      return monthObj.name;
    }));

    fill('#salesmenSelect', '#salesmanTemplate', 'salesmanOptions', salesmen.map(function (salesmanObj) {
      return salesmanObj.salesman;
    }));

    //CREAZIONE CHARTS
    var monthCanvas = $('#byMonth');
    var salesmanCanvas = $('#bySalesman');
    var quarterCanvas =$('#byQuarter');

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
//CHARTS --> QUARTER

var quarterEarnings = earningsPerQuarter.map(function (quarter) {
  return quarter.earnings;
});

var quarterIds = earningsPerQuarter.map(function (quarter) {
  return quarter.number + '';
});

var backgroundColor = ['rgba(255, 99, 132, 0.2)','rgba(255, 159, 64, 0.2)','rgba(255, 205, 86, 0.2)','rgba(75, 192, 192, 0.2)','rgba(54, 162, 235, 0.2)','rgba(153, 102, 255, 0.2)','rgba(201, 203, 207, 0.2)'];
var borderColor = ['rgb(255, 99, 132)','rgb(255, 159, 64)','rgb(255, 205, 86)','rgb(75, 192, 192)','rgb(54, 162, 235)','rgb(153, 102, 255)','rgb(201, 203, 207)'];

var options = {scales:{yAxes:[{ticks:{beginAtZero:true}}]}};

var myBarChart = new Chart(quarterCanvas , { type:'bar', data:{'labels':quarterIds,'datasets':[{label:'Quarters','data':quarterEarnings, fill:false, backgroundColor: backgroundColor,'borderColor': borderColor,borderWidth:1}]},'options': options});

    toggle(['d-none', 'd-block'], $('.add_sale'));

  }

  // vendite totali della nostra azienda

  function getTotalEarningsFrom(sales) {
    return sales.reduce(function(totalAmount, sale) {
        totalAmount += sale.amount;
        return totalAmount;
    },0);
  }

  // il contributo di ogni venditore per l’anno 2017.
  // Il valore dovrà essere la percentuale di vendite
  // effettuate da quel venditore (fatturato_del venditore / fatturato_totale)

  function getEarningsPercentageFor(sellersArray, totalEarnings) {

    var salesmenCopy = [];

    sellersArray.forEach(function (seller, sellerIndex, sellers) {

      var percentage = (seller.earnings / totalEarnings) * 100;
      salesmenCopy.push({ name: seller.salesman,
                           earnings: seller.earnings,
                           percentage: parseInt(percentage)
                         });
    });

    return salesmenCopy;
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

  //FUNZIONI GENERICHE RICERCA E CONTROLLO IN OGGETTO

  function getIndexOf(value, key, arrOfObjects) {
      for (var i = 0; i < arrOfObjects.length; i++) {
        if (arrOfObjects[i][key] === value) {
          return i;
        }
      }
    return undefined;
  }

  function contains(value, key, arrOfObjects) {
    return arrOfObjects.some(function (object, index, array) {
      return object[key] === value;
    });
  }

  /*
  Funzione per ciclare su un array secondo una chiave con la possibilità di manipolare il valore a quella chiave prima di
  iniziare a lavorarlo:
    -> cicla su ogni oggetto dell'array originale
    -> da la possibilita di modificare(facoltativo) il valore a quella chiave tramite
      funzione dedicata (valueHandlerBeforeSorting)( METTERE UNDEFINED SE NON LA SI USA)
    -> genera un oggetto nuovo ad ogni valore diverso alla chiave (key) e lo mette in un arrayRisultato
    -> controlla ad ogni istanza dell'array originale se nell'array risultato c'è alla chiave (key)
      quello stesso valore, fornisce all'handler per ogni iterazione un booleano(isNewObj) per poter gestire in un unica
      funzione di manipolazione entrambe le casistiche(objHandlerForEachIteration)
    -> objHandlerForEachIteration deve ritornare sempre il suo primo parametro
    -> objHandlerForEachIteration e  valueHandlerBeforeSorting godono
      di outerVarForHandler (di base undefinded) a cui possono avere accesso per
      tutta la durata del ciclo(ultimo parametro facoltativo)
    ->restituisce l'array risultato lavorato secondo objHandlerForEachIteration
  */
  function createNewArrayOfObjectsSortingInputArrayForDifferentValuesOf(key, arrayOfObjects, valueHandlerBeforeSorting,  objHandlerForEachIteration) {
    console.log(objHandlerForEachIteration);
    var finaleArrOfObjects = [];
    var id = 0;
    var outerVarForHandler = undefined;//You can check the value to keep track of things in the main function
    var isNewObj = false;

    for (var i = 0; i < arrayOfObjects.length; i++) {
      var currentObj = arrayOfObjects[i];
      currentObj[key] = (valueHandlerBeforeSorting !== undefined) ? valueHandlerBeforeSorting(currentObj[key]) : currentObj[key];

      var indexInFinalArrOfObjects = getIndexOf(currentObj[key], key, finaleArrOfObjects);

      if (indexInFinalArrOfObjects  === undefined)  {
        var isNewObj = true;
        var newObj = {};
        newObj[key] = currentObj[key];
        newObj.id = id += 1;
        finaleArrOfObjects.push((objHandlerForEachIteration !== undefined) ? objHandlerForEachIteration(newObj,currentObj, arrayOfObjects, isNewObj, outerVarForHandler) : newObj);

      } else {
        var isNewObj = false;
        finaleArrOfObjects[indexInFinalArrOfObjects] = objHandlerForEachIteration(finaleArrOfObjects[indexInFinalArrOfObjects], currentObj, arrayOfObjects, isNewObj, outerVarForHandler);
      }

    }
    return finaleArrOfObjects;
  }

  function splitToQuarters(yearEarningsByMonth) {

    return yearEarningsByMonth.reduceRight(function (quartersArray, month, monthIndex, yearArray) {

          var isNewQuarter = (month.id % 3 === 0);

          if (isNewQuarter) {
            quartersArray.push({number : month.id / 3,
                                earnings : month.earnings });
          } else {
            var quarterIndex = quartersArray.length - 1;
            var currentQuarter = quartersArray[quarterIndex];
            currentQuarter.earnings += month.earnings;
          }

        return quartersArray;
    }, []).reverse();
  }

});
