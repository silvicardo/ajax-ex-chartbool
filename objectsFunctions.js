/**********************************************/
/**********************************************/
/*********** - objectFunctions.js - ***********/
/**********************************************/
/**********************************************/


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

  var finaleArrOfObjects = [];
  var id = 0;
  var outerVarForHandler = undefined;
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
      finaleArrOfObjects.push((objHandlerForEachIteration !== undefined) ? objHandlerForEachIteration(newObj, currentObj, arrayOfObjects, isNewObj, i, outerVarForHandler) : newObj);

    } else {
      var isNewObj = false;
      var objToHandle = finaleArrOfObjects[indexInFinalArrOfObjects];
      objToHandle = objHandlerForEachIteration(objToHandle, currentObj, arrayOfObjects, isNewObj, i, outerVarForHandler);
    }

  }
  return finaleArrOfObjects;
}
