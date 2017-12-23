# Hangman-Game(VideoGame Theme)

Watch the demo.
You're going to make a game just like the one in the video. Essentially, the app randomly picks a letter, and the user has to guess which letter the app chose. Put the following text on your page:
Guess what letter I'm thinking of
Wins: (# of times the user has guessed the letter correctly)
Losses: (# of times the user has failed to guess the letter correctly after exhausting all guesses)
Guesses Left: (# of guesses left. This will update)
Your Guesses So Far: (the specific letters that the user typed. Display these until the user either wins or loses.)
When the player wins, increase the Wins counter and start the game over again (without refreshing the page).
When the player loses, increase the Losses counter and restart the game without a page refresh (just like when the user wins).

The goal of my hangman game is for the user to try to guess to correct videogame that is randomly picked from the array using a random number genterator to randomly pick the index of the array of videogames stored in the array. The user has 13 guesses if he or she does not guess correctly then the jumbotron will display game over, however if the user manages to guess the game correctly then the jumbotron will display the image of the game, play the music related to that game, and alert that the user has won. Then the number of games won will increment telling the user the total number of games guessed correctly. Once the user guesses the game correctly the reset method is invoked which allows the user to try to guess the next game. Lastly the number of underscores(_) are inserted using a for-loop and the the number of iterations depends on the length of the game randomly picked. EX: if random generator picks random game Mario then the total number of underscores = _ _ _ _ _    .

# User trying to guess
![Image of product Table](https://github.com/tdsteph1/Hangman-Game/blob/master/assets/images/img1.png)
![Image of product Table](https://github.com/tdsteph1/Hangman-Game/blob/master/assets/images/img2.png)

# Correct Guess
![Image of product Table](https://github.com/tdsteph1/Hangman-Game/blob/master/assets/images/img3.png)

# Incorrect Guess
![Image of product Table](https://github.com/tdsteph1/Hangman-Game/blob/master/assets/images/img4.png)
