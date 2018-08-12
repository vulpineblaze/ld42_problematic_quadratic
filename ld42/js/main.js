<!-- hide script from old browsers




function main(){
    


	var game = new Phaser.Game(800, 640, Phaser.AUTO, '', { preload: preload, create: create, update: update });

	function preload() {

	    

		
        game.load.audio('backgroundMusic', 'audio/backgroundMusic.mp3');
        game.load.audio('correct', 'audio/correct.wav');
        game.load.audio('wrong', 'audio/wrong.wav');
        game.load.audio('lose', 'audio/lose.wav');

	}



	var square;
	
	var black = 0x000000;
	var white = 0xffffff;
	var blue = 0x0000ff;
	var red = 0xff0000;
	var yellow = 0xffff00;
	var green = 0x00ff00;
	var cyan = 0x00ffff;
	var magenta = 0xff00ff;

	var board;
 	
	var col=10;
	var row=6;

	var size=64;
	var offset=16;
	var top_row=100;
	var side_margin=8;

	var gameState = "none";

	var correct;
	var wrong;

	var text;
	var level;

	var spacebar;

	function create() {

		music = game.add.audio('backgroundMusic');
		music.loop = true; 
	    music.play();

		correctFX = game.add.audio('correct');
		wrongFX = game.add.audio('wrong');
		loseFX = game.add.audio('lose');


	    // game.stage.backgroundColor = "666666";
	    game.stage.backgroundColor = white;

	    spacebar = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

		board = spawnBoard();


	    var style = { font: "bold 64px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

	    //  The Text is positioned at 0, 100
	    text = game.add.text(0, 0, "ORANG", style);
	    // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

	    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
	    text.setTextBounds(0, 0, 800, 100);


	    var style2 = { font: "bold 40px Arial", fill: "#000", boundsAlignH: "right", boundsAlignV: "middle" };
	    //  The Text is positioned at 0, 100
	    level = game.add.text(0, 0, ""+randomNumber(1,700), style2);
	    // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
	    level.setTextBounds(0, 0, 800, 100);


	    var style3 = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "bottom" };
	    //  The Text is positioned at 0, 100
	    restartText = game.add.text(0, 0, "Click to play again ...", style3);
	    // text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
	    //  We'll set the bounds to be from x0, y100 and be 800px wide by 100px high
	    restartText.setTextBounds(0, 0, 800, 640);

	    
	}

	function update() {

	    //  Collide the player and the stars with the platforms

	    // board[5][5].ctx.fillStyle = cyan;

	    if(spacebar.isDown){
	    	gameState = "wrong";
	    }

	    if(gameState == "none"){

	    	if (allBlackSquares()) { // lost the game
				board = [];
				text.setText("LOST THE GAME");
			    text.addColor(decimalColorToHTMLcolor(black), 0);
	    		game.stage.backgroundColor = black;
	    		music.stop();
	    		loseFX.play();

				gameState = "waiting";
			}else{

		    	correct = getWhiteSquare();
		    	correct.name = "correct";
		    	changeColorExcept(correct,0);
			    text.setText(getColorText(correct.color));

		    	wrong = getWhiteSquare();
		    	wrong.name = "wrong";
		    	changeColorExcept(wrong,correct.color);
				// var hexColour = "#"+ wrong.color.toString(16);
			    text.addColor(decimalColorToHTMLcolor(wrong.color), 0);

			    console.log(decimalColorToHTMLcolor(wrong.color));
			    console.log(getColorText(wrong.color));

		    	gameState = "playing";
	    	}
	    }else if(gameState == "wrong"){
	    	changeColorTo(correct,black);
			changeColorTo(wrong,black);
			wrongFX.play();
			gameState = "none";
	    }else if (gameState == "correct"){
	    	changeColorTo(correct,white);
			changeColorTo(wrong,white);
			correctFX.play();
			gameState = "none";
	    }else if ( gameState == "waiting"){
			game.input.onDown.addOnce(restart,this);
	    }
	  
	}

	function listener (graphics) {

		// var col = graphics.col;
		// var row = graphics.row;

		// graphics.beginFill(0xff0000);
  //   	graphics.drawRect(side_margin+(col*(size+offset)), top_row+(row*(size+offset)), size, size);
  //   	graphics.endFill();

  //   	// graphics.graphicsData[0].fillColor = 0XFFFF33;

		// graphics.color = red;	
		// graphics.tint = 0xffffff;	


	 //    console.log(graphics);

		if(graphics.color == correct.color){
			gameState = "correct";

		}else if(graphics.color == wrong.color){
			gameState = "wrong";
			
		}

	    console.log(gameState);

	}


	function getNonBlackSquare(){
		// body...
		var c = randomCol();
		var r = randomRow();

		// console.log(c,r);

		var square = board[c][r];

		if(square.color == black){
			return getNonBlackSquare();
		}else {
			return square;
		}

	}


	function getWhiteSquare(){
		// body...
		var c = randomCol();
		var r = randomRow();

		// console.log(c,r);

		var square = board[c][r];

		if(square.color == white){
			return square;
		}else {
			return getWhiteSquare();
		}

	}


	function randomNumber(min, max){
		// console.log(min,max);
		return Math.floor(Math.random()*(max-min+1)+min);
	}
	function randomCol(){
		return randomNumber(0,col-1);
	}
	function randomRow(){
		return randomNumber(0,row-1);
	}
	// function HEXToVBColor(rrggbb) {
	//     var bbggrr = rrggbb.substr(4, 2) + rrggbb.substr(2, 2) + rrggbb.substr(0, 2);
	//     return parseInt(bbggrr, 16);
	// }
	function changeColorExcept(square, color){
		var c = square.col;
		var r = square.row;

		var clr = getColorExcept(color);

		square.beginFill(clr);
    	square.drawRect(side_margin+(c*(size+offset)), top_row+(r*(size+offset)), size, size);
    	square.endFill();
		square.color = clr;	

	    console.log(square);
	}

	function changeColorTo(square,color){
		var c = square.col;
		var r = square.row;

		square.beginFill(color);
    	square.drawRect(side_margin+(c*(size+offset)), top_row+(r*(size+offset)), size, size);
    	square.endFill();
		square.color = color;	

	    console.log(square);
	}

	function getColorExcept(color){
		var randColor = randomNumber(0,5);
		var retVal = 0;
		

		switch (randColor) {
		    case 0:
		        retVal = blue;
		        break;
		    case 1:
		        retVal = red;
		        break;
		    case 2:
		        retVal = yellow;
		        break;
		    case 3:
		        retVal = green;
		        break;
		    case 4:
		        retVal = cyan;
		        break;
		    case 5:
		        retVal = magenta;
		        break;
		}

		if(retVal == color){
			retVal = getColorExcept(color);
		}

		return retVal;
	}

	function getColorText(color){
		var retVal = 0;

		switch (color) {
		    case blue:
		        retVal = "blue";
		        break;
		    case red:
		        retVal = "red";
		        break;
		    case yellow:
		        retVal = "yellow";
		        break;
		    case green:
		        retVal = "green";
		        break;
		    case cyan:
		        retVal = "cyan";
		        break;
		    case magenta:
		        retVal = "magenta";
		        break;
		}

		return retVal;
	}

	function allBlackSquares(){
		// body...
		// var isNext = false;

		for (var i = 0; i < col; i++) {
			for(var j =0; j<row;j++){
				if(board[i][j].color != black){
					return false;
				}
			}
		}


		return true;
	}



	function restart () {
		
	    console.log("restart");
		
		gameState = "none";
		board = spawnBoard();
	    game.stage.backgroundColor = white;


		level.setText(""+randomNumber(1,700));

	    music.play();

	    console.log("restart_done:"+gameState+" time:"+game.time.totalElapsedSeconds());



	}


	function spawnBoard(){
		var b = new Array(col);
		for (var i = 0; i < col; i++) {
		  b[i] = new Array(row);
		  for(var j =0; j<row;j++){
	    	var graphics = game.add.graphics(0, 0);

		    graphics.beginFill(white);
	    	graphics.drawRect(side_margin+(i*(size+offset)), top_row+(j*(size+offset)), size, size);
	    	graphics.endFill();
	    	graphics.inputEnabled = true;
		    graphics.events.onInputDown.add(listener, this,0,graphics);

			graphics.col = i;
			graphics.row = j;
			graphics.color = white;


		  	b[i][j]=graphics;
		  }
		}

		return b;
	}

	function decimalColorToHTMLcolor(number) {
	    //converts to a integer
	    return "#"+ ('000000' + ((number)>>>0).toString(16)).slice(-6);
	} 
	 

}// end of game




// end hiding script from old browsers -->