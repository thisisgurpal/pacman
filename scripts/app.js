
function init() {

  //************************************************************************************* */
  //*Elements

  const grid = document.querySelector('.grid') // get the grid element
  const pointsValue = document.querySelector('#points_value')
  const hsValue = document.querySelector('#hs_value')
  const livesValue = document.querySelector('#lives_value')
  const startGamePage = document.querySelector('.start_game')
  const loseLife = document.querySelector('.lose_life')
  const menuGamePage = document.querySelector('.menu_game')
  const menuButton = document.querySelector('.menu')
  const characterButtons = document.querySelectorAll('.character_buttons')
  const levelValue = document.querySelector('#level_value')
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
  const cells2 = []
  let pacmanClass = 'pacman' // define the class of the character
  const pacmanStartClass = 'pacman_start' // define the class of the character
  let pacmanStartPosition = 0
  let pacmanCurrentPosition = pacmanStartPosition
  let blocksNoPoints = []
  let specialPoints = []
  let walls = []
  let unScareTimeout
  let milkshake = 0
  let counterTimer
  let timerCount = 3
  let pacmanStartMoveCount = 0
  let key
  let pacmanStartButtons
  let ScaredEnding
  let pacmanSpeed = 250

  //************************************************************************************* */
  //*Functions

  // * make a grid for the game
  function createGrid(pacmanStartPosition) {

    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell
      const cell = document.createElement('div') // create the div
      //cell.innerText = i // inner text of the div to be its index
      cell.setAttribute('id', i) // add id attribute
      grid.appendChild(cell) // make the cell a child of the grid element we grabbed above
      pointsValue.innerText = points // add points value to html
      hsValue.innerText = highScore // add high score value to html
      livesValue.innerText = lives // add lives value to html
      levelValue.innerHTML = level // add level value to html
      if (walls.indexOf(i) !== -1){ // if i in walls array give it a class for blue wall
        cell.classList.add('blue')
      } else if (blocksNoPoints.indexOf(i) === -1){ // else if i is not in blocksNoPoints array, add points by giving class
        cell.classList.add('grid_points')
      }  else if (specialPoints.indexOf(i) !== -1){ // else if i is in array specialPoints give class for special point
        cell.classList.add('milkshake')
      }  
    
      cells.push(cell) // add the newly created div into our empty array

    }

    addPacman(pacmanStartPosition) // call the function to add the pacman at its starting position
    addGhostsStart() // call the function to add ghosts to starting position

  }

  // * make a grid for start page
  function createStartGrid(startPagePacman) {
    const widthStart = 10 // width of grid
    const cellCount2 = widthStart * widthStart // total cell counts of grid
    for (let i = 0; i < cellCount2; i++) { // for loop to run for every cell
      const cell = document.createElement('button') // create the div
      cell.classList.add('pacman_start_buttons') // give each cell a class 
      startGrid.appendChild(cell) // append cell to div
      cells2.push(cell) // add the newly created div into our empty array
      
    }
    cells2[startPagePacman].classList.add(pacmanStartClass) // add pacman at starting point

    const directionsStart = [-1, 1, widthStart, -widthStart] // array for direction of start page pacman
    let directionStart = directionsStart[Math.floor(Math.random() * directionsStart.length)] // choose random direction

    setInterval(function(){ // set interval for start page pacman to move around
      pacmanStartMoveCount++ // add 1 to pacman move count
      if (pacmanStartMoveCount > 4){ // once pacman moved 3 from interval choose a new random direction
        pacmanStartMoveCount = 0 // restart pacman moved count
        directionStart = directionsStart[Math.floor(Math.random() * directionsStart.length)] //choose new random direction
      }
      cells2[startPagePacman].classList.remove(pacmanStartClass) // remove start page pacman from current index

      // create logic for start page pacman to move in a direction but to not move outside grid
      if (directionStart === -1 && (startPagePacman % widthStart !== 0)){ 
        startPagePacman += directionStart
      } else if (directionStart === 1 && (startPagePacman % widthStart !== widthStart - 1)) { 
        startPagePacman += directionStart
      } else if (directionStart === -widthStart && (startPagePacman >= widthStart)) { 
        startPagePacman += directionStart 
      } else if (directionStart === widthStart && ((startPagePacman + widthStart) <= cellCount2 - 1)) { 
        startPagePacman += directionStart 
      } else directionStart = directionsStart[Math.floor(Math.random() * directionsStart.length)]
      
      cells2[startPagePacman].classList.add(pacmanStartClass) // add pacman to new direction

    }, 800) // every 8 seconds

    pacmanStartButtons = document.querySelectorAll('.pacman_start_buttons') // select all of the start page grid buttons

  }
  
  
  // * add pacman to grid
  function addPacman(position) {
    cells[position].classList.add(pacmanClass) // add pacman to given positon
  }

  // * remove pacman from the grid
  function removePacman(position) {
    cells[position].classList.remove(pacmanClass) // remove pacman from given position
  }

  // * create ghost template
  class Ghost { // create class for multiple ghosts
    constructor(className, startIndex, speed){ // constructor for ghost class name, starting position and speed
      this.className = className // class name
      this.startIndex = startIndex // starting position
      this.speed = speed // speed to move
      this.currentIndex = startIndex // current index
      this.timerId = NaN // timerId for interval of ghosts
      this.isScared = false // is ghost scared
      this.isScaredEnding = false // is ghost scared about to end
      this.moveCount = 0 // count number of ghost moves
    }
  }

  const ghosts = [ // add ghosts
    new Ghost('blinky', 218, 250),
    new Ghost('pinky', 219, 250),
    new Ghost('inky', 220, 250),
    new Ghost('clyde', 221, 250)
  ]

  // * add ghosts to grid
  function addGhostsStart(){
    ghosts.forEach(ghost => { // for each of the ghosts
      ghost.currentIndex = ghost.startIndex // make there current index the starting point of ghosts
      cells[ghost.startIndex].classList.add(ghost.className) // at this starting position add ghost class name
      cells[ghost.startIndex].classList.add('ghost') // at this starting point add class ghost
    })
  }

  // * remove ghost from grid
  function removeGhosts(){
    ghosts.forEach(ghost => { // for each ghost
      cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end') // remove all ghost classes possible
    })
  }

  // * move ghosts around grid
  function moveGhost(ghost){ 
    const directions = [-1, 1, width, -width] // create array for direction possibilities
    let direction = directions[Math.floor(Math.random() * directions.length)] // pick random direction

    ghost.timerId = setInterval(function(){ // create interval for ghost
      ghost.moveCount++ // add 1 to ghost move count
      if (ghost.moveCount > 7){ // when ghost has loop through 7 moves get a new random direction (prevents the ghost moving the same way all the time) 
        ghost.moveCount = 0 // reset the move count
        direction = directions[Math.floor(Math.random() * directions.length)] // give a new random direction
      }
      if (ghost.currentIndex === 210 && direction === -1){ // if ghost in middle left and direction is left
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end') // remove ghost
        ghost.currentIndex = 230 // create new index to middle right
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost') // add ghost to middle right
      } else if (ghost.currentIndex === 230 && direction === 1){ // opposit of above
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end')
        ghost.currentIndex = 210
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else if (!cells[ghost.currentIndex + direction].classList.contains('blue') && !cells[ghost.currentIndex + direction].classList.contains('ghost')){ // if ghost plus direction is not a wall or another ghost
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end') // remove ghost
        ghost.currentIndex += direction // calculate new index
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost') // add ghost to new index
      } else direction = directions[Math.floor(Math.random() * directions.length)] // else choose another random direction

      scaredGhostEaten(ghost) // add logic if scared ghost moves into pacman it gets reset
      // levelUp() // add logic 
      lifeLost() // adds logic so if ghost moves into pacman a life gets lost
      
    }, ghost.speed)

    

    

  }
  // * scared ghost eaten
  function scaredGhostEaten(ghost){ 
    if (ghost.isScared){ // if ghost is currently scared
      cells[ghost.currentIndex].classList.remove(ghost.className) // remove current ghost class name
      cells[ghost.currentIndex].classList.add('scared_ghost') // add scared ghost class which changes it's colour
    }
    if (ghost.isScaredEnding){ // if scared ghost is about to end
      cells[ghost.currentIndex].classList.remove(ghost.className) // REMOVE LINE
      cells[ghost.currentIndex].classList.remove('scared_ghost') // remove current class scared ghost
      cells[ghost.currentIndex].classList.add('scared_ghost_end') // add class scared ghost ending to change colour
    }
    if ((ghost.isScared || ghost.isScaredEnding) && cells[ghost.currentIndex].classList.contains('pacman')){ // if ghost is scared or scared ending and is in same position as pacman
      cells[ghost.currentIndex].classList.remove('ghost', 'scared_ghost', 'scared_ghost_end') // remove ghost from current position
      ghost.currentIndex = ghost.startIndex // give current index the starting position of ghost
      ghost.isScared = false // make ghost un scared
      ghost.isScaredEnding = false // make ghost un scared ending
      cells[ghost.currentIndex].classList.add(ghost.className, 'ghost') // add ghost to starting postion 
      if (points === highScore){ // if points is the same as high score and pacman eats scared ghost
        highScore = highScore + 10 // increase high score
      }
      points = points + 10 // increase points
      // pointsValue.innerText = points // update html value
      // hsValue.innerText = highScore // update html value
      pointsEaten() 
    }
    // pointsEaten() // add logic 
  }


  // * points eaten logic
  function pointsEaten(){
    if (cells[pacmanCurrentPosition].classList.contains('grid_points')){ // if pacman in same cell with class grid points
      if (points === highScore){ // if points equals high score, update high score with points
        highScore ++ // increase value
      }
      points ++ // increase value
      cells[pacmanCurrentPosition].classList.remove('grid_points') // remove point from cell pacman is in
    }
    pointsValue.innerText = points // update html
    hsValue.innerText = highScore // update html
    
  }

  let count = 0 // count to review logic
  let counterTimer2 // timer to review logic

  function timer(){ // timer counting to 10
    counterTimer2 = setInterval(() => {
      count++
      if (count > 10){
        clearInterval(counterTimer2)
      } else console.log('count', count)
    }, 1000)
  }

  // * eat special points
  function specialPointsEaten(){
    if (cells[pacmanCurrentPosition].classList.value === 'milkshake'){ // when pacman in same cell as special point
      milkshake++ // count how many special points eaten
      if (milkshake > 1){ // if special points eaten greater than 1 reset scared ghosts to normal before starting intervals again
        clearTimeout(unScareTimeout) // clear timer to un scare ghosts
        clearInterval(counterTimer2) // reset counter logic to 10
        clearTimeout(ScaredEnding) // clear timer to un scare 
        unScareGhost() // unscare ghosts
        count = 0 // reset count of timer
      }
      
      
      if (points === highScore){ // if points equal high score then update both
        highScore = highScore + 10 // increase value
      }
      points = points + 10 // increase value
      cells[pacmanCurrentPosition].classList.remove('milkshake') // remove special point once eaten
      ghosts.forEach(ghost => ghost.isScared = true) // make ghosts scared once eaten special point
      
      ScaredEnding = setTimeout(function(){ // timer so that when ghost is scared after 6 seconds it turns to scared ending
        ghosts.forEach(ghost => {
          if (ghost.isScared === true){ // if ghost scared
            ghost.isScared = false // make ghost un scared
            ghost.isScaredEnding = true // make ghost scared ending
          }
        })
      }, 6000)
      unScareTimeout = setTimeout(unScareGhost, 10000) // un scare ghosts after 10 seconds
      timer() // counter timer of scared ghosts
    }
    pointsValue.innerText = points // update html
    hsValue.innerText = highScore // update html
  }
      
 

  //* make ghosts un scared
  function unScareGhost(){
    ghosts.forEach(ghost => ghost.isScaredEnding = false) // un scare ending each ghost
    ghosts.forEach(ghost => ghost.isScared = false) // unn scare each ghost
  }

  // * next level function
  function levelUp(){
    const cellsWithPoints = cells.filter(divs => divs.classList.contains('grid_points')).length // counts number of points left on grid
    if (cellsWithPoints === 0){ // if all points gone
      document.removeEventListener('keydown', handleKeyDown) // remove key event listener
      ghosts.forEach(ghost => ghost.speed -= 50) // increase speed of ghost for next level
      pacmanSpeed -= 50 // increase speed of pacman for next level
      resetCharacters() // reset all character to normal starting positions
      level = level + 1 // increase counts of level
      milkshake = 0 // reset number of special points eaten
      threeTwoOneBox.classList.remove('none') // make next leve page visible
      levelValue.innerText = `${level}` // update level value
      threeTwoOneValue.innerText = `LEVEL ${level}` // show level on next level page
      threeTwoOneValue.style.fontSize = '70px' // update font size
      
      for (let i = 0; i < cellCount; i++) { // for loop to run for every cell
        if (specialPoints.indexOf(i) === -1 && blocksNoPoints.indexOf(i) === -1 && walls.indexOf(i) === -1){ // select grid cells where points eaten
          cells[i].classList.add('grid_points') // add points again for next level
        }  else if (specialPoints.indexOf(i) !== -1){ // select grid cells of special points
          cells[i].classList.add('milkshake') // add special points for next level
        }  
      }
      
      setTimeout(()=> { // interval to remove next level page and start next level
        threeTwoOneValue.style.fontSize = '200px' // reset font size
        threeTwoOneBox.classList.add('none') // remove level up page
        document.addEventListener('keydown', handleKeyDown) // add event listener for keys
        ghosts.forEach(ghost => moveGhost(ghost)) // move ghost
      }, 3000)

    } 
  }

  // * lose life logic
  function lifeLost(){
    if (cells[pacmanCurrentPosition].classList.contains('ghost') && !cells[pacmanCurrentPosition].classList.contains('scared_ghost') && !cells[pacmanCurrentPosition].classList.contains('scared_ghost_end')){ // if cell of pacman has a ghost which is not scared
      lives = lives - 1 // lose a life
      livesValue.innerText = lives // update html
      if (lives > 0){ // if still have lives
        document.removeEventListener('keydown', handleKeyDown) // remove key event listener
        // clearInterval(pacmanMove) // clear pacman interval
        resetCharacters()
        console.log('YOU LOSE A LIFE') // log
        loseLife.classList.remove('none') // lose life page make visible
        // resetCharacters() // reset all characters to start
        setTimeout(function(){ // timer function
          loseLife.classList.add('none') // remove lose life page
          ghosts.forEach(ghost => moveGhost(ghost)) // move ghosts 
          document.addEventListener('keydown', handleKeyDown) // add key event listener
        }, 4000)
      } else if (lives === 0){ // if all lives gone
        returnToStart() // return to start page
      }    
    }
  }

  // * reset characters
  function resetCharacters(){
    ghosts.forEach(ghost => clearInterval(ghost.timerId)) // clear ghost moving interval
    clearInterval(pacmanMove) // clear pacman moving timer
    unScareGhost() // un scare ghosts
    removeGhosts() // remove ghost from current index
    removePacman(pacmanCurrentPosition) // remove pacman from current index
    addPacman(pacmanStartPosition) // call the function to add the pacman at its starting position
    pacmanCurrentPosition = pacmanStartPosition // reset pacman current position
    addGhostsStart() // add ghost back to starting position
    
  }
 
  // * keys to move pacman
  function handleKeyDown(event) {
    clearInterval(pacmanMove) // clear interval when new key entered
    key = event.keyCode // determine which key pressed
    //key codes
    const left = 37
    const right = 39
    const up = 38
    const down = 40
    
    pacmanMove = setInterval(() => { // interval to move pacman after certain time
      ghosts.forEach(ghost => scaredGhostEaten(ghost)) // if current position is a scared ghost logic
      removePacman(pacmanCurrentPosition) // remove pacman from current position
      if (key === right && pacmanCurrentPosition === (width * ((width - 1) / 2) + (width - 1))){ // if the right arrow at middle right
        pacmanCurrentPosition = (width * ((width - 1) / 2)) // pacman position to middle left
      } else if (key === right && cells[pacmanCurrentPosition + 1].classList.value !== 'blue'){ // if the right arrow is pressed and wall not right
        pacmanCurrentPosition++ // redefine pacman position index to be previous position plus 1
      } else if (key === left && cells[pacmanCurrentPosition - 1].classList.value !== 'blue') { // if the left arrow is pressed and wall not left
        pacmanCurrentPosition-- // redefine pacman position index to be previous position minus 1
      } else if (key === left && pacmanCurrentPosition === (width * ((width - 1) / 2))){
        pacmanCurrentPosition = (width * ((width - 1) / 2) + (width - 1))
      } else if (key === up && cells[pacmanCurrentPosition - width].classList.value !== 'blue') { // if the up arrow is pressed and wall not above
        pacmanCurrentPosition -= width // redefine pacman position index to be previous position minus width
      } else if (key === down && cells[pacmanCurrentPosition + width].classList.value !== 'blue') { // if the down arrow is pressed and wall not below
        pacmanCurrentPosition += width // redefine pacman position index to be previous position plus width
      }
      pointsEaten() // eat points whilst pacman moves
      specialPointsEaten() // eat special points whilst pacman moves
      addPacman(pacmanCurrentPosition) // add pacman to new position 
      ghosts.forEach(ghost => scaredGhostEaten(ghost)) // if new position is a scared ghost logic
      levelUp() // level up logic when all points eaten
      lifeLost() // lose a life logic when collide with ghost
      
    }, pacmanSpeed)
  }

  
  // * threeTwoOne function to count down game start
  function threeTwoOne(){
    threeTwoOneBox.classList.remove('none') // make countdown page visible
    threeTwoOneValue.innerText = '3' // add html
    counterTimer = setInterval(() => { // interval every second to count down
      timerCount-- // timer = timer - 1
      if (timerCount === 3){
        threeTwoOneValue.innerText = '3'
      } else if (timerCount === 2){
        threeTwoOneValue.innerText = '2'
      } else if (timerCount === 1){
        threeTwoOneValue.innerText = '1'
      } else {
        threeTwoOneBox.classList.add('none') // remove countdown page after 3 seconds
        clearInterval(counterTimer) // clear interval countdown after 3 seconds
        timerCount = 3 // reset timer
      }
    }, 1000)
  }

  // * different characters and maps
  function chooseCharacter(event){
    if (event.target.id === 'pacman1'){
      pacmanClass = 'patrick'
      pacmanStartPosition = 346 // starting position of the pacman (refers to an index)
      pacmanCurrentPosition = pacmanStartPosition // use let to track where the pacman currently is (refers to an index)
      blocksNoPoints = [346, 156, 177, 176, 175, 174, 195, 216, 237, 198, 199, 200,
        258, 279, 259, 260, 261, 262, 263, 264, 265,
        266, 287, 245, 215, 224, 225, 203, 182, 181,
        180, 179, 158, 178, 218, 219, 220, 221, 222, 402, 24, 416, 38] // cells that don't have points
       
      specialPoints = [402, 24, 416, 38] // cells that have special points
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
      ] // cells with walls

      // add border cells to walls array
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

    clearGrid() // clear grid and reset orignal values
    characterPage.classList.add('none') // remove character page
    createGrid(pacmanStartPosition) // create grid
    resetCharacters() // reset characters to starting positions
    threeTwoOne() // countdown to game
    setTimeout(()=> { // timer to move ghosts and enable keys 
      document.addEventListener('keydown', handleKeyDown) // enable keys to move pacman
      ghosts.forEach(ghost => moveGhost(ghost)) // move ghosts
    }, 3000)
    
    
  }

  // * clear grid and reset values
  function clearGrid(){
    points = 0
    lives = 3
    cells = []
    grid.innerHTML = '' // remove grid
    // timerCount = 3
    level = 1
    ghosts.forEach(ghost => ghost.speed = 250) // reset ghosts speed
    pacmanSpeed = 250 // reset pacman speed
  }

  // * return to Start Game page
  function returnToStart(){
    clearInterval(pacmanMove) // clear pacman interval moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId)) // clear ghost interval moving
    // ghosts.forEach(ghost => ghost.speed = 250) //
    // pacmanSpeed = 250
    startGamePage.classList.remove('none') // make start page visible
  }

  // * start game
  function startGame(event){
    if (event.target.classList.contains(pacmanStartClass)){ // if you click pacman on start page
      startGamePage.classList.add('none') // remove start page
      characterPage.classList.remove('none') // make character page visible
    }
  }

  // * menu game
  function menuGame(){
    clearInterval(pacmanMove) // stop pac man 
    menuGamePage.classList.remove('none') // add menu page
    document.removeEventListener('keydown', handleKeyDown) // stop keys working
    ghosts.forEach(ghost => clearInterval(ghost.timerId)) // stop ghost moving
  }

  // * resume game
  function resumeGame(){ 
    menuGamePage.classList.add('none') // remove menu page
    document.addEventListener('keydown', handleKeyDown) // enable keys to move pacman
    ghosts.forEach(ghost => moveGhost(ghost)) // move ghosts again
  }

  // * quit game
  function quitGame(){
    menuGamePage.classList.add('none') // remove menu page
    // clearInterval(pacmanMove) // stop pac man 
    returnToStart() // return to start page
  }

  createStartGrid(0) // create start page on loading website

  //************************************************************************************* */
  //*Events

  menuButton.addEventListener('click', menuGame) // menu button
  resumeButton.addEventListener('click', resumeGame) // resume button
  quitButton.addEventListener('click', quitGame) // quit button
  characterButtons.forEach(button => button.addEventListener('click', chooseCharacter)) // choose character buttons
  pacmanStartButtons.forEach(button => button.addEventListener('click', startGame)) // start page grid buttons 
 
}

window.addEventListener('DOMContentLoaded', init)