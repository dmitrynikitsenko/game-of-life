(function() {
  const app = document.querySelector('.app'),
        column = 70;

  // Return random value 1 or 0 but know dead cell or alive
  function deadOrAlive(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // Create new cell in table
  function createElement(el, index, val, column) {
    const newElement = document.createElement(el);

    newElement.classList.add('cell');
    newElement.style.width =  `${ parseFloat(100 / column) }%`;
    newElement.style.height =  `${ parseFloat(100 / column) }vw`;
    newElement.dataset.index = index;
    newElement.dataset.value = val;
    
    return newElement;
  }

  // Render first game table on page
  function firstTable(column) {
    let countCells, el;

    countCells = column * (column / 2);

    for (let i = 0; i < countCells; i++) {
      el = createElement('div', i, deadOrAlive(0, 1), column);
      app.appendChild(el);
    }
  }

  //Create new table before find neighbor
  function createTable(arrValues, column) {
    let el;
    app.innerHTML = '';

    for (let i = 0; i < arrValues.length; i++) {
      el = createElement('div', i, arrValues[i], column);
      app.appendChild(el);
    } 
  }

  // Main render function
  function renderTable() {
    const cells = document.querySelectorAll('.cell');
    let nextTable = [], // Array for cells value 1 or 0
        sum // Count neighbors;

    
    for (let i = 0; i < cells.length; i++) {
      sum = 0;

      // Check if there is an cell. If true - add neighbor
      if ( cells[i - 1] ) {
        sum += +cells[i - 1].dataset.value;
      }
      if ( cells[i + 1] ) {
        sum += +cells[i + 1].dataset.value;
      }
      if ( cells[i + column] ) {
        sum += +cells[i + column].dataset.value;
      }
      if ( cells[i + column + 1] ) {
        sum += +cells[i + column - 1].dataset.value;
      }
      if ( cells[i + column + 2] ) {
        sum += +cells[i + column + 1].dataset.value;
      }
      if ( cells[i - column] ) {
        sum += +cells[i - column].dataset.value;
      }
      if ( cells[i - column - 1] ) {
        sum += +cells[i - column - 1].dataset.value;
      }
      if ( cells[i - column - 2] ) {
        sum += +cells[i - column + 1].dataset.value;
      }

      // Check dead cell or alive
      if (sum < 2 || sum > 3 && +cells[i].dataset.value === 1 ) {
        nextTable.push(0);
      } else if (sum === 2 || sum === 3 && +cells[i].dataset.value === 1) {
        nextTable.push(1);
      } else if (sum === 3 && +cells[i].dataset.value === 0) {
        nextTable.push(1);
      } else {
        nextTable.push(1);
      }

    }

    // Render new table
    createTable(nextTable, column);
  }

  // Init game
  function init() {
    firstTable(column);
    setInterval(renderTable, 200);
  }
  
  init();

})();
