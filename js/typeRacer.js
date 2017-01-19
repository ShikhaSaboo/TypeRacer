(function (){

	var wordsArray = [];
	
	var getRandomWords = "javacript is full fledged dynamic programming language that when applied to an HTML document can provide dynamic interactivity on websites It was invented by Brendan".toLowerCase().split(" ");
	var intervalSet;
	var count=0;
	var HEIGHT = 610;
	var WIDTH = 850;
	var char;
	var PressedKey;
	var selectedWordArray = [];
	var WordSelected = false;
	var WordMatch;
	var temp = 1;
	var Score = 0;
	var getSelectedWord;
	var scoreBoard;
	var time=0;
	var Overgame;
	var button;
	var flag = 1;
	var first=0;
	function getRandom(min, max) {
    	return Math.floor(Math.random()*(max-min+1)+min);
    }

    	
    function words(){
    	this.x;
    	this.y =0;
    	this.element;
    	this.width =90;
    	this.height =40;
    	this.text;
    	this.spanArray = [];

    	this.init = function(text){
    		this.element=document.createElement('div');
    		this.element.setAttribute('class','word');
    		this.element.style.top = this.y + "px";
    		this.element.style.left = this.x +"px";
    		this.element.style.width = this.width + "px";
    		this.element.style.height = this.height + "px";
    		this.text = text;
    		document.getElementsByClassName('container')[0].appendChild(this.element);
    	}
    	this.addText = function(text){
    		this.text = text;
    		this.element.innerHTML = this.text; 
    	}
    	this.reDraw = function(){
    		this.element.style.top = this.y + "px";
    		this.element.style.left = this.x +"px";
    	}
    	this.splitWord = function(){
    		var letters  = this.text.split("");
    		for(var i = 0; i< letters.length; i++) {
				var elementSpan = document.createElement('span');
				
				elementSpan.innerHTML = letters[i];
				this.element.appendChild(elementSpan);
				this.spanArray.push(elementSpan);
				 
				 

			}
    	}

    	this.delete = function() {
    		this.element.remove();
    	}

    }

    function GameMain() {

    	this.init=function() {
    		
    		createBoards();
    		intervalSet = setInterval(RunGame,60);

    		window.addEventListener("keypress",function(e){
    		
    		compareWithWords(e);

    		});

    	}

    	var RunGame = function() {
    		count ++;
    		time ++;
    		if(count % 40 == 0) {
    			startCreateWord();
    		}
    		if(time >=800)
    		{
    			clearInterval(intervalSet);
    			GameOver();
    		}	
			moveWord();
			deleteWords();
    	}
    		
    	var startCreateWord= function() {	
    		var createdWord = new words();
    		var randomNumber = Math.floor(Math.random()*getRandomWords.length);
    		var getText = getRandomWords[randomNumber];
    		createdWord.x = getRandom(10,750);
			createdWord.init(getText);
			wordsArray.push(createdWord);

			createdWord.splitWord();
			

		}

		var moveWord = function() {
			for(var i = 0; i < wordsArray.length; i++) {
				wordsArray[i].y += 2;
				wordsArray[i].reDraw();
			}
		}

		var deleteWords = function() {
			for(var i = 0; i<wordsArray.length; i++) {
				if(wordsArray[i].y >= HEIGHT )
				{
				
					wordsArray[i].delete();
					wordsArray.shift();
				}
			}
		}
		var compareWithWords = function(event){
			first = 0;
			PressedKey = event.which
    		char = String.fromCharCode(PressedKey).toLowerCase();
    		
			if(WordSelected == false) {
				for(var i = wordsArray.length-1; i >= 0;i--) {
				 		
				 	if(wordsArray[i].spanArray[0].innerHTML== char) {
				 		wordsArray[i].spanArray[0].style.color ="red";
				 		WordSelected = true;
				 		temp = 1;
				 		first= 1;
				 		
				 		selectedWordArray.push(wordsArray[i]);
				 		
				 	}
				}
				
			}


			if(selectedWordArray.length > 0 && first == 0) { 
				

				for(var i= 0; i< selectedWordArray.length;i++) {
					if(temp >= selectedWordArray[i].spanArray.length && PressedKey == 32 && WordMatch== true){
						console.log("word selected");
						temp = 0;
						Score = Score+selectedWordArray[i].spanArray.length;
						
						scoreBoard.innerHTML= "score: " + Score;
						getSelectedWord = selectedWordArray[i];
								
						getSelectedWord.delete();
						selectedWordArray.shift;
						
						WordMatch = false;
						WordSelected= false;
						break;
						flag = 0;

					} 
					if(temp < selectedWordArray[i].spanArray.length){

					 	if(selectedWordArray[i].spanArray[temp].innerHTML == char) {
							selectedWordArray[i].spanArray[temp].style.color ="red";
							WordMatch = true;
							console.log("checking");
							
						}
						if(selectedWordArray[i].spanArray[temp].innerHTML != char) {
							selectedWordArray.shift();
							console.log(selectedWordArray.length)
							WordMatch= false;
							if(selectedWordArray.length == 0) {
							WordSelected= false;
							temp = 1;
							}

						}
					}

				}
				temp++;
			}

		}

		var createBoards= function() {
			scoreBoard = document.createElement('div');

			scoreBoard.style.left = "10px";
			scoreBoard.style.top = "10px";
			scoreBoard.style.width = "120px";
			scoreBoard.style.marginRight = "10px";
			scoreBoard.style.padding = "10px";
			scoreBoard.style.background = "#386F79";
			scoreBoard.style.color = "#EDF5F6";
			scoreBoard.innerHTML = "Score:" + Score;
			scoreBoard.style.position = "absolute";
			document.body.appendChild(scoreBoard); 
		}
		var GameOver = function() {

			Overgame = document.createElement('div');
			Overgame.setAttribute('class','gameOver');
			Overgame.style.margin = "0 auto";
			Overgame.style.padding = "40px";
			Overgame.style.border = "2px solid black";
			Overgame.style.top = "100px";
			Overgame.style.left= "400px";
			Overgame.style.width = "200px";
			Overgame.innerHTML = "GAME OVER <br /> <br />Click reset to restart the game<br/> <br/> ";
			Overgame.style.color = "red";
			Overgame.style.height="80px";
			Overgame.style.background="#ffffff";
			document.getElementsByClassName('container')[0].appendChild(Overgame);
			button = document.createElement('button');
			button.setAttribute('class','button');
			button.style.padding = "10px";
			button.style.width="80px";
			button.style.background = "#386F79";	
			button.style.color = "#EDF5F6";
			button.innerHTML = "Reset";
			button.margin = "0 auto";
			document.getElementsByClassName('gameOver')[0].appendChild(button);
			button.onclick = function(){
				callReset();
			}

		}

		var callReset = function() {	
			
			location.reload();
		}

    }
    

	new GameMain().init();
})();