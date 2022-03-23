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
...
<h3>Points</h3>
...
<h3>Lives</h3>
...
<h3>Collision - Ghosts and Pacman</h3>
...
<h3>Levels</h3>
...
<h3>Styling</h3>
...
<h3>Audio</h3>
...

# Bugs
# Challenges
# Wins
# Key learnings
# Contact
