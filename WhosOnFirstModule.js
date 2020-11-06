//global variables for WhosOnfirst module

//words that appear in the display, split up by which button the player reads
var DisplayWords = {
	"Button1": ['UR'],
	"Button2": ['YES', 'NOTHING', 'LED', 'THEY ARE'],
	"Button3": ['', 'REED', 'LEED', 'THEY\'RE', ],
	"Button4": ['FIRST', 'OKAY', 'C', ],
	"Button5": ['BLANK', 'READ', 'RED', 'YOU', 'YOUR', 'YOU\'RE', 'THEIR', ],
	"Button6": ['DISPLAY', 'SAYS', 'NO', 'LEAD', 'HOLD ON', 'YOU ARE', 'THERE', 'SEE', 'CEE']	
}
//all possible words that appear on the buttons
var ButtonWords = ['READY','FIRST','NO','BLANK','NOTHING','YES','WHAT','UHHH','LEFT','RIGHT','MIDDLE','OKAY','WAIT','PRESS']

// words that appear on the buttons with associated list of possible words that need to be clicked
var ClickWords = {
	"READY": ['YES', 'OKAY', 'WHAT', 'MIDDLE', 'LEFT', 'PRESS', 'RIGHT', 'BLANK', 'READY', 'NO', 'FIRST', 'UHHH', 'NOTHING', 'WAIT'],
	"FIRST": ['LEFT', 'OKAY', 'YES', 'MIDDLE', 'NO', 'RIGHT', 'NOTHING', 'UHHH', 'WAIT', 'READY', 'BLANK', 'WHAT', 'PRESS', 'FIRST'],
	"NO": ['BLANK', 'UHHH', 'WAIT', 'FIRST', 'WHAT', 'READY', 'RIGHT', 'YES', 'NOTHING', 'LEFT', 'PRESS', 'OKAY', 'NO', 'MIDDLE'],
	"BLANK": ['WAIT', 'RIGHT', 'OKAY', 'MIDDLE', 'BLANK', 'PRESS', 'READY', 'NOTHING', 'NO', 'WHAT', 'LEFT', 'UHHH', 'YES', 'FIRST'],
	"NOTHING": ['UHHH', 'RIGHT', 'OKAY', 'MIDDLE', 'YES', 'BLANK', 'NO', 'PRESS', 'LEFT', 'WHAT', 'WAIT', 'FIRST', 'NOTHING', 'READY'],
	"YES": ['OKAY', 'RIGHT', 'UHHH', 'MIDDLE', 'FIRST', 'WHAT', 'PRESS', 'READY', 'NOTHING', 'YES', 'LEFT', 'BLANK', 'NO', 'WAIT'],
	"WHAT": ['UHHH', 'WHAT', 'LEFT', 'NOTHING', 'READY', 'BLANK', 'MIDDLE', 'NO', 'OKAY', 'FIRST', 'WAIT', 'YES', 'PRESS', 'RIGHT'],
	"UHHH": ['READY', 'NOTHING', 'LEFT', 'WHAT', 'OKAY', 'YES', 'RIGHT', 'NO', 'PRESS', 'BLANK', 'UHHH', 'MIDDLE', 'WAIT', 'FIRST'],
	"LEFT": ['RIGHT', 'LEFT', 'FIRST', 'NO', 'MIDDLE', 'YES', 'BLANK', 'WHAT', 'UHHH', 'WAIT', 'PRESS', 'READY', 'OKAY', 'NOTHING'],
	"RIGHT": ['YES', 'NOTHING', 'READY', 'PRESS', 'NO', 'WAIT', 'WHAT', 'RIGHT', 'MIDDLE', 'LEFT', 'UHHH', 'BLANK', 'OKAY', 'FIRST'],
	"MIDDLE": ['BLANK', 'READY', 'OKAY', 'WHAT', 'NOTHING', 'PRESS', 'NO', 'WAIT', 'LEFT', 'MIDDLE', 'RIGHT', 'FIRST', 'UHHH', 'YES'],
	"OKAY": ['MIDDLE', 'NO', 'FIRST', 'YES', 'UHHH', 'NOTHING', 'WAIT', 'OKAY', 'LEFT', 'READY', 'BLANK', 'PRESS', 'WHAT', 'RIGHT'],
	"WAIT": ['UHHH', 'NO', 'BLANK', 'OKAY', 'YES', 'LEFT', 'FIRST', 'PRESS', 'WHAT', 'WAIT', 'NOTHING', 'READY', 'RIGHT', 'MIDDLE'],
	"PRESS": ['RIGHT', 'MIDDLE', 'YES', 'READY', 'PRESS', 'OKAY', 'NOTHING', 'UHHH', 'BLANK', 'LEFT', 'FIRST', 'WHAT', 'NO', 'WAIT']
}

//importing buttons from html
var Button1 = document.getElementById("whosOnFirstButton1");
var Button2 = document.getElementById("whosOnFirstButton2");
var Button3 = document.getElementById("whosOnFirstButton3");
var Button4 = document.getElementById("whosOnFirstButton4");
var Button5 = document.getElementById("whosOnFirstButton5");
var Button6 = document.getElementById("whosOnFirstButton6");

