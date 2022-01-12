
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
  const startText = document.querySelector('.start')
  const loseLife = document.querySelector('.lose_life')
  const losePic = document.querySelector('.lose_pic')
  const menuGamePage = document.querySelector('.menu_game')
  const menuButton = document.querySelector('.menu')
  const menuButtons = document.querySelectorAll('.menu_buttons')
  const characterButtons = document.querySelectorAll('.character_buttons')
  const levelBox = document.querySelector('.level')
  let levelValue = document.querySelector('#level_value')
  const characterPage = document.querySelector('.character_game')
  const resumeButton = document.querySelector('#resume')
  const quitButton = document.querySelector('#quit')
  const threeTwoOneBox = document.querySelector('.three_two_one')
  const threeTwoOneValue = document.querySelector('.three_two_one_value')
  const startGrid = document.querySelector('.start_grid')
  const width = 21 // define the width
  let pacmanMove
  let points = 0
  let lives = 3
  let highScore = 51
  let level = 1
  const cellCount = width * width // define the number of cells on the grid
  let cells = [] // empty array to store our divs that we create
  let cells2 = []
  const pacmanClass = 'pacman' // define the class of the character
  let pacmanStartPosition = 0
  let pacmanCurrentPosition = pacmanStartPosition
  let blocksNoPoints = []
  let specialPoints = []
  let walls = []
  let unScareTimeout
  let milkshake = 0
  let counterTimer
  let timerCount = 3
  let pacmanStartInterval
  let pacmanStartMoveCount = 0
  let key
  let pacmanStartButtons

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
      levelValue.innerHTML = level
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

  // * Make a grid
  function createStartGrid(startPagePacman) {
    const widthStart = 8
    const cellCount2 = widthStart * widthStart
    // starting position of the pacman (refers to an index)
 // use let to track where the pacman currently is (refers to an index)

    for (let i = 0; i < cellCount2; i++) { // for loop to run for every cell, in this case we want 100 cells
      const cell = document.createElement('button') // create the div
      //cell.innerText = i // inner text of the div to be its index
      cell.classList.add('pacman_start_buttons')
      startGrid.appendChild(cell)
      cells2.push(cell) // add the newly created div into our empty array
      
    }
    cells2[startPagePacman].classList.add(pacmanClass)

    const directionsStart = [-1, 1, widthStart, -widthStart]
    let directionStart = directionsStart[Math.floor(Math.random() * directionsStart.length)]

    pacmanStartInterval = setInterval(function(){
      pacmanStartMoveCount++
      if (pacmanStartMoveCount > 3){
        pacmanStartMoveCount = 0
        directionStart = directionsStart[Math.floor(Math.random() * directionsStart.length)]
      }
      cells2[startPagePacman].classList.remove('pacman')

      if (directionStart === -1 && (startPagePacman % widthStart !== 0)){ // if the right arrow is pressed and the cat is not on the right edge
        startPagePacman += directionStart // redefine cat position index to be previous position plus 1
      } else if (directionStart === 1 && (startPagePacman % widthStart !== widthStart - 1)) { // if the left arrow is pressed and the cat is not on the left edge
        startPagePacman += directionStart// redefine cat position index to be previous position minus 1
      } else if (directionStart === -widthStart && (startPagePacman >= widthStart)) { // if the up arrow is pressed and the cat is not on the top row
        startPagePacman += directionStart // redefine cat position index to be previous position minus width
      } else if (directionStart === widthStart && ((startPagePacman + widthStart) <= cellCount2 - 1)) { // if the down arrow is pressed and the cat is not on the bottom row
        startPagePacman += directionStart // redefine cat position index to be previous position plus width
      } else directionStart = directionsStart[Math.floor(Math.random() * directionsStart.length)]
      
      cells2[startPagePacman].classList.add('pacman')

    }, 800)

    pacmanStartButtons = document.querySelectorAll('.pacman_start_buttons')
    // call the function to add the pacman at its starting position
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
      this.isScaredEnding = false
      this.moveCount = 0
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
      cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end')
    })
  }


  function moveGhost(ghost){
    const directions = [-1, 1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function(){
      ghost.moveCount++
      if (ghost.moveCount > 8){
        ghost.moveCount = 0
        direction = directions[Math.floor(Math.random() * directions.length)]
      }
      if (ghost.currentIndex === 210 && direction === -1){
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end')
        ghost.currentIndex = 230
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else if (ghost.currentIndex === 230 && direction === 1){
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end')
        ghost.currentIndex = 210
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else if (!cells[ghost.currentIndex + direction].classList.contains('blue') && !cells[ghost.currentIndex + direction].classList.contains('ghost')){
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end')
        ghost.currentIndex += direction
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else direction = directions[Math.floor(Math.random() * directions.length)]

      scaredGhostEaten(ghost)
      levelUp()
      lifeLost()
      
    }, ghost.speed)

    

    

  }
  // * scared ghost eaten
  function scaredGhostEaten(ghost){
    if (ghost.isScared){
      cells[ghost.currentIndex].classList.remove(ghost.className)
      cells[ghost.currentIndex].classList.add('scared_ghost')
    }
    if (ghost.isScaredEnding){
      cells[ghost.currentIndex].classList.remove(ghost.className)
      cells[ghost.currentIndex].classList.remove('scared_ghost')
      cells[ghost.currentIndex].classList.add('scared_ghost_end')
    }
    if ((ghost.isScared || ghost.isScaredEnding) && cells[ghost.currentIndex].classList.contains('pacman')){
      cells[ghost.currentIndex].classList.remove('ghost', 'scared_ghost', 'scared_ghost_end')
      ghost.currentIndex = ghost.startIndex
      ghost.isScared = false
      ghost.isScaredEnding = false
      cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      if (points === highScore){
        highScore = highScore + 10
      }
      points = points + 10
      pointsValue.innerText = points
      hsValue.innerText = highScore
    }
    pointsEaten()
  }


  // * Points Eaten
  function pointsEaten(){
    if (cells[pacmanCurrentPosition].classList.contains('grid_points')){
      if (points === highScore){
        highScore ++
      }
      points ++
      cells[pacmanCurrentPosition].classList.remove('grid_points')
    }
    pointsValue.innerText = points
    hsValue.innerText = highScore
    
  }

  let count = 0
  let counterTimer2

  function timer(){
    counterTimer2 = setInterval(() => {
      count++
      if (count > 10){
        clearInterval(counterTimer2)
      } else console.log('count', count)
    }, 1000)
  }

  let ScaredEnding
  // * eat Special Points
  function specialPointsEaten(){
    if (cells[pacmanCurrentPosition].classList.value === 'milkshake'){
      milkshake++
      if (milkshake > 1){
        clearTimeout(unScareTimeout)
        clearInterval(counterTimer2)
        clearTimeout(ScaredEnding)
        unScareGhost()
        count = 0
      }
      
      
      if (points === highScore){
        highScore = highScore + 10
      }
      points = points + 10
      cells[pacmanCurrentPosition].classList.remove('milkshake')
      ghosts.forEach(ghost => ghost.isScared = true)
      
      ScaredEnding = setTimeout(function(){
        ghosts.forEach(ghost => {
          if (ghost.isScared === true){
            ghost.isScared = false
            ghost.isScaredEnding = true
          }
        })
      }, 6000)
      unScareTimeout = setTimeout(unScareGhost, 10000)
      timer()
    }
    pointsValue.innerText = points
    hsValue.innerText = highScore

  }
      
 

  //* make ghosts stop being scared
  function unScareGhost(){
    ghosts.forEach(ghost => ghost.isScaredEnding = false)
    ghosts.forEach(ghost => ghost.isScared = false)
  }


  //* reset points
  let pacmanSpeed = 250

  // * Game End

  function levelUp(){
    const cellsWithPoints = cells.filter(divs => divs.classList.contains('grid_points')).length
    if (cellsWithPoints === 0){ 
      
      document.removeEventListener('keydown', handleKeyDown)
      
      ghosts.forEach(ghost => ghost.speed -= 50)
      pacmanSpeed -= 50
      resetCharacters()
      level = level + 1
      milkshake = 0
      threeTwoOneBox.classList.remove('none')
      levelValue.innerText = `${level}`
      threeTwoOneValue.innerText = `LEVEL ${level}`
      threeTwoOneValue.style.fontSize = '70px'   
      
      for (let i = 0; i < cellCount; i++) { // for loop to run for every cell, in this case we want 100 cells
        if (specialPoints.indexOf(i) === -1 && blocksNoPoints.indexOf(i) === -1 && walls.indexOf(i) === -1){
          cells[i].classList.add('grid_points')
        }  else if (specialPoints.indexOf(i) !== -1){
          cells[i].classList.add('milkshake')
        }  
      }
      
      setTimeout(()=> {
        threeTwoOneValue.style.fontSize = '200px'
        threeTwoOneBox.classList.add('none')
        document.addEventListener('keydown', handleKeyDown)
        ghosts.forEach(ghost => moveGhost(ghost)) 
      }, 3000)

    } 
  }

  // * lose life
  function lifeLost(){
    if (cells[pacmanCurrentPosition].classList.contains('ghost') && !cells[pacmanCurrentPosition].classList.contains('scared_ghost') && !cells[pacmanCurrentPosition].classList.contains('scared_ghost_end')){
      lives = lives - 1
      livesValue.innerText = lives
      if (lives > 0){
        document.removeEventListener('keydown', handleKeyDown)
        clearInterval(pacmanMove)
        console.log('YOU LOSE A LIFE')
        loseLife.classList.remove('none') 
        resetCharacters()
        setTimeout(function(){
          loseLife.classList.add('none') 
          ghosts.forEach(ghost => moveGhost(ghost))
          document.addEventListener('keydown', handleKeyDown)
        }, 4000)
      } else if (lives ===0){
        returnToStart()
      }
        
    }
  }

  // * reset characters
  function resetCharacters(){
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    clearInterval(pacmanMove)
    unScareGhost()
    removeGhosts()
    removePacman(pacmanCurrentPosition)
    addPacman(pacmanStartPosition) // call the function to add the pacman at its starting position
    pacmanCurrentPosition = pacmanStartPosition
      
    addGhostsStart()
    
  }
 
  // * Move Pacman


  function handleKeyDown(event) {
    clearInterval(pacmanMove)
    key = event.keyCode
    // store the event.keyCode in a variable to save us repeatedly typing it out
    const left = 37
    const right = 39
    const up = 38
    const down = 40
    
    // remove the pacman from its current position
    // if (cells.filter(divs => divs.classList.value === 'grid_points').length !== 0){
    pacmanMove = setInterval(() => {
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
      ghosts.forEach(ghost => scaredGhostEaten(ghost))
      
      levelUp()
      lifeLost()
      
    }, pacmanSpeed)
    
    
    
    // add pacman to the new position that was defined in the if statement above

    

  }

  
  // * threeTwoOne
  function threeTwoOne(){
    threeTwoOneBox.classList.remove('none')
    threeTwoOneValue.innerText = '3'
    counterTimer = setInterval(() => {
      timerCount--
      if (timerCount === 3){
        threeTwoOneValue.innerText = '3'
      } else if (timerCount === 2){
        threeTwoOneValue.innerText = '2'
      } else if (timerCount === 1){
        threeTwoOneValue.innerText = '1'
      } else {
        threeTwoOneBox.classList.add('none')
        clearInterval(counterTimer)
      }
    }, 1000)
  }


  function chooseCharacter(event){
    if (event.target.id === 'pacman1'){
      pacmanStartPosition = 346 // starting position of the pacman (refers to an index)
      pacmanCurrentPosition = pacmanStartPosition // use let to track where the pacman currently is (refers to an index)
      blocksNoPoints = [346, 156, 177, 176, 175, 174, 195, 216, 237, 198, 199, 200,
        258, 279, 259, 260, 261, 262, 263, 264, 265,
        266, 287, 245, 215, 224, 225, 203, 182, 181,
        180, 179, 158, 178, 218, 219, 220, 221, 222, 402, 24, 416, 38]
       
      specialPoints = [402, 24, 416, 38]
      walls = [44, 45, 65, 66, 47, 48, 49,
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
    } else if (event.target.id === 'pacman2'){
      pacmanStartPosition = 346 // starting position of the pacman (refers to an index)
      pacmanCurrentPosition = pacmanStartPosition // use let to track where the pacman currently is (refers to an index)
      blocksNoPoints = [346, 156, 177, 176, 175, 174, 195, 216, 237, 198, 199, 200,
        258, 279, 259, 260, 261, 262, 263, 264, 265,
        266, 287, 245, 215, 224, 225, 203, 182, 181,
        180, 179, 158, 178, 218, 219, 220, 221, 222, 404, 414, 313, 295]
      specialPoints = [404, 414, 313, 295]
      walls = [44, 45, 65, 66, 47, 48, 49,
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
    } else if (event.target.id === 'pacman3'){
      pacmanStartPosition = 346 // starting position of the pacman (refers to an index)
      pacmanCurrentPosition = pacmanStartPosition // use let to track where the pacman currently is (refers to an index)
      blocksNoPoints = [346, 156, 177, 176, 175, 174, 195, 216, 237, 198, 199, 200,
        258, 279, 259, 260, 261, 262, 263, 264, 265,
        266, 287, 245, 215, 224, 225, 203, 182, 181,
        180, 179, 158, 178, 218, 219, 220, 221, 222, 404, 414, 313, 295]
      specialPoints = [404, 414, 313, 295]
      walls = [44, 45, 65, 66, 47, 48, 49,
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
    }
    clearGrid()
    characterPage.classList.add('none')
    
    createGrid(pacmanStartPosition)
    resetCharacters() 

    threeTwoOne()
    setTimeout(()=> {
      document.addEventListener('keydown', handleKeyDown)
      ghosts.forEach(ghost => moveGhost(ghost)) 
    }, 3000)
    
    
  }



  // * clear grid
  function clearGrid(){
    points = 0
    lives = 3
    cells = []
    grid.innerHTML = ''
    timerCount = 3
    level = 1
    ghosts.forEach(ghost => ghost.speed = 250)
    pacmanSpeed = 250

  }

  // * return to Start Game page
  function returnToStart(){
    clearInterval(pacmanMove)
    ghosts.forEach(ghost => clearInterval(ghost.timerId))
    ghosts.forEach(ghost => ghost.speed = 250)
    pacmanSpeed = 250
    startGamePage.classList.remove('none')
  }

  // * Start game
  function startGame(event){

    if (event.target.classList.contains(pacmanClass)){

      startGamePage.classList.add('none')
      characterPage.classList.remove('none')
    }
  }



  
  
  // * menu game
  function menuGame(){
    clearInterval(pacmanMove)
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
    clearInterval(pacmanMove)
    returnToStart()
  }

  createStartGrid(0)
  // * Event listeners
  // document.addEventListener('keydown', handleKeyDown) // listening for key press

  
  menuButton.addEventListener('click', menuGame)
  resumeButton.addEventListener('click', resumeGame)
  quitButton.addEventListener('click', quitGame)
  characterButtons.forEach(button => button.addEventListener('click', chooseCharacter))
  pacmanStartButtons.forEach(button => button.addEventListener('click', startGame))
  // createGrid(pacmanStartPosition) // pass function the starting position of the pacman
  // console.log(cells[45].classList.value === 'blue')

  
 
}

window.addEventListener('DOMContentLoaded', init)