
function init() {

  //************************************************************************************* */
  //*Elements

  const grid = document.querySelector('.grid') // get the grid element
  const pointsValue = document.querySelector('#points_value')
  const hsValue = document.querySelector('#hs_value')
  const livesValue = document.querySelector('#lives_value')
  const startGamePage = document.querySelector('.start_game')
  const menuGamePage = document.querySelector('.menu_game')
  const helpGamePage = document.querySelector('.help')
  const menuButton = document.querySelector('.menu')
  const characterButtons = document.querySelectorAll('.character_buttons')
  const levelValue = document.querySelector('#level_value')
  const characterPage = document.querySelector('.character_game')
  const resumeButton = document.querySelector('#resume')
  const quitButton = document.querySelector('#quit')
  const instructionsButton = document.querySelector('#instructions')
  const returnButton = document.querySelector('#return')
  const threeTwoOneBox = document.querySelector('.three_two_one')
  const threeTwoOneValue = document.querySelector('.three_two_one_value')
  const startGrid = document.querySelector('.start_grid')
  const audio = document.querySelector('.game_audio')
  const pointsAudio = document.querySelector('.points_audio')
  const backgroundAudio = document.querySelector('.background_audio')
  const pointsBox = document.getElementById('points_box')
  const hsBox = document.getElementById('hs_box')
  const liveBox = document.getElementById('lives_box')
  const width = 21 // define the width
  let pacmanMove
  let points = 0
  let lives = 3
  let highScore = 100
  const highScoreCurrent = highScore
  let level = 1
  const cellCount = width * width // define the number of cells on the grid
  let cells = [] // empty array to store our divs that we create
  const cells2 = []
  const pacmanClass = 'pacman' // define the class of the character
  let pacmanClassRight // define the class of the character
  let pacmanClassLeft // define the class of the character
  let pacmanClassUp // define the class of the character
  let pacmanClassDown // define the class of the character
  const pacmanStartClass = 'pacman_start' // define the class of the character
  let ghostsArray
  let pacmanDirection = pacmanClassRight
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
  let pacmanSpeed = 100
  let gridPointsclass
  let cellsWithPoints = cells.filter(divs => divs.classList.contains(gridPointsclass)).length // counts number of points left on grid
  let wallsBackground

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
        cell.classList.add(wallsBackground)
      } else if (blocksNoPoints.indexOf(i) === -1){ // else if i is not in blocksNoPoints array, add points by giving class
        cell.classList.add(gridPointsclass)
      }  else if (specialPoints.indexOf(i) !== -1){ // else if i is in array specialPoints give class for special point
        cell.classList.add('milkshake')
      }  
    
      cells.push(cell) // add the newly created div into our empty array

    }
    cellsWithPoints = cells.filter(divs => divs.classList.contains(gridPointsclass)).length
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
      cell.setAttribute('id', i) 
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
    cells[position].classList.add(pacmanDirection) // add pacman with starting direction right
  }

  // * remove pacman from the grid
  function removePacman(position) {
    cells[position].classList.remove(pacmanClass, pacmanClassRight, pacmanClassLeft, pacmanClassUp, pacmanClassDown) // remove pacman from given position
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

  let ghosts = []

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
      } else if (ghost.currentIndex === 230 && direction === 1){ // if ghost in middle left and direction is left
        cells[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared_ghost', 'scared_ghost_end')
        ghost.currentIndex = 210 // create new index to middle left
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost')
      } else if (!cells[ghost.currentIndex + direction].classList.contains(wallsBackground) && !cells[ghost.currentIndex + direction].classList.contains('ghost')){ // if ghost plus direction is not a wall or another ghost
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
      cells[ghost.currentIndex].classList.remove('ghost') // remove current ghost class name
      cells[ghost.currentIndex].classList.add('scared_ghost') // add scared ghost class which changes it's colour
    }
    if (ghost.isScaredEnding){ // if scared ghost is about to end
      cells[ghost.currentIndex].classList.remove(ghost.className)
      cells[ghost.currentIndex].classList.remove('ghost') // remove current ghost class name
      cells[ghost.currentIndex].classList.remove('scared_ghost') // remove current class scared ghost
      cells[ghost.currentIndex].classList.add('scared_ghost_end') // add class scared ghost ending to change colour
    }
    if ((ghost.isScared || ghost.isScaredEnding) && cells[ghost.currentIndex].classList.contains(pacmanClass)){
      cells[ghost.currentIndex].classList.remove('ghost', 'scared_ghost', 'scared_ghost_end') // remove ghost from current position
      cells[ghost.currentIndex].classList.add('special_point') // remove ghost from current position
      backgroundAudio.pause()
      audio.src = '../audio/ghost_eat.wav'
      audio.play()
      clearInterval(pacmanMove) // stop pac man 
      removePacman(ghost.currentIndex) // remove pacman from current location
      document.removeEventListener('keydown', handleKeyDown) // stop keys working
      ghosts.forEach(ghost => clearInterval(ghost.timerId)) // stop ghost moving
      pointsBox.classList.add('shake_box')
      setTimeout(()=>{
        pointsBox.classList.remove('shake_box')
      }, 2000)
      if (points + 100 > highScore){ // if points is the same as high score and pacman eats scared ghost
        highScore = points + 100 // increase high score
      }
      points = points + 100 // increase points
      // pointsValue.innerText = points // update html value
      // hsValue.innerText = highScore // update html value
      pointsEaten()
      cellsWithPoints = cells.filter(divs => divs.classList.contains(gridPointsclass)).length // counts number of points left on grid
      // if (cellsWithPoints > 0){  
      setTimeout(() => {
        backgroundAudio.play()
        cells[ghost.currentIndex].classList.remove('special_point') // remove ghost from current position
        addPacman(ghost.currentIndex) // add pacman current index location
        ghost.currentIndex = ghost.startIndex // give current index the starting position of ghost
        ghost.isScared = false // make ghost un scared
        ghost.isScaredEnding = false // make ghost un scared ending
        cells[ghost.currentIndex].classList.add(ghost.className, 'ghost') // add ghost to starting postion 
        document.addEventListener('keydown', handleKeyDown) // enable keys to move pacman
        ghosts.forEach(ghost => moveGhost(ghost)) // move ghosts again
      }, 2000)
    } 
  }
      

  
  
  // * points eaten logic
  function pointsEaten(){
    if (cells[pacmanCurrentPosition].classList.contains(gridPointsclass) && !cells[pacmanCurrentPosition].classList.contains('ghost')){ // if pacman in same cell with class grid points
      
      pointsAudio.src = '../audio/points_audio.wav'
      pointsAudio.play()
      if (points === highScoreCurrent){
        audio.src = '../audio/highscore.wav'
        audio.play()
        hsBox.classList.add('shake_box')
        setTimeout(()=>{
          hsBox.classList.remove('shake_box')
        }, 2000)
      }
      
      
      
      if (points === highScore){ // if points equals high score, update high score with points
        highScore += 10 // increase value
      }
      points += 10 // increase value
      cells[pacmanCurrentPosition].classList.remove(gridPointsclass) // remove point from cell pacman is in
      cellsWithPoints = cells.filter(divs => divs.classList.contains(gridPointsclass)).length // counts number of points left on grid
    }
    pointsValue.innerText = points // update html
    hsValue.innerText = highScore // update html
    
    
  }

  // let count = 0 // count to review logic
  // let counterTimer2 // timer to review logic

  // function timer(){ // timer counting to 10
  //   counterTimer2 = setInterval(() => {
  //     count++
  //     if (count > 10){
  //       clearInterval(counterTimer2)
  //     } else console.log('count', count)
  //   }, 1000)
  // }

  // * eat special points
  function specialPointsEaten(){
    if (cells[pacmanCurrentPosition].classList.value === 'milkshake'){ // when pacman in same cell as special point
      milkshake++ // count how many special points eaten
      audio.src = '../audio/point.wav'
      audio.play()
      pointsBox.classList.add('shake_box')
      setTimeout(()=>{
        pointsBox.classList.remove('shake_box')
      }, 2000)
      
      if (milkshake > 1){ // if special points eaten greater than 1 reset scared ghosts to normal before starting intervals again
        clearTimeout(unScareTimeout) // clear timer to un scare ghosts
        // clearInterval(counterTimer2) // reset counter logic to 10
        clearTimeout(ScaredEnding) // clear timer to un scare 
        unScareGhost() // unscare ghosts
        // count = 0 // reset count of timer
      }
      
      
      if (points + 100 > highScore){ // if points equal high score then update both
        highScore = points + 100 // increase value
      }
      points = points + 100 // increase value
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
      // timer() // counter timer of scared ghosts
    }
    pointsValue.innerText = points // update html
    hsValue.innerText = highScore // update html
  }
      
 

  //* make ghosts un scared
  function unScareGhost(){
    ghosts.forEach(ghost => ghost.isScaredEnding = false) // un scare ending each ghost
    ghosts.forEach(ghost => ghost.isScared = false) // unn scare each ghost
  }
  let newGhost

  // * next level function
  function levelUp(){
    backgroundAudio.pause()
    audio.src = '../audio/level_up.wav'
    audio.play()
    document.removeEventListener('keydown', handleKeyDown) // remove key event listener
    newGhost = new Ghost(ghostsArray[Math.floor(Math.random() * ghostsArray.length)], 199, 250)
    ghosts.push(newGhost)
    ghosts.forEach(ghost => ghost.speed -= 15) // increase speed of ghost for next level
    pacmanSpeed -= 15 // increase speed of pacman for next level
    resetCharacters() // reset all character to normal starting positions
    level = level + 1 // increase counts of level
    milkshake = 0 // reset number of special points eaten
    threeTwoOneBox.classList.remove('none') // make next leve page visible
    levelValue.innerText = `${level}` // update level value
    threeTwoOneValue.innerText = `LEVEL ${level}` // show level on next level page
    threeTwoOneValue.style.fontSize = '70px' // update font size
      
    for (let i = 0; i < cellCount; i++) { // for loop to run for every cell
      if (specialPoints.indexOf(i) === -1 && blocksNoPoints.indexOf(i) === -1 && walls.indexOf(i) === -1){ // select grid cells where points eaten
        cells[i].classList.add(gridPointsclass) // add points again for next level
      }  else if (specialPoints.indexOf(i) !== -1){ // select grid cells of special points
        cells[i].classList.add('milkshake') // add special points for next level
      }  
    }

    cellsWithPoints = cells.filter(divs => divs.classList.contains(gridPointsclass)).length // reset grid points counter
      
    setTimeout(()=> { // interval to remove next level page and start next level
      backgroundAudio.play()
      threeTwoOneValue.style.fontSize = '200px' // reset font size
      threeTwoOneBox.classList.add('none') // remove level up page
      document.addEventListener('keydown', handleKeyDown) // add event listener for keys
      ghosts.forEach(ghost => moveGhost(ghost)) // move ghost
    }, 3000)
    
    
  }

  // * lose life logic
  function lifeLost(){
    if (cells[pacmanCurrentPosition].classList.contains('ghost') && !cells[pacmanCurrentPosition].classList.contains('scared_ghost') && !cells[pacmanCurrentPosition].classList.contains('scared_ghost_end')){ // if cell of pacman has a ghost which is not scared
      lives = lives - 1 // lose a life
      livesValue.innerText = lives // update html
      audio.src = '../audio/lose_life.wav'
      audio.play()
      backgroundAudio.pause()
      liveBox.classList.add('shake_box')
      setTimeout(()=>{
        liveBox.classList.remove('shake_box')
      }, 2000)
      removePacman(pacmanCurrentPosition)
      removeGhosts()
      cells[pacmanCurrentPosition].classList.add('pacman_sad') // remove ghost from current position
      clearInterval(pacmanMove) // stop pac man 
      document.removeEventListener('keydown', handleKeyDown) // stop keys working
      ghosts.forEach(ghost => clearInterval(ghost.timerId)) // stop ghost moving
      if (cells[pacmanCurrentPosition].classList.contains(gridPointsclass)){ // if pacman get eaten on a point
        cells[pacmanCurrentPosition].classList.remove(gridPointsclass) // remove ghost from current position
        setTimeout(() => { //set timeout to remove sad face
          cells[pacmanCurrentPosition].classList.remove('pacman_sad') // remove ghost from current position
          if (lives > 0){ // if still have lives
            cells[pacmanCurrentPosition].classList.add(gridPointsclass) // add grid point back in as it didn't eat it
          }
        }, 3000)

      }
      setTimeout(() => {
        backgroundAudio.play()
        cells[pacmanCurrentPosition].classList.remove('pacman_sad') // remove ghost from current position
        if (lives > 0){ // if still have lives
          document.addEventListener('keydown', handleKeyDown) // remove key event listener
          // clearInterval(pacmanMove) // clear pacman interval
          resetCharacters()
          console.log('YOU LOSE A LIFE') // log
          ghosts.forEach(ghost => moveGhost(ghost)) // move ghosts 
        } else if (lives === 0){ // if all lives gone
          audio.src = '../audio/game_over.wav'
          audio.play()
          threeTwoOneBox.classList.remove('none') // make next leve page visible
          threeTwoOneValue.innerText = 'GAME OVER' // show level on next level page
          threeTwoOneValue.style.fontSize = '70px' // update font size
          setTimeout(()=> { // interval to remove next level page and start next level
            threeTwoOneValue.style.fontSize = '200px' // reset font size
            threeTwoOneBox.classList.add('none') // remove level up page
            returnToStart() // return to start page
          }, 3000)
          
        }
      }, 3000) 
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
 
  // * pacman moving with keys
  function pacManMoveWithKey(right, left, up, down){
    ghosts.forEach(ghost => scaredGhostEaten(ghost)) // if current position is a scared ghost logic
    removePacman(pacmanCurrentPosition) // remove pacman from current position
    if (key === right && pacmanCurrentPosition === (width * ((width - 1) / 2) + (width - 1))){ // if the right arrow at middle right
      pacmanCurrentPosition = (width * ((width - 1) / 2)) // pacman position to middle left
      pacmanDirection = pacmanClassRight
    } else if (key === right && cells[pacmanCurrentPosition + 1].classList.value !== wallsBackground){ // if the right arrow is pressed and wall not right
      pacmanCurrentPosition++ // redefine pacman position index to be previous position plus 1
      pacmanDirection = pacmanClassRight
    } else if (key === left && cells[pacmanCurrentPosition - 1].classList.value !== wallsBackground) { // if the left arrow is pressed and wall not left
      pacmanCurrentPosition-- // redefine pacman position index to be previous position minus 1
      pacmanDirection = pacmanClassLeft
    } else if (key === left && pacmanCurrentPosition === (width * ((width - 1) / 2))){
      pacmanCurrentPosition = (width * ((width - 1) / 2) + (width - 1))
      pacmanDirection = pacmanClassLeft
    } else if (key === up && cells[pacmanCurrentPosition - width].classList.value !== wallsBackground) { // if the up arrow is pressed and wall not above
      pacmanCurrentPosition -= width // redefine pacman position index to be previous position minus width
      pacmanDirection = pacmanClassUp
    } else if (key === down && cells[pacmanCurrentPosition + width].classList.value !== wallsBackground) { // if the down arrow is pressed and wall not below
      pacmanCurrentPosition += width // redefine pacman position index to be previous position plus width
      pacmanDirection = pacmanClassDown
    } else {
      console.log('invalid key')
    }

    specialPointsEaten() // eat special points whilst pacman moves 
    addPacman(pacmanCurrentPosition) // add pacman to new position
  
    pointsEaten() // eat points whilst pacman moves

    ghosts.forEach(ghost => scaredGhostEaten(ghost)) // if new position is a scared ghost logic
    lifeLost()

    if (cellsWithPoints === 0 && (cells[pacmanCurrentPosition].classList.contains('special_point'))){ // if scared ghost and last point on game eaten together
      setTimeout(() => { // time out level up so special point can show
        levelUp()
      }, 2000)
    } else if (cellsWithPoints === 0 && (!cells[pacmanCurrentPosition].classList.contains('special_point'))){ // else if last point eaten without scared ghost just level up
      levelUp()
    }
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
      pacManMoveWithKey(right, left, up, down) // pacman moves if you hold down key
    }, pacmanSpeed)
    pacManMoveWithKey(right, left, up, down) // pacman moves if you let go of key
  }
  
  // * threeTwoOne function to count down game start
  function threeTwoOne(){
    // audio.src = '../audio/countdown.wav'
    // audio.play()
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
    // audio.src = '../audio/button.wav'
    // audio.play()
    audio.src = '../audio/countdown.wav'
    audio.play()
    if (event.target.id === 'pacman1'){
      pacmanClassRight = 'pacman_right' // define the class of the character
      pacmanClassLeft = 'pacman_left' // define the class of the character
      pacmanClassUp = 'pacman_up' // define the class of the character
      pacmanClassDown = 'pacman_down' // define the class of the character
      pacmanDirection = pacmanClassRight
      pacmanStartPosition = 346 // starting position of the pacman (refers to an index)
      pacmanCurrentPosition = pacmanStartPosition // use let to track where the pacman currently is (refers to an index)
      gridPointsclass = 'grid_points'
      wallsBackground = 'blue'
      ghosts = [ // add ghosts
        new Ghost('blinky', 218, 250),
        new Ghost('pinky', 219, 250),
        new Ghost('inky', 220, 250),
        new Ghost('clyde', 221, 250)
      ]
      ghostsArray = ['blinky', 'clyde', 'inky', 'pinky']

      blocksNoPoints = [346, 156, 177, 176, 175, 174, 195, 216, 237, 198, 199, 200,
        258, 279, 259, 260, 261, 262, 263, 264, 265,
        266, 287, 245, 215, 224, 225, 203, 182, 181,
        180, 179, 158, 178, 218, 219, 220, 221, 222, 402, 24, 416, 38, 197, 201] // cells that don't have points 
      specialPoints = [402, 24, 416, 38] // cells that have special points
      walls = [44, 45, 65, 66, 47, 48, 49,
        50, 31, 52, 73, 68, 69, 70, 71, 107, 108,
        128, 129, 54, 55, 56, 57, 75, 76, 77, 78,
        59, 60, 80, 81, 112, 113, 114, 115, 116,
        117, 118, 136, 157, 110, 131, 152, 173,
        194, 153, 154, 155, 169, 170, 171, 190,
        191, 192, 159, 160, 161, 162, 141,120, 183,
        204, 122, 123, 143, 144, 185, 186, 187, 206,
        207, 208, 196, 202,
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
      pacmanClassRight = 'pacman_blue_right' // define the class of the character
      pacmanClassLeft = 'pacman_blue_left' // define the class of the character
      pacmanClassUp = 'pacman_blue_up' // define the class of the character
      pacmanClassDown = 'pacman_blue_down' // define the class of the character
      pacmanDirection = pacmanClassRight
      // document.querySelector('.pacman').style.backgroundImage = 'url(\'../images/patrick.png\')'
      pacmanStartPosition = 325 // starting position of the pacman (refers to an index)
      pacmanCurrentPosition = pacmanStartPosition // use let to track where the pacman currently is (refers to an index)
      wallsBackground = 'white'
      gridPointsclass = 'cookie_points'
      ghosts = [ // add ghosts
        new Ghost('clyde', 197, 250),
        new Ghost('clyde', 198, 250),
        new Ghost('clyde', 199, 250),
        new Ghost('clyde', 200, 250)
      ]
      ghostsArray = ['clyde']

      blocksNoPoints = [135, 136, 137, 153, 154, 155, 156, 157, 158, 159, 160, 161,
        174, 195, 216, 176, 177, 178, 179, 180, 197, 198, 199, 200, 201, 182, 203, 224, 295, 313, 81, 65, 325]
      specialPoints = [295, 313, 81, 65]
      walls = [44, 45, 46, 47, 68, 89, 86, 87, 107, 108,
        91, 92, 93, 49, 50, 51, 52, 53, 54, 55, 57, 58, 59,
        60, 78, 99, 101, 102, 122, 123, 95, 96, 97, 134, 133, 
        132, 131, 152, 173, 194, 138, 140, 141, 162, 183, 204, 181,
        202, 223, 222, 221, 220, 241, 219, 218, 217, 196, 175, 149,
        150, 170, 171, 191, 192, 164, 165, 185, 186, 206, 207, 247, 248,
        249, 233, 234, 235, 275, 276, 297, 318, 319, 316, 359, 360, 361, 
        362, 363, 364, 380, 381, 382, 383, 384, 385, 345, 366, 387, 258, 
        259, 260, 278, 279, 280, 300, 301, 321, 322, 283, 303, 304, 305,
        264, 265, 266, 286, 287, 288, 307, 308, 328, 329, 347, 368, 389, 
        370, 371, 372, 373, 374, 375, 391, 392, 393, 394, 395, 396, 334,
        291, 290, 311, 331, 332, 139]
      

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
    level = 1 // reset level
    pacmanSpeed = 250 // reset pacman speed
  }

  // * return to Start Game page
  function returnToStart(){
    backgroundAudio.src = ''
    clearInterval(pacmanMove) // clear pacman interval moving
    ghosts.forEach(ghost => clearInterval(ghost.timerId)) // clear ghost interval moving
    // ghosts.forEach(ghost => ghost.speed = 250) //
    // pacmanSpeed = 250
    pointsBox.classList.remove('shake_box')
    liveBox.classList.remove('shake_box')
    hsBox.classList.remove('shake_box')
    startGamePage.classList.remove('none') // make start page visible
  }

  // * start game
  function startGame(event){
    if (event.target.classList.contains(pacmanStartClass)){ // if you click pacman on start page
      audio.src = '../audio/button.wav'
      audio.play()
      backgroundAudio.src = '../audio/game_background.wav'
      backgroundAudio.volume = 0.3
      backgroundAudio.loop = true
      backgroundAudio.play()
      startGamePage.classList.add('none') // remove start page
      characterPage.classList.remove('none') // make character page visible
    }
  }

  // * menu game
  function menuGame(){
    backgroundAudio.pause()
    audio.src = '../audio/button.wav'
    audio.play()
    clearInterval(pacmanMove) // stop pac man 
    menuGamePage.classList.remove('none') // add menu page
    document.removeEventListener('keydown', handleKeyDown) // stop keys working
    ghosts.forEach(ghost => clearInterval(ghost.timerId)) // stop ghost moving
  }

  // * resume game
  function resumeGame(){ 
    backgroundAudio.play()
    audio.src = '../audio/button.wav'
    audio.play()
    menuGamePage.classList.add('none') // remove menu page
    document.addEventListener('keydown', handleKeyDown) // enable keys to move pacman
    ghosts.forEach(ghost => moveGhost(ghost)) // move ghosts again
  }

  // * help page
  function instructionsGame(){ 
    audio.src = '../audio/button.wav'
    audio.play()
    menuGamePage.classList.add('none') // remove menu page
    helpGamePage.classList.remove('none') // add help page
  }

  // * resume game
  function returnGame(){
    audio.src = '../audio/button.wav'
    audio.play()
    helpGamePage.classList.add('none') // remove help page
    menuGamePage.classList.remove('none') // add menu page 
    
  }

  // * quit game
  function quitGame(){
    audio.src = '../audio/button.wav'
    audio.play()
    menuGamePage.classList.add('none') // remove menu page
    // clearInterval(pacmanMove) // stop pac man 
    returnToStart() // return to start page
  }

  //function that when you hover over button the gif becomes the cover
  function handleMouseEnter(event){
    if (event.target.classList.contains('pacman_start')){
      event.target.classList.add('shake')
    }
  }

  //function that when you stop hovering over button it goes back to normal
  function handleMouseLeave(event){
    event.target.classList.remove('shake')
  }



  createStartGrid(0) // create start page on loading website
  
  
  //************************************************************************************* */
  //*Events

  menuButton.addEventListener('click', menuGame) // menu button
  resumeButton.addEventListener('click', resumeGame) // resume button
  instructionsButton.addEventListener('click', instructionsGame) // resume button
  returnButton.addEventListener('click', returnGame) // resume button
  quitButton.addEventListener('click', quitGame) // quit button
  characterButtons.forEach(button => button.addEventListener('click', chooseCharacter)) // choose character buttons
  pacmanStartButtons.forEach(button => {
    button.addEventListener('click', startGame)
    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('mouseleave', handleMouseLeave)
  }) // start page grid buttons 
  
}

window.addEventListener('DOMContentLoaded', init)