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

  $.get(baseUrl, updatePanelWithApiSales);

  $('#addSaleBtn').click(function () {

    var randomDateInMonth = randomDateIn($('#monthSelect').val(), '2017');
    var amount = $('#amountInput').val();

    var newSaleObj =  {
                      salesman: $('#salesmenSelect').val(),
                      amount: amount,
                      date: randomDateInMonth,
                    };

    $.post(baseUrl, newSaleObj, function (response) {
      toggle(['d-none', 'd-block'], $('.add_sale'));
      $.get(baseUrl, updatePanelWithApiSales);
    });
  });

  /**********************************/
  /*************FUNZIONI*************/
  /**********************************/

  /*********** FUNZIONE PRINCIPALE ***************/

  function updatePanelWithApiSales(apiResponse) {

    //Passaggio ad intero della proprietà amount
    apiResponse.forEach(function (sale) {
      sale.amount = parseInt(sale.amount);
    });

    //Grazie alle funzioni di 'salesStatsManager.js' e
    //'objectsFunctions.js' produciamo un oggetto
    //con le statistiche necessarie
    var salesStats = generateFullStatsObjectFrom(apiResponse);

    //creazione Selects con Handlebars

    fill('#monthSelect', '#monthTemplate', 'monthOptions', salesStats.earningsPerMonth.map(function (monthObj) {
      return monthObj.name;
    }));

    fill('#salesmenSelect', '#salesmanTemplate', 'salesmanOptions', salesStats.salesmen.map(function (salesmanObj) {
      return salesmanObj.name;
    }));

    //CREAZIONE CHARTS

    //puntatori jQuery
    var monthCanvas = $('#byMonth');
    var salesmenCanvas = $('#bySalesman');
    var quartersCanvas =$('#byQuarter');

    //CHARTS --> MESE
    var myLineChart = generateMonthChart(salesStats.earningsPerMonth, monthCanvas);

    //CHARTS --> VENDITORE
    var myDoughnutChart = generateSalesmenChart(salesStats.salesmen, salesmenCanvas);

    //CHARTS --> QUARTERS
    var myBarChart = generateQuartersChart(salesStats.earningsPerQuarter, quartersCanvas);

    toggle(['d-none', 'd-block'], $('.add_sale'));

  }

  /******** FINE FUNZIONE PRINCIPALE ************/

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

  function generateMonthChart(earningsPerMonth, canvas) {

    var monthsEarnings = earningsPerMonth.map(function (month) {
      return month.earnings;
    });

    var monthsLabels = earningsPerMonth.map(function (month) {
      return month.name;
    });

    var borderColors = 'rgb(0,128,128)';
    var backgroundColors = 'rgb(0,255,255)';
    var options = {};
    var data = {
                labels: monthsLabels,
                datasets: [{
                  label: 'Sales per month',
                  data: monthsEarnings,
                  fill: true,
                  borderColor: borderColors,
                  backgroundColor: backgroundColors,
                  lineTension: 0.5,
                  }],
                };

    return new Chart(canvas, { type: 'line', data, options: options });

  }

  function generateSalesmenChart(salesmen, canvas) {

    var salesmenLabels = salesmen.map(function (salesman) {
      return salesman.name;
    });

    var salesmenPercentage = salesmen.map(function (salesman) {
      return salesman.percentage;
    });

    var backgroundColors = ['rgb(0,128,0)',
                            'rgb(255,0,0)',
                            'rgb(255,255,0)',
                            'rgb(238,130,238'];

    var data = {
                datasets: [{
                            label: 'Sales per Salesman',
                            data: salesmenPercentage,
                            backgroundColor: backgroundColors,
                            }],
                labels: salesmenLabels
              }


    return new Chart(canvas, { type: 'doughnut', data: data });
  }

  function generateQuartersChart(earningsPerQuarter, canvas) {
    var quartersEarnings = earningsPerQuarter.map(function (quarter) {
      return quarter.earnings;
    });

    var quartersIds = earningsPerQuarter.map(function (quarter) {
      return quarter.number + '';
    });

    var backgroundColors = ['rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)'];

    var borderColors = ['rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)'];
    var data = {
                 labels: quartersIds,
                 datasets: [{
                           label:'Quarters',
                           data: quartersEarnings,
                           fill: false,
                           backgroundColor: backgroundColors,
                           borderColor: borderColors,
                           borderWidth:1
                         }],
               };

    var options = {scales:{
                          yAxes:[{
                            ticks:{
                              beginAtZero:true}
                            }]
                          }
    };

    return new Chart(canvas, { type:'bar', data: data, options: options });
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
