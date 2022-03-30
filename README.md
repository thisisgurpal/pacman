# General Assembly Project 1 - Pacman game
<img src="https://user-images.githubusercontent.com/97416784/159767050-f1f804e0-8cac-4005-b1fe-11dde48f4c10.JPG" width="350">

# Link
https://thisisgurpal.github.io/pacman/
# Brief
To create a game of your choice in a week using vanilla JavaScript.
# Technologies used
JavaScript, CSS and HTLM.
# Controls
...
# Approach taken
<h3>Planning</h3>
First I started to plan out the map of the game where the Pacman and the Ghosts can move around. Then I started to think where the points and how I would show the points score. 
<h3>Making the grid for the game</h3>
The grid walls including the points was made in JavaScript and added into the html by referencing a div with a specified class.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/159734077-a1e3f553-b394-49d0-85a4-864c98068288.JPG" width="700">
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
<h3>Scared Ghosts</h3>
To make all the ghosts scared I had to change isScared from false to true for each ghost.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160659468-f6b8691c-7f0d-47a9-91c1-8bbc7b3a290b.JPG" width="700">
After 6 seconds of the ghosts being scared, they then will turn into scared ghosts ending (as they are about to turn back to normal and are given a class which to visually let the user know this). After 10 seconds we turn all scared ghosts back to normal by setting isScared and isScaredEnding to false.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160659659-03a3fd01-744c-4667-8f41-157aabeca612.JPG" width="700">
<img src="https://user-images.githubusercontent.com/97416784/160659610-f751f661-63bc-42c2-ad96-708b2071d05e.JPG" width="700">
<h3>Points</h3>
To check if pacman has landed on a point I see if that grid cell contains the points class. If so, points will then go up by 10 and if that means the highscore is reached then that will also increase with the points. The points class for that cell is then removed.  
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160657328-b51df2c4-367a-4f4e-be7a-221db905870d.JPG" width="700">
<h3>Lives & Ghost collision</h3>
If the pacman class and ghost class are in the same grid cell then I know there is a collision, this mean a life is lost.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160658101-dc808f6d-97ab-4ce7-bcbc-0f89c0552693.JPG" width="700">
After the user loses a life, if the total lives the user has is still greater than zero then the character are reset and the game continues. However if the total lives is now zero, the game will end and the user will be taken to the home page.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160658154-a5e9b1e1-53ea-45b0-8d75-159f079033d7.JPG" width="700">
<h3>Levels</h3>
Once the user has complete the level the game will move onto to the next level. This means a new ghost is added with a specified speed, all the other ghosts from the last game will have an increase speed and pacman will have an increased speed. This will make the game harder and more difficult as the levels go on.
<h3></h3>
<img src="https://user-images.githubusercontent.com/97416784/160662170-40a2b3fe-e3c8-4426-8873-b45344df8888.JPG" width="700">
<h3>Styling</h3
For the styling is didn't want to replicate the original exactly, I wanted to keep it minimal, easy on the eye and still recognizable. The first page I wanted to be a game in itself, making you click the ghost to start. I added audio once you get past this homepage on the button clicks and game interactions with points and lives lost. 
<img src="">
  <table>
  <tr>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160662563-b8b89274-8a0e-40a0-8979-80d1e4016761.JPG" width="250"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160662659-4380433a-917f-4db7-a13e-f51e1223c7cf.JPG" width="250"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160662694-c194d0a5-1c4e-4f8a-8afa-3dd623fc8a2c.JPG" width="250"></td>
    <td valign="top"><img src="https://user-images.githubusercontent.com/97416784/160662732-7763ea30-510d-4c48-b9ac-86170d3d6c63.JPG" width="250"></td>
  </tr>
</table>
    
# Bugs
Pacman and the ghosts may take a few seconds to load when first starting to play.
# Challenges
Trying to incorporate the AI feature where the ghost follow the pacman around the game.
# Wins
Making a game that is functioning, has increasing levels and is fun to play!
# Contact
https://www.linkedin.com/in/gurpal-gohler/