var IndicatorLight1 = document.getElementById("whosOnFirstLight1");
var IndicatorLight2 = document.getElementById("whosOnFirstLight2");
var IndicatorLight3 = document.getElementById("whosOnFirstLight3");
var IndicatorLight4 = document.getElementById("whosOnFirstLight4");
var IndicatorLight5 = document.getElementById("whosOnFirstLight5");

var correct = 0;


var ButtonsArray = [Button1, Button2, Button3, Button4, Button5, Button6];
var Display = document.getElementById("whosOnFirstDisplayText");
//blank game data
 GameData = {
	 "buttons": ['','','','','',''],
	"ButtonToPress": -1, 
	"ButtonToRead": -1,
	"DisplayWord": '',
	"WordToPress": '',
	"WordToRead": '',
	"roundResult": null	
}

/* interface diagram
____________________
[ DISPLAY ]    O	|
					|
[btn1] [btn4]  []	|
[btn2] [btn5]  []	|
[btn3] [btn6]  []	|
____________________|

explanation:
DISPLAY: 
	a digital display with one of DisplayWords showing. based on Whuch button ReadWord appears on
btn1-6: 
	clickable buttons. One is randomly assigned WordToRead, then WordToClick is generated and assigned another. the rest are filled in randomly 

 generate displayWord, read button based on it
 populate buttons with random words
 pick ReadWord based om displayWord
 loop through ReadWord's list
	find word that appears in list first
	if no words appear, pick word and replace one of the other buttons 

*/

function generateGameData(){
	populateButtons();
	generateButtonNumber();
	GameData.DisplayWord = generateDisplayWord(GameData.ButtonToRead); 
	

	for(i = 0; i < 6; i++){
		ButtonsArray[i].innerHTML = GameData.buttons[i];
	}

	Display.innerText = GameData.DisplayWord;

	
	GameData.WordToRead = GameData.buttons[GameData.ButtonToRead-1];

	var indexOfWordToPress = 100;
	for(k = 0; k < GameData.buttons.length; k++){
		for(i = 0; i < ClickWords[GameData.WordToRead].length; i++){
			if(ClickWords[GameData.WordToRead][i] === GameData.buttons[k] && i < indexOfWordToPress){
				indexOfWordToPress = i; 
				GameData.WordToPress = ClickWords[GameData.WordToRead][i];
			}
		}
	}
}

function generateButtonNumber(){
	GameData.ButtonToRead =  Math.floor(Math.random()*6)+1;
}

function populateButtons(){
	var tempButtonWords = ButtonWords.slice();
	for(k = 0; k < 6; k++){
		var index =  Math.floor(Math.random()*tempButtonWords.length);
		GameData.buttons[k] = tempButtonWords[index];
		tempButtonWords.splice(index,1);
		
	}
}


//generate display word from WordToRead_Number
// ButtonNumber: the number where the ReadButton will be placed on the display
function generateDisplayWord(ButtonNumber){
	switch(ButtonNumber){
		case 1:
				return DisplayWords.Button1[Math.floor(Math.random()*DisplayWords.Button1.length)];
				break;
		case 2:
				return DisplayWords.Button2[Math.floor(Math.random()*DisplayWords.Button2.length)];
				break;
		case 3:
				return DisplayWords.Button3[Math.floor(Math.random()*DisplayWords.Button3.length)];
				break;
		case 4:
				return DisplayWords.Button4[Math.floor(Math.random()*DisplayWords.Button4.length)];
				break;
		case 5:
				return DisplayWords.Button5[Math.floor(Math.random()*DisplayWords.Button5.length)];
				break;
		case 6:
				return DisplayWords.Button6[Math.floor(Math.random()*DisplayWords.Button6.length)];
				break;		
	}
}

function addGreenLight(countOfCorrect){
	switch(countOfCorrect){
		case 1:
			document.getElementById("whosOnFirstLight1").style.backgroundColor = "#28e64f";
			break;
		case 2:
			document.getElementById("whosOnFirstLight2").style.backgroundColor = "#28e64f";
			break;
		case 3:
			document.getElementById("whosOnFirstLight3").style.backgroundColor = "#28e64f";
			break;
		case 4:
			document.getElementById("whosOnFirstLight4").style.backgroundColor = "#28e64f";
			break;
		case 5:
			document.getElementById("whosOnFirstLight5").style.backgroundColor = "#28e64f";
			break;	
	}
}

$(".whosOnFirstWordButton").click(CheckClick);

function CheckClick(){
	
	if($(this).text() === GameData.WordToPress){
		correct++;
		addGreenLight(correct);
		if(correct == 5){
			document.getElementById("whosOnFirstIndicatorLight").classList.remove('lightOff');
			document.getElementById("whosOnFirstIndicatorLight").classList.add('lightOn');
			addSuccess();
			return;	
		}
		generateGameData();
	}
	else{
		addStrike();
		document.getElementById("whosOnFirstIndicatorLight").classList.remove('lightOff');
		document.getElementById("whosOnFirstIndicatorLight").classList.add('red');
		setTimeout(function(){
			document.getElementById("whosOnFirstIndicatorLight").classList.remove('red');
			document.getElementById("whosOnFirstIndicatorLight").classList.add('lightOff');
			generateGameData();
		}, 1000)
		
		}
}

generateGameData();


/*
main game loop
set up round
see what button is clicked
if correct, add light
	if third round, set success light, end game
	else set up another round
else(wrong)
	give strike
	error red blinks
	set up another round

*/ 
