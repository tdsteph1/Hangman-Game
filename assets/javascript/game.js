var userChoice;		//Stores choice of key then check to see if accurate

var listOfGames = ["HALO", "GRANDTHEFTAUTO", "MARIO", "STARFOX", "METALGEARSOLID", "BARTSNIGHTMARE", "FINALFANTASY"];		//Array of Possible choices

var gameChoice = pickGame(); 					//Random game choice stored here

var totalCorrectLetters = 0;					//Used to increment each time we find a correct letter EX: Mario = 5 total letter so 
												//if totalCorrectLetter == gameChoice.length then set findWord = true

var findWord = false							//used in do while, if all letters found then set to true.

var guessRemain = 13; 							//we have 13 trys to guess entire word

var incorrectLetterList = "";				    //Keep track of letters in (function 6) to prevent us frm using the same letter twice for (letters already used)

var correctLetterList = "";

var g = 0;										//used in (wrongGuess) funciton for <li id="letterUsed"> tag. This is an index variable to add guessed letter
												//to corresponding index(g)
var wins = 0;

var audio;

var iterator = 0;

												//so we can pause when we find next game

//Call string concat id (function3) to fill in a certain number of (_) using for loop which will add (_) 
//corresponding to number of letters (gameChoice.length)
addLetterUnderline();


//Function1(input user key and store letter for comparison)
document.onkeyup = function(event)				
{

	var upperCase = event.key;
	userChoice = upperCase.toUpperCase()

		
	//call function4 that will add key(userChoice of letter) to corresponding (_) if letter choice is correct
	addLetter();


	if(findWord == true)
	{
		if(iterator > 0)					//This will stop at (iteration2) (iteration3) & > . The reason for if-stmt is to prevent error when audio = null at 1rst iteration
		{									//meaning you cannot invoke stop function audio stop at the beginning since no music is playing on iteration1.
			audio.pause();
		}

		//Display winning Game pic
		displayImage();

		//Display Winning Text
		displayWinningText();

		//Reset global variables & reset (_) for (Correct word) and reset (Letters Already Guessed) to blank for new game
		 reset();
	}
	else if(guessRemain == 0)
	{
		
		//Display Losing Text
		displayLosingText();

		//Reset global variables & reset (_) for (Correct word) and reset (Letters Already Guessed) to blank for new game
		reset();
	}
	

};

//Function2
function pickGame()					//Randomly picks game in the Array
{
	//Use java function math class to randomly pick an index # and use that choice of index to select a game in the Array

	var choice = Math.floor((Math.random() * listOfGames.length) + 0);

	return listOfGames[choice]; //[choice]
};

//Function3
function addLetterUnderline()		//Add certain number of (_) based on game letter size
{

	//Add certain amt of (_) by using loop to concat "letter" + 1 = ("letter1") in order to full in each letter tag a
	//certain number of (_) related to (gameChoice.length)
	for(var i = 0; i < gameChoice.length; i++)
	{

		var targetLetter = document.getElementById("letter" + (i+1))		//i + 1 since index starts at 0 and id="letter1" first tag starts at 1.
		targetLetter.textContent = "_";
	}


};

//Function4
function addLetter()
{
	//use for loop to compare letter(user choice) with each letter or element in (gameChoice) string[] which contains an array of letters.
	//if userChoice is correct, then replace (_) with correct chosen letter EX: (M) in (Mario), else place wrong choice at (Letters Already Used)
	
	var findLetterBoolean = false;					//Set to true if guess(userChoice) letter is in the correct word (gameChoice) and insert correct letter in each (_) by call insertLetter(i+1) function
													//else remain false and insert incorrect letter in (Letters Already Used) by calling wrongGuess() function

	

	//Outer if prevents duplicat letters from being inserted and importantly falsley icrementing(totalCorrectLetters)
	//we put outside because if I enter a (b) and gameChoice happens to have 2 letter b's then 2 b's will be inserted but user cannot
	//enter a another b and the outer if-stmt will ensure that.
	if(correctLetterList.indexOf(userChoice) == -1)
	{
		

		for(var i = 0; i < gameChoice.length; i++)
		{
			//if letter correct fill in (_) with correct letter EX: (M)
		

			if(userChoice == gameChoice[i])
			{
				correctLetterList = correctLetterList + userChoice;					//Add the correct letter in correctLetterList. correctLetterList ensures that we do not insert a duplicate preventing totalCorrectLetters++

				findLetterBoolean = true;

				totalCorrectLetters++;										//Increments for each correct letter found. We will increment until we've reached the total letters of correct word.
				insertLetter( (i+1) );										//call function5

			}
		}

		//After Comparing chosen letter to each element in string array if we don't find a match then we place letter in (LetterAlreadyGuessed)
		if(findLetterBoolean == false)
		{
			
			wrongGuess(userChoice);
		}

	}
	else
	{
		//Do Nothing No duplicate gets inserted
	}

};

