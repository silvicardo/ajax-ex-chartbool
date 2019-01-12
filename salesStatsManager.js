/**********************************************/
/**********************************************/
/* PROGETTO: ChartBool - salesStatsManager.js */
/**********************************************/
/**********************************************/

/*
Il presente file:
1. accetta come input delle sue funzioni
   un oggetto 'Sales' elabora i dati e permette:
     -> la creazione di un oggetto 'Stats' tramite le funzioni
     -> funzioni indipendenti dall'oggetto 'Stats' per la
        gestione dei dati
2. si appoggia a:
    -> 'moment.js'
    -> 'objectFunctions.js'
*/

/******** FUNZIONE PRINCIPALE ************/

//funzione che genera un oggetto 'Stats' e
//lo completa con la proprietà quarters
//e ne da feedback in console
function generateFullStatsObjectFrom(sales) {
  var salesStats = new SalesStats(sales);
  salesStats.earningsPerQuarter = splitToQuarters(salesStats.earningsPerMonth);
  console.log(salesStats);
  return salesStats;
}

/***** FINE FUNZIONE PRINCIPALE *********/

//Constructor Function 'Stats'
function SalesStats(sales) {
  this.totalEarnings = getTotalEarningsFrom(sales);
  this.earningsPerMonth = getEarningsPerMonthFrom(sales);
  this.salesmen = getEarningsPerSellerFrom(sales);
}

// vendite totali della nostra azienda
function getTotalEarningsFrom(sales) {
  return sales.reduce(function (totalAmount, sale) {
      totalAmount += sale.amount;
      return totalAmount;
    }, 0);
}

//Vendite per mese
function getEarningsPerMonthFrom(sales) {
  return createNewArrayOfObjectsSortingInputArrayForDifferentValuesOf('date', sales, function (dateValue) {
      // estraggo su ogni valore alla chiave 'date' il numero del mese
      return dateValue.split('/')[1] + '';
    }, function (obj, inputArrayObj, fullInputArray, isNewObj) {//poi
      //Per ogni istanza dell'array origine(sales) in base che
      // sia un nuovo Oggetto per l'array finale eseguo

      //1.gestisco i guadagni totali per venditore
      obj.earnings = (isNewObj) ? inputArrayObj.amount : (inputArrayObj.amount + obj.earnings);

      //2. gestisco il nome del mese grazie a 'moment.js'
      obj.name = (isNewObj) ? moment.months(parseInt(obj.date) - 1) :  obj.name;

      //3. assegno un id con tipo Number al mese
      //corrispondente al suo numero nell'anno
      obj.id = parseInt(obj.date);

      return obj;
    }).sort(function (monthA, monthB) {
      //I mesi sarebbero sparsi a questo punto,
      //uso sort per ordinarli per il numero di mese
      return monthA.id - monthB.id;
    });
}

// il contributo di ogni venditore per l’anno 2017.
// Il valore dovrà essere la percentuale di vendite

function getEarningsPerSellerFrom(sales) {
  var totalEarnings = getTotalEarningsFrom(sales);
  var salesmen =  createNewArrayOfObjectsSortingInputArrayForDifferentValuesOf('salesman', sales, undefined, function (obj, inputArrayObj, fullInputArray, isNewObj) {
      //Per ogni istanza dell'array origine(sales) in base
      //che sia un nuovo Oggetto per l'array finale eseguo

      //1.gestisco i guadagni totali per venditore
      obj.earnings = (isNewObj) ? inputArrayObj.amount : (inputArrayObj.amount + obj.earnings);

      //2.assegno al venditore una proprietà 'sales' contenente un array con tutte le sue vendite
      obj.sales = (isNewObj) ? [inputArrayObj] : obj.sales.concat(inputArrayObj);

      return obj;
    });

  return getEarningsPercentageFor(salesmen, totalEarnings);
}

function getEarningsPercentageFor(sellersArray, totalEarnings) {

  var salesmenCopy = [];

  sellersArray.forEach(function (seller, sellerIndex, sellers) {

    var percentage = (seller.earnings / totalEarnings) * 100;
    salesmenCopy.push({ name: seller.salesman,
                         earnings: seller.earnings,
                         percentage: parseInt(percentage),
                         sales: seller.sales,
                       });
  });

  return salesmenCopy;
}

//l’andamento della nostra azienda durante i quarter.

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
