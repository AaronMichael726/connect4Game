// DOM Elements select all the cells elements of class "cells" but not those on the top (above the board)
const allCells = document.querySelectorAll('.cell:not(.row-top)')
const topCells = document.querySelectorAll('.cell.row-top')
const resetButton = document.querySelector('.reset')
const statusSpan = document.querySelector('.status')


/**
 * Placeb the static columns and divs into variables so that you can manipulate
 */
// columns building from the bottom up
const column0 = [allCells[35], allCells[28], allCells[21], allCells[14], allCells[7], allCells[0], topCells[0]]
const column1 = [allCells[36], allCells[29], allCells[22], allCells[15], allCells[8], allCells[1], topCells[1]]
const column2 = [allCells[37], allCells[30], allCells[23], allCells[16], allCells[9], allCells[2], topCells[2]]
const column3 = [allCells[38], allCells[31], allCells[24], allCells[17], allCells[10], allCells[3], topCells[3]]
const column4 = [allCells[39], allCells[32], allCells[25], allCells[18], allCells[11], allCells[4], topCells[4]]
const column5 = [allCells[40], allCells[33], allCells[26], allCells[19], allCells[12], allCells[5], topCells[5]]
const column6 = [allCells[41], allCells[34], allCells[27], allCells[20], allCells[13], allCells[6], topCells[6]]
// array of the columns
const columns = [column0, column1, column2, column3, column4, column5, column6]


// rows
// top row is row above the board
const topRow = [topCells[0], topCells[1], topCells[2], topCells[3], topCells[4], topCells[5], topCells[6]]
const row0 = [allCells[0], allCells[1], allCells[2], allCells[3], allCells[4], allCells[5], allCells[6]]
const row1 = [allCells[7], allCells[8], allCells[9], allCells[10], allCells[11], allCells[12], allCells[13]]
const row2 = [allCells[14], allCells[15], allCells[16], allCells[17], allCells[18], allCells[19], allCells[20]]
const row3 = [allCells[21], allCells[22], allCells[23], allCells[24], allCells[25], allCells[26], allCells[27]]
const row4 = [allCells[28], allCells[29], allCells[30], allCells[31], allCells[32], allCells[33], allCells[34]]
const row5 = [allCells[35], allCells[36], allCells[37], allCells[38], allCells[39], allCells[40], allCells[41]]
// array of the rows
const rows = [row0, row1, row2, row3, row4, row5, topRow]

// initialize variables
let gameIsLive = true
// yellow always goes first based on game rules
let yellowIsNext = true

// Functions
/**
 * get the class list
 */
const getClassListArray = (cell) => {
    const classList = cell.classList
    return [...classList]
}

/**
 * getCellLocation that passes cell as arg to return array with row and col num
 */
const getCellLocation = (cell) => {
    // get classList
    const classList = getClassListArray(cell)

    // access classes, loops through and searches for row class and return all class values
    const rowClass = classList.find(className => className.includes('row'))
    const colClass = classList.find(className => className.includes('col'))

    const rowIndex = rowClass[4]
    const colIndex = colClass[4]

    // convert to int values
    const rowNumber = parseInt(rowIndex, 10)
    const colNumber = parseInt(colIndex, 10)

    return [rowNumber, colNumber]
}

/**
 * function that gives us the first available cell
 */
const getFirstOpenCellForColumn = (colIndex) => {
    // grab the first col associated with the index
    const column = columns[colIndex]
    const columnWithoutTop = column.slice(0, 6)

    // check starting from the bottom if there is a red or yellow clas
    for (const cell of columnWithoutTop){
        const classList = getClassListArray(cell)
        if (!classList.includes('yellow') && !classList.includes('red')){
            return cell;
        }
    }

    return null
}

const clearColorFromTop = (colIndex) => {
    const topCell = topCells[colIndex]
    topCell.classList.remove('yellow')
    topCell.classList.remove('red')
}

const getColorOfCell = (cell) => {
    const classList = getClassListArray(cell) 
    if (classList.includes('yellow')) return 'yellow'
    if (classList.includes('red')) return 'red'
    return null 
}

const checkWinningCells = (cells) => {
    let playerOne = document.getElementById('playerOne')
    let playerTwo = document.getElementById('playerTwo')

    if (cells.length < 4) return 

    gameIsLive = false;
    for (const cell of cells){
        cell.classList.add('win')
    }

    statusSpan.textContent = `${yellowIsNext ? playerOne.value : playerTwo.value} has won!`

    return true
}

// check horizontal function
const checkHorizontal = (cell) => {

    // get the color of the cell
    const color = getColorOfCell(cell)
    if (!color) return
    const [rowIndex, colIndex] = getCellLocation(cell)

    // when we call the function winning cells will have to be global within checkWin and resent between functions
    let winningCells = [cell]
    // in a horizontal check we only need to incriment col -1 because we check left
    let rowToCheck = rowIndex
    let colToCheck = colIndex - 1

    // while loop that is easier to break and check for time complexity
    while (colToCheck >= 0) {
        const cellToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfCell(cellToCheck) === color){
            winningCells.push(cellToCheck)
            colToCheck--
        } else {
            break
        }
    }

    // reset index value
    colToCheck = colIndex + 1
    while (colToCheck <= 6){
        const cellToCheck = rows[rowToCheck][colToCheck]
        if (getColorOfCell(cellToCheck) === color){
            winningCells.push(cellToCheck)
            colToCheck++
        } else {
            break
        }
    }

    let isWinningCombo = checkWinningCells(winningCells)
    return isWinningCombo
}