//Function 5
function insertLetter(index)		//Replaces each ("_") with a correct letter guess
{
	//When find all correct letters, set global variable (findWord = true) in order to for us to get out of the do-while
	if(totalCorrectLetters == gameChoice.length)
	{
		//set findWord to true
		findWord = true;		//gets us out of do-while loop

		//increment win when we find correct word
		wins++;
		var winText = document.getElementById("wins");
		winText.textContent = wins;
	}

	//insert or replace (_) with correct letter at specified index
	var targetLetter = document.getElementById("letter" + index);
	targetLetter.textContent = userChoice;
};

//Function 6
function wrongGuess(choice)
{
	
	//Check to see if current chice is in sring letter array if it's Not then we can place 
	if(incorrectLetterList.indexOf(choice) == -1)											//-1 implies letter hasn't been used. this prevents duplicate letters.
	{
		g++;
		incorrectLetterList = incorrectLetterList + choice;									//string var (technically a string array) stores each letter guesses to keep track of letters already used

		//replace blank <li id="leeterUsed"> with the letter & use (g) for position purposes for each <li id="letter"> tag
		var targetWrongLetter = document.getElementById("letterUsed" + g);
		targetWrongLetter.textContent = choice;

		guessRemain--;																//decrement each time a player gets a letter guess wrong

		//display decremented value
		var guessRemainText = document.getElementById("guess-remain");
		guessRemainText.textContent = guessRemain;									//Shows the the number of guesses remaining


	}
	else
	{
		//do nothing because we won't insert duplicate Letters, EX: M and M.
	}



};

//Function7
function displayImage()
{
	var imageName = gameChoice.toLowerCase();

	playSoundClip(imageName);



	var targetImage = document.getElementById("imgReplace");
	targetImage.innerHTML = '<img id=\'img-responsive\' src=\'assets/images/' + imageName + ".jpg" + '\' width=\'200\' height=\'200\'>';
	

};

//function8
function displayWinningText()		//WIN
{
	var winningText = document.getElementById("winning-text");
	winningText.innerHTML = "<h2>" + gameChoice + "<h2>"; 
};

//function9
function displayLosingText()		//WIN
{
	var winningText = document.getElementById("winning-text");
	winningText.innerHTML = "<h2> You Lose <h2>"; 
};

//function 10
function reset()
{
	//Clear all letters and for current word
	for(var i = 0; i < 15; i++)
	{
		var targetLetter = document.getElementById("letter" + (i+1))		//i + 1 since index starts at 0 and id="letter1" first tag starts at 1.
		targetLetter.textContent = "";
	}
	

	//reset letters alread guessed by removing guessed letters: letterUsed1...letterUsed12
	for(var j = 0; j < 13; j++)
	{
		var targetWrongLetter = document.getElementById("letterUsed" + (j+1));
		    targetWrongLetter.textContent = "";
	}

	//Reset All Global Variables and id="letter1" ... "letter8" & choose a new game, then place certain number of (_) based on (gameChoice.length)
	guessRemain = 13;
	
	var guessRemainText = document.getElementById("guess-remain");
	
	guessRemainText.textContent = guessRemain;

	correctLetterList = "";

	incorrectLetterList = "";


	g = 0;

	totalCorrectLetters = 0;

	findWord = false;


	
	gameChoice = pickGame();

	//Reset (_) letter1 ... letter8 && Call string concat id (function3) to fill in a certain number of (_) using for loop which will add (_) 
	//corresponding to number of letters (gameChoice.length)
	addLetterUnderline();

};

function a()
{
	console.log("Do Something for 5 seconds");
}

//function11 
function playSoundClip(game)
{
	audio = new Audio('assets/sounds/' + game + '.mp3');
	audio.play();
	
	
	iterator++;

}

