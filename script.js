var cont = document.getElementsByClassName("container")[0];
var clickC = 0; // Count clicks.
var correctMoves = 0; // Count correct moves
var movesElement = document.getElementById("moves");
var timeElement = document.getElementById("time");
var resultBlock = document.getElementById("result");
var gamePad = document.getElementById("game-pad"); // Get game-pad
var refreshButton = document.getElementById("refresh-button");
var storeBrick1; // Temporary element variable to store brick1
var storeBrick2; // Temporary element variable to store brick2
var timePassed; // To store total time passed
var myVar;
var openCardCount = 0; // To make sure only two cards view at the same time.

var imageArray = ["tw.png", "li.png", "wi.png", "wo.png", "sk.png", "go.png", "in.png", "yo.png", "tw.png", "li.png", "wi.png", "wo.png", "sk.png", "go.png", "in.png", "yo.png"]; // This array stores the list of images.

function myTimer()
{
	timePassed ++;
	timeElement.textContent = "Time Elapsed : "+timePassed;
}

function toggleFunction()
{
	image1 = storeBrick1.children[0].getAttribute("src");
	image2 = storeBrick2.children[0].getAttribute("src");

	if(image1 !== image2) // If both images are not same.
	{
		storeBrick1.classList.toggle("back"); // Toggle bright to black.
		storeBrick1.children[0].classList.toggle("visible"); // Visible to Invisible (image)
		storeBrick2.classList.toggle("back"); // Toggle bright to black.
		storeBrick2.children[0].classList.toggle("visible"); // Visible to Invisible (image)
	}
	else{ // If both images are same.
		correctMoves += 2;
		if(correctMoves === 16) // Conditions after all correct cards are revealed.
		{
			clearInterval(myVar); // Stop timer after game over.
			resultBlock.textContent = "GAME OVER";
			clickC = 0; // Reset clicks count to 0;
		}
	}
	openCardCount = 0;	// Reset openCardCount to '0'
}

cont.addEventListener("click", function(e) {
	if(e.target !== e.currentTarget)
	{
		var brick = e.target;
		if(brick.localName === "div" && brick.classList.length === 2 && openCardCount < 2)
		{
			openCardCount++; // Increase openCardCount
			brick.classList.toggle("back"); // Toggle black to bright.
			brick.children[0].classList.toggle("visible"); // Invisible to visible (image)
			clickC ++; // Increase click count 

			if(clickC === 1) // Start timer on first click.
			{
				timePassed = 0;
				myVar = setInterval(myTimer, 1000);
			}

			movesElement.textContent = "Moves Count : " + clickC; // Output moves count
			if(clickC % 2 === 1) storeBrick1 = brick; // Store first brick.
			else if(clickC % 2 === 0)
			{
				storeBrick2 = brick; // Store second brick.
				setTimeout(toggleFunction, 500); // Timout function.
			}
		}
	}
});

function randomizeTiles() 
{
	var imageElements = document.getElementsByClassName("images");
	var newImageArray = imageArray.sort( function() {return 0.5 - Math.random(); });

	for(var i=0; i<16; i++)
	{
		imageElements[i].setAttribute("src", "images/" + newImageArray[i]);
	}
}

refreshButton.addEventListener("click", function() {

	for(var i=0; i<16; i++) // Toggle all revealed cards to black.
	{	
		//TRICK : Revealed cards have three classes.
		if(gamePad.children[i].classList.length === 3)
		{
			gamePad.children[i].classList.toggle("back");
			gamePad.children[i].children[0].classList.toggle("visible");
		}
	}
	clickC = 0; // Reset click count to '0'
	correctMoves = 0; // Reset correct moves count to '0'
	movesElement.textContent = "Moves Count : " + clickC;
	resultBlock.textContent = "";

	clearInterval(myVar); // Stop the timer after refresh.
	timePassed = 0;
	timeElement.textContent = "Time Elapsed : "+timePassed;

	randomizeTiles(); // To set the new tiles randomly.
});

randomizeTiles(); // Randomize the tiles in the beginning.