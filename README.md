# General Assembly Project 1 - Pacman game
Solo project building a childhood favourite game, Pacman. This project was over the duration of a week using JavaScript, HTML and CSS. The game has two different maps, the ability to go to the next level, and all other characteristics of the Pacman game. You can play the game <a href="https://thisisgurpal.github.io/pacman/">here</a>.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/159767050-f1f804e0-8cac-4005-b1fe-11dde48f4c10.JPG" width="500">

# Links
<h3>Application</h3>
Pacman: https://thisisgurpal.github.io/pacman/
<h3>Contact</h3>
Gurpal Gohler (LinkedIn): https://www.linkedin.com/in/gurpal-gohler/

# Brief
To create a game of your choice in a week using vanilla JavaScript.

# Technologies and tools used
* JavaScript
* CSS
* HTLM
* Visual Studio Code

# Walk through
<h3>Planning</h3>
First I started to plan out the map of the game where the Pacman and the Ghosts can move around. Then I started to think where the points and how I would show the points score. 
<h3>Home page</h3>
For the home page I made a grid that allows a ghost to move around it at random and you have to click the ghost to start the game. I displayed text that has a pulse styling at the bottom of the page, this informs the user what to do. I wanted it to be fun and interactive which is why I made the home page a game in itself. When you hover over the ghost it add a styling that will shake letting the user know that it is interactive.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161072217-b91f2eb0-8b98-4752-889e-0395958ddd43.JPG" width="500">
<h3>Choosing the map</h3>
After clicking the ghost on the home page the audio of the game starts and the user now has to choose from two different characters to play with, each character has a different game map. I wanted to have two different characters and maps to make the game a bit more fun and different for the users. I prompt the user to choose a character by adding a pulsing style to the 'CHOOSE CHARACTER' text. The two character buttons change colour and scale on hover through adding a class, this lets the user know they can be clicked. When a character is clicked a class display of none is added to this page.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161072542-3b4055d9-9710-41f6-b278-17ef37f52007.JPG" width="500">
<h3>Game count down</h3>
This game count down shows for 3 seconds with a number countdown, whilst this countdown is going on the pacman and ghosts will not move and the key pad event listener is removed. After this 3 seconds a display of none is added which removes this countdown page, the ghosts move function is triggered, pacman move function is triggered and the key pad event listener is added so you can move pacman manually.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161073658-26efe415-b8ae-463e-bb5d-e978983f09b5.JPG" width="500">
<h3>Start eating points</h3>
Now that the game has started and you can move around using the key pad it's time to start eating all the points. Pacman is able to move by adding the pacman class to the grid cell after determining the current direction. The points shown on the game are point classes added to the specified grid cells. So if the pacman class and the points class are on the same grid cell, the points class is removed, the points score at the top of the page is updated and an audio is played (pacman eats the point). 
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161074212-b79da501-4ebe-4fa6-b8bb-f181082c9560.JPG" width="500">
<h3>Losing a life</h3>
When the pacman class and the ghosts class are in the same grid cell, we know there has been a collision. If this is the case the ghosts and pacman are removed for short interval, the cell in which they collided get a class added to display a sad face, losing audio is played and the lives number at the bottom of the page is updated. After this short interval if the number of lives are greater than zero, the ghosts and pacman are returned to there starting positions by using a function I created that resets the characters and the game resumes as usual. 
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161074899-7f3e64e6-cd81-497a-bc13-0ba5b7f72992.JPG" width="500">
<h3>Eating a special point</h3>
I've mentioned eating points and special points are eaten the same the way however something different happens in this scenario other than getting more points. Each ghost has an isScared variable that is set to false and when set to true these ghost change there class and hence there colour changes to blue. When the pacman class and special points class are in the same grid cell the isScared variable for all ghosts are changed to true for an interval of 10 seconds, after this period they are set back to false.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161075386-ced28917-be42-474c-a0dc-160420596b3b.JPG" width="500">
<h3>Eating a scared ghost</h3>
In this 10 second period when the ghosts are scared, if the pacman class and scared ghost class are in the same grid cell we know there has been a collision. This collision is different as the ghost is scared. What happens now is that the grid cell the collision occured in gets given a class to show an image with the value 100 (as you will get 100 points for eating a scared ghost) and the game stops for a second before resuming. The isScared variable of that scared ghost that has been eaten will get set back to false so it's a normal ghost again, it will also get reset to its starting point.
<h3></h3>
<table>
  <tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161077187-8d6099d9-226d-4979-b9e5-4869cb7a4bd8.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161077451-4523512f-e277-47a3-a748-9fc618866574.JPG" width="500"></td>
  </tr>
