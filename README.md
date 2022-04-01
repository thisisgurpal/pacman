# General Assembly Project 1 - Pacman game
Solo project building a childhood favourite game, Pacman. This project was over the duration of a week using JavaScript, HTML and CSS. The game has two different maps, the ability to go to the next level, and all other characteristics of the Pacman game. You can play the game <a href="https://thisisgurpal.github.io/pacman/">here</a>.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/159767050-f1f804e0-8cac-4005-b1fe-11dde48f4c10.JPG" width="500">

# Links
* Game: https://thisisgurpal.github.io/pacman/
* Gurpal Gohler (LinkedIn): https://www.linkedin.com/in/gurpal-gohler/
# Brief
To create a game of your choice in a week using vanilla JavaScript.

# Technologies used
JavaScript, CSS and HTLM.

# Walk through
<h3>Planning</h3>
First I started to plan out the map of the game where the Pacman and the Ghosts can move around. Then I started to think where the points and how I would show the points score. 
<h3>Home page</h3>
I wanted the home page to feel like a game in itself, I made it interactive so you have to click the ghost to start.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161072217-b91f2eb0-8b98-4752-889e-0395958ddd43.JPG" width="500">
<h3>Choosing the map</h3>
Once you click the ghost on the home page, you will be taken to the page where you choose the map you want to play.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161072542-3b4055d9-9710-41f6-b278-17ef37f52007.JPG" width="500">
<h3>Game count down</h3>
When you choose the map a count downfrom 3 will begin for the game to start.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161073658-26efe415-b8ae-463e-bb5d-e978983f09b5.JPG" width="500">
<h3>Start eating points</h3>
Use the arrow keys on the keyboards to move pacman (you can press once or hold down if you wish) to start eating points.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161074212-b79da501-4ebe-4fa6-b8bb-f181082c9560.JPG" width="500">
<h3>Losing a life</h3>
When you collide with a ghost you will lose a life, pacman will turn into a scared emoji and the lives counts goes down.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161074899-7f3e64e6-cd81-497a-bc13-0ba5b7f72992.JPG" width="500">
<h3>Eating a special point</h3>
If you eat one of the 4 special points you will get extra points and the ghosts will turn scared (they turn blue), this will mean you can eat them for a 10 second period!
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/161075386-ced28917-be42-474c-a0dc-160420596b3b.JPG" width="500">
<h3>Eating a scared ghost</h3>
When the ghost are scared and you eat one of them you will get 100 points and pacman turns into a gif that shows this for one second. Then that scared ghost goes back to its starting position and it's turned back to normal and the game resumes.
<h3></h3>
<table>
  <tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161077187-8d6099d9-226d-4979-b9e5-4869cb7a4bd8.JPG" width="500"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/161077451-4523512f-e277-47a3-a748-9fc618866574.JPG" width="500"></td>
  </tr>
</table>
<h3>Level up</h3>
when you've eaten all the points you will move to the next level. On each new level pacmans speed goes up, the ghosts speed goes up and there is also a new random ghost added to the game.
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