const checkVertical = (cell) => {

    const color = getColorOfCell(cell)
    if(!color) return
    const [rowIndex, colIndex] = getCellLocation(cell)

    let winningCells = [cell]
    let rowToCheck = rowIndex + 1
    let colToCheck = colIndex

    // there does not exist a scenario where you would need to check the cell above remove that function from checkHorizontal
    while (rowToCheck <= 5) {
        const cellToCheck = rows[rowToCheck][colToCheck]
        if(getColorOfCell(cellToCheck) === color){
            winningCells.push(cellToCheck)
            rowToCheck++
        } else {
            break
        }
    }

    let isWinningCombo = checkWinningCells(winningCells)
    return isWinningCombo
}

const checkPosDiag = (cell) => {
    const color = getColorOfCell(cell)
    if(!color) return
    const [rowIndex, colIndex] = getCellLocation(cell)

    let winningCells = [cell]
    let rowToCheck = rowIndex + 1
    let colToCheck = colIndex - 1

    while ((colToCheck >= 0) && (rowToCheck <= 5)) {
        const cellToCheck = rows[rowToCheck][colToCheck]
        if (getColorOfCell(cellToCheck) === color){
            winningCells.push(cellToCheck)
            rowToCheck++
            colToCheck-- 
        } else {
            break
        }
    }

    rowToCheck = rowIndex - 1
    colToCheck = colIndex + 1
    while ((colToCheck <= 6) && (rowToCheck >= 0)) {
        const cellToCheck = rows[rowToCheck][colToCheck]
        if (getColorOfCell(cellToCheck) === color){
            winningCells.push(cellToCheck)
            rowToCheck--
            colToCheck++
        } else {
            break
        }
    }

    let isWinningCombo = checkWinningCells(winningCells)
    return isWinningCombo

}

const checkNegDiag = (cell) => {
    
    const color = getColorOfCell(cell)
    if(!color) return
    const [rowIndex, colIndex] = getCellLocation(cell)

    let winningCells = [cell]
    let rowToCheck = rowIndex - 1
    let colToCheck = colIndex - 1
   
    // while loop to check the values
    while ((colToCheck >= 0) && (rowToCheck >= 0)) {
        const cellToCheck = rows[rowToCheck][colToCheck]
        if (getColorOfCell(cellToCheck) === color){
            winningCells.push(cellToCheck)
            rowToCheck--
            colToCheck-- 
        } else {
            break
        }
    }

    rowToCheck = rowIndex + 1
    colToCheck = colIndex + 1
    while ((rowToCheck <= 5) && (colToCheck <= 6)) {
        const cellToCheck = rows[rowToCheck][colToCheck]
        if (getColorOfCell(cellToCheck) === color){
            winningCells.push(cellToCheck)
            rowToCheck++
            colToCheck++
        } else {
            break
        }
    }

    let isWinningCombo = checkWinningCells(winningCells)
    return isWinningCombo

}


// check the status of the game. takes cell and checks cells surrounding
const checkStatusOfGame = (cell) => {

    
    if (checkVertical(cell)) return
    if (checkHorizontal(cell)) return
    if (checkPosDiag(cell)) return
    if (checkNegDiag(cell)) return

    // check to see if there is a tie
    const rowsWithoutTop = rows.slice(0,6)
    for (const row of rowsWithoutTop){
        for (cell of row){
            const classList = getClassListArray(cell)
            if(!classList.includes('yellow') && !classList.includes('red')){
                return
            }
        }
    }

    gameIsLive = false
    statusSpan.textContent = "Game is a tie!"

}

// add event handlers
// handleMouseOver when we mouse over we want to grab top cell and place puck/token
const handleCellMouseOver = (e) => {
    // if game is over do nothing
    if(!gameIsLive) return

    const cell = e.target
    
    // destructuring element, destructure the elements in an array
    const [rowIndex, colIndex] = getCellLocation(cell)

    // find the top cell
    const topCell = topCells[colIndex]

    // ternary operator (if/else shorthand)
    topCell.classList.add(yellowIsNext ? 'yellow' : 'red')
}

// remove the toke as you hover other another mouse issue
const handleCellMouseOut = (e) => {
    const cell = e.target
    const [rowIndex, colIndex] = getCellLocation(cell)

    clearColorFromTop(colIndex)
}

// add click event 
const handleCellClick = (e) => {
    if(!gameIsLive) return 

    const cell = e.target
    const [rowIndex, colIndex] = getCellLocation(cell)

    const openCell = getFirstOpenCellForColumn(colIndex)

    if (!openCell) return

    // fill the open cell and give class
    openCell.classList.add(yellowIsNext ? 'yellow' : 'red')

    checkStatusOfGame(openCell)
    // change the color and check the status of the game
    yellowIsNext = !yellowIsNext
    clearColorFromTop(colIndex)
    
    if (gameIsLive){
        const topCell = topCells[colIndex]
        topCell.classList.add(yellowIsNext ? 'yellow': 'red')
    }
}

// adding some event listeners to the cells/rows 
for (const row of rows){
    for (const cell of row){
        // add mousover event listener
        cell.addEventListener('mouseover', handleCellMouseOver)
        cell.addEventListener('mouseout', handleCellMouseOut)
        cell.addEventListener('click', handleCellClick)
    }
}

// reset button
resetButton.addEventListener('click', () => {
    // for to reset class divs 
    for (const row of rows){
        for (const cell of row){
            cell.classList.remove('red')
            cell.classList.remove('yellow')
            cell.classList.remove('win')
        }
    }

    gameIsLive = true 
    yellowIsNext = true
    statusSpan.textContent = ''
})