</table>
<h3>Level up</h3>
Whilst pacman is moving around the game eating points, there is a counter in background counting how many points are left in the game. Once there are no points left a page is shown letting you know the new level by removing the display of none. After a few second this page is removed by making the display equal to none again through the use of setTimeout. Further after this timeout the points, pacman and ghosts are reset and the level value at the top of the page is updated. To make the game progressively more difficult on every new level the ghosts and pacman have there speed speed increases and a new ghost is added by pushing a random ghost into the ghosts array.
<h3></h3>
<table>
  <tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161078526-60036586-4ec9-477d-b3fe-f836f7ea6f82.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161078582-b0720494-8a73-417e-bac5-376f62d9d6d9.JPG" width="500"></td>
  </tr>
</table>
<h3>Game over</h3>
When you loose all your lives the game is over and you are returned back to the home page.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161079160-f32338be-e0ed-4e6c-8da1-1fc3fa442f32.JPG" width="500">

# Code exmaples
<h3>Adding, removing and moving Pacman</h3>
Adding and removing pacman is done by adding and removing classes to grid numbers.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/159753712-29da9c45-307d-4ca8-a046-687280485d08.JPG" width="700">
<img src="https://user-images.githubusercontent.com/97416784/159755095-1f5e4f3b-4333-4fe7-8128-6b8eacc47b46.JPG" width="350">
To figure out where the Pacman will move to, I had to understand the position it's currently in and also the direction it's looking to go. I took into concideration the walls so Pacman can't move into them.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/159757240-e50b04ac-8da1-46d9-ad51-b2975c94c514.JPG" width="700">
To use the arrow keys to move Pacman I had to know which key is being pressed by knowing the key codes. Depending on that key it will then run through the if statement in the code above (pacManMoveWithKey function).
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/159758942-dbc4dbea-4a76-46c7-8a70-754667567f3d.JPG" width="700">
Adding this event listener is what is needed for the handleKeyDown function to be triggered when the key pad is pressed.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/159759022-32c6c45a-5885-4502-b0a9-5e7a224d03d2.JPG" width="700">
<h3>Adding, removing and moving Ghosts</h3>
To add ghosts I started by making a class where I can specify the ghosts class name, starting index and speed.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160430571-bc0eae65-e4c2-448a-bb8c-ef4b74ad67c0.JPG" width="700">
On the first level of the game I made sure there were only 4 ghosts all moving at the same speed.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160430768-08dae014-594f-4740-9c3d-5426a6450935.JPG" width="350">
Adding and removing ghosts is done by adding and removing classes.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160432224-e0b628c7-3495-46df-bdb5-ce56c5a8e7c6.JPG" width="700">
<img src="https://user-images.githubusercontent.com/97416784/160432455-87a61d3b-bd80-4efe-ab33-f49323e877c4.JPG" width="700">
For the moving of the ghosts I made an array of directions from which a random one is chosen for each ghost. The ghost will then have this direction for 7 moves before a new direction is chosen. If the ghost cannot move into the direction chosen, a new direction is then picked at random.  
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160440328-aea57783-1655-45a0-9453-4720ca46ad22.JPG" width="700">

    
# Bugs
Pacman and the ghosts may take a few seconds to load when first starting to play.
# Challenges
Trying to incorporate the AI feature where the ghost follow the pacman around the game.
# Wins
Making a game that is functioning, has increasing levels and is fun to play!
