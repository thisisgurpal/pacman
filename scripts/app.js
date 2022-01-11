
function init() {

  // * Variables
  const grid = document.querySelector('.grid') // get the grid element
  const pointsBox = document.querySelector('#points_box')
  const pointsValue = document.querySelector('#points_value')
  const hsBox = document.querySelector('#hs_box')
  const hsValue = document.querySelector('#hs_value')
  const livesValue = document.querySelector('#lives_value')
  const livesBox = document.querySelector('#lives_box')
  const startGamePage = document.querySelector('.start_game')
  const startButtons = document.querySelectorAll('.start_buttons')
  const startButton = document.querySelector('#start')
  const loseLife = document.querySelector('.lose_life')
  const losePic = document.querySelector('.lose_pic')
  const menuGamePage = document.querySelector('.menu_game')
  const menuButton = document.querySelector('.menu')
  const menuButtons = document.querySelectorAll('.menu_buttons')
  const resumeButton = document.querySelector('#resume')
  const quitButton = document.querySelector('#quit')
  const width = 21 // define the width
  let points = 0
  let lives = 3
  let highScore = 51
  const cellCount = width * width // define the number of cells on the grid
  let cells = [] // empty array to store our divs that we create
  const pacmanClass = 'pacman' // define the class of the character
  const pacmanStartPosition = 346 // starting position of the pacman (refers to an index)
  let pacmanCurrentPosition = pacmanStartPosition // use let to track where the pacman currently is (refers to an index)
  const blocksNoPoints = [346, 156, 177, 176, 175, 174, 195, 216, 237, 198, 199, 200,
    258, 279, 259, 260, 261, 262, 263, 264, 265,
    266, 287, 245, 215, 224, 225, 203, 182, 181,
    180, 179, 158, 178, 218, 219, 220, 221, 222, 404, 414, 313, 295]
  const specialPoints = [404, 414, 313, 295]
  const walls = [44, 45, 65, 66, 47, 48, 49,
    50, 31, 52, 73, 68, 69, 70, 71, 107, 108,
    128, 129, 54, 55, 56, 57, 75, 76, 77, 78,
    59, 60, 80, 81, 112, 113, 114, 115, 116,
    117, 118, 136, 157, 110, 131, 152, 173,
    194, 153, 154, 155, 169, 170, 171, 190,
    191, 192, 159, 160, 161, 162, 141,120, 183,
    204, 122, 123, 143, 144, 185, 186, 187, 206,
    207, 208, 196, 197, 201, 202,
    223, 244, 243, 242, 241, 240, 239, 238, 217, 
    232, 233, 234, 253, 254, 255, 248, 249, 250,
    269, 270, 271, 296, 297, 318, 339, 380, 381,
    382, 383, 362, 320, 321, 322, 323, 236, 257,
    278, 337, 280, 281, 282, 283, 284, 285, 286,
    246, 267, 288, 312, 311, 332, 353, 355, 330,
    330, 329, 328, 327, 304, 325, 364, 365, 385,
    386, 367, 388, 396, 395, 394, 393, 372, 369,
    370, 390, 391
  ]

  for (let i = 0; i < width; i++) {
    walls.push(i)
    walls.push(i + (Math.pow(width, 2) - width))
    if (i === 0){
      for (let a = 1; a < (width - 1) / 2; a++){
        walls.push(width * a)
        walls.push((width * a) + (width - 1))
        walls.push(width * (a + 10))
        walls.push((width * (a + 10)) + (width - 1))
      }
    }
  }

 

  // * Make a grid
  function createGrid(pacmanStartPosition) {
    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell, in this case we want 100 cells
      const cell = document.createElement('div') // create the div
      //cell.innerText = i // inner text of the div to be its index
      cell.setAttribute('id', i)
      grid.appendChild(cell) // make the cell a child of the grid element we grabbed above
      pointsValue.innerText = points
      hsValue.innerText = highScore
      livesValue.innerText = lives
      if (walls.indexOf(i) !== -1){
        cell.classList.add('blue')
      } else if (blocksNoPoints.indexOf(i) === -1){
        cell.classList.add('grid_points')
      }  else if (specialPoints.indexOf(i) !== -1){
        cell.classList.add('milkshake')
      }  
      

      cells.push(cell) // add the newly created div into our empty array
      
    }
    addPacman(pacmanStartPosition) // call the function to add the pacman at its starting position
    addGhostsStart()
    
    ghosts.forEach(ghost => moveGhost(ghost))
  }

  

  // * Add pacman to grid
  function addPacman(position) { // takes argument so function is reusable
    cells[position].classList.add(pacmanClass) // use position as index to pick the corresponding div from the array of cells and add the class of pacman
  }

  // * Remove pacman from the grid
  function removePacman(position) {
    cells[position].classList.remove(pacmanClass)
  }

  // * create ghost template
  class Ghost {
    constructor(className, startIndex, speed){
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
      this.isScared = false
    }
  }

  const ghosts = [
    new Ghost('blinky', 218, 250),
    new Ghost('pinky', 219, 250),
    new Ghost('inky', 220, 250),
    new Ghost('clyde', 221, 250)
  ]

  function addGhostsStart(){
    
    ghosts.forEach(ghost => {
      ghost.currentIndex = ghost.startIndex
      cells[ghost.startIndex].classList.add(ghost.className)
      cells[ghost.startIndex].classList.add('ghost')
    })
  }

  function removeGhosts(){
    
    ghosts.forEach(ghost => {
      cells[ghost.currentIndex].classList.remove(ghost.className)
      cells[ghost.currentIndex].classList.remove('ghost')
    })
  }
  

  function moveGhost(ghost){
    const directions = [-1, 1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function(){
      if (!cells[ghost.currentIndex + direction].classList.contains('blue') && !cells[ghost.currentIndex + direction].classList.contains('ghost')){
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost')
        ghost.currentIndex += direction
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      scaredGhostEaten(ghost)

      gameEnd()
      lifeLost()
    }, ghost.speed)
  }
  // * scared ghost eaten
  function scaredGhostEaten(ghost){
    if (ghost.isScared){
      cells[ghost.currentIndex].classList.remove(ghost.className)
      cells[ghost.currentIndex].classList.add('scared_ghost')
    
    }
    if (ghost.isScared && cells[ghost.currentIndex].classList.contains('pacman')){
      cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost')
      ghost.currentIndex = ghost.startIndex
      cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      if (points === highScore){
        highScore = highScore + 10
      }
      points = points + 10
      pointsValue.innerText = points
      hsValue.innerText = highScore
    }
  }


  // * Points Eaten
  function pointsEaten(){
    if (cells[pacmanCurrentPosition].classList.value === 'grid_points'){
      if (points === highScore){
        highScore ++
      }
      points ++
      cells[pacmanCurrentPosition].classList.remove('grid_points')
    }
    pointsValue.innerText = points
    hsValue.innerText = highScore
    
  }

  // * eat Special Points
  function specialPointsEaten(){
    if (cells[pacmanCurrentPosition].classList.value === 'milkshake'){
      if (points === highScore){
        highScore = highScore + 10
      }
      points = points + 10
      
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unScareGhost, 10000)
      cells[pacmanCurrentPosition].classList.remove('milkshake')
    } 
    pointsValue.innerText = points
    hsValue.innerText = highScore
  }

  //* make ghosts stop being scared
  function unScareGhost(){
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  // * Game End

  function gameEnd(){
    const cellsWithPoints = cells.filter(divs => divs.classList.value === 'grid_points').length
    if (cellsWithPoints === 0){
      console.log('YOU WIN, GAME ENED') 
      document.removeEventListener('keydown', handleKeyDown)
    } 
  
    if (lives < 0){
      returnToStart()
    }
  }

  // * lose life
  function lifeLost(){
    if (cells[pacmanCurrentPosition].classList.contains('ghost') && !cells[pacmanCurrentPosition].classList.contains('scared_ghost')){
      lives = lives - 1
      livesValue.innerText = lives
      console.log('YOU LOSE A LIFE')
      loseLife.classList.remove('none') 
      resetCharacters()
      setTimeout(function(){
        loseLife.classList.add('none') 
        ghosts.forEach(ghost => moveGhost(ghost))
      }, 4000)  
    }
  }

  // * reset characters
  function resetCharacters(){
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    removeGhosts()
    removePacman(pacmanCurrentPosition)
    addPacman(pacmanStartPosition) // call the function to add the pacman at its starting position
    pacmanCurrentPosition = pacmanStartPosition
      
    addGhostsStart()
    
  }

  // * Move Pacman
  function handleKeyDown(event) {
    
    const key = event.keyCode
    // store the event.keyCode in a variable to save us repeatedly typing it out
    const left = 37
    const right = 39
    const up = 38
    const down = 40
    
    // remove the pacman from its current position
    // if (cells.filter(divs => divs.classList.value === 'grid_points').length !== 0){
    ghosts.forEach(ghost => scaredGhostEaten(ghost))
    removePacman(pacmanCurrentPosition)
    if (key === right && pacmanCurrentPosition === (width * ((width - 1) / 2) + (width - 1))){
      pacmanCurrentPosition = (width * ((width - 1) / 2))
    } else if (key === right && cells[pacmanCurrentPosition + 1].classList.value !== 'blue'){ // if the right arrow is pressed and the pacman is not on the right edge
      pacmanCurrentPosition++ // redefine pacman position index to be previous position plus 1
    } else if (key === left && cells[pacmanCurrentPosition - 1].classList.value !== 'blue') { // if the left arrow is pressed and the pacman is not on the left edge
      pacmanCurrentPosition-- // redefine pacman position index to be previous position minus 1
    } else if (key === left && pacmanCurrentPosition === (width * ((width - 1) / 2))){
      pacmanCurrentPosition = (width * ((width - 1) / 2) + (width - 1))
    } else if (key === up && cells[pacmanCurrentPosition - width].classList.value !== 'blue') { // if the up arrow is pressed and the pacman is not on the top row
      pacmanCurrentPosition -= width // redefine pacman position index to be previous position minus width
    } else if (key === down && cells[pacmanCurrentPosition + width].classList.value !== 'blue') { // if the down arrow is pressed and the pacman is not on the bottom row
      pacmanCurrentPosition += width // redefine pacman position index to be previous position plus width
    }
      
    pointsEaten()
    specialPointsEaten()
    addPacman(pacmanCurrentPosition) 
    // if (event.keycode.length ){
    //   clearInterval(pacmanInterval)
    // }
      
    
    
    // }

    
    gameEnd()
    lifeLost()
    // add pacman to the new position that was defined in the if statement above

    

  }

  // * clear grid
  function clearGrid(){
    points = 0
    lives = 3
    cells = []
    grid.innerHTML = ''
  }

  // * return to Start Game page
  function returnToStart(){
    startGamePage.classList.remove('none')
  }

  // * Start game
  function startGame(){
    clearGrid()
    startGamePage.classList.add('none')
    document.addEventListener('keydown', handleKeyDown)
    createGrid(pacmanStartPosition)
    resetCharacters() 
    ghosts.forEach(ghost => moveGhost(ghost)) 
    
  }
  
  // * menu game
  function menuGame(){
    menuGamePage.classList.remove('none')
    document.removeEventListener('keydown', handleKeyDown)
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
  }

  // * resume game
  function resumeGame(){
    menuGamePage.classList.add('none')
    document.addEventListener('keydown', handleKeyDown)
    ghosts.forEach(ghost => moveGhost(ghost))
  }

  // * quit game
  function quitGame(){
    menuGamePage.classList.add('none')
    returnToStart()
  }

  // * Event listeners
  // document.addEventListener('keydown', handleKeyDown) // listening for key press
  startButton.addEventListener('click', startGame)
  menuButton.addEventListener('click', menuGame)
  resumeButton.addEventListener('click', resumeGame)
  quitButton.addEventListener('click', quitGame)
  // createGrid(pacmanStartPosition) // pass function the starting position of the pacman
  // console.log(cells[45].classList.value === 'blue')

  
 
}

window.addEventListener('DOMContentLoaded', init)